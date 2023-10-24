import { useState } from "react";

const Filters = ({ changeFilters }) => {
  const [minPrice, setMinPrice] = useState(0);
  const handleChangeMinPrice = (e) => {
    setMinPrice(e.target.value);
    changeFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };
  const handleChangeCategory = (e) => {
    setMinPrice(e.target.value);
    changeFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };
  return (
    <section className="flex justify-between items-center p-4">
      <div className="flex gap-4">
        <label htmlFor="price">Price from: </label>
        <input
          type="range"
          id="price"
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
        />
        <span>€{minPrice}</span>
      </div>
      <div className="flex gap-4">
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" onChange={handleChangeCategory}>
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
