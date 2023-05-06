import { Typography } from "antd";
import { blue } from "@ant-design/colors";
import styles from "./styles.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { AppContext } from "@/context/App/Context";

const DynamicLanguageSwitchButton = dynamic(
  () => import("@/components/LanguageSwitchButton"),
  { ssr: false }
);

const Header = () => {
  const { language } = useContext(AppContext);

  return (
    <header className={styles["header"]}>
      <Link href={"/"} locale={language}>
        <Typography.Title style={{ color: blue.primary }}>
          Soawap
        </Typography.Title>
      </Link>
      <DynamicLanguageSwitchButton />
    </header>
  );
};

export default Header;
