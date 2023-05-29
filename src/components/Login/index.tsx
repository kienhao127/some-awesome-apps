import {
  GoogleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Typography } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const Login = () => {
  const { data: session, status } = useSession();
  const { t } = useTranslation();

  const preLoginItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={() => signIn("google")}>
          <GoogleOutlined /> {t("sign_in_with", { provider: "Google" })}
        </Button>
      ),
    },
  ];

  const afterLoginItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className={styles["header-login__user"]}>
          <Avatar src={session?.user?.image} size={64} />
          <div className={styles["header-login__user-info"]}>
            <Typography.Text>{session?.user?.name}</Typography.Text>
            <Typography.Text style={{ fontSize: "0.75rem" }} type="secondary">
              {session?.user?.email}
            </Typography.Text>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <Typography.Text
          onClick={() => signOut()}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <LogoutOutlined />
          {t("sign_out")}
        </Typography.Text>
      ),
    },
  ];

  if (status === "loading") {
    return <Button loading shape="circle"></Button>;
  }

  if (!session) {
    return (
      <Dropdown
        menu={{ items: preLoginItems }}
        placement="bottomLeft"
        arrow
        trigger={["click"]}
      >
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    );
  }

  return (
    <>
      <Dropdown
        menu={{ items: afterLoginItems }}
        placement="bottomLeft"
        arrow
        trigger={["click"]}
        overlayStyle={{ position: 'fixed'}}
      >
        <Avatar src={session.user?.image} />
      </Dropdown>
    </>
  );
};

export default Login;
