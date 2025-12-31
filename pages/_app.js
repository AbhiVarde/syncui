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
        {/* WebSite Schema with Search Action */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sync UI - React Component Library for Design Engineers",
              alternateName: ["Sync UI", "syncui", "syncui.design"],
              description:
                "A sleek UI library for Design Engineers with 125+ free React components, 10+ prebuilt blocks (Hero, CTA, Pricing), and 3 affordable premium templates. Built with MUI and Motion (motion/react).",
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
              sameAs: [
                "https://x.com/syncuidesign",
                "https://github.com/syncui/syncui",
              ],
            }),
          }}
        />

        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Sync UI",
              alternateName: "syncui.design",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description:
                "A sleek UI library for Design Engineers with 125+ free components, 10+ prebuilt blocks, and 3 affordable templates. Built with React, MUI, and Motion (motion/react).",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "85",
              },
              featureList: [
                "125+ free React UI components",
                "10+ prebuilt blocks (Hero, CTA, Pricing)",
                "3 premium templates (SaaS, Startup, Portfolio)",
                "Built with Material UI and Motion (motion/react)",
                "Fully accessible and customizable",
                "Production-ready and open source",
                "Next.js compatible",
                "Responsive design",
              ],
            }),
          }}
        />

        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Sync UI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sync UI is a free and open-source React UI component library for Design Engineers, featuring 125+ components, 10+ prebuilt blocks (Hero, CTA, Pricing), and 3 affordable premium templates built with MUI and Motion (motion/react).",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many components does Sync UI have?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sync UI offers 125+ free React components including buttons, cards, forms, tables, carousels, dialogs, and more. All components are fully customizable and production-ready.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are Sync UI Blocks?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Blocks are 10+ prebuilt, copy-paste UI sections including Hero blocks, CTA blocks, and Pricing blocks. They help you build landing pages faster while maintaining consistency.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are Sync UI components free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all 125+ components and 10+ blocks are 100% free and open source under the MIT License. Premium templates are available starting at $29.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What technologies does Sync UI use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sync UI is built with React, Next.js, Material UI (MUI), and Motion (motion/react) for animations. It's fully compatible with modern React frameworks.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Site Navigation Schema for Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Documentation",
                  description:
                    "Complete documentation for Sync UI with setup guides and component examples",
                  url: "https://www.syncui.design/docs",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 2,
                  name: "Components",
                  description:
                    "Browse 125+ free React UI components including buttons, cards, forms, tables, and more",
                  url: "https://www.syncui.design/docs/components/buttons",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 3,
                  name: "Blocks",
                  description:
                    "10+ free prebuilt blocks: Hero sections, CTA blocks, and Pricing tables",
                  url: "https://www.syncui.design/docs/blocks/hero",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 4,
                  name: "Templates",
                  description:
                    "3 premium templates: SaaS, Startup, and Portfolio at $29 each",
                  url: "https://www.syncui.design/templates",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 5,
                  name: "Changelog",
                  description:
                    "Latest updates, new components, and version history",
                  url: "https://www.syncui.design/docs/changelog",
                },
              ],
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
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
                  item: "https://www.syncui.design/docs/components/buttons",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Blocks",
                  item: "https://www.syncui.design/docs/blocks/hero",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Templates",
                  item: "https://www.syncui.design/templates",
                },
              ],
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sync UI",
              alternateName: "syncui.design",
              url: "https://www.syncui.design/",
              logo: "https://www.syncui.design/logo.png",
              description:
                "A sleek UI library for Design Engineers with 125+ free components, 10+ blocks, and 3 affordable templates. Trusted by creators in 100+ countries.",
              founder: {
                "@type": "Person",
                name: "Abhi Varde",
                url: "https://www.abhivarde.in/",
              },
              sameAs: [
                "https://x.com/syncuidesign",
                "https://github.com/syncui/syncui",
              ],
              knowsAbout: [
                "React UI Components",
                "Material UI",
                "Motion Animation",
                "Next.js",
                "Design Systems",
                "Web Development",
                "Frontend Development",
              ],
            }),
          }}
        />

        {/* Product Schema for Templates */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Sync UI Premium Templates",
              description:
                "Production-ready React templates including SaaS, Startup, and Portfolio templates built with Sync UI components",
              brand: {
                "@type": "Brand",
                name: "Sync UI",
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "Startup Template",
                  price: "29",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/startup-template-syncui",
                },
                {
                  "@type": "Offer",
                  name: "SaaS Template",
                  price: "29",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/saas-template-syncui",
                },
                {
                  "@type": "Offer",
                  name: "Portfolio Template",
                  price: "29",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
                },
                {
                  "@type": "Offer",
                  name: "Templates Bundle",
                  price: "79",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/syncui-templates-bundle",
                },
              ],
            }),
          }}
        />
      </Head>
      <DefaultSeo
        title="Sync UI // React Component Library for Design Engineers"
        titleTemplate="%s"
        description="Free & open-source React UI library with 125+ components, 10+ prebuilt blocks (Hero, CTA, Pricing), and 3 premium templates. Built with MUI and Motion (motion/react). Trusted by developers in 100+ countries. Perfect for Next.js, SaaS, and modern web apps."
        canonical="https://www.syncui.design/"
        openGraph={{
          title:
            "Sync UI // 125+ Free React Components & 10+ Blocks for Design Engineers",
          description:
            "Free & open-source React UI library with 125+ components, 10+ prebuilt blocks (Hero, CTA, Pricing), and 3 premium templates. Built with MUI and Motion (motion/react). Trusted by developers in 100+ countries.",
          siteName: "Sync UI",
          url: "https://www.syncui.design/",
          type: "website",
          locale: "en_US",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: "Sync UI - 125+ Free React Components, 10+ Blocks & Premium Templates for Design Engineers",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
          title: "Sync UI // 125+ Free React Components & 10+ Blocks",
          description:
            "Free & open-source React UI library with 125+ components, 10+ blocks (Hero, CTA, Pricing), and 3 premium templates. Built with MUI and Motion.",
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
              "Sync UI, syncui, syncui.design, React UI components, free React components, UI library, Design Engineers, MUI, Material UI, Motion, Framer Motion, motion/react, UI templates, component library, design system, web components, React UI, modern UI, responsive components, Next.js components, SaaS templates, startup templates, portfolio templates, free UI blocks, hero blocks, CTA blocks, pricing blocks, prebuilt sections, landing page components, accessible components, open source UI, React component library, frontend components, UI kit, design tools, web development, React templates, 125+ components, production ready, copy paste components, customizable UI, animated components",
          },
          {
            name: "robots",
            content:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            name: "googlebot",
            content:
              "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
          },
          {
            name: "bingbot",
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
            property: "og:type",
            content: "website",
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:site",
            content: "@syncuidesign",
          },
          {
            name: "twitter:creator",
            content: "@abhivarde",
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
            name: "application-name",
            content: "Sync UI",
          },
          {
            name: "apple-mobile-web-app-title",
            content: "Sync UI",
          },
          {
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
          },
          {
            name: "format-detection",
            content: "telephone=no",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1, shrink-to-fit=no",
          },
          {
            name: "classification",
            content: "Software Development, UI/UX Design, Web Development",
          },
          {
            name: "category",
            content: "Technology",
          },
          {
            name: "coverage",
            content: "Worldwide",
          },
          {
            name: "distribution",
            content: "Global",
          },
          {
            name: "rating",
            content: "General",
          },
          {
            name: "revisit-after",
            content: "7 days",
          },
          {
            property: "article:author",
            content: "https://www.abhivarde.in/",
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
            rel: "manifest",
            href: "/manifest.json",
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
            rel: "dns-prefetch",
            href: "https://fonts.googleapis.com",
          },
          {
            rel: "dns-prefetch",
            href: "https://fonts.gstatic.com",
          },
          {
            rel: "sitemap",
            type: "application/xml",
            href: "/sitemap.xml",
          },
          {
            rel: "alternate",
            type: "application/rss+xml",
            title: "Sync UI RSS Feed",
            href: "/rss.xml",
          },
        ]}
        languageAlternates={[
          {
            hrefLang: "en",
            href: "https://www.syncui.design/",
          },
          {
            hrefLang: "x-default",
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

    console.log(
      "%c                                  .__         .___            .__               \n" +
        "  _________.__. ____   ____  __ __|__|      __| _/____   _____|__| ____   ____  \n" +
        " /  ___<   |  |/    \\_/ ___\\|  |  \\  |     / __ |/ __ \\ /  ___/  |/ ___\\ /    \\ \n" +
        " \\___ \\ \\___  |   |  \\  \\___|  |  /  |    / /_/ \\  ___/ \\___ \\|  / /_/  >   |  \\\n" +
        "/____  >/ ____|___|  /\\___  >____/|__| /\\ \\____ |\\___  >____  >__\\___  /|___|  /\n" +
        "     \\/ \\/         \\/     \\/           \\/      \\/    \\/     \\/  /_____/      \\/ \n",
      "color: #ffffff; font-family: monospace; font-size: 11px; font-weight: bold;"
    );

    console.log(
      "%c🚀 Sync UI: trusted by creators in 100+ countries 🌍\n" +
        "⭐ 85+ GitHub stars and growing fast\n" +
        "🐦 Follow updates → https://x.com/syncuidesign",
      "color: #ffffff; font-family: monospace; font-size: 12px; font-weight: bold;"
    );

    console.log(
      "%cBrought to you by https://abhivarde.in",
      "color: #ffffff; font-family: monospace; font-size: 13px; font-weight: bold; margin-top: 8px;"
    );
  }, []);

  useEffect(() => {
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
