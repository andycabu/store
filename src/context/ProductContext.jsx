import { createContext, useContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

export const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProduct debe estar dentro del proveedor ProductContext"
    );
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const url = "https://fakestoreapi.com/products";

  const [products, setProducts] = useState();
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }
    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };
  const clearCart = () => {
    setCart([]);
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
  const filteredProducts = filterProducts(products || []);
  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, []);
  return (
    <ProductContext.Provider
      value={{
        filteredProducts,
        getProducts,
        setFilters,
        filters,
        addToCart,
        clearCart,
        cart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
