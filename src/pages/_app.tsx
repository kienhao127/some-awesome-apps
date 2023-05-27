import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";
import Header from "@/components/Header";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "src/styles/app.module.css";
import { appWithTranslation } from "next-i18next";
import Footer from "@/components/Footer";
import { Layout, ConfigProvider, theme } from "antd";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
const { defaultAlgorithm, darkAlgorithm } = theme;

function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true)!;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-7TX979YBX9"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7TX979YBX9', {
            page_path: window.location.pathname,
          });
          `,
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>

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
        <Layout>
          <Header />
          <Layout.Content className={`${styles.main} ${inter.className}`}>
            <Component {...pageProps} />
          </Layout.Content>
          <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default appWithTranslation(App);
