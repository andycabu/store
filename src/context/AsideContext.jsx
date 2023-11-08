import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useScreenWidth } from "../hooks/useScreenWidth";

export const AsideContext = createContext();

export const AsideProvider = ({ children }) => {
  const [openAside, setOpenAside] = useState(null);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (openAside) {
      document.body.style.overflow = "";
      setOpenAside();
    }
  }, [screenWidth]);

  const toggleAside = (asideId) => {
    if (openAside) {
      document.body.style.overflow = "";
      setOpenAside(false);
    } else {
      document.body.style.overflow = "hidden";
      setOpenAside(asideId);
    }
  };

  return (
    <AsideContext.Provider value={{ openAside, toggleAside }}>
      {children}
    </AsideContext.Provider>
  );
};

AsideProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
