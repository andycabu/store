import { useState } from "react";
import { CartIcon, CloseIcon } from "./Icon";
import { useProducts } from "../hooks/useProduct";

const Cart = () => {
  const [check, setCheck] = useState(false);
  const changeCheck = () => {
    setCheck(!check);
  };
  const { cart, clearCart } = useProducts();

  return (
    <>
      <div onClick={changeCheck}>
        <CartIcon className={"h-6 w-6 hover:cursor-pointer"} />
      </div>
      <aside
        className={`${
          check ? "flex flex-col gap-2" : "hidden"
        }  bg-[var(--card-background-color)]  p-8 fixed right-0 top-0 w-72 h-full overflow-auto`}
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
                  <small>Qty: {item.quantity}</small>
                  <button>+</button>
                  <button
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear
                  </button>
                </footer>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};
export default Cart;
