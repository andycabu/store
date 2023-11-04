import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function DayNight({ position }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  function changeTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <label className={`day-night z-10 ${position}`}>
      <input onClick={changeTheme} type="checkbox" checked={theme === "dark"} />
      <div></div>
    </label>
  );
}
DayNight.propTypes = {
  position: PropTypes.string,
};

export default DayNight;
