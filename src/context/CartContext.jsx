import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const updateToLocalStorage = (state) => {
    window.localStorage.setItem("cart", JSON.stringify(state));
  };
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  function addToCart(product) {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      updateToLocalStorage(newCart);
      setCart(newCart);
      return newCart;
    }

    const newState = [
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ];
    updateToLocalStorage(newState);
    setCart(newState);
    return newState;
  }
  const removeFromCart = (id) => {
    const newState = cart.filter((item) => item.id !== id);
    setCart(newState);
    updateToLocalStorage(newState);
    return newState;
  };
  const subtractToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);

      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity -= 1;
      }
      setCart(newCart);
      updateToLocalStorage(newCart);

      return newCart;
    }
  };
  const clearCart = () => {
    setCart([]);
    updateToLocalStorage([]);
  };
  const checkProductInCart = (product) =>
    cart.some((item) => item.id === product.id);
  const getQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };
  useEffect(() => {
    const calculateTotalItems = (items) => {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    };

    const calculateTotalPrice = (items) => {
      const total = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      return parseFloat(total.toFixed(2));
    };

    const totalPrice = calculateTotalPrice(cart);
    setTotalPrice(totalPrice);

    const totalItems = calculateTotalItems(cart);
    setCartCount(totalItems);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        cartCount,
        addToCart,
        subtractToCart,
        removeFromCart,
        checkProductInCart,
        clearCart,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
