import { ThemeContext } from "@/context/ThemContext";
import { ConfigProvider, Layout, theme } from "antd";
import { Inter } from "next/font/google";
import { ReactNode, useContext } from "react";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./styles.module.scss";
const inter = Inter({ subsets: ["latin"] });

interface AppLayoutProps {
  children: ReactNode;
}

const { defaultAlgorithm, darkAlgorithm } = theme;

const AppLayout = ({ children }: AppLayoutProps) => {
  const { darkMode } = useContext(ThemeContext)!;
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#2D88FF",
        },
        components: {
          Layout: {
            colorBgHeader: darkMode ? "#242526" : "#FFFFFF",
            colorBgBody: darkMode ? "#18191A" : "#FFFFFF",
          },
        },
      }}
    >
      <Header />
      <Layout>
        <Layout.Content className={`${styles.main} ${inter.className}`}>
          {children}
        </Layout.Content>
      </Layout>
      <Footer />
      <style jsx global>{`
        body {
          background: ${darkMode ? "#18191A" : "#FFFFFF"};
        }
      `}</style>
    </ConfigProvider>
  );
};

export default AppLayout;
