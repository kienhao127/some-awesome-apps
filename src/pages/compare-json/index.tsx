import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Col, Input, List, Row, Typography, notification } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import { ReplacementMap } from "@/models";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DEFAULT_LANGUAGE, REPLACEMENT_MAP_KEY } from "@/utils/const";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function CompareJson() {
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

  const convertToObject = (jsonString: string): Record<string, any> => {
    // Remove whitespace and curly braces from the string
    return eval(`(${jsonString})`);
  };

  const onCompareJson = (json1: string, json2: string) => {
    if (json1 === "" && json2 === "") {
      return {};
    }
    let fIndex = json1.indexOf("{");
    let lIndex = json1.lastIndexOf("}");
    json1 = json1.slice(fIndex, lIndex + 1);

    fIndex = json2.indexOf("{");
    lIndex = json2.lastIndexOf("}");
    json2 = json2.slice(fIndex, lIndex + 1);

    console.log(json1, json2);

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

    console.log(obj1, obj2);
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
      <div className={styles["compare-json"]}>
        <Typography.Title level={1} className={styles["compare-json__title"]}>
          {tCompare("compare_json")}
        </Typography.Title>
        <div className={styles["compare-json__content"]}>
          <Row justify="center" style={{ width: "100%" }} gutter={[16, 16]}>
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
              <Typography.Title level={4}>
                {tCompare("missing_from_A")}:
              </Typography.Title>
              <p>{missingKeys?.missingKeysJson1.join(", ")}</p>
            </Col>
            <Col span={12}>
              <Typography.Title level={4}>
                {tCompare("missing_from_B")}:
              </Typography.Title>
              <p>{missingKeys?.missingKeysJson2.join(", ")}</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

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
