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
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

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
          content="Browse 125+ free animated React components built with MUI and Motion. Includes Buttons, Cards, Tables, Forms, Date Pickers, Loaders, Avatars, Dialogs, Docks, and more. Part of the Vercel Open Source Program."
        />
        <link rel="canonical" href="https://www.syncui.design/components" />
        <meta
          name="keywords"
          content="React components, free UI components, MUI components, Motion components, animated components, buttons, cards, tables, date picker, Next.js components, Vercel OSS"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.syncui.design/components"
        />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="125+ Free Animated React Components | Sync UI"
        />
        <meta
          property="og:description"
          content="Browse 125+ free animated React components built with MUI and Motion. Copy, customize, and ship."
        />
        <meta
          key="og-image"
          property="og:image"
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent("125+ Free Animated React Components")}&type=Components`}
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI Components"
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
          content="125+ Free Animated React Components | Sync UI"
        />
        <meta
          name="twitter:description"
          content="Browse 125+ free animated React components built with MUI and Motion. Copy, customize, and ship."
        />
        <meta
          key="tw-image"
          name="twitter:image"
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent("125+ Free Animated React Components")}&type=Components`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Components",
              description:
                "125+ free animated React components built with MUI and Motion",
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
            width: "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 260,
            backgroundImage: "radial-gradient(#9ca3af 1px, transparent 1px)",
            backgroundSize: "22px 22px",
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
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                px: { xs: 2, md: 0 },
                gap: 1.5,
              }}
            >
              <Box
                component={motion.div}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <Button
                  disableRipple
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontWeight: 500,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    textTransform: "none",
                    color: "text.primary",
                    pointerEvents: "none",
                    "&:hover": { backgroundColor: "background.paper" },
                  }}
                >
                  Sync UI Components
                </Button>
              </Box>

              <Box>
                <Box
                  component={motion.div}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.12 }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                  >
                    Production-ready components
                  </Typography>
                </Box>

                <Box
                  component={motion.div}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.18 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="text.secondary"
                  >
                    <Box
                      component="span"
                      sx={{ display: { xs: "none", sm: "inline" } }}
                    >
                      Reusable React components built with MUI and Motion. Copy,
                      customize, and ship.
                    </Box>
                    <Box
                      component="span"
                      sx={{ display: { xs: "inline", sm: "none" } }}
                    >
                      Reusable React components built with MUI and Motion.
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ py: 5 }}>
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
