import { useProducts } from "../hooks/useProduct";
import PropTypes from "prop-types";

const Card = ({ products, styles, heightImg, renderButton, renderLike }) => {
  const { cart } = useProducts();

  const checkProductInCart = (product) =>
    cart.some((item) => item.id === product.id);

  return products.map((product) => {
    const isProductInCart = checkProductInCart(product);

    return (
      <div
        key={product.id}
        className={`relative ${styles} rounded-xl bg-[var(--card-background-color)] bg-clip-border shadow-md max-[400px]:text-xs`}
      >
        {renderLike && renderLike(product)}
        <div className={`${heightImg} p-4 overflow-hidden rounded-xl`}>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-medium leading-relaxed text-blue-gray-900 antialiased truncate max-w-[200px]">
              {product.title}
            </p>
            <p className="font-medium leading-relaxed text-blue-gray-900 antialiased">
              €{product.price}
            </p>
          </div>
          <div>{renderButton && renderButton(product, isProductInCart)}</div>
        </div>
      </div>
    );
  });
};

Card.propTypes = {
  products: PropTypes.array.isRequired,
  styles: PropTypes.string,
  heightImg: PropTypes.string,
  renderButton: PropTypes.func,
  renderLike: PropTypes.func,
};

export default Card;
