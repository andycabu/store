import { createContext, useState } from "react";
import PropTypes from "prop-types";
const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    category: "all categories",
    title: "",
  });
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all categories" ||
          product.category === filters.category) &&
        product.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, filterProducts }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node,
};
