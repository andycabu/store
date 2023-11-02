import Card from "../components/Card";
import { useProducts } from "../hooks/useProduct";

const FavoritePage = () => {
  const { filteredProductsFav } = useProducts();

  return filteredProductsFav.length === 0 ? (
    <div className="flex justify-center items-center ">
      <h1 className="font-bold text-5xl pt-8">
        There are no favorite products
      </h1>
    </div>
  ) : (
    <div className="grid justify-items-center grid-cols-auto-fit-minmax gap-6 p-8 ">
      <Card
        heightImg={"h-96"}
        styles={"w-96 flex-col"}
        products={filteredProductsFav}
      />
    </div>
  );
};
export default FavoritePage;
