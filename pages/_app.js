import "@/styles/globals.scss";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-H16MTVW4PF`}
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4514641971794594"
        crossorigin="anonymous"></Script>
      <Script id="my-script" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-H16MTVW4PF');
        `}
      </Script>
      <Component {...pageProps} />;
    </>
  );
}
