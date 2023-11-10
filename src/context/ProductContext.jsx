import { createContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const url = "https://fakestoreapi.com/products";

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all categories",
    minPrice: 0,
    title: "",
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = window.localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const updateToLocalStorage = (state) => {
    window.localStorage.setItem("favorites", JSON.stringify(state));
  };
  const getProducts = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

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

  useEffect(() => {
    if (products.length < 1) {
      getProducts();
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        setFilters,
        addToFavorite,
        filters,
        favorites,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
