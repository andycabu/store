import { useLocation } from "react-router-dom";
import ItemListContainer from "./ItemListContainer";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProduct";

const Categories = () => {
  const { state } = useLocation();
  const { setFilters, filteredProducts } = useProducts();
  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      category: state.category,
    }));
  }, [state]);

  return <ItemListContainer filters={filteredProducts} />;
};
export default Categories;
