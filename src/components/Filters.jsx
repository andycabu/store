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

  return (
    <section className="flex justify-around max-[480px]:flex-col max-[480px]:gap-4 items-center p-4">
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
    </section>
  );
};
export default Filters;
