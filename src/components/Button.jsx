import PropTypes from "prop-types";

const Button = ({ onClick, background, text, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded py-2 px-4  flex items-center justify-center gap-4  transition-all hover:scale-105 duration-300 ${
        background ? background : "bg-blue-500 hover:bg-blue-600 "
      } text-white`}
    >
      {text} {icon}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  background: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.any,
};
export default Button;
