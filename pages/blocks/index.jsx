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
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Image from "next/image";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

const blockCategories = [
  {
    id: 1,
    title: "CTA",
    image: "/images/cta.png",
    count: 4,
    route: "/docs/blocks/cta",
    description: "Call-to-action sections to drive conversions",
  },
  {
    id: 2,
    title: "Hero",
    image: "/images/hero.png",
    count: 3,
    route: "/docs/blocks/hero",
    description: "Eye-catching hero sections for landing pages",
  },
  {
    id: 3,
    title: "Pricing",
    image: "/images/pricing.png",
    count: 3,
    route: "/docs/blocks/pricing",
    description: "Professional pricing tables and plans",
  },
  {
    id: 4,
    comingSoon: true,
  },
];

const Blocks = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <NextSeo
        title="10+ Free UI Blocks - Hero, CTA & Pricing // Sync UI"
        description="10+ free, production-ready UI blocks including Hero sections, CTA blocks, and Pricing tables. Built with React, MUI & Motion (motion/react). Copy, customize, and integrate seamlessly into your Next.js projects. Perfect for landing pages and SaaS websites."
        canonical="https://www.syncui.design/blocks"
        openGraph={{
          url: "https://www.syncui.design/blocks",
          title: "10+ Free UI Blocks - Hero, CTA & Pricing // Sync UI",
          description:
            "10+ free, production-ready UI blocks including Hero sections, CTA blocks, and Pricing tables. Built with React, MUI & Motion. Copy and integrate instantly.",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: "Sync UI - 10+ Free UI Blocks for React: Hero, CTA, Pricing sections",
            },
          ],
          siteName: "Sync UI",
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
          title: "10+ Free UI Blocks - Hero, CTA & Pricing // Sync UI",
          description:
            "10+ free UI blocks for React. Hero sections, CTA blocks, and Pricing tables. Built with MUI & Motion. Copy and integrate instantly.",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "React UI blocks, free UI blocks, hero section react, CTA blocks, pricing table react, landing page sections, prebuilt UI sections, React components, MUI blocks, Motion blocks, Framer Motion, Next.js blocks, copy paste blocks, production ready blocks, SaaS blocks, startup blocks, landing page components, hero components, call to action components, pricing components",
          },
        ]}
      />
      <Head>
        <title>Blocks // Sync UI</title>

        {/* Additional Schema Markup for Blocks Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Blocks - Free React UI Blocks",
              description:
                "10+ free, production-ready UI blocks including Hero sections, CTA blocks, and Pricing tables. Built with React, MUI & Motion (motion/react).",
              url: "https://www.syncui.design/blocks",
              publisher: {
                "@type": "Organization",
                name: "Sync UI",
                url: "https://www.syncui.design/",
              },
              hasPart: [
                {
                  "@type": "WebPage",
                  name: "CTA Blocks",
                  description: "4 free call-to-action blocks for React",
                  url: "https://www.syncui.design/docs/blocks/cta",
                },
                {
                  "@type": "WebPage",
                  name: "Hero Blocks",
                  description: "3 free hero section blocks for React",
                  url: "https://www.syncui.design/docs/blocks/hero",
                },
                {
                  "@type": "WebPage",
                  name: "Pricing Blocks",
                  description: "3 free pricing table blocks for React",
                  url: "https://www.syncui.design/docs/blocks/pricing",
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
                  name: "Blocks",
                  item: "https://www.syncui.design/blocks",
                },
              ],
            }),
          }}
        />

        {/* ItemList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Sync UI Blocks Collection",
              description: "Free React UI blocks for modern web applications",
              numberOfItems: 10,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "CTA Blocks",
                  description: "4 free call-to-action sections",
                  url: "https://www.syncui.design/docs/blocks/cta",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Hero Blocks",
                  description: "3 free hero sections for landing pages",
                  url: "https://www.syncui.design/docs/blocks/hero",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Pricing Blocks",
                  description: "3 free pricing tables and plans",
                  url: "https://www.syncui.design/docs/blocks/pricing",
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
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundImage: "radial-gradient(#9ca3af 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            py: 8,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: isDarkMode
                ? "rgba(0, 0, 0, 0.4)"
                : "transparent",
            }}
          />

          <Container
            maxWidth="md"
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: { md: 2, xs: 0 },
              }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: 14,
                    fontWeight: 500,
                    background: !isDarkMode
                      ? "linear-gradient(120deg, rgba(255,255,255,0.9) 30%, rgba(245,245,245,0.9) 100%)"
                      : "linear-gradient(120deg, rgba(30,30,30,0.9) 30%, rgba(50,50,50,0.9) 100%)",
                    border: "1px solid",
                    borderColor: "divider",
                    backdropFilter: "blur(4px)",
                    textTransform: "none",
                    color: !isDarkMode ? "#008080" : "#00B5AD",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    pointerEvents: "none",
                  }}
                >
                  Sync UI Blocks
                </Button>
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{ fontWeight: 600, mt: 1 }}
                >
                  Build faster with ready-made UI blocks
                </Typography>
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    maxWidth: "700px",
                    mt: 2,
                    lineHeight: 1.6,
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    A collection of production-ready UI blocks built with MUI
                    and Motion (motion/react). Copy, customize, and integrate
                    seamlessly into your projects.
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    Production-ready UI blocks built with MUI & Motion. Copy and
                    integrate instantly
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ px: { lg: 0 }, py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
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
              <Box
                key={block.id}
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={() => router.push(block.route)}
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
                  "&:hover .preview": {
                    transform: "scale(1.04)",
                  },
                  "&:hover .icon": {
                    transform: "rotate(45deg)",
                  },
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
                      transition: "transform 0.3s ease-out",
                    }}
                  >
                    <Image
                      src={block.image}
                      alt={`${block.title} blocks - Free React ${block.description}`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 50vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
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
                      color: isDarkMode ? "#FFF" : "#000",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
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
            )
          )}
        </Box>
      </Container>
    </>
  );
};

export default Blocks;
