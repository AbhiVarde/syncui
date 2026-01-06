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
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { getAllDocsSlugs } from "@/lib/docs";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.28,
    ease: [0.22, 1, 0.36, 1],
  },
};

const fadeUpDelayed = (delay = 0) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

const Components = ({ docsTree }) => {
  const theme = useTheme();
  const router = useRouter();
  const isDarkMode = theme.palette.mode === "dark";

  const componentsList = useMemo(() => {
    if (!docsTree) return [];

    return docsTree
      .filter((item) => item.category === "Components")
      .map((item) => ({
        id: item.slug,
        title: item.title,
        route: item.url,
        isNew: ["Skeletons", "Time Pickers"].includes(item.title),
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [docsTree]);

  return (
    <>
      <NextSeo
        title="125+ Free React Components - Buttons, Cards, Tables & More // Sync UI"
        description="125+ free, production-ready React components built with MUI & Motion (motion/react). Copy, customize, and integrate seamlessly."
        canonical="https://www.syncui.design/components"
        openGraph={{
          url: "https://www.syncui.design/components",
          title:
            "125+ Free React Components - Buttons, Cards, Tables & More // Sync UI",
          description:
            "125+ free, production-ready React components built with MUI & Motion.",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: "Sync UI - 125+ Free React Components Library",
            },
          ],
          siteName: "Sync UI",
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
        }}
      />

      <Head>
        <title>Components // Sync UI</title>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Components - 125+ Free React Components",
              description:
                "125+ free, production-ready React components built with MUI & Motion (motion/react). Includes buttons, loaders, cards, tables, time pickers, date pickers, docks, avatars, accordions, skeletons, carousels, separators, and much more.",
              url: "https://www.syncui.design/components",
              publisher: {
                "@type": "Organization",
                name: "Sync UI",
                url: "https://www.syncui.design/",
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Sync UI Components Library",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              description:
                "Free React components library with 125+ production-ready components built with MUI and Motion",
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
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          {componentsList.map((component, index) => (
            <Box
              key={component.id}
              component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
                delay: index * 0.012,
              }}
              onClick={() => router.push(component.route)}
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
                  "@media (hover: hover)": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  {component.title}
                </Typography>

                {component.isNew && (
                  <Box
                    sx={{
                      display: { xs: "none", sm: "inline-flex" },
                      px: "6px",
                      py: "1px",
                      background: "linear-gradient(135deg, #007B83, #00B5AD)",
                      color: "#fff",
                      borderRadius: "6px",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  >
                    New
                  </Box>
                )}
              </Box>

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
