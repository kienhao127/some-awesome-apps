import useThemeMode from "@/hooks/useThemeMode";
import { Switch } from "antd";

const ThemeSwitchButton = () => {
  const { darkMode, toggleDarkMode } = useThemeMode();

  return (
    <Switch
      checked={darkMode}
      onChange={toggleDarkMode}
      checkedChildren={"Dark"}
      unCheckedChildren="Light"
    />
  );
};

export default ThemeSwitchButton;
