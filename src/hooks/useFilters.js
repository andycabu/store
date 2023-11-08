import { useContext } from "react";
import { FiltersContext } from "../context/FilterContext";

export const useFilters= () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters debe estar dentro del proveedor FiltersContext");
  }
  return context;
};
