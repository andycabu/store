import Card from "../components/Card";
import { useProducts } from "../hooks/useProduct";

const HomePage = () => {
  const { filteredProducts } = useProducts();

  return (
    <div className="grid justify-items-center justify-center grid-cols-auto-fit-minmax gap-6 p-8">
      <Card
        heightImg={"h-96"}
        styles={"w-96 flex-col"}
        products={filteredProducts}
      />
    </div>
  );
};
export default HomePage;
