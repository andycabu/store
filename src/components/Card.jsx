import { useProducts } from "../hooks/useProduct";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";

import PropTypes from "prop-types";
import Like from "./Like";
import { useState } from "react";
import Button from "./Button";
const Card = ({ products, styles, heightImg }) => {
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

  return products.map((product) => {
    const isProdductInCart = checkProductInCart(product);
    return (
      <div
        key={product.id}
        className={`relative ${styles}  rounded-xl bg-[var(--card-background-color)] bg-clip-border  shadow-md  max-[400px]:text-xs`}
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
        <div className={`${heightImg} p-4 overflow-hidden rounded-xl`}>
          <img src={product.image} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-medium leading-relaxed text-blue-gray-900 antialiased truncate max-w-[200px]  ">
              {product.title}
            </p>
            <p className="font-medium leading-relaxed text-blue-gray-900 antialiased">
              €{product.price}
            </p>
          </div>
          <div>
            <Button
              onClick={() =>
                isProdductInCart ? removeFromCart(product) : addToCart(product)
              }
              background={isProdductInCart && "bg-red-500 hover:bg-red-600 "}
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
  });
};

Card.propTypes = {
  products: PropTypes.array.isRequired,
};
export default Card;
