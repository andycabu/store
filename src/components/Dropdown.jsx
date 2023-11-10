import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./Icon";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    {
      id: 1,
      text: "electronics",
    },
    {
      id: 2,
      text: "jewelery",
    },
    {
      id: 3,
      text: "men's clothing",
    },
    {
      id: 4,
      text: "women's clothing",
    },
  ];

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <button
        className="text-left bg-transparent ml-4"
        onClick={handleClick}
        ref={buttonRef}
      >
        <span>Categories</span>
        <ArrowIcon
          className={`w-8 h-8 pr-2 cursor-pointer inline-block ${
            isOpen && "rotate-180"
          } transition-all duration-300`}
        />
      </button>
      <ul
        className={`dropdown-menu ${
          isOpen
            ? "max-h-60 py-4 overflow-visible"
            : "max-h-0 py-0  overflow-hidden"
        } absolute max-md:static w-max bg-[var(--background-color)] text-base z-50 rounded shadow max-md:my-0 mt-12 transition-all text-center duration-500 `}
      >
        {dropdownItems.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer hover:bg-[var(--card-background-color)] px-4 py-2"
          >
            <Link
              onClick={handleClick}
              to={`/category/${item.text}`}
              state={{ category: item.text }}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
