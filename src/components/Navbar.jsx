import { HeartIcon, MenuIcon, UserIcon } from "./Icon";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import DayNight from "./DayNight";
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProduct";
import Aside from "./Aside";
import { useAside } from "../hooks/useAside";
import Dropdown from "./Dropdown";
import CartWidget from "./CartWidget";

const Navbar = () => {
  const { favorites, cartCount } = useProducts();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { toggleAside } = useAside();

  const itemsNabar = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      dropdown: <Dropdown />,
    },
    {
      id: 3,
      text: "Contact us",
      link: "/contact",
    },
  ];
  useEffect(() => {
    setFavoriteCount(favorites.length);
  }, [favorites]);

  return (
    <>
      <header className="relative">
        <nav className="flex fixed z-[101] w-full max-w-[1500px] justify-between bg-[var(--card-background-color)] box-shadow-1">
          <div className="max-md:hidden">
            <DayNight position={"absolute"} />
          </div>
          <div className="px-12 max-md:px-4 py-5 flex w-full items-center justify-between">
            <Link className="text-3xl font-bold font-heading" to={"/"}>
              <img className="h-12 rounded-full" src={logo} alt="" />
            </Link>
            <ul className="hidden md:flex px-4 mx-auto items-center font-semibold font-heading space-x-12">
              {itemsNabar.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className=" cursor-pointer hover:text-[var(--text-color-hover)]   "
                  >
                    {item.text}
                  </Link>
                  {item.arrow}
                  {item.dropdown}
                </li>
              ))}
            </ul>
            <div className="flex   space-x-5 items-center ">
              <div className="flex  space-x-5 items-center">
                <Link
                  to="/favorites"
                  className="hover:text-[var(--text-color-hover)]  relative"
                  href="#"
                >
                  <HeartIcon className={"h-6 w-6"} />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] bg-red-500 text-white rounded-[50%] w-[15px] h-[15px] flex justify-center items-center text-[10px] p-1">
                      {favoriteCount}
                    </span>
                  )}
                </Link>
                <a className="hover:text-[var(--text-color-hover)] max-md:hidden">
                  <UserIcon />
                </a>
              </div>
              <div
                onClick={() => toggleAside("aside2")}
                className="relative cursor-pointer"
              >
                <CartWidget />
                {cartCount > 0 && (
                  <span className="absolute -top-[10px] -right-[10px] bg-red-500 text-white rounded-[50%] w-[15px] h-[15px] flex justify-center items-center text-[10px] p-1">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={() => toggleAside("aside1")}
            className="navbar-burger self-center mr-4 md:hidden hover:text-[var(--text-color-hover)]"
          >
            <MenuIcon />
          </div>
        </nav>
      </header>
      <Aside id={"aside1"}>
        <ul className="flex flex-col h-full items-center justify-center gap-8">
          {itemsNabar.map((item) => (
            <li key={item.id} className="border-b border-solid border-[#444]">
              <Link to={item.link}>{item.text}</Link>
              {item.arrow}
              {item.dropdown}
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-8">
          <DayNight />
          <Link className="hover:text-[var(--text-color-hover)]">
            <UserIcon />
          </Link>
        </div>
      </Aside>
    </>
  );
};
export default Navbar;
