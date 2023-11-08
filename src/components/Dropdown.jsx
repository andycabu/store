import { useState } from "react";
import { ArrowIcon } from "./Icon";
import { useProducts } from "../hooks/useProduct";

const Dropdown = () => {
  const { setFilters } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all categories");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    handleChangeCategory(category);
    setSelectedCategory(category);
    setIsOpen(false);
  };
  const handleChangeCategory = (category) => {
    setFilters((prevState) => ({
      ...prevState,
      category,
    }));
  };

  const allCategories = [
    "all categories",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const dropdownItems = allCategories
    .filter((category) => category !== selectedCategory)
    .map((category, index) => ({ id: index, text: category }));

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="text-left bg-transparent ml-4"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleClick}
      >
        <span>{selectedCategory}</span>
        <ArrowIcon
          className={`w-8 h-8 pr-2 cursor-pointer inline-block ${
            isOpen && "rotate-180"
          } transition-all duration-300`}
        />
      </button>
      <ul
        className={`${
          isOpen ? "max-h-60 py-4" : "max-h-0 py-0 "
        } absolute max-md:static w-max bg-[var(--background-color)] text-base z-50 rounded shadow max-md:my-0 mt-12 transition-all text-center duration-500 overflow-hidden`}
        tabIndex="-1"
        role="listbox"
      >
        {dropdownItems.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer hover:bg-[var(--card-background-color)] px-4 py-2 "
            role="option"
            onClick={() => handleSelect(item.text)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
