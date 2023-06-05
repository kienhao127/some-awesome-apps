import { Layout, theme } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import Login from '@/components/Login';

const DynamicLanguageSwitchButton = dynamic(
  () => import("@/components/LanguageSwitchButton"),
  { ssr: false }
);

const Header = () => {
  const { token } = theme.useToken();
  return (
    <Layout.Header className={styles["header"]}>
      <Link href={"/"} style={{ height: "60px" }}>
        <Image
          alt="logo"
          src={"/logo.png"}
          width={100}
          height={60}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </Link>
      <div className={styles["header__right"]}>
        <DynamicLanguageSwitchButton />
        <Login />
      </div>
    </Layout.Header>
  );
};

export default Header;
