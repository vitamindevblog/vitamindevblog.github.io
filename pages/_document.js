import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"></link>
      </Head>
      <body className="antialiased">
        <Header />
        <div className="pt-20">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
