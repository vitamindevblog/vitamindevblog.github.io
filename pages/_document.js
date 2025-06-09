import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
