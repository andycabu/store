const Button = ({ onClick, hover, background, text, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`${background ? background : "bg-blue-500"} ${
        hover ? hover : "hover:bg-blue-600"
      } text-white rounded py-2 px-4  w-full flex items-center justify-center gap-4  transition-all hover:scale-105 duration-300`}
    >
      {text} {icon}
    </button>
  );
};
export default Button;
