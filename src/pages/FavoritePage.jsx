import { useProducts } from "../hooks/useProduct";
import ItemListContainer from "../components/ItemListContainer";

const FavoritePage = () => {
  const { filteredProductsFav } = useProducts();

  return filteredProductsFav.length === 0 ? (
    <div className="flex justify-center items-center ">
      <h1 className="font-bold text-5xl pt-8">
        There are no favorite products
      </h1>
    </div>
  ) : (
    <ItemListContainer favorites={filteredProductsFav} />
  );
};
export default FavoritePage;
