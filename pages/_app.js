import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import { lightTheme, darkTheme } from "../theme";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import Loader from "@/components/loader";

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("");
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const handleStart = (url) => {
      const newRoute = url.split("/")[1];
      if (newRoute !== currentRoute) {
        setLoading(true);
      }
    };

    const handleComplete = (url) => {
      setLoading(false);
      setCurrentRoute(url.split("/")[1]);
    };

    const handleError = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleError);

    // Initial load
    setCurrentRoute(window.location.pathname.split("/")[1]);
    setLoading(false);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };
  }, [currentRoute]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <>
      <DefaultSeo
        title="Sync UI"
        description="A sleek UI library for Design Engineers, offering beautifully designed components built with MUI and Framer Motion."
        canonical="https://www.syncui.design/"
        openGraph={{
          url: "https://www.syncui.design/",
          title: "Sync UI",
          description:
            "A sleek UI library for Design Engineers, offering beautifully designed components built with MUI and Framer Motion.",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 800,
              height: 420,
              alt: "Sync UI",
            },
          ],
          siteName: "Sync UI",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "https://www.syncui.design/",
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              <Component {...pageProps} key={currentRoute} />
            </AnimatePresence>
          </Layout>
        )}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
