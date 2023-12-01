import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useUsers } from "../hooks/useUsers";
import {
  addProductRequest,
  favoritesRequest,
  deleteProductRequest,
} from "../api/favorite";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useUsers();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all categories",
    minPrice: 0,
    title: "",
  });
  const [favorites, setFavorites] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const userId = user?.id;
  const getProducts = async () => {
    const res = await fetch("http://localhost:4000/api/products");
    const data = await res.json();
    setProducts(data);
  };
  const getFavorites = async () => {
    try {
      const res = await favoritesRequest(userId);

      if (res.status === 200) {
        setFavorites(res.data);
        const newLikedProducts = res.data.reduce((acc, favorite) => {
          acc[favorite.product._id] = true;
          return acc;
        }, {});
        setLikedProducts(newLikedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorite = async (product) => {
    const favorite = favorites.find((fav) => fav.product._id === product._id);
    const isFavorite = favorite !== undefined;

    try {
      if (isFavorite) {
        const res = await deleteProductRequest(favorite._id);
        if (res.status === 200) {
          setFavorites((currentFavorites) =>
            currentFavorites.filter((fav) => fav._id !== favorite._id)
          );
          setLikedProducts((currentLikedProducts) => {
            const newLikedProducts = { ...currentLikedProducts };
            delete newLikedProducts[product._id];
            return newLikedProducts;
          });
        }
      } else {
        const res = await addProductRequest({ userId, productId: product._id });
        if (res.status === 200) {
          setFavorites((currentFavorites) => [...currentFavorites, res.data]);
          setLikedProducts((currentLikedProducts) => ({
            ...currentLikedProducts,
            [product._id]: true,
          }));
        }
      }
    } catch (error) {
      console.error("Tienes que estar registrado para agregar a favoritos ");
    }
  };

  useEffect(() => {
    if (products.length < 1) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getFavorites();
    } else {
      setFavorites([]);
      setLikedProducts({});
    }
  }, [userId]);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        setFilters,
        addToFavorite,
        filters,
        favorites,
        likedProducts,
        setLikedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
