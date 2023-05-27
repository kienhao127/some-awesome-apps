import React from "react";
import { Switch } from "antd";

export interface ThemeSwitchButtonProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const ThemeSwitchButton = (props: ThemeSwitchButtonProps) => {
  return (
    <Switch
      checked={props.darkMode}
      onChange={props.setDarkMode}
      checkedChildren="Dark"
      unCheckedChildren="Light"
    />
  );
};

export default ThemeSwitchButton;
