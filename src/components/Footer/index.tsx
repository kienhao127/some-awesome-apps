import Link from "next/link";
import styles from "./styles.module.scss";
import { Layout, Typography, theme } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import ThemeSwitchButton, {
  ThemeSwitchButtonProps,
} from "../ThemeSwitchButton";

type FooterProps = ThemeSwitchButtonProps;

const Footer = (props: FooterProps) => {
  const { token } = theme.useToken();

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
          <GithubOutlined style={{ color: token.colorPrimary }} />
        </Link>
        <span>·</span>
        <Link href="https://linkedin.com/in/luongkienhao">
          <LinkedinOutlined style={{ color: token.colorPrimary }} />
        </Link>
      </div>
      <div className={styles["footer__right"]}>
        {/* TODO: Theme Mode in SSR */}
        <div style={{ display: "none" }}>
          <ThemeSwitchButton {...props} />
          <span>·</span>
        </div>
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
