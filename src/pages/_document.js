import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head title="Top NGOs In India To Donate/Volunteer Online | Qause">
      
        <meta name="description" content="Qause verified top NGOs in India which are doing great jobs for society. Best NGO directory available online to donate and volunteer for various charitable projects." />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="author" content="Quase" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <Script
          src="https://kit.fontawesome.com/f00b003506.js"
          crossOrigin="anonymous"
        ></Script>
        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC13QmK3KBCp9mNECJc5GWB9nawwXLoxbc&libraries=places`}
        ></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
