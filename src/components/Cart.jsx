import { useEffect, useState } from "react";
import { AddIcon, ClearCartIcon, CloseIcon, SubtractIcon } from "./Icon";
import { useProducts } from "../hooks/useProduct";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const [check, setCheck] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { cart, removeFromCart, addToCart, subtractToCart } = useProducts();

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
    const calculateTotalItems = (items) => {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    };

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
          check ? "right-0" : "-right-1/2 max-[480px]:-right-full"
        } flex flex-col gap-2 bg-[var(--card-background-color)] max-[480px]:w-full z-10  p-8 fixed  top-0 w-1/2 h-full overflow-auto transition-all duration-500`}
      >
        <div onClick={changeCheck}>
          <CloseIcon className={"h-5 w-5 hover:cursor-pointer"} />
        </div>

        <ul className="flex flex-col gap-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="border-y flex p-4 gap-4 justify-center items-center border-solid shadow-md border-[#444] bg-[var(--background-color)]"
            >
              <div>
                <img
                  className="aspect-video w-full object-cover"
                  src={item.image}
                  alt=""
                />
              </div>
              <div>
                <strong>{item.title}</strong> - €{item.price}
                <div className="flex gap-2 justify-center items-center">
                  <div className=" flex">
                    <button
                      onClick={() => subtractToCart(item)}
                      className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50  px-2 py-1 border-r border-gray-200"
                    >
                      <SubtractIcon />
                    </button>
                    <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100  px-4 py-1 select-none">
                      <small>{item.quantity}</small>
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
                </div>
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
