import Card from "../components/Card";
import { useProducts } from "../hooks/useProduct";

const HomePage = () => {
  const { filteredProducts } = useProducts();

  return (
    <div className="grid justify-items-center grid-cols-auto-fit-minmax gap-6 p-8">
      <Card products={filteredProducts} />
    </div>
  );
};
export default HomePage;
