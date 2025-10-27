import React, { useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import Router from "next/router";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layout/Layout";
import Loader from "@/components/loader";
import { lightTheme, darkTheme } from "../theme";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sync UI",
              description:
                "A sleek UI library for Design Engineers, offering beautifully designed components and templates built with MUI and Framer Motion.",
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
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.syncui.design/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "SoftwareApplication",
                name: "Sync UI",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
                description:
                  "A sleek UI library for Design Engineers with 45+ free components and templates",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
            }),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.syncui.design/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Documentation",
                  item: "https://www.syncui.design/docs",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Components",
                  item: "https://www.syncui.design/docs/accordions",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Templates",
                  item: "https://www.syncui.design/templates",
                },
              ],
            }),
          }}
        />
      </Head>
      <DefaultSeo
        title="Sync UI - Sleek UI Library for Design Engineers"
        titleTemplate="%s | Sync UI"
        description="A sleek UI library for Design Engineers, offering beautifully designed components and templates built with MUI and Framer Motion. Explore 45+ free components, templates, and comprehensive documentation."
        canonical="https://www.syncui.design/"
        openGraph={{
          title: "Sync UI - Sleek UI Library for Design Engineers",
          description:
            "A sleek UI library for Design Engineers, offering beautifully designed components and templates built with MUI and Framer Motion. Explore 45+ free components, templates, and comprehensive documentation.",
          siteName: "Sync UI",
          url: "https://www.syncui.design/",
          type: "website",
          locale: "en_US",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: "Sync UI - Sleek UI Library for Design Engineers with Components and Templates",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
          title: "Sync UI - Sleek UI Library for Design Engineers",
          description:
            "A sleek UI library for Design Engineers, offering beautifully designed components and templates built with MUI and Framer Motion. Explore 150+ free components, templates, and comprehensive documentation.",
          images: ["https://www.syncui.design/default-og-image.png"],
        }}
        additionalMetaTags={[
          {
            name: "author",
            content: "Abhi Varde",
          },
          {
            name: "designer",
            content: "Abhi Varde",
          },
          {
            name: "publisher",
            content: "Abhi Varde",
          },
          {
            name: "keywords",
            content:
              "UI library, React components, Design Engineers, MUI, Framer Motion, UI templates, component library, design system, web components, React UI, modern UI, responsive components",
          },
          {
            name: "robots",
            content:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            name: "googlebot",
            content: "index, follow",
          },
          {
            property: "og:site_name",
            content: "Sync UI",
          },
          {
            property: "og:locale",
            content: "en_US",
          },
          {
            name: "theme-color",
            content: "#000000",
          },
          {
            name: "msapplication-TileColor",
            content: "#000000",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1, shrink-to-fit=no",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "author",
            href: "https://www.abhivarde.in/",
          },
          {
            rel: "canonical",
            href: "https://www.syncui.design/",
          },
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          },
          {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
          },
          {
            rel: "sitemap",
            type: "application/xml",
            href: "/sitemap.xml",
          },
        ]}
        languageAlternates={[
          {
            hrefLang: "en",
            href: "https://www.syncui.design/",
          },
        ]}
      />
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
  const [currentRoute, setCurrentRoute] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    setIsMounted(true);
    setCurrentRoute(window.location.pathname.split("/")[1]);

    // Console ASCII Art
    console.log(
      "%c   _____                    _    _ _____ \n" +
        "  / ____|                  | |  | |_   _|\n" +
        " | (___  _   _ _ __   ___  | |  | | | |  \n" +
        "  \\___ \\| | | | '_ \\ / __| | |  | | | |  \n" +
        "  ____) | |_| | | | | (__  | |__| |_| |_ \n" +
        " |_____/ \\__, |_| |_|\\___|  \\____/|_____|\n" +
        "          __/ |                           \n" +
        "         |___/                            ",
      "color: #ffffff; font-family: monospace; font-size: 12px; line-height: 1.2;"
    );

    console.log(
      "%c⭐ Like what you see? Give Sync UI a star on GitHub → https://github.com/AbhiVarde/syncui",
      "color: #00bcd4; font-family: monospace; font-size: 13px; font-weight: bold;"
    );

    console.log(
      "%cBrought to you by https://abhivarde.in",
      "color: #ffffff; font-family: monospace; font-size: 14px; font-weight: bold; margin-top: 10px;"
    );

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
          <AnimatePresence mode="wait" initial={false}>
            <Component
              {...pageProps}
              key={currentRoute}
              isDarkMode={isDarkMode}
            />
          </AnimatePresence>
        </Layout>
      )}
    </MuiThemeProvider>
  );
}

export default MyApp;
