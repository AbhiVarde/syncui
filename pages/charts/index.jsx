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
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import LineChart from "@/components/ui/charts/line";
import BarChart from "@/components/ui/charts/bar";
import Donut from "@/components/ui/charts/donut";
import Stat from "@/components/ui/charts/stat";
import Progress from "@/components/ui/charts/progress";
import Heatmap from "@/components/ui/charts/heatmap";

const chartCategories = [
  {
    id: 1,
    title: "Line",
    preview: <LineChart variant="area" height={160} />,
    variants: 2,
    route: "/docs/charts/line",
    description: "Trend lines with an animated headline value",
  },
  {
    id: 2,
    title: "Bar",
    preview: <BarChart variant="ranked" height={160} />,
    variants: 2,
    route: "/docs/charts/bar",
    description: "Comparisons with spring-physics growth",
  },
  {
    id: 3,
    title: "Donut",
    preview: <Donut variant="default" height={160} />,
    variants: 2,
    route: "/docs/charts/donut",
    description: "Breakdowns with a counting center total",
  },
  {
    id: 4,
    title: "Stat",
    preview: <Stat variant="default" />,
    variants: 2,
    route: "/docs/charts/stat",
    description: "Single-metric cards for dashboards",
  },
  {
    id: 5,
    title: "Progress",
    preview: <Progress variant="radial" />,
    variants: 2,
    route: "/docs/charts/progress",
    description: "Linear and radial gauges for quota and usage",
  },
  {
    id: 6,
    title: "Heatmap",
    preview: <Heatmap variant="compact" />,
    variants: 2,
    route: "/docs/charts/heatmap",
    description: "GitHub-style activity grids with weighted intensity",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const Charts = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <Head>
        <title>Charts // Sync UI</title>
        <meta
          name="description"
          content="Get free animated chart components including Line, Bar, Donut, Stat, Progress, and Heatmap. Built with Recharts, MUI, and Motion. Part of ▲ Vercel OSS Program Spring '26."
        />
        <link rel="canonical" href="https://www.syncui.design/charts" />
        <meta
          name="keywords"
          content="React chart components, Recharts, animated charts, line chart, bar chart, donut chart, stat card, progress gauge, activity heatmap, dashboard components, Next.js charts, MUI charts, Vercel OSS"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.syncui.design/charts" />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="Free Animated Chart Components | Sync UI"
        />
        <meta
          property="og:description"
          content="Get free animated chart components including Line, Bar, Donut, Stat, Progress, and Heatmap. Built with Recharts, MUI, and Motion."
        />
        <meta
          key="og-image"
          property="og:image"
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent("Production-ready Charts")}&type=Charts`}
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI Charts"
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
          content="Free Animated Chart Components | Sync UI"
        />
        <meta
          name="twitter:description"
          content="Get free animated chart components including Line, Bar, Donut, Stat, Progress, and Heatmap. Built with Recharts, MUI, and Motion."
        />
        <meta
          key="tw-image"
          name="twitter:image"
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent("Production-ready Charts")}&type=Charts`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Sync UI Charts",
              description:
                "Free animated chart components including Line, Bar, Donut, Stat, Progress, and Heatmap",
              url: "https://www.syncui.design/charts",
              numberOfItems: 6,
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
                  name: "Charts",
                  item: "https://www.syncui.design/charts",
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
              name: "Sync UI Chart Categories",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Line Charts",
                  url: "https://www.syncui.design/docs/charts/line",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Bar Charts",
                  url: "https://www.syncui.design/docs/charts/bar",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Donut Charts",
                  url: "https://www.syncui.design/docs/charts/donut",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Stat Cards",
                  url: "https://www.syncui.design/docs/charts/stat",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Progress Gauges",
                  url: "https://www.syncui.design/docs/charts/progress",
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Activity Heatmap",
                  url: "https://www.syncui.design/docs/charts/heatmap",
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
                  Sync UI Charts
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
                    Data, visualized cleanly
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
                      Animated chart components built with Recharts, MUI, and
                      Motion. Copy, customize, and ship.
                    </Box>

                    <Box
                      component="span"
                      sx={{ display: { xs: "inline", sm: "none" } }}
                    >
                      Animated chart components built with Recharts and Motion.
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
          {chartCategories.map((chart) => (
            <Box
              key={chart.id}
              component={Link}
              href={chart.route}
              sx={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                minWidth: 0,
              }}
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
                  overflow: "hidden",
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
                  }}
                >
                  <Box sx={{ width: "100%", transform: "scale(0.94)" }}>
                    {chart.preview}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 0.5,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1,
                      minWidth: 0,
                      overflow: "hidden",
                    }}
                  >
                    <Typography variant="h6" fontWeight={500} noWrap>
                      {chart.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {chart.variants} variants
                    </Typography>
                  </Box>
                  <IconButton
                    disableRipple
                    aria-label={`View ${chart.title} chart`}
                    sx={{
                      p: 0,
                      color: "text.primary",
                      flexShrink: 0,
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
                  noWrap
                  sx={{
                    px: 0.5,
                    mt: -1.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {chart.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Charts;
