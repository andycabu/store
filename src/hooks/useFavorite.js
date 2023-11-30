// hooks/useFavorites.js
import { useState } from "react";
import { useProducts } from "./useProduct";

const useFavorites = () => {
  const { addToFavorite } = useProducts();
  const [likedProducts, setLikedProducts] = useState(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return favoritesFromStorage.reduce((acc, product) => {
      acc[product._id] = true;
      return acc;
    }, {});
  });

  const toggleFavorite = (product) => {
    setLikedProducts((prev) => {
      const isAlreadyFavorite = likedProducts[product._id];
      return {
        ...prev,
        [product._id]: !isAlreadyFavorite,
      };
    });
    addToFavorite(product);
  };

  return { likedProducts, toggleFavorite };
};

export default useFavorites;
