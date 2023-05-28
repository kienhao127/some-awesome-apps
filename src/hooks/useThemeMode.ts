import { ThemeContext } from "@/context/ThemContext";
import { useContext } from "react";

const useThemeMode = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return { darkMode, toggleDarkMode };
};

export default useThemeMode;
