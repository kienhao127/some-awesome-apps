import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/context/ThemContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation, useTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <meta property="og:title" content={t("app.title") || ""} />
        <meta property="og:description" content={t("app.title") || ""} />
        <meta property="og:image" content="./thumbnail.webp" />
      </Head>
      {!mounted ? (
        <div style={{ visibility: "hidden" }}></div>
      ) : (
        <ThemeProvider>
          <SessionProvider session={session} refetchInterval={5 * 60}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </SessionProvider>
        </ThemeProvider>
      )}
    </>
  );
}

export default appWithTranslation(App);
