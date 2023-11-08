import { useLocation } from "react-router-dom";
import { formatPrecio } from "../utilities/utilitys";
import Button from "./Button";
import { useProducts } from "../hooks/useProduct";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";
import Like from "./Like";
import useFavorites from "../hooks/useFavorite";

const ItemDetailContainer = () => {
  const { state } = useLocation();
  const { product } = state;
  const { integer, decimals } = formatPrecio(product.price);
  const { removeFromCart, addToCart, checkProductInCart } = useProducts();
  const { toggleFavorite, likedProducts } = useFavorites();

  const isProductInCart = checkProductInCart(product);

  return (
    <div className="max-[1500px]:px-4 max-[1500px]:pb-4 flex justify-center ">
      <div onClick={() => toggleFavorite(product)}>
        <Like checked={likedProducts[product.id]} />
      </div>
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
            <Button
              onClick={() =>
                isProductInCart ? removeFromCart(product) : addToCart(product)
              }
              background={isProductInCart ? "bg-red-500 hover:bg-red-600" : ""}
              text={isProductInCart ? "Remove from cart" : "Add to cart"}
              icon={
                isProductInCart ? (
                  <RemoveFromCartIcon className={"h-6 w-6"} />
                ) : (
                  <AddToCartIcon className={"h-6 w-6 "} />
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
