import { useEffect, useId } from "react";
import { useFilters } from "../hooks/useFilters";
import { useLocation } from "react-router-dom";

const Filters = () => {
  const { pathname } = useLocation();
  const {
    filters,
    setFilters,
    filteredProducts,
    filteredFavorites,
    setFavoritesFilters,
    resetFilters,
  } = useFilters();

  const minPriceFilterId = useId();
  const isHomePage = pathname === "/";
  const isFavoritesPage = pathname === "/favorites";

  useEffect(() => {
    console.log("prueba");
    if (pathname !== "/" || pathname !== "/favorites") {
      resetFilters();
    }
  }, []);

  const handleChangeMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
    setFavoritesFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };
  const handleChangeProduct = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
    setFavoritesFilters((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const noProductsFound = isHomePage && filteredProducts.length === 0;
  const noFavoritesFound = isFavoritesPage && filteredFavorites.length === 0;
  return (
    <section>
      <div className="flex justify-around max-[590px]:flex-col max-[590px]:gap-4 items-center p-4">
        <div className="flex gap-4">
          <label htmlFor={minPriceFilterId}>Price from: </label>
          <input
            type="range"
            id={minPriceFilterId}
            min="0"
            max="1000"
            onChange={handleChangeMinPrice}
            value={filters.minPrice}
          />
          <span>€{filters.minPrice}</span>
        </div>
        <div className="flex  max-[590px]:w-full">
          <label className="pr-4" htmlFor="">
            search:
          </label>
          <input
            onChange={handleChangeProduct}
            className="bg-[var(--card-border-color)] rounded-md max-[590px]:w-full"
            type="text"
          />
        </div>
      </div>
      <div
        className={
          noFavoritesFound || noProductsFound
            ? "text-center font-bold text-5xl pt-20"
            : "hidden"
        }
      >
        <h1>
          {(noProductsFound && "No products found") ||
            (noFavoritesFound && "No favorite products found")}
        </h1>
      </div>
    </section>
  );
};
export default Filters;
