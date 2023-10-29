import { useId } from "react";
import { useProducts } from "../hooks/useProduct";

const Filters = () => {
  const { filters, setFilters } = useProducts();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const handleChangeMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };
  const handleChangeCategory = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };
  return (
    <section className="flex justify-between max-[425px]:flex-col max-[425px]:gap-4 items-center p-4">
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
      <div className="flex gap-4">
        <label htmlFor={categoryFilterId}>Category:</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing"> Mens clothing</option>
          <option value="women's clothing">Womens clothing</option>
        </select>
      </div>
    </section>
  );
};
export default Filters;
