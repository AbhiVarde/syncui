import React from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelGrid, GeistPixelTriangle } from "geist/font/pixel";
import { Toaster } from "sonner";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layout/Layout";
import { lightTheme, darkTheme } from "../theme";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import "../styles/globals.css";
import { GitHubProvider } from "@/context/GithubContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <div
      className={`
    ${geistSans.variable}
    ${geistSans.className}
    ${geistMono.variable}
    ${GeistPixelGrid.variable}
    ${GeistPixelTriangle.variable}
  `}
    >
      <Script
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id="47d79797-9fe5-4ccc-b84f-e38d955f2684"
        strategy="afterInteractive"
      />
      <Analytics />
      <SpeedInsights />
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
          content="React components, UI library, MUI, Motion, motion/react, Next.js, free components, UI blocks, React templates, design system, agent skills, AI coding tools, Vercel OSS"
        />

        <title>Sync UI // React Component Library for Design Engineers</title>
        <meta
          name="description"
          content="Free React UI library with 125+ animated components, 13+ blocks, and 3 premium templates. Built with MUI and Motion. Part of the Vercel Open Source Program."
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
          content="Free React UI library with 125+ animated components, 13+ blocks, and 3 premium templates. Built with MUI and Motion. Part of the Vercel Open Source Program."
        />
        <meta
          key="og-image"
          property="og:image"
          content="https://www.syncui.design/og-image.png"
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI - Free React Component Library"
        />
        <meta
          key="og-image-type"
          property="og:image:type"
          content="image/png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@syncuidesign" />
        <meta name="twitter:creator" content="@abhivarde" />
        <meta
          name="twitter:title"
          content="Sync UI // React Component Library for Design Engineers"
        />
        <meta
          name="twitter:description"
          content="Free React UI library with 125+ animated components, 13+ blocks, and 3 premium templates. Built with MUI and Motion. Part of the Vercel Open Source Program."
        />
        <meta
          key="tw-image"
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
                "Free React UI library with 125+ animated components, 13+ blocks, and 3 premium templates. Built with MUI and Motion.",
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
                "Free React UI library with 125+ animated components, 13+ blocks, and 3 premium templates. Built with MUI and Motion.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "97",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                name: "Components",
                description:
                  "125+ free animated React components built with MUI and Motion",
                url: "https://www.syncui.design/components",
              },
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                name: "Blocks",
                description:
                  "13+ free UI blocks including Hero, Stats, Pricing, and CTA sections",
                url: "https://www.syncui.design/blocks",
              },
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                name: "Templates",
                description:
                  "Premium React templates for Startup, SaaS, and Portfolio websites",
                url: "https://www.syncui.design/templates",
              },
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                name: "Documentation",
                description:
                  "Installation guides and full component documentation",
                url: "https://www.syncui.design/docs/installation",
              },
            ]),
          }}
        />
      </Head>
      <ThemeProvider>
        <GitHubProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </GitHubProvider>
      </ThemeProvider>
    </div>
  );
}

function AppContent({ Component, pageProps }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

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
      <Layout
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        docsTree={pageProps.docsTree}
        toc={pageProps.toc}
      >
        <Component {...pageProps} isDarkMode={isDarkMode} />
      </Layout>
    </MuiThemeProvider>
  );
}

export default MyApp;
