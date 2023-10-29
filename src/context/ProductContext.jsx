import { createContext, useState, useEffect, useReducer } from "react";

import PropTypes from "prop-types";

export const ProductContext = createContext();
const initialState = [];
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  const { id } = actionPayload;
  const productInCartIndex = state.findIndex((item) => item.id === id);

  switch (actionType) {
    case "ADD_TO_CART": {
      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state);
        newCart[productInCartIndex].quantity += 1;
        return newCart;
      }
      return [
        ...state,
        {
          ...actionPayload,
          quantity: +1,
        },
      ];
    }
    case "SUBTRACT_TO_CART": {
      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state);

        if (newCart[productInCartIndex].quantity > 1) {
          newCart[productInCartIndex].quantity -= 1;
        }
        return newCart;
      }
    }
    // eslint-disable-next-line no-fallthrough
    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== id);
    }
    case "CLEAR_CART": {
      return initialState;
    }
  }
  return state;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const url = "https://fakestoreapi.com/products";

  const [products, setProducts] = useState();
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });

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
        cart: state,
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
