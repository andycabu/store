import Card from "../components/Card";
import { useProducts } from "../hooks/useProduct";

const HomePage = () => {
  const { filteredProducts } = useProducts();

  return <Card products={filteredProducts} />;
};
export default HomePage;
