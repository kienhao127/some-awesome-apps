import Head from "next/head";
import { Card, Typography } from "antd";
import Link from "next/link";
import { blue } from "@ant-design/colors";
import useTrans from "@/hooks/useTrans";
import { useContext } from "react";
import { AppContext } from "@/context/App/Context";
import styles from '@/styles/Home.module.css';

export default function Home() {
  const { language } = useContext(AppContext);
  const trans = useTrans();
  return (
    <>
      <Head>
        <title>{trans["app.title"]}</title>
        <meta name="description" content={trans["app.title"]} />
      </Head>

      <Typography.Title style={{ textAlign: "center" }}>
        {trans["app.title"]}
      </Typography.Title>
      <Link href="/replacement-app" locale={language}>
        <Card title={trans["replacement_app"]} className={styles['app-card']}>
          <Typography style={{ color: blue.primary }}>
            {trans["replacement_app_description"]}
          </Typography>
        </Card>
      </Link>
    </>
  );
}
