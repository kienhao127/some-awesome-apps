import Link from "next/link";
import styles from "./styles.module.scss";
import { Layout, Typography } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <Layout.Footer className={styles["footer"]}>
      <div className={styles["footer__left"]}>
        <Link
          href="https://www.buymeacoffee.com/luongkienhao"
          className={styles["footer__buymeacoffee"]}
        >
          <Typography.Text style={{ fontSize: 16 }}>☕</Typography.Text>
          <Typography.Text> Buy me a coffee</Typography.Text>
        </Link>
        <span>·</span>
        <Link href="https://github.com/kienhao127/some-awesome-apps">
          <GithubOutlined style={{ color: "black" }} />
        </Link>
        <span>·</span>
        <Link href="https://linkedin.com/in/luongkienhao">
          <LinkedinOutlined style={{ color: "black" }} />
        </Link>
      </div>
      <div className={styles["footer__right"]}>
        <Link href={"/about"}>
          <Typography.Text>About</Typography.Text>
        </Link>
        <span>·</span>
        <Typography.Text>
          Luong Kien Hao © {new Date().getFullYear()}
        </Typography.Text>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
