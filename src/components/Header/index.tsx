import { Layout, Typography, theme } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import Login from "../Login";
import styles from "./styles.module.scss";

const DynamicLanguageSwitchButton = dynamic(
  () => import("@/components/LanguageSwitchButton"),
  { ssr: false }
);

const Header = () => {
  const { token } = theme.useToken();
  return (
    <Layout.Header className={styles["header"]}>
      <Link href={"/"}>
        <Typography.Title style={{ color: token.colorPrimary }}>
          Soawap
        </Typography.Title>
      </Link>
      <div className={styles["header__right"]}>
        <DynamicLanguageSwitchButton />
        <Login />
      </div>
    </Layout.Header>
  );
};

export default Header;
