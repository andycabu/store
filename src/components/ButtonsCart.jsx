import { useProducts } from "../hooks/useProduct";
import PropTypes from "prop-types";
import Button from "./Button";
import { AddIcon, ClearCartIcon, SubtractIcon } from "./Icon";

const ButtonsCart = ({ product }) => {
  const { removeFromCart, subtractToCart, addToCart, getQuantity } =
    useProducts();
  const quantity = getQuantity(product.id);
  return (
    <div className="flex gap-1">
      {quantity === 1 ? (
        <Button
          onClick={() => removeFromCart(product)}
          background={"bg-red-500 hover:bg-red-600"}
          icon={<ClearCartIcon className={"h-6 w-6 "} />}
        />
      ) : (
        <Button
          icon={<SubtractIcon />}
          onClick={() => subtractToCart(product)}
          background={"bg-red-500 hover:bg-red-600"}
        />
      )}

      <div className="bg-[var(--background-color)] rounded  py-2 px-4     select-none">
        <small>{quantity}</small>
      </div>
      <Button icon={<AddIcon />} onClick={() => addToCart(product)} />
    </div>
  );
};
ButtonsCart.propTypes = {
  product: PropTypes.any,
};
export default ButtonsCart;
