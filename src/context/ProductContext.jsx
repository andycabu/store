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
    const isFavorite = favorites.some((fav) => fav._id === product._id);
    try {
      if (isFavorite) {
        // Si el producto ya está en favoritos, envía una solicitud para eliminarlo
        const res = await deleteProductRequest(product._id);
        if (res.status === 200) {
          // Actualiza el estado eliminando este producto de los favoritos
          setFavorites((currentFavorites) =>
            currentFavorites.filter((fav) => fav._id !== product._id)
          );
        }
      } else {
        // Si el producto no está en favoritos, envía una solicitud para añadirlo
        const res = await addProductRequest({ userId, productId: product._id });
        if (res.status === 200) {
          // Actualiza el estado añadiendo este producto a los favoritos
          setFavorites((currentFavorites) => [...currentFavorites, res.data]);
        }
      }
    } catch (error) {
      console.error("Error al actualizar favoritos", error);
      // Aquí puedes manejar errores, como mostrar un mensaje al usuario
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
