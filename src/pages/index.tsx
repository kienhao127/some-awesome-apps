import { App, Response } from "@/models";
import styles from "@/styles/app.module.scss";
import { API_DOMAIN, DEFAULT_LANGUAGE } from "@/utils/const";
import { blue } from "@ant-design/colors";
import { Card, Typography } from "antd";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
// Static Side Render
const Home: NextPage<Response<App[]>> = ({ data }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content={t("app.title") || ""} />

        <meta property="og:title" content={t("app.title") || ""} />
        <meta property="og:description" content={t("app.title") || ""} />
      </Head>

      <Typography.Title style={{ textAlign: "center" }}>
        {t("app.title")}
      </Typography.Title>
      <div className={styles["app-card-container"]}>
        {data.map((item) => {
          return (
            <Link href={item.path} key={item.id}>
              <Card title={t(item.name)} className={styles["app-card"]}>
                <Typography style={{ color: blue.primary }}>
                  {t(item.description)}
                </Typography>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const res = await fetch(`${API_DOMAIN}/api/apps`, {
      method: "GET",
      headers: {
        "Accept-Language": locale || DEFAULT_LANGUAGE,
      },
    });
    const resp: Response<App[]> = await res.json();

    return {
      props: {
        ...resp,
        ...(await serverSideTranslations(locale || DEFAULT_LANGUAGE, [
          "common",
        ])),
      },
    };
  } catch (error) {
    return {
      props: {
        error: -1,
        message: "Something went wrong",
        data: [],
        ...(await serverSideTranslations(locale || DEFAULT_LANGUAGE, [
          "common",
        ])),
      },
    };
  }
};

export default Home;
