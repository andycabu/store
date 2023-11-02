import { useEffect, useState } from "react";
import { AddIcon, ClearCartIcon, CloseIcon, SubtractIcon } from "./Icon";
import { useProducts } from "../hooks/useProduct";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import Card from "./Card";
import { formatPrecio } from "../utilities/utilitys";

const Cart = () => {
  const [check, setCheck] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, removeFromCart, addToCart, subtractToCart, clearCart } =
    useProducts();

  const changeCheck = () => {
    if (check) {
      document.body.style.overflow = "";
      setCheck(false);
    } else {
      document.body.style.overflow = "hidden";
      setCheck(true);
    }
  };

  const { integer, decimals } = formatPrecio(totalPrice);

  useEffect(() => {
    const calculateTotalItems = (items) => {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    };

    const calculateTotalPrice = (items) => {
      return items.reduce((sum, item) => sum + item.price, 0);
    };
    const totalPrice = calculateTotalPrice(cart);
    setTotalPrice(totalPrice);

    const totalItems = calculateTotalItems(cart);
    setCartCount(totalItems);
  }, [cart]);

  return (
    <>
      <div className="relative cursor-pointer" onClick={changeCheck}>
        <FaShoppingCart className={"h-6 w-6 "} />
        {cartCount > 0 && (
          <span className="absolute -top-[10px] -right-[10px] bg-red-500 text-white rounded-[50%] w-[15px] h-[15px] flex justify-center items-center text-[10px] p-1">
            {cartCount}
          </span>
        )}
      </div>

      <aside
        className={`${
          check ? "right-0" : "-right-[504px] max-md:-right-full"
        } flex flex-col gap-2 bg-[var(--card-background-color)]  max-md:w-full  z-10  p-8 fixed  top-0 w-[504px] h-full overflow-auto transition-all duration-500`}
      >
        <div onClick={changeCheck}>
          <CloseIcon className={"h-5 w-5 hover:cursor-pointer"} />
        </div>
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
            heightImg={"h-40 max-[400px]:h-20"}
            styles={"flex w-full"}
            products={cart}
            renderButton={(product) => (
              <div className="flex gap-4 max-[490px]:flex-col">
                <div className="flex">
                  <Button
                    icon={<SubtractIcon />}
                    onClick={() => subtractToCart(product)}
                    background={
                      "bg-white text-gray-600 hover:bg-gray-100 border border-r border-gray-200"
                    }
                  />

                  <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100  px-4 py-1 select-none">
                    <small>{product.quantity}</small>
                  </div>
                  <Button
                    icon={<AddIcon />}
                    onClick={() => addToCart(product)}
                    background={
                      "bg-white text-gray-600 hover:bg-gray-100 border border-r border-gray-200"
                    }
                  />
                </div>
                <Button
                  onClick={() => removeFromCart(product)}
                  background={"bg-red-500 hover:bg-red-600"}
                  icon={<ClearCartIcon className={"h-6 w-6 "} />}
                />
              </div>
            )}
            text={"flex-col"}
          />
        </div>
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
      </aside>
    </>
  );
};
export default Cart;
