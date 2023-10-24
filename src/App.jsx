import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Filters from "./components/Filters";

function App() {
  const [products, setProducts] = useState();
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });
  const url = "https://burgers-hub.p.rapidapi.com/burgers";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fdcd1882e4mshde194b93c266d51p104e8cjsna8f0652a09d1",
      "X-RapidAPI-Host": "burgers-hub.p.rapidapi.com",
    },
  };

  async function getProducts() {
    const res = await fetch(url, options);

    const data = await res.json();
    console.log(data);
    setProducts(data);
  }
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };
  const filteredProducts = filterProducts(products || []);

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Filters changeFilters={setFilters} />
        <Card products={filteredProducts} />
      </main>
    </>
  );
}

export default App;
