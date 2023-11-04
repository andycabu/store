import { createContext, useState, useEffect, useReducer } from "react";

import PropTypes from "prop-types";

export const ProductContext = createContext();
const initialState = JSON.parse(window.localStorage.getItem("cart")) || [];

const updateToLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};
const reducer = (cart, action) => {
  const { type: actionType, payload: actionPayload } = action;
  let id;
  let productInCartIndex;

  if (actionPayload) {
    ({ id } = actionPayload);
    productInCartIndex = cart.findIndex((item) => item.id === id);
  }

  switch (actionType) {
    case "ADD_TO_CART": {
      if (productInCartIndex >= 0) {
        const newCart = structuredClone(cart);
        newCart[productInCartIndex].quantity += 1;
        updateToLocalStorage(newCart);

        return newCart;
      }

      const newState = [
        ...cart,
        {
          ...actionPayload,
          quantity: +1,
        },
      ];
      updateToLocalStorage(newState);
      return newState;
    }
    case "SUBTRACT_TO_CART": {
      if (productInCartIndex >= 0) {
        const newCart = structuredClone(cart);

        if (newCart[productInCartIndex].quantity > 1) {
          newCart[productInCartIndex].quantity -= 1;
        }
        updateToLocalStorage(newCart);
        return newCart;
      }
    }
    // eslint-disable-next-line no-fallthrough
    case "REMOVE_FROM_CART": {
      const newState = cart.filter((item) => item.id !== id);

      updateToLocalStorage(newState);
      return newState;
    }
    case "CLEAR_CART": {
      updateToLocalStorage([]); // Esto actualizará localStorage
      return [];
    }
  }
  return cart;
};

export const ProductProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);
  const url = "https://fakestoreapi.com/products";

  const [products, setProducts] = useState();
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = window.localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const updateToLocalStorage = (state) => {
    window.localStorage.setItem("favorites", JSON.stringify(state));
  };

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const subtractToCart = (product) =>
    dispatch({
      type: "SUBTRACT_TO_CART",
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
    });
  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const addToFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);
      const newFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== product.id)
        : [...prevFavorites, product];

      updateToLocalStorage(newFavorites);

      return newFavorites;
    });
  };
  const getProducts = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };
  const checkProductInCart = (product) =>
    cart.some((item) => item.id === product.id);
  const filteredProducts = filterProducts(products || []);
  const filteredProductsFav = filterProducts(favorites || []);
  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        filteredProducts,
        filteredProductsFav,
        checkProductInCart,
        getProducts,
        setFilters,
        addToFavorite,
        filters,
        addToCart,
        clearCart,
        cart,
        favorites,
        removeFromCart,
        subtractToCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
