import { CloseIcon, HeartIcon, MenuIcon, UserIcon } from "./Icon";
import Cart from "./Cart";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useScreenWidth } from "../hooks/useScreenWidth";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const screenWidth = useScreenWidth();

  const itemsNabar = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      text: "Category",
    },
    {
      id: 3,
      text: "Contact us",
    },
  ];
  useEffect(() => {
    if (screenWidth > 1024) {
      setOpen(false);
    }
  }, [screenWidth]);

  function openMenu() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  return (
    <header>
      <nav className="flex fixed z-10 w-full justify-between bg-[var(--card-background-color)] box-shadow-1">
        <div className="px-12 py-5 flex w-full items-center justify-between">
          <a className="text-3xl font-bold font-heading" href="#">
            <img className="h-12 rounded-full" src={logo} alt="" />
          </a>
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            {itemsNabar.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className=" cursor-pointer hover:text-[var(--text-color-hover)]   "
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex   space-x-5 items-center ">
            <div className="flex  space-x-5 items-center">
              <Link
                to="/favorites"
                className="hover:text-[var(--text-color-hover)] "
                href="#"
              >
                <HeartIcon className={"h-6 w-6"} />
              </Link>
              <a className="hover:text-[var(--text-color-hover)] " href="#">
                <UserIcon />
              </a>
            </div>
            <div className="flex items-center hover:text-[var(--text-color-hover)] ">
              <Cart />
            </div>
          </div>
        </div>

        <div
          onClick={openMenu}
          className="navbar-burger self-center mr-12 md:hidden hover:text-[var(--text-color-hover)] "
        >
          <MenuIcon />
        </div>
        <aside
          className={`${
            open ? "left-0" : "-left-1/2 max-[480px]:-left-full"
          } flex flex-col gap-2 bg-[var(--card-background-color)] max-[480px]:w-full z-10  p-8 fixed  top-0 w-1/2 h-full overflow-auto transition-all duration-500`}
        >
          <div onClick={openMenu}>
            <CloseIcon className={"h-5 w-5 hover:cursor-pointer"} />
          </div>

          <ul className="flex flex-col h-full items-center justify-center gap-8">
            {itemsNabar.map((item) => (
              <li key={item.id} className="border-b border-solid border-[#444]">
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </nav>
    </header>
  );
};
export default Navbar;
