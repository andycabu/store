import Card from "../components/Card";
import { useProducts } from "../hooks/useProduct";

const FavoritePage = () => {
  const { favorites } = useProducts();

  return <Card products={favorites} />;
};
export default FavoritePage;
