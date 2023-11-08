import { useId } from "react";
import { useProducts } from "../hooks/useProduct";

const Filters = () => {
  const { filters, setFilters } = useProducts();

  const minPriceFilterId = useId();
  const handleChangeMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };
  const handleChangeProduct = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  return (
    <section className="flex justify-around max-[590px]:flex-col max-[590px]:gap-4 items-center p-4">
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
      <div>
        <label className="pr-4" htmlFor="">
          Buscar:
        </label>
        <input
          onChange={handleChangeProduct}
          className="bg-[var(--card-border-color)] rounded-md"
          type="text"
        />
      </div>
    </section>
  );
};
export default Filters;
