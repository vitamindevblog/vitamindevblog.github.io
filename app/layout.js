import { IBM_Plex_Mono } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import Header from "../components/Header";

const pressStart2P = IBM_Plex_Mono({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Vitamindev",
  description: "Kiên thức lập trình, front-end, back-end",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-H16MTVW4PF`}
      />

      <Script id="my-script" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-H16MTVW4PF');
        `}
      </Script>
      <body className={`${pressStart2P.className}`}>
        <Header />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
