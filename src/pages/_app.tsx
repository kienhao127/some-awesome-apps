import { AppProvider } from "@/context/App/Provider";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
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
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
