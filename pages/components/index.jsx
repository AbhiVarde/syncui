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

import AccordionVariants from "@/components/ui/components/Accordions";
import AutocompleteVariants from "@/components/ui/components/Autocompletes";
import AvatarVariants from "@/components/ui/components/Avatars";
import BackgroundVariants from "@/components/ui/components/Backgrounds";
import ButtonVariants from "@/components/ui/components/Buttons";
import CardVariants from "@/components/ui/components/Cards";
import CarouselVariants from "@/components/ui/components/Carousels";
import DatePickerVariants from "@/components/ui/components/DatePickers";
import DialogVariants from "@/components/ui/components/Dialogs";
import DockVariants from "@/components/ui/components/Docks";
import FormVariants from "@/components/ui/components/Forms";
import GridVariants from "@/components/ui/components/Grids";
import LoaderVariants from "@/components/ui/components/Loaders";
import PaginationVariants from "@/components/ui/components/Paginations";
import PointerVariants from "@/components/ui/components/Pointers";
import SeparatorVariants from "@/components/ui/components/Separators";
import { SkeletonCard } from "@/components/ui/components/Skeletons";
import TableVariants from "@/components/ui/components/Tables";
import TabVariants from "@/components/ui/components/Tabs";
import TextFieldVariants from "@/components/ui/components/TextFields";
import TextVariants from "@/components/ui/components/Texts";
import TimePickerVariants from "@/components/ui/components/TimePickers";

const componentMeta = {
  Accordions: {
    preview: <AccordionVariants variant="minimal" />,
    count: 4,
    description: "Expandable content panels",
  },
  Autocompletes: {
    preview: <AutocompleteVariants variant="basic" />,
    count: 5,
    description: "Searchable dropdown inputs",
  },
  Avatars: {
    preview: <AvatarVariants variant="overlappingCircles" />,
    count: 4,
    description: "User avatar groups and stacks",
  },
  Backgrounds: {
    preview: <BackgroundVariants variant="geminiWave" />,
    count: 8,
    description: "Animated section backgrounds",
  },
  Buttons: {
    preview: <ButtonVariants variant="neubrutalism" />,
    count: 10,
    description: "Interactive button styles",
  },
  Cards: {
    preview: <CardVariants variant="dynamicOverlay" preview />,
    count: 6,
    description: "Content and media cards",
  },
  Carousels: {
    preview: <CarouselVariants variant="fade" preview />,
    count: 4,
    description: "Image and content carousels",
  },
  DatePickers: {
    preview: <DatePickerVariants variant="single" />,
    count: 4,
    description: "Calendar date selection",
  },
  Dialogs: {
    preview: <DialogVariants variant="slideUp" />,
    count: 8,
    description: "Modal and dialog windows",
  },
  Docks: {
    preview: <DockVariants variant="modern" />,
    count: 4,
    description: "macOS-style app docks",
  },
  Forms: {
    preview: <FormVariants variant="login" preview />,
    count: 4,
    description: "Login, register, and contact forms",
  },
  Grids: {
    preview: <GridVariants variant="minimalCards" />,
    count: 5,
    description: "Image and content grid layouts",
  },
  Loaders: {
    preview: <LoaderVariants variant="fadingSquares" />,
    count: 8,
    description: "Loading state animations",
  },
  Paginations: {
    preview: <PaginationVariants variant="simple" />,
    count: 8,
    description: "Page navigation controls",
  },
  Pointers: {
    preview: <PointerVariants variant="followingRing" />,
    count: 6,
    description: "Custom cursor effects",
  },
  Separators: {
    preview: <SeparatorVariants variant="zigzag" />,
    count: 7,
    description: "Section divider styles",
  },
  Skeletons: {
    preview: <SkeletonCard variant="shimmer" />,
    count: 3,
    description: "Loading placeholder skeletons",
  },
  Tables: {
    preview: <TableVariants variant="modern" preview />,
    count: 3,
    description: "Data tables with sorting",
  },
  Tabs: {
    preview: <TabVariants variant="floatingBackground" />,
    count: 4,
    description: "Tabbed navigation",
  },
  TextFields: {
    preview: <TextFieldVariants variant="endIcon" />,
    count: 6,
    description: "Text input variations",
  },
  Texts: {
    preview: <TextVariants variant="videoText" />,
    count: 11,
    description: "Animated text effects",
  },
  TimePickers: {
    preview: <TimePickerVariants variant="12hour" />,
    count: 4,
    description: "Time selection inputs",
  },
};

const normalize = (s) => (s || "").toLowerCase().replace(/\s+/g, "");

const componentMetaByNormalizedTitle = Object.fromEntries(
  Object.entries(componentMeta).map(([key, val]) => [normalize(key), val]),
);

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
        ...componentMetaByNormalizedTitle[normalize(item.title)],
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [docsTree]);

  return (
    <>
      <Head>
        <title>Components // Sync UI</title>
        <meta
          name="description"
          content="Browse 125+ free animated React components built with MUI and Motion. Includes Buttons, Cards, Tables, Forms, Date Pickers, Loaders, Avatars, Dialogs, Docks, and more. Part of ▲ Vercel OSS Program Spring '26."
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
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent(
            "125+ Free Animated React Components",
          )}&type=Components`}
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
          content={`https://www.syncui.design/api/og?title=${encodeURIComponent(
            "125+ Free Animated React Components",
          )}&type=Components`}
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
                  Sync UI Components
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

      <Container maxWidth="md" sx={{ px: { lg: 0 }, py: 5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {componentsList.map((component, index) => (
            <Box
              key={component.id}
              component={Link}
              href={component.route}
              sx={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              {component.preview ? (
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
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "transparent",
                    p: 1.5,
                    minWidth: 0,
                    width: "100%",
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
                      height: 150,
                      overflow: "hidden",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "background.default",
                      pointerEvents: "none",
                      userSelect: "none",
                      "& *": {
                        pointerEvents: "none !important",
                        userSelect: "none !important",
                      },
                    }}
                  >
                    {component.preview}
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
                      <Typography variant="body1" fontWeight={500} noWrap>
                        {component.title}
                      </Typography>
                      {component.count && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {component.count} variants
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      disableRipple
                      sx={{
                        p: 0,
                        color: "text.primary",
                        flexShrink: 0,
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      <Box
                        className="icon"
                        sx={{
                          display: "inline-flex",
                          transition:
                            "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                      </Box>
                    </IconButton>
                  </Box>

                  {component.description && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      sx={{
                        px: 0.5,
                        mt: -1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {component.description}
                    </Typography>
                  )}
                </Box>
              ) : (
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
                    minWidth: 0,
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&:hover": { backgroundColor: "action.hover" },
                    "&:hover .icon": { transform: "rotate(45deg)" },
                  }}
                >
                  <Typography variant="body2" fontWeight={500} noWrap>
                    {component.title}
                  </Typography>
                  <IconButton disableRipple sx={{ p: 0, flexShrink: 0 }}>
                    <Box
                      className="icon"
                      sx={{
                        display: "inline-flex",
                        transition:
                          "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                    </Box>
                  </IconButton>
                </Box>
              )}
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
