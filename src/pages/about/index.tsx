import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { DEFAULT_LANGUAGE } from "@/utils/const";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { Typography } from "antd";
import styles from "./styles.module.scss";

const About = () => {
  const { t: tAbout } = useTranslation("about");
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t("about")} | ${t("app.title")}`}</title>
        <meta name="description" />
        <meta name="keywords" content="about" />
      </Head>
      <section>
        <div className={styles["about"]}>
          <Typography.Title level={1} className={styles["about__title"]}>
            {tAbout("about")}
          </Typography.Title>
          <Typography.Text>{tAbout("about_content")}</Typography.Text>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || DEFAULT_LANGUAGE, [
        "about",
        "common",
      ])),
    },
  };
};

export default About;
