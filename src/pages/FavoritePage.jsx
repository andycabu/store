import Card from "../components/Card";
import { useProducts } from "../hooks/useProduct";

const FavoritePage = () => {
  const { favorites } = useProducts();

  return favorites.length === 0 ? (
    <div className="flex justify-center items-center ">
      <h1 className="font-bold text-5xl pt-8">
        There are no favorite products
      </h1>
    </div>
  ) : (
    <Card products={favorites} />
  );
};
export default FavoritePage;
