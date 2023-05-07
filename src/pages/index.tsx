import Head from "next/head";
import { Card, Typography } from "antd";
import { Inter } from "next/font/google";
import styles from "src/styles/Home.module.css";
import Link from "next/link";
import { blue } from "@ant-design/colors";
import useTrans from "@/hooks/useTrans";
import { useContext } from "react";
import { AppContext } from "@/context/App/Context";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { language } = useContext(AppContext);
  const trans = useTrans();
  return (
    <>
      <Head>
        <title>{trans["app.title"]}</title>
        <meta name="description" content={trans["app.title"]} />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Typography.Title style={{ textAlign: "center" }}>
          {trans["app.title"]}
        </Typography.Title>
        <Link href="/replacement-app" locale={language}>
          <Card title={trans["replacement_app"]} style={{ width: "30vw" }}>
            <Typography style={{ color: blue.primary }}>
              {trans["replacement_app_description"]}
            </Typography>
          </Card>
        </Link>
      </main>
    </>
  );
}
