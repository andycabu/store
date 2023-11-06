import { useEffect, useState } from "react";
import { AddIcon, ClearCartIcon, CloseIcon, SubtractIcon } from "./Icon";
import { useProducts } from "../hooks/useProduct";
import Button from "./Button";
import Card from "./Card";
import { formatPrecio } from "../utilities/utilitys";
import { useScreenWidth } from "../hooks/useScreenWidth";
import Aside from "./Aside";

const Cart = () => {
  const [check, setCheck] = useState(false);
  const {
    cart,
    removeFromCart,
    addToCart,
    subtractToCart,
    clearCart,
    totalPrice,
    cartCount,
  } = useProducts();
  const screenWidth = useScreenWidth();
  const { integer, decimals } = formatPrecio(totalPrice);

  const changeCheck = () => {
    if (check) {
      document.body.style.overflow = "";
      setCheck(false);
    } else {
      document.body.style.overflow = "hidden";
      setCheck(true);
    }
  };

  useEffect(() => {
    if (check) {
      document.body.style.overflow = "";
      setCheck(false);
    }
  }, [screenWidth]);

  return (
    <Aside
      className={`${
        check ? "right-0" : "-right-[504px] max-md:w-full  max-md:-right-full"
      } `}
    >
      <div onClick={changeCheck}>
        <CloseIcon className={"h-5 w-5 hover:cursor-pointer"} />
      </div>
      {cart.length >= 1 && (
        <div>
          <div className="flex flex-col">
            <p className="flex gap-4 pt-4">
              Subtotal
              <span className="font-bold">
                {integer}
                <sup className="">{decimals}€</sup>
              </span>
            </p>
            <Button
              background={"bg-[#FFD814] hover:bg-[#F7CA00]"}
              text={`Checkout (${cartCount} ${
                cartCount > 1 ? "products" : "product"
              })`}
            />
          </div>
          <div className="flex flex-col gap-4 border-y border-solid border-[#444] py-8 my-4 ">
            <Card
              heightAndWidthImg={"h-40  w-80  max-[490px]:h-48 "}
              styles={
                "flex w-full max-[400px]:flex-col max-[400px]:items-center"
              }
              products={cart}
              renderButton={(product) => (
                <div className="flex gap-4 max-[490px]:flex-col">
                  <div className="flex gap-1">
                    {product.quantity === 1 ? (
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
                      <small>{product.quantity}</small>
                    </div>
                    <Button
                      icon={<AddIcon />}
                      onClick={() => addToCart(product)}
                    />
                  </div>
                  {product.quantity > 1 && (
                    <Button
                      onClick={() => removeFromCart(product)}
                      background={"bg-red-500 hover:bg-red-600"}
                      icon={<ClearCartIcon className={"h-6 w-6 "} />}
                    />
                  )}
                </div>
              )}
              text={"flex-col"}
            />
          </div>
        </div>
      )}
      {cart.length === 0 ? (
        <span className="flex items-center justify-center h-full">
          There are no products in the cart
        </span>
      ) : (
        <Button
          background={"bg-red-500 hover:bg-red-600 "}
          onClick={() => {
            clearCart();
          }}
          text={"Remove all"}
          icon={<ClearCartIcon className={"h-6 w-6 "} />}
        />
      )}
    </Aside>
  );
};
export default Cart;
