import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Col, Input, Row, Table, Typography, notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { SwapOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { DEFAULT_LANGUAGE } from "@/utils/const";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import type { ColumnType } from "antd/es/table";

interface DataType {
  px: number;
  rem: number;
}
const PX_REM = "16";

const PXs = [
  1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18, 20, 24, 25, 28, 32, 36, 40, 44,
  48, 50, 56, 64, 72, 75, 80, 90, 100,
];
const REMs = [
  0.01, 0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 15, 20,
  30, 40, 50, 60, 80, 100,
];

function ReplacementAppPage() {
  const { t } = useTranslation("px2rem");
  const { t: tCommon } = useTranslation("common");
  const [px, setPx] = useState<string>("16");
  const [rem, setRem] = useState<string>("1");
  const [baseValue, setBaseValue] = useState<string>(PX_REM);
  const router = useRouter();

  const onPxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || "";
    setPx(value);
    const match = value.match(/\d+(?:\.\d+)?/);
    if (match !== null) {
      const num = Number(match[0]);
      const convertedRem = num / Number(baseValue);
      setRem(convertedRem.toString());
    } else {
      setRem("");
    }
  };

  const onRemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || "";
    setRem(value);
    const match = value.match(/\d+(?:\.\d+)?/);
    if (match !== null) {
      const num = Number(match[0]);
      const convertedPx = num * Number(baseValue);
      setPx(convertedPx.toString());
    } else {
      setPx("");
    }
  };

  const onBaseValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || "";
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === "" || value === "-") {
      setBaseValue(value);
      const convertedPx =
        value === "" || rem === "" ? "" : Number(rem) * Number(value);
      setPx(convertedPx.toString());
    }
  };

  const onBaseValueBlur = () => {
    setBaseValue(PX_REM);
  };

  const onCopy = (text: string) => {
    if (!text) {
      return;
    }
    navigator.clipboard.writeText(text);
    notification.success({
      message: "Copied to clipboard",
      placement: "bottomRight",
    });
  };

  const columns: ColumnType<DataType>[] = [
    {
      title: "Pixels",
      dataIndex: "px",
      align: "right",
      render: (text) => (
        <Button size="small" onClick={() => onCopy(`${text}px`)}>
          <b>{text}</b>
          <span style={{ color: "gray" }}>px</span>
        </Button>
      ),
    },
    {
      title: "REM",
      dataIndex: "rem",
      align: "right",
      render: (text) => (
        <Button size="small" onClick={() => onCopy(`${text}rem`)}>
          <b>{text}</b>
          <span style={{ color: "gray" }}>rem</span>
        </Button>
      ),
    },
  ];

  const px2remData: DataType[] = PXs.map((px) => ({
    key: px,
    px: px,
    rem: px / Number(baseValue),
  }));

  const rem2pxData: DataType[] = REMs.map((rem) => ({
    key: rem,
    rem: rem,
    px: rem * Number(baseValue),
  }));

  return (
    <>
      <Head>
        <title>{`${t("px2rem_converter")} | ${tCommon("app.title")}`}</title>
        <meta
          name="description"
          content={t("px2rem_converter_description") || ""}
        />
        <meta
          name="keywords"
          content="px2rem, px-to-rem, px to rem, converter"
        />
      </Head>
      <section className={styles["px2rem-app"]}>
        <Typography.Title level={1} className={styles["px2rem-app__title"]}>
          {t("px2rem_converter")}
        </Typography.Title>
        <div className={styles["px2rem-app__content"]}>
          <div className={styles["px2rem-app__input-container"]}>
            <div className={styles["px2rem-app__input"]}>
              <Typography.Title level={4}>
                Pixels{" "}
                <Button
                  size="small"
                  onClick={() => onCopy(`${px}px`)}
                  icon={<CopyOutlined />}
                />
              </Typography.Title>
              <Input value={px} onChange={onPxChange} suffix={"PX"} />
            </div>
            <SwapOutlined style={{ lineHeight: "2rem" }} />
            <div className={styles["px2rem-app__input"]}>
              <Typography.Title level={4}>
                REM{" "}
                <Button
                  size="small"
                  onClick={() => onCopy(`${rem}rem`)}
                  icon={<CopyOutlined />}
                />
              </Typography.Title>
              <Input value={rem} onChange={onRemChange} suffix={"REM"} />
            </div>
          </div>

          <div className={styles["px2rem-app__input"]}>
            <Typography.Text>
              {t("px2rem_note")}{" "}
              <Input
                style={{ width: 32 }}
                value={baseValue}
                onChange={onBaseValueChange}
                size="small"
                onBlur={onBaseValueBlur}
              />{" "}
              pixel{Number(baseValue) > 1 && router.locale === "en" ? "s" : ""}.
            </Typography.Text>
          </div>
          <Row justify={"center"} gutter={[64, 64]} style={{ width: "100%" }}>
            <Col>
              <Table
                size="small"
                dataSource={px2remData}
                columns={columns}
                pagination={false}
              />
            </Col>
            <Col>
              <Table
                size="small"
                dataSource={rem2pxData}
                columns={[...columns].reverse()}
                pagination={false}
              />
            </Col>
          </Row>
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
        "px2rem",
        "common",
      ])),
    },
  };
};
