import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Input, Typography } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { DEFAULT_LANGUAGE } from "@/utils/const";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

const PX_REM = "16";

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

  return (
    <>
      <Head>
        <title>{`${t("px2rem_converter")} | ${tCommon("app.title")}`}</title>
        <meta
          name="description"
          content={t("px2rem_converter_description") || ""}
        />
        <meta name="keywords" content="px2rem, px-to-rem, px to rem, converter"/>
      </Head>
      <div className={styles["px2rem-app"]}>
        <Typography.Title level={1} className={styles["px2rem-app__title"]}>
          {t("px2rem_converter")}
        </Typography.Title>
        <div className={styles["px2rem-app__content"]}>
          <div className={styles["px2rem-app__input-container"]}>
            <div className={styles["px2rem-app__input"]}>
              <Typography.Title level={4}>Pixels</Typography.Title>
              <Input value={px} onChange={onPxChange} suffix={"PX"} />
            </div>
            <SwapOutlined style={{ lineHeight: "2rem" }} />
            <div className={styles["px2rem-app__input"]}>
              <Typography.Title level={4}>REM</Typography.Title>
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
        </div>
      </div>
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
