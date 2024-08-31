import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import { lightTheme, darkTheme } from "../theme";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <DefaultSeo
        title="Sync UI"
        description="A sleek UI library for Design Engineers, offering beautifully designed components built with MUI and Framer Motion."
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          docsTree={pageProps.docsTree}
          toc={pageProps.toc}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
