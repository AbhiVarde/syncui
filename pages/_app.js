import React, { useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "sonner";
import Router from "next/router";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layout/Layout";
import Loader from "@/components/loader";
import { lightTheme, darkTheme } from "../theme";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import "../styles/globals.css";
import { GitHubProvider } from "@/context/GithubContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id="47d79797-9fe5-4ccc-b84f-e38d955f2684"
        strategy="afterInteractive"
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="author" content="Abhi Varde" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="keywords"
          content="React components, UI library, MUI, Motion, Framer Motion, Next.js, free components, UI blocks, React templates, design system"
        />

        <title>Sync UI // React Component Library for Design Engineers</title>
        <meta
          name="description"
          content="A sleek UI library for Design Engineers with 125+ components, 10+ blocks, and 3 premium templates. Built with MUI and Motion (motion/react)."
        />
        <link rel="canonical" href="https://www.syncui.design/" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://www.syncui.design/" />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="Sync UI // React Component Library for Design Engineers"
        />
        <meta
          property="og:description"
          content="A sleek UI library for Design Engineers with 125+ components, 10+ blocks, and 3 premium templates. Built with MUI and Motion (motion/react)."
        />
        <meta
          property="og:image"
          content="https://www.syncui.design/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Sync UI - Free React Component Library"
        />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@syncuidesign" />
        <meta name="twitter:creator" content="@abhivarde" />
        <meta
          name="twitter:title"
          content="Sync UI // React Component Library for Design Engineers"
        />
        <meta
          name="twitter:description"
          content="A sleek UI library for Design Engineers with 125+ components, 10+ blocks, and 3 premium templates. Built with MUI and Motion (motion/react)."
        />
        <meta
          name="twitter:image"
          content="https://www.syncui.design/og-image.png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sync UI",
              alternateName: ["syncui", "syncui.design"],
              description:
                "A sleek UI library for Design Engineers with 125+ components, 10+ blocks, and 3 premium templates. Built with MUI and Motion (motion/react).",
              url: "https://www.syncui.design/",
              author: {
                "@type": "Person",
                name: "Abhi Varde",
                url: "https://www.abhivarde.in/",
              },
              publisher: {
                "@type": "Organization",
                name: "Sync UI",
                url: "https://www.syncui.design/",
                logo: "https://www.syncui.design/logo.png",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.syncui.design/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                "https://x.com/syncuidesign",
                "https://github.com/AbhiVarde/syncui",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Sync UI",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description:
                "A sleek UI library for Design Engineers with 125+ components, 10+ blocks, and 3 premium templates. Built with MUI and Motion (motion/react).",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "85",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sync UI",
              url: "https://www.syncui.design/",
              logo: "https://www.syncui.design/logo.png",
              founder: {
                "@type": "Person",
                name: "Abhi Varde",
                url: "https://www.abhivarde.in/",
              },
              sameAs: [
                "https://x.com/syncuidesign",
                "https://github.com/AbhiVarde/syncui",
              ],
            }),
          }}
        />
      </Head>

      <ThemeProvider>
        <GitHubProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </GitHubProvider>
      </ThemeProvider>
    </>
  );
}

function AppContent({ Component, pageProps }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "%c                                  .__         .___            .__               \n" +
          "  _________.__. ____   ____  __ __|__|      __| _/____   _____|__| ____   ____  \n" +
          " /  ___<   |  |/    \\_/ ___\\|  |  \\  |     / __ |/ __ \\ /  ___/  |/ ___\\ /    \\ \n" +
          " \\___ \\ \\___  |   |  \\  \\___|  |  /  |    / /_/ \\  ___/ \\___ \\|  / /_/  >   |  \\\n" +
          "/____  >/ ____|___|  /\\___  >____/|__| /\\ \\____ |\\___  >____  >__\\___  /|___|  /\n" +
          "     \\/ \\/         \\/     \\/           \\/      \\/    \\/     \\/  /_____/      \\/ \n",
        "color: #ffffff; font-family: monospace; font-size: 11px; font-weight: bold;",
      );
      console.log(
        "%c🚀 Sync UI: trusted by creators in 100+ countries 🌍\n⭐ 85+ GitHub stars and growing fast\n🐦 Follow updates → https://x.com/syncuidesign",
        "color: #ffffff; font-family: monospace; font-size: 12px; font-weight: bold;",
      );
      console.log(
        "%cBrought to you by https://abhivarde.in",
        "color: #ffffff; font-family: monospace; font-size: 13px; font-weight: bold; margin-top: 8px;",
      );
    }
  }, []);

  useEffect(() => {
    const handleStart = (url) => {
      const newSection = url.split("/")[1];
      const currentSection = window.location.pathname.split("/")[1];
      if (newSection !== currentSection) setLoading(true);
    };
    const handleDone = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleDone);
    Router.events.on("routeChangeError", handleDone);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleDone);
      Router.events.off("routeChangeError", handleDone);
    };
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        theme={isDarkMode ? "dark" : "light"}
        position="top-right"
        expand={false}
        richColors
        closeButton
      />
      {loading ? (
        <Loader />
      ) : (
        <Layout
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          docsTree={pageProps.docsTree}
          toc={pageProps.toc}
        >
          <Component {...pageProps} isDarkMode={isDarkMode} />
        </Layout>
      )}
    </MuiThemeProvider>
  );
}

export default MyApp;
