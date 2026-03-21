import React, { useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import { motion } from "motion/react";
import Head from "next/head";
import Link from "next/link";
import { getAllDocsSlugs } from "@/lib/docs";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
};

const fadeUpDelayed = (delay = 0) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

const Components = ({ docsTree }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const componentsList = useMemo(() => {
    if (!docsTree) return [];
    return docsTree
      .filter((item) => item.category === "Components")
      .map((item) => ({
        id: item.slug,
        title: item.title,
        route: item.url,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [docsTree]);

  return (
    <>
      <Head>
        <title>Components // Sync UI</title>
        <meta
          name="description"
          content="Browse 125+ free, production-ready React components built with MUI & Motion (motion/react). Includes Buttons, Loaders, Cards, Tables, Date Pickers, Time Pickers, Accordions, Carousels, and more. Copy, customize, and integrate instantly."
        />
        <link rel="canonical" href="https://www.syncui.design/components" />
        <meta
          name="keywords"
          content="React components, free UI components, MUI components, Motion components, buttons, cards, tables, date picker, time picker, Next.js components, production ready"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.syncui.design/components"
        />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="125+ Free React Components - Buttons, Cards, Tables & More | Sync UI"
        />
        <meta
          property="og:description"
          content="Browse 125+ free, production-ready React components built with MUI & Motion (motion/react). Includes Buttons, Loaders, Cards, Tables, and more."
        />
        <meta
          key="og-image"
          property="og:image"
          content="https://www.syncui.design/images/open-graph/component-image.png"
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI - 125+ Free React Components"
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
          content="125+ Free React Components - Buttons, Cards, Tables & More | Sync UI"
        />
        <meta
          name="twitter:description"
          content="Browse 125+ free, production-ready React components built with MUI & Motion (motion/react)."
        />
        <meta
          key="tw-image"
          name="twitter:image"
          content="https://www.syncui.design/images/open-graph/component-image.png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Components",
              description:
                "125+ free React components built with MUI & Motion (motion/react)",
              url: "https://www.syncui.design/components",
              numberOfItems: 125,
              publisher: {
                "@type": "Organization",
                name: "Sync UI",
                logo: "https://www.syncui.design/logo.png",
              },
            }),
          }}
        />
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
                  name: "Components",
                  item: "https://www.syncui.design/components",
                },
              ],
            }),
          }}
        />
      </Head>

      <Container maxWidth="xl" sx={{ px: "0px !important" }}>
        <Box
          sx={{
            position: "relative",
            backgroundImage: "radial-gradient(#9ca3af 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            py: 8,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: isDarkMode
                ? "rgba(0, 0, 0, 0.4)"
                : "transparent",
            }}
          />

          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <Box
              component={motion.div}
              {...fadeUp}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: { md: 2, xs: 0 },
              }}
            >
              <Box component={motion.div} {...fadeUpDelayed(0.08)}>
                <Button
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: 14,
                    fontWeight: 500,
                    background: !isDarkMode
                      ? "linear-gradient(120deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))"
                      : "linear-gradient(120deg, rgba(30,30,30,0.9), rgba(50,50,50,0.9))",
                    border: "1px solid",
                    borderColor: "divider",
                    textTransform: "none",
                    color: !isDarkMode ? "#008080" : "#00B5AD",
                    pointerEvents: "none",
                  }}
                >
                  Sync UI Components
                </Button>
              </Box>

              <Box component={motion.div} {...fadeUpDelayed(0.16)}>
                <Typography variant="h2" sx={{ fontWeight: 600, mt: 1 }}>
                  Build faster with production-ready components
                </Typography>
              </Box>

              <Box component={motion.div} {...fadeUpDelayed(0.24)}>
                <Typography
                  variant="h6"
                  sx={{ mt: 2, maxWidth: 700, lineHeight: 1.6 }}
                >
                  <Box sx={{ display: { xs: "none", sm: "inline" } }}>
                    A growing set of reusable React components built with MUI
                    and Motion. Copy, customize, and ship with confidence.
                  </Box>
                  <Box sx={{ display: { xs: "inline", sm: "none" } }}>
                    Flexible React components powered by MUI and Motion.
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          {componentsList.map((component, index) => (
            <Link
              key={component.id}
              href={component.route}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.24,
                  ease: "easeOut",
                  delay: index * 0.012,
                }}
                sx={{
                  cursor: "pointer",
                  borderRadius: 1.5,
                  backgroundColor: "background.paper",
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover": { backgroundColor: "action.hover" },
                  "&:hover .icon": {
                    "@media (hover: hover)": { transform: "rotate(45deg)" },
                  },
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {component.title}
                </Typography>

                <IconButton disableRipple sx={{ p: 0 }}>
                  <Box
                    className="icon"
                    sx={{
                      display: "inline-flex",
                      willChange: "transform",
                      transition:
                        "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                  </Box>
                </IconButton>
              </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Components;

export async function getStaticProps() {
  const docsTree = await getAllDocsSlugs();
  return {
    props: { docsTree },
  };
}
