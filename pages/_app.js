import React, { useState, useEffect } from "react";
import Head from "next/head";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Router from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";
import Layout from "../components/layout/Layout";
import Loader from "@/components/loader";
import { lightTheme, darkTheme } from "../theme";
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo
        title="Sync UI"
        description="A sleek UI library for Design Engineers, offering beautifully designed components built with MUI and Framer Motion."
        canonical="https://www.syncui.design/"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: "https://www.syncui.design/",
          site_name: "Sync UI",
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
        }}
        twitter={{
          handle: "@syncuidesign",
          site: "@syncuidesign",
          cardType: "summary_large_image",
        }}
      />
      <ThemeProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </>
  );
}

function AppContent({ Component, pageProps }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    setIsMounted(true);
    setCurrentRoute(window.location.pathname.split("/")[1]);
    const handleRouteChange = (url) => {
      const newRoute = url.split("/")[1];
      if (newRoute !== currentRoute) {
        setLoading(true);
      }
    };
    const handleRouteComplete = (url) => {
      setLoading(false);
      setCurrentRoute(url.split("/")[1]);
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    Router.events.on("routeChangeComplete", handleRouteComplete);
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      Router.events.off("routeChangeComplete", handleRouteComplete);
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [currentRoute]);

  if (!isMounted) {
    return null;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Analytics />
      {loading ? (
        <Loader />
      ) : (
        <Layout
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          docsTree={pageProps.docsTree}
          toc={pageProps.toc}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} key={currentRoute} isDarkMode={isDarkMode} />
          </AnimatePresence>
        </Layout>
      )}
    </MuiThemeProvider>
  );
}

export default MyApp;
