import { HeartIcon, MenuIcon, UserIcon } from "./Icon";
import Cart from "./Cart";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const itemsNabar = [
    {
      id: 1,
      text: "Home",
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
      <nav className="flex fixed z-10 w-full justify-between bg-[var(--card-background-color)] text-[var(--text-color)]  box-shadow-1">
        <div className="px-5 xl:px-12 py-5 flex w-full items-center">
          <a className="text-3xl font-bold font-heading" href="#">
            <img className="h-12 rounded-full" src={logo} alt="" />
          </a>
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            {itemsNabar.map((item) => (
              <li key={item.id}>
                <a className=" cursor-pointer ">{item.text}</a>
              </li>
            ))}
          </ul>

          <div className="flex  space-x-5 items-center">
            <div className="hidden lg:flex  space-x-5 items-center">
              <a href="#">
                <HeartIcon className={"h-6 w-6"} />
              </a>
              <a className="flex items-center " href="#">
                <UserIcon />
              </a>
            </div>
            <div className="flex items-center ">
              <Cart />
            </div>
          </div>
        </div>

        <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
          <MenuIcon />
        </a>
      </nav>
    </header>
  );
};
export default Navbar;
