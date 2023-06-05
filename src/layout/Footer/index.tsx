import useThemeMode from "@/hooks/useThemeMode";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Layout, Typography, theme } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import ThemeSwitchButton from '@/components/ThemeSwitchButton';

const Footer = () => {
  const { token } = theme.useToken();
  const { darkMode } = useThemeMode();
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Layout.Footer className={styles["footer"]}>
      <div className={styles["footer__left"]}>
        <Link
          href="https://www.buymeacoffee.com/luongkienhao"
          className={styles["footer__buymeacoffee"]}
          target="_blank"
        >
          <Typography.Text style={{ fontSize: 16 }}>☕</Typography.Text>
          <Typography.Text> Buy me a coffee</Typography.Text>
        </Link>
        <span>·</span>
        <Link
          href="https://github.com/kienhao127/some-awesome-apps"
          target="_blank"
        >
          <GithubOutlined
            style={{ color: darkMode ? token.colorPrimary : "#000000" }}
          />
        </Link>
        <span>·</span>
        <Link href="https://linkedin.com/in/luongkienhao" target="_blank">
          <LinkedinOutlined
            style={{ color: darkMode ? token.colorPrimary : "#000000" }}
          />
        </Link>
      </div>
      <div className={styles["footer__right"]}>
        <ThemeSwitchButton />
        <span>·</span>
        <Link href={"/about"}>
          <Typography.Text>{t("about")}</Typography.Text>
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
