import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Image from "next/image";

const blockCategories = [
  {
    id: 1,
    title: "Hero Blocks",
    image: "/images/hero.png",
    count: 3,
    route: "/docs/blocks/hero",
    comingSoon: false,
  },
];

const Blocks = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <NextSeo
        title="Blocks // Sync UI"
        description="Production-ready UI blocks built with MUI & Motion (motion/react). Copy, customize, and integrate seamlessly into your projects."
        canonical="https://www.syncui.design/blocks"
        openGraph={{
          url: "https://www.syncui.design/blocks",
          title: "Blocks // Sync UI",
          description:
            "Production-ready UI blocks built with MUI & Motion (motion/react). Copy, customize, and integrate seamlessly into your projects.",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: "Sync UI Blocks",
            },
          ],
          siteName: "Sync UI",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
        }}
      />
      <Head>
        <title>Blocks // Sync UI</title>
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
                    and Framer Motion. Copy, customize, and integrate seamlessly
                    into your projects.
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    Production-ready UI blocks built with MUI & Motion. Copy and
                    integrate instantly.
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
          {blockCategories.map((block) => (
            <Box
              key={block.id}
              component={motion.div}
              onClick={() => router.push(block.route)}
              sx={{
                p: 1,
                cursor: "pointer",
                borderRadius: "16px",
                border: `1px dashed ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.2)"
                }`,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                "&:hover img": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "180px",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
              </Box>

              <Divider
                sx={{
                  borderStyle: "dashed",
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.2)",
                }}
              />

              <Box textAlign="center">
                <Typography variant="h6" fontWeight={500}>
                  {block.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  {block.count} blocks
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Blocks;
