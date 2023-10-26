import { useEffect, useState } from "react";

function DayNight() {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <label className="day-night z-50">
      <input onClick={changeTheme} type="checkbox" />
      <div></div>
    </label>
  );
}

export default DayNight;
