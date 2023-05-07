import Head from "next/head";
import { Card, Typography } from "antd";
import Link from "next/link";
import { blue } from "@ant-design/colors";
import useTrans from "@/hooks/useTrans";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/App/Context";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { App, Response } from "@/models";
import React from "react";
import { DEFAULT_LANGUAGE } from "@/utils/const";

// Static Side Render
const Home: NextPage<Response<App[]>> = ({ data }) => {
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
      {data.map((item) => {
        return (
          <Link href={item.path} key={item.id} locale={language}>
            <Card
              title={item.name}
              className={styles["app-card"]}
            >
              <Typography style={{ color: blue.primary }}>
                {item.description}
              </Typography>
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const res = await fetch("http://localhost:3000/api/apps", {
      method: "GET",
      headers: {
        "Accept-Language": locale || DEFAULT_LANGUAGE
      }
    });
    const resp: Response<App[]> = await res.json();

    return {
      props: {
        ...resp,
      },
    };
  } catch (error) {
    return {
      props: { error: -1, message: "Something went wrong", data: [] },
    };
  }
}

export default Home;
