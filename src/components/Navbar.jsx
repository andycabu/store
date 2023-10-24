import { Cart, Heart, Menu, User } from "./Icon";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between bg-gray-900 text-white ">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <a className="text-3xl font-bold font-heading" href="#">
            Bytefood
          </a>

          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <a className="hover:text-gray-200" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-200" href="#">
                Catagory
              </a>
            </li>

            <li>
              <a className="hover:text-gray-200" href="#">
                Contact Us
              </a>
            </li>
          </ul>

          <div className="hidden xl:flex  space-x-5 items-center">
            <a className="hover:text-gray-200" href="#">
              <Heart className={"h-6 w-6"} />
            </a>
            <a className="flex items-center hover:text-gray-200" href="#">
              <Cart />
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative  rounded-full h-5 w-5 bg-pink-500 text-center text-xs">
                  2
                </span>
              </span>
            </a>

            <a className="flex items-center hover:text-gray-200" href="#">
              <User />
            </a>
          </div>
        </div>

        <a className="xl:hidden flex mr-6 items-center" href="#">
          <Cart />
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </a>
        <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
          <Menu />
        </a>
      </nav>
    </header>
  );
};
export default Navbar;
