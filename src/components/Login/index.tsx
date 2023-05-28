import { GoogleOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <Button onClick={() => signIn("google")}>
        <GoogleOutlined /> Sign in with Google
      </Button>
    );
  }

  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV !== "development") {
    return <></>;
  }

  return (
    <>
      <Typography.Text>Welcome, {session?.user?.name}!</Typography.Text>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};

export default Login;
