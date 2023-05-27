import Link from "next/link";
import styles from "./styles.module.scss";
import { Typography } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__left"]}>
        <Link
          href="https://www.buymeacoffee.com/luongkienhao"
          className={styles["footer__buymeacoffee"]}
        >
          <Typography.Text style={{ fontSize: 16 }}>☕</Typography.Text>
          <Typography.Text> Buy me a coffee</Typography.Text>
        </Link>
        <Link href="https://github.com/kienhao127/some-awesome-apps">
          <GithubOutlined style={{ color: "black" }} />
        </Link>

        <Link href="https://linkedin.com/in/luongkienhao">
          <LinkedinOutlined style={{ color: "black" }} />
        </Link>
      </div>
      <div className={styles["footer__right"]}>
        <Link href={"/about"}>
          <Typography.Text>About</Typography.Text>
        </Link>
        <Typography.Text>@2023 Luong Kien Hao</Typography.Text>
      </div>
    </footer>
  );
};

export default Footer;
