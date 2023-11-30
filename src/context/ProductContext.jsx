import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useUsers } from "../hooks/useUsers";
import { addProductRequest, favoritesRequest } from "../api/favorite";

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorite = async (product) => {
    try {
      const res = await addProductRequest({ userId, productId: product._id });

      if (res.status === 200) {
        setFavorites((currentFavorites) => [...currentFavorites, res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (products.length < 1) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (favorites.length < 1) {
      getFavorites();
    }
  }, [user]);

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
