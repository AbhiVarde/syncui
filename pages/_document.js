import { Html, Head, Main, NextScript } from "next/document";
import { DefaultSeo } from "next-seo";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <DefaultSeo
          title="Sync UI"
          description="A sleek UI library for Design Engineers, offering beautifully designed components built with MUI and Framer Motion."
          canonical="https://www.syncui.design/"
          openGraph={{
            url: "https://www.syncui.design/",
            title: "Sync UI",
            description: "A sleek UI library for Design Engineers, offering beautifully designed components built with MUI and Framer Motion.",
            images: [
              {
                url: "https://www.syncui.design/default-og-image.png",
                width: 1200,
                height: 630,
                alt: "Sync UI - Sleek UI Library for Design Engineers",
              },
            ],
            siteName: "Sync UI",
          }}
          twitter={{
            cardType: "summary_large_image",
            site: "@syncuidesign",
            handle: "@syncuidesign",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
