import { useProducts } from "../hooks/useProduct";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";

import PropTypes from "prop-types";
import Like from "./Like";
import { useState } from "react";
import Button from "./Button";
const Card = ({ products }) => {
  const { addToCart, cart, removeFromCart, addToFavorite } = useProducts();
  const [likedProducts, setLikedProducts] = useState(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return favoritesFromStorage.reduce((acc, product) => {
      acc[product.id] = true;
      return acc;
    }, {});
  });
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <div className="grid grid-cols-3 justify-items-center max-lg:grid-cols-2 max-[840px]:grid-cols-1 gap-6 p-8">
      {products.map((product) => {
        const isProdductInCart = checkProductInCart(product);
        return (
          <div
            key={product.id}
            className="relative flex w-96 flex-col rounded-xl bg-[var(--card-background-color)] bg-clip-border  shadow-md"
          >
            <div
              onClick={() => {
                const isAlreadyFavorite = likedProducts[product.id];
                setLikedProducts((prev) => ({
                  ...prev,
                  [product.id]: !isAlreadyFavorite,
                }));
                addToFavorite(product);
              }}
            >
              <Like checked={likedProducts[product.id]} />
            </div>
            <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
              <img src={product.image} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-between h-[55%] p-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                    {product.title}
                  </p>
                  <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                    €{product.price}
                  </p>
                </div>
                <p className="block font-sans text-sm font-normal leading-normal antialiased opacity-75">
                  {product.description}
                </p>
              </div>
              <div>
                <Button
                  onClick={() =>
                    isProdductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }
                  background={isProdductInCart && "bg-red-500 "}
                  hover={"hover:bg-red-600"}
                  text={isProdductInCart ? "Remove from cart" : "Add to cart"}
                  icon={
                    isProdductInCart ? (
                      <RemoveFromCartIcon className={"h-6 w-6"} />
                    ) : (
                      <AddToCartIcon className={"h-6 w-6 "} />
                    )
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Card.propTypes = {
  products: PropTypes.array.isRequired,
};
export default Card;
