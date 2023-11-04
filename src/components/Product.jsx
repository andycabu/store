import { useLocation } from "react-router-dom";
import Button from "./Button";
import { formatPrecio } from "../utilities/utilitys";

const Product = () => {
  const { state } = useLocation();
  const { product } = state;
  const { integer, decimals } = formatPrecio(product.price);
  return (
    <div className="fixed top-0 max-[1075px]:p-4 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] flex items-center justify-center z-[100]">
      <div className="flex max-[480px]:flex-col  rounded-xl bg-[var(--card-background-color)] bg-clip-border shadow-md max-[400px]:text-xs">
        <div className="p-4 overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.title}
            className="h-[40rem] max-lg:h-[28rem] max-sm:h-[22rem] max-[480px]:h-[30rem] w-[30rem] rounded-xl object-cover "
          />
        </div>
        <div className="flex flex-col justify-around p-6 ">
          <p className="font-bold text-xl leading-relaxed text-right">
            {integer}
            <sup className="">{decimals}€</sup>
          </p>
          <div className=" mb-2 flex flex-col items-center gap-4 max-w-[500px]">
            <h2 className="">{product.title}</h2>
            <p className="">{product.description}</p>
          </div>
          <div>
            <Button text={"prueba"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
