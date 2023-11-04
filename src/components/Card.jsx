import { useProducts } from "../hooks/useProduct";
import PropTypes from "prop-types";
import { formatPrecio } from "../utilities/utilitys";
import { useNavigate } from "react-router-dom";

const Card = ({
  products,
  styles,
  heightImg,
  renderButton,
  renderLike,
  text,
}) => {
  const { cart } = useProducts();
  const navigate = useNavigate();

  const checkProductInCart = (product) =>
    cart.some((item) => item.id === product.id);

  return products.map((product) => {
    const isProductInCart = checkProductInCart(product);
    const { integer, decimals } = formatPrecio(product.price);

    return (
      <div
        key={product.id}
        className={`relative ${styles} rounded-xl bg-[var(--card-background-color)] bg-clip-border shadow-md max-[400px]:text-xs`}
      >
        {renderLike && renderLike(product)}
        <div
          className={`${heightImg} p-4 overflow-hidden rounded-xl `}
          onClick={() => {
            navigate("/product", { state: { product } });
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full rounded-xl object-cover hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center p-6">
          <div className={`${text} mb-2 flex items-center justify-between`}>
            <p className="font-medium leading-relaxed  truncate max-w-[200px]">
              {product.title}
            </p>
            <p className="font-bold leading-relaxed ">
              {integer}
              <sup className="">{decimals}€</sup>
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
  text: PropTypes.string,
};

export default Card;
