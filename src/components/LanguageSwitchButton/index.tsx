import { Select } from "antd";
import { useContext } from "react";
import { AppContext } from "@/context/App/Context";
const { Option } = Select;

const LanguageSwitchButton = () => {
  const { language, changeLanguage } = useContext(AppContext);

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  return (
    <Select
      defaultValue={language}
      onChange={handleLanguageChange}
      style={{ width: '110px'}}
    >
      <Option value="en">English</Option>
      <Option value="vi">Tiếng Việt</Option>
    </Select>
  );
};

export default LanguageSwitchButton;
