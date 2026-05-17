import React, { useEffect, useState } from "react";
import ThemeContext from "../Theme/ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");

    try {
      return storedTheme ? JSON.parse(storedTheme) : false;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
