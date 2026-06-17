import React from "react";
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
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

const blockCategories = [
  {
    id: 2,
    title: "Hero",
    image: "/images/blocks/hero.png",
    count: 3,
    route: "/docs/blocks/hero",
    description: "Eye-catching hero sections for landing pages",
  },
  {
    id: 4,
    title: "Stats",
    image: "/images/blocks/stats.png",
    count: 3,
    route: "/docs/blocks/stats",
    description: "Professional statistics and metrics sections",
  },
  {
    id: 3,
    title: "Pricing",
    image: "/images/blocks/pricing.png",
    count: 3,
    route: "/docs/blocks/pricing",
    description: "Professional pricing tables and plans",
  },
  {
    id: 1,
    title: "CTA",
    image: "/images/blocks/cta.png",
    count: 4,
    route: "/docs/blocks/cta",
    description: "Call-to-action sections to drive conversions",
  },
  {
    id: 5,
    comingSoon: true,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const Blocks = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <Head>
        <title>Blocks // Sync UI</title>
        <meta
          name="description"
          content="Get 10+ free, production-ready UI blocks including Hero sections, CTA blocks, and Pricing tables. Built with React, MUI & Motion (motion/react). Perfect for landing pages and SaaS websites. Copy and integrate instantly."
        />
        <link rel="canonical" href="https://www.syncui.design/blocks" />
        <meta
          name="keywords"
          content="React UI blocks, hero section, CTA blocks, pricing table, landing page sections, free UI blocks, Next.js blocks, MUI blocks, Motion blocks"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.syncui.design/blocks" />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="10+ Free UI Blocks - Hero, CTA & Pricing Sections | Sync UI"
        />
        <meta
          property="og:description"
          content="Get 10+ free, production-ready UI blocks including Hero sections, CTA blocks, and Pricing tables. Built with React, MUI & Motion (motion/react)."
        />
        <meta
          key="og-image"
          property="og:image"
          content="https://www.syncui.design/images/open-graph/block-image.png"
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI - 10+ Free UI Blocks"
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
          content="10+ Free UI Blocks - Hero, CTA & Pricing Sections | Sync UI"
        />
        <meta
          name="twitter:description"
          content="Get 10+ free, production-ready UI blocks including Hero sections, CTA blocks, and Pricing tables. Built with React, MUI & Motion."
        />
        <meta
          key="tw-image"
          name="twitter:image"
          content="https://www.syncui.design/images/open-graph/block-image.png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Blocks",
              description:
                "13+ free UI blocks including Hero sections, Stats blocks, CTA blocks, and Pricing tables",
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

          <Container
            maxWidth="md"
            sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                  Sync UI Blocks
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
                    fontWeight={400}
                    color="text.secondary"
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
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: { xs: 4, sm: 5, md: 6 },
          }}
        >
          {blockCategories.map((block) =>
            block.comingSoon ? (
              <Box
                key={block.id}
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                sx={{
                  borderRadius: 3,
                  border: "1px dashed",
                  borderColor: "divider",
                  height: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={500}>
                    Coming soon
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    More blocks in progress
                  </Typography>
                </Box>
              </Box>
            ) : (
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
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
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
                    }}
                  >
                    <Box
                      className="preview"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        transition: "none", // no scale animation
                      }}
                    >
                      <Image
                        src={block.image}
                        alt={`${block.title} blocks - ${block.description}`}
                        fill
                        sizes="(max-width: 600px) 100vw, 50vw"
                        loading={block.id === 1 ? "eager" : "lazy"}
                        priority={block.id === 1}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 0.5,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                    >
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
                </Box>
              </Link>
            ),
          )}
        </Box>
      </Container>
    </>
  );
};

export default Blocks;
