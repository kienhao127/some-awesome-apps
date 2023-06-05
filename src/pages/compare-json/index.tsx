import AppLayout from "@/layout/AppLayout";
import { DEFAULT_LANGUAGE } from "@/utils/const";
import { Button, Col, Input, Row, Typography } from "antd";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import styles from "./styles.module.scss";

const CompareJson: NextPageWithLayout = () => {
  const { t: tCompare } = useTranslation("compareJson");
  const { t } = useTranslation();
  const [jsonA, setJsonA] = useState("");
  const [jsonB, setJsonB] = useState("");

  const [missingKeys, setMissingKeys] = useState<{
    missingKeysJson1: string[];
    missingKeysJson2: string[];
  }>();

  const checkObjectType = (data: string): string => {
    try {
      JSON.parse(data);
      return "JSON";
    } catch (error) {
      return "Object";
    }
  };

  const onCompareJson = (json1: string, json2: string) => {
    if (json1 === "" || json2 === "") {
      return {};
    }
    let fIndex = json1.indexOf("{");
    let lIndex = json1.lastIndexOf("}");
    json1 = json1.slice(fIndex, lIndex + 1);

    fIndex = json2.indexOf("{");
    lIndex = json2.lastIndexOf("}");
    json2 = json2.slice(fIndex, lIndex + 1);

    const obj1 =
      checkObjectType(json1) === "Object"
        ? eval(`(${json1})`)
        : JSON.parse(json1);
    const obj2 =
      checkObjectType(json2) === "Object"
        ? eval(`(${json2})`)
        : JSON.parse(json2);

    const missingKeysJson1: string[] = [];
    const missingKeysJson2: string[] = [];

    // Compare keys in json1 and json2
    for (const key1 in obj1) {
      if (!(key1 in obj2)) {
        missingKeysJson2.push(key1);
      }
    }

    // Compare keys in json2 and json1
    for (const key2 in obj2) {
      if (!(key2 in obj1)) {
        missingKeysJson1.push(key2);
      }
    }

    setMissingKeys({ missingKeysJson1, missingKeysJson2 });
  };

  return (
    <>
      <Head>
        <title>{`${tCompare("compare_json")} | ${t("app.title")}`}</title>
        <meta
          name="description"
          content={tCompare("compare_json_description") || ""}
        />
        <meta name="keywords" content="compare, compare json, json" />
      </Head>
      <section className={styles["compare-json"]}>
        <Typography.Title level={1} className={styles["compare-json__title"]}>
          {tCompare("compare_json")}
        </Typography.Title>
        <div className={styles["compare-json__content"]}>
          <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Typography.Title level={4}>
                {tCompare("input_json")} A
              </Typography.Title>
              <Input.TextArea
                placeholder={"JSON A"}
                value={jsonA}
                autoSize={{ minRows: 8, maxRows: 8 }}
                onChange={(e) => setJsonA(e.target.value)}
              />
            </Col>
            <Col xs={24} md={12}>
              <Typography.Title level={4}>
                {tCompare("input_json")} B
              </Typography.Title>
              <Input.TextArea
                placeholder={"JSON B"}
                value={jsonB}
                autoSize={{ minRows: 8, maxRows: 8 }}
                onChange={(e) => setJsonB(e.target.value)}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            onClick={() => onCompareJson(jsonA, jsonB)}
            style={{ width: "100%" }}
          >
            {tCompare("compare")}
          </Button>
          <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Typography.Title level={4}>
                {tCompare("missing_from_A")}:
              </Typography.Title>
              <Typography.Text>
                {missingKeys?.missingKeysJson1.join(", ")}
              </Typography.Text>
            </Col>
            <Col xs={24} md={12}>
              <Typography.Title level={4}>
                {tCompare("missing_from_B")}:
              </Typography.Title>
              <Typography.Text>
                {missingKeys?.missingKeysJson2.join(", ")}
              </Typography.Text>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default CompareJson;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || DEFAULT_LANGUAGE, [
        "compareJson",
        "common",
      ])),
    },
  };
};

CompareJson.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
