// hooks/useFavorites.js

import { useProducts } from "./useProduct";

const useFavorites = () => {
  const { addToFavorite, likedProducts, setLikedProducts } = useProducts();

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

  return { toggleFavorite };
};

export default useFavorites;
