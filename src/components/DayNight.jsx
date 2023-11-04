import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme";

function DayNight({ position }) {
  const { changeTheme, theme } = useTheme();

  const handleToggle = () => {
    changeTheme(); //
  };

  return (
    <label className={`day-night z-10 ${position}`}>
      <input
        onChange={handleToggle}
        type="checkbox"
        checked={theme === "dark"}
      />
      <div></div>
    </label>
  );
}

DayNight.propTypes = {
  position: PropTypes.string,
};

export default DayNight;
