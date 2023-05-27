import { Typography } from "antd";
import { blue } from "@ant-design/colors";
import styles from "./styles.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicLanguageSwitchButton = dynamic(
  () => import("@/components/LanguageSwitchButton"),
  { ssr: false }
);

const Header = () => {
  return (
    <header className={styles["header"]}>
      <Link href={"/"}>
        <Typography.Title style={{ color: blue.primary }}>
          Soawap
        </Typography.Title>
      </Link>
      <DynamicLanguageSwitchButton />
    </header>
  );
};

export default Header;
