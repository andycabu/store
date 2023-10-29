import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Filters from "./components/Filters";
import { useProducts } from "./hooks/useProduct";

function App() {
  const { filteredProducts } = useProducts();
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <Filters />
        <Card products={filteredProducts} />
      </main>
    </>
  );
}

export default App;
