import Button from "../components/Button";
import Card from "../components/Card";
import Like from "../components/Like";
import PropTypes from "prop-types";
import { AddToCartIcon, RemoveFromCartIcon } from "../components/Icon";
import { useProducts } from "../hooks/useProduct";
import useFavorites from "../hooks/useFavorite";
import Filters from "../components/Filters";

const HomePage = ({ favorites }) => {
  const { filteredProducts, removeFromCart, addToCart } = useProducts();
  const { likedProducts, toggleFavorite } = useFavorites();

  const renderButton = (product, isProductInCart) => (
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
  );
  const renderLike = (product) => (
    <div onClick={() => toggleFavorite(product)}>
      <Like checked={likedProducts[product.id]} />
    </div>
  );

  return (
    <>
      <Filters />
      <div className="grid justify-items-center justify-center grid-cols-auto-fit-minmax gap-6 p-8">
        <Card
          heightAndWidthImg={"h-96"}
          styles={"w-96 max-[400px]:w-72 flex-col"}
          products={favorites ? favorites : filteredProducts}
          renderButton={renderButton}
          renderLike={renderLike}
        />
      </div>
    </>
  );
};
HomePage.propTypes = {
  favorites: PropTypes.any,
};
export default HomePage;
