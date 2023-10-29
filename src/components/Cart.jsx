import { useState } from "react";
import {
  AddIcon,
  CartIcon,
  ClearCartIcon,
  CloseIcon,
  SubtractIcon,
} from "./Icon";
import { useProducts } from "../hooks/useProduct";

const Cart = () => {
  const [check, setCheck] = useState(false);
  const changeCheck = () => {
    if (check) {
      document.body.style.overflow = "";
      setCheck(false);
    } else {
      document.body.style.overflow = "hidden";
      setCheck(true);
    }
  };
  const { cart, removeFromCart, addToCart, subtractToCart } = useProducts();

  return (
    <>
      <div onClick={changeCheck}>
        <CartIcon className={"h-6 w-6 hover:cursor-pointer"} />
      </div>

      <aside
        className={`${
          check ? "right-0" : "-right-1/2 max-[425px]:-right-full"
        } flex flex-col gap-2 bg-[var(--card-background-color)] max-[425px]:w-full z-10  p-8 fixed  top-0 w-1/2 h-full overflow-auto transition-all duration-500`}
      >
        <div onClick={changeCheck}>
          <CloseIcon className={"h-5 w-5 hover:cursor-pointer"} />
        </div>

        <ul className="flex flex-col gap-4">
          {cart.map((item) => (
            <li key={item.id} className="border-b border-solid border-[#444]">
              <img
                className="aspect-video w-full object-cover"
                src={item.image}
                alt=""
              />
              <div>
                <strong>{item.title}</strong> - €{item.price}
                <footer className="flex gap-2 justify-center items-center">
                  <div className=" flex">
                    <button
                      onClick={() => subtractToCart(item)}
                      className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50  px-2 py-1 border-r border-gray-200"
                    >
                      <SubtractIcon />
                    </button>
                    <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100  px-4 py-1 select-none">
                      <small>Qty: {item.quantity}</small>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50  px-2 py-1 border-r border-gray-200"
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item);
                    }}
                  >
                    <ClearCartIcon className={"h-6 w-6 "} />
                  </button>
                </footer>
              </div>
            </li>
          ))}
        </ul>
        {cart.length === 0 ? (
          <span className="flex items-center justify-center h-full">
            There are no products in the cart
          </span>
        ) : (
          <div className="flex gap-4 items-center justify-center pt-4">
            <span>Remove all</span>
            <ClearCartIcon className={"h-6 w-6 "} />
          </div>
        )}
      </aside>
    </>
  );
};
export default Cart;
