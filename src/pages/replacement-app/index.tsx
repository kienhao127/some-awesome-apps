import useLocalStorage from "@/hooks/useLocalStorage";
import { ReplacementMap } from "@/models";
import { DEFAULT_LANGUAGE, REPLACEMENT_MAP_KEY } from "@/utils/const";
import { Button, Col, Input, List, Row, Typography, notification } from "antd";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import styles from "./styles.module.scss";

function ReplacementAppPage() {
  const [replacementMap, setReplacementMap] = useLocalStorage<ReplacementMap>(
    REPLACEMENT_MAP_KEY,
    {}
  );
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [longString, setLongString] = useState("");
  const [replacedString, setReplacedString] = useState("");
  const { t } = useTranslation("replacement");

  const addReplacement = () => {
    if (key && value) {
      const newMap = { ...replacementMap, [key]: value };
      setReplacementMap(newMap);
      setKey("");
      setValue("");
    }
  };

  const removeReplacement = (key: string) => {
    const { [key]: value, ...rest } = replacementMap;
    setReplacementMap(rest);
  };

  const replacedStringHandler = () => {
    let replaced = longString;
    for (const [key, value] of Object.entries(replacementMap)) {
      const regex = new RegExp(key, "g");
      replaced = replaced.replace(regex, value);
    }
    setReplacedString(replaced);
  };

  const handleCopy = () => {
    if (!replacedString) {
      return;
    }
    navigator.clipboard.writeText(replacedString);
    notification.success({
      message: "Copied to clipboard",
      placement: "bottomRight",
    });
  };

  return (
    <>
      <Head>
        <title>{`${t("replacement_app")} | ${t("app.title")}`}</title>
        <meta
          name="description"
          content={t("replacement_app_description") || ""}
        />
        <meta
          name="keywords"
          content="replacement, replacement app, replacement_app"
        />
        <meta
          property="og:title"
          content={`${t("replacement_app")} | ${t("app.title")}`}
        />
        <meta
          property="og:description"
          content={t("replacement_app_description") || ""}
        />
      </Head>
      <section className={styles["replacement-map"]}>
        <Typography.Title
          level={1}
          className={styles["replacement-map__title"]}
        >
          {t("replacement_app")}
        </Typography.Title>
        <div className={styles["replacement-map__content"]}>
          <div className={styles["replacement-map__col"]}>
            <Typography.Title level={4}>{t("input_text")}</Typography.Title>
            <Input.TextArea
              placeholder={t("text") || ""}
              autoSize={{ minRows: 4, maxRows: 8 }}
              value={longString}
              onChange={(e) => setLongString(e.target.value)}
            />
            <Row gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
              <Col span={6}>
                <Button type="primary" onClick={replacedStringHandler}>
                  {t("apply")}
                </Button>
              </Col>
            </Row>
            <Typography.Title level={4}>{t("result")}</Typography.Title>
            <Input.TextArea
              onClick={handleCopy}
              autoSize={{ minRows: 4, maxRows: 8 }}
              value={replacedString}
              readOnly
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles["replacement-map__col"]}>
            <Typography.Title level={4}>
              {t("replacement_map")}
            </Typography.Title>
            <List
              bordered
              dataSource={Object.entries(replacementMap || {})}
              locale={{ emptyText: t("empty_text") }}
              renderItem={([key, value]) => (
                <List.Item>
                  <Typography.Text mark>{key}</Typography.Text>: {value}
                  <Button
                    type="link"
                    danger
                    onClick={() => removeReplacement(key)}
                  >
                    {t("remove")}
                  </Button>
                </List.Item>
              )}
            />
            <Row gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
              <Col span={9}>
                <Input
                  placeholder={t("original_word") || ""}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </Col>
              <Col span={9}>
                <Input
                  placeholder={t("destination_word") || ""}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Col>
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={addReplacement}
                  style={{ width: "100%" }}
                >
                  {t("add")}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReplacementAppPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || DEFAULT_LANGUAGE, [
        "replacement",
        "common",
      ])),
    },
  };
};
