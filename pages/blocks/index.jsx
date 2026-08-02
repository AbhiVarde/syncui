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
import HeroVariants from "@/components/ui/blocks/Hero/Hero";
import CTAVariants from "@/components/ui/blocks/CTA/Cta";
import PricingVariants from "@/components/ui/blocks/Pricing/Pricing";
import StatsVariants from "@/components/ui/blocks/Stats/Stats";

const blockMeta = {
  Hero: {
    preview: <HeroVariants variant="center" height={180} />,
    count: 3,
    description: "Eye-catching hero sections for landing pages",
  },
  Stats: {
    preview: <StatsVariants variant="simple" height={180} />,
    count: 3,
    description: "Professional statistics and metrics sections",
  },
  Pricing: {
    preview: <PricingVariants variant="threeTier" height={180} />,
    count: 3,
    description: "Professional pricing tables and plans",
  },
  CTA: {
    preview: <CTAVariants variant="centered" height={180} />,
    count: 4,
    description: "Call-to-action sections to drive conversions",
  },
};

const blockOrder = ["Hero", "Stats", "Pricing", "CTA"];

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const Blocks = ({ docsTree }) => {
  const blockCategories = useMemo(() => {
    if (!docsTree) return [];
    return docsTree
      .filter((item) => item.category === "Blocks" && blockMeta[item.title])
      .map((item) => ({
        id: item.slug,
        title: item.title,
        route: item.url,
        ...blockMeta[item.title],
      }))
      .sort(
        (a, b) => blockOrder.indexOf(a.title) - blockOrder.indexOf(b.title),
      );
  }, [docsTree]);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <Head>
        <title>Blocks // Sync UI</title>
        <meta
          name="description"
          content="Get 13+ free animated UI blocks including Hero sections, CTA blocks, Pricing tables, and Stats sections. Built with React, MUI, and Motion. Part of ▲ Vercel OSS Program Spring '26."
        />
        <link rel="canonical" href="https://www.syncui.design/blocks" />
        <meta
          name="keywords"
          content="React UI blocks, hero section, CTA blocks, pricing table, stats section, landing page sections, free UI blocks, Next.js blocks, MUI blocks, Vercel OSS"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.syncui.design/blocks" />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="13+ Free Animated UI Blocks | Sync UI"
        />
        <meta
          property="og:description"
          content="Get 13+ free animated UI blocks including Hero, CTA, Pricing, and Stats sections. Built with React, MUI, and Motion."
        />
        <meta
          key="og-image"
          property="og:image"
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent("Production-ready Blocks")}&type=Blocks`}
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI Blocks"
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
          content="13+ Free Animated UI Blocks | Sync UI"
        />
        <meta
          name="twitter:description"
          content="Get 13+ free animated UI blocks including Hero, CTA, Pricing, and Stats sections. Built with React, MUI, and Motion."
        />
        <meta
          key="tw-image"
          name="twitter:image"
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent("Production-ready Blocks")}&type=Blocks`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Blocks",
              description:
                "13+ free animated UI blocks including Hero, Stats, Pricing, and CTA sections",
              url: "https://www.syncui.design/blocks",
              numberOfItems: 13,
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
                  name: "Blocks",
                  item: "https://www.syncui.design/blocks",
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
              "@type": "ItemList",
              name: "Sync UI Block Categories",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Hero Blocks",
                  url: "https://www.syncui.design/docs/blocks/hero",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Stats Blocks",
                  url: "https://www.syncui.design/docs/blocks/stats",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Pricing Blocks",
                  url: "https://www.syncui.design/docs/blocks/pricing",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "CTA Blocks",
                  url: "https://www.syncui.design/docs/blocks/cta",
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
            minHeight: 280,
            backgroundColor: "background.default",
            backgroundImage: isDarkMode
              ? `
          repeating-linear-gradient(
            -60deg,
            transparent 0px,
            transparent 9px,
            rgba(255,255,255,0.12) 9px,
            rgba(255,255,255,0.12) 10px
          )
        `
              : `
          repeating-linear-gradient(
            -60deg,
            transparent 0px,
            transparent 9px,
            rgba(0,0,0,0.08) 9px,
            rgba(0,0,0,0.08) 10px
          )
        `,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: isDarkMode
                ? "rgba(0,0,0,0.35)"
                : "rgba(255,255,255,0.25)",
            }}
          />

          <Container
            maxWidth="md"
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
              mx: 2,
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
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
                    minHeight: 32,
                    borderRadius: "12px",
                    fontWeight: 500,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    textTransform: "none",
                    color: "text.primary",
                    pointerEvents: "none",
                    "&:hover": {
                      backgroundColor: "background.paper",
                    },
                  }}
                >
                  Sync UI Blocks
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  alignItems: "center",
                }}
              >
                <Box
                  component={motion.div}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.12 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    Ready-made UI blocks
                  </Typography>
                </Box>

                <Box
                  component={motion.div}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.18 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 400,
                      color: "text.secondary",
                      lineHeight: 1.6,
                      mx: "auto",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ display: { xs: "none", sm: "inline" } }}
                    >
                      Production-ready sections built with MUI and Motion. Copy,
                      customize, and ship.
                    </Box>

                    <Box
                      component="span"
                      sx={{ display: { xs: "inline", sm: "none" } }}
                    >
                      Production-ready sections built with MUI and Motion.
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ px: { lg: 0 }, py: 5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {blockCategories.map((block) => (
            <Link
              key={block.id}
              href={block.route}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "transparent",
                  p: 1.5,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  "&:hover .icon": { transform: "rotate(45deg)" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 180,
                    overflow: "hidden",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    bgcolor: "background.default",
                  }}
                >
                  {block.preview}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography variant="h6" fontWeight={500}>
                      {block.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {block.count} blocks
                    </Typography>
                  </Box>
                  <IconButton
                    disableRipple
                    aria-label={`View ${block.title} blocks`}
                    sx={{
                      p: 0,
                      color: "text.primary",
                      backgroundColor: "transparent",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    <Box
                      className="icon"
                      sx={{
                        display: "inline-flex",
                        transition:
                          "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                        transformOrigin: "center",
                      }}
                    >
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} />
                    </Box>
                  </IconButton>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ px: 0.5, mt: -1.5 }}
                >
                  {block.description}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Blocks;

export async function getStaticProps() {
  const docsTree = await getAllDocsSlugs();
  return {
    props: { docsTree },
  };
}
