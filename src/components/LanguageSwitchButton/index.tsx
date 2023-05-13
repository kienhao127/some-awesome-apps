import { Select } from "antd";
import { useRouter } from "next/router";
const { Option } = Select;

const LanguageSwitchButton = () => {
  const router = useRouter();

  const handleLanguageChange = (newLanguage: string) => {
    router.push(router.route, router.asPath, {
      locale: newLanguage,
    });
  };

  return (
    <Select
      defaultValue={router.locale}
      onChange={handleLanguageChange}
      style={{ width: "110px" }}
    >
      <Option value="en">English</Option>
      <Option value="vi">Tiếng Việt</Option>
    </Select>
  );
};

export default LanguageSwitchButton;
