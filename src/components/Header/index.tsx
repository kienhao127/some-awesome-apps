import { Typography } from "antd";
import { blue } from "@ant-design/colors";
import styles from "./styles.module.scss";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import { SELECTED_LANGUAGE_KEY } from "@/utils/const";

const Header = () => {
  const [locale] = useLocalStorage<string>(SELECTED_LANGUAGE_KEY, "");
  return (
    <header className={styles["header"]}>
      <Link href={"/"} locale={locale}>
        <Typography.Title style={{ color: blue.primary }}>
          Soawap
        </Typography.Title>
      </Link>
    </header>
  );
};

export default Header;
