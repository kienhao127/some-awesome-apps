'use client'
import { Button, Col, Input, List, Row, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ReplacementMap } from "@/models";
import useLocalStorage from "@/hooks/useLocalStorage";
import { REPLACEMENT_MAP_KEY } from "@/utils/const";
import useTrans from "@/hooks/useTrans";
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(
  () => import('@/components/Header'),
  { ssr: false }
)

function ReplacementAppPage() {
  const [replacementMap, setReplacementMap] = useLocalStorage<ReplacementMap>(
    REPLACEMENT_MAP_KEY,
    {}
  );
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [longString, setLongString] = useState("");
  const [replacedString, setReplacedString] = useState("");
  const trans = useTrans();

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
    <div className={styles["replacement-map"]}>
      <DynamicHeader />
      <Typography.Title level={1} className={styles["replacement-map__title"]}>
        {trans["replacement_app"]}
      </Typography.Title>
      <div className={styles["replacement-map__content"]}>
        <div className={styles["replacement-map__col"]}>
          <Typography.Title level={4}>{trans["input_text"]}</Typography.Title>
          <Input.TextArea
            placeholder={trans["text"] || ""}
            autoSize={{ minRows: 4, maxRows: 8 }}
            value={longString}
            onChange={(e) => setLongString(e.target.value)}
          />
          <Row gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
            <Col span={6}>
              <Button type="primary" onClick={replacedStringHandler}>
                {trans["apply"]}
              </Button>
            </Col>
          </Row>
          <Typography.Title level={4}>{trans["result"]}</Typography.Title>
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
            {trans["replacement_map"]}
          </Typography.Title>
          <List
            bordered
            dataSource={Object.entries(replacementMap || {})}
            locale={{ emptyText: trans["empty_text"] }}
            renderItem={([key, value]) => (
              <List.Item>
                <Typography.Text mark>{key}</Typography.Text>: {value}
                <Button
                  type="link"
                  danger
                  onClick={() => removeReplacement(key)}
                >
                  {trans["remove"]}
                </Button>
              </List.Item>
            )}
          />
          <Row gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
            <Col span={9}>
              <Input
                placeholder={trans["original_word"] || ""}
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </Col>
            <Col span={9}>
              <Input
                placeholder={trans["destination_word"] || ""}
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
                {trans["add"]}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ReplacementAppPage;
