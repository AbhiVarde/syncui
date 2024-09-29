import React, { useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import { lightTheme, darkTheme } from "../theme";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import Loader from "@/components/loader";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
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

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };
  }, [currentRoute]);

  // Render a loader or nothing on the server side
  if (!isMounted) {
    return null; // or return <Loader /> if you want to show a loading state
  }

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
    </>
  );
}

export default MyApp;
