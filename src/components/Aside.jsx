import PropTypes from "prop-types";
import { CloseIcon } from "./Icon";
import { useAside } from "../hooks/useAside";

const Aside = ({ children, id }) => {
  const { openAside, toggleAside } = useAside();

  const isOpen = id === openAside;

  return (
    <aside
      className={`${
        isOpen ? "left-0" : "-left-full"
      } flex flex-col gap-2 bg-[var(--card-background-color)] w-full md:w-[600px] z-[102] p-8 fixed top-0 h-full overflow-auto transition-all duration-500 `}
    >
      <div onClick={toggleAside}>
        <CloseIcon className={"h-5 w-5 hover:cursor-pointer"} />
      </div>
      {children}
    </aside>
  );
};
Aside.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};
export default Aside;
