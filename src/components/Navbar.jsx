import { HeartIcon, MenuIcon, UserIcon } from "./Icon";
import Cart from "./Cart";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
  return (
    <header>
      <nav className="flex fixed z-10 w-full justify-between bg-[var(--card-background-color)] box-shadow-1">
        <div className="px-5 xl:px-12 py-5 flex w-full items-center">
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
          <div className="flex  space-x-5 items-center ">
            <div className="hidden lg:flex  space-x-5 items-center">
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

        <a
          className="navbar-burger self-center mr-12 xl:hidden hover:text-[var(--text-color-hover)] "
          href="#"
        >
          <MenuIcon />
        </a>
      </nav>
    </header>
  );
};
export default Navbar;
