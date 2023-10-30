import { useProducts } from "../hooks/useProduct";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";

import PropTypes from "prop-types";
import Like from "./Like";
import { useState } from "react";
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
    <div>
      <ul className="grid grid-cols-3 max-lg:grid-cols-2 max-[480px]:grid-cols-1 gap-6 p-8">
        {products.map((product) => {
          const isProdductInCart = checkProductInCart(product);
          return (
            <li
              className="flex flex-col justify-between bg-[var(--card-background-color)] box-shadow-1"
              key={product.id}
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
              <div>
                <img
                  className="h-[22rem] w-full object-cover"
                  src={product.image}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div>
                  <strong className="text-gray-400 font-light text-xs ">
                    {product.category}
                  </strong>
                  <h2 className="">{product.title}</h2>
                  <p className="">€{product.price}</p>
                </div>

                <button
                  onClick={() =>
                    isProdductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }
                  className={`py-2 px-4 ${
                    isProdductInCart && "bg-red-500 hover:bg-red-600"
                  } bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50  w-full flex items-center justify-center gap-4`}
                >
                  {isProdductInCart ? "Remove from cart" : "Add to cart"}
                  {isProdductInCart ? (
                    <RemoveFromCartIcon className={"h-6 w-6"} />
                  ) : (
                    <AddToCartIcon className={"h-6 w-6 "} />
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Card.propTypes = {
  products: PropTypes.array.isRequired,
};
export default Card;
