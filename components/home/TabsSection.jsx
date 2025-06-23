import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  Button,
  Divider,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { RiCodeSSlashLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import DockVariants from "../ui/Docks";

import ButtonVariants from "../ui/Buttons";
import CardVariants from "../ui/Cards";
import CarouselVariants from "../ui/Carousels";
import TableVariants from "../ui/Tables";
import TextVariants from "../ui/Texts";
import AvatarVariants from "../ui/Avatars";
import LoaderVariants from "../ui/Loaders";
import SeparatorVariants from "../ui/Separators";
import BackgroundVariants from "../ui/Backgrounds";
import MarqueeVariants from "../ui/Marquees";
import TabVariants from "../ui/Tabs";
import PaginationVariants from "../ui/Paginations";
import PointerVariants from "../ui/Pointers";
import GridVariants from "../ui/Grids";
import AccordionVariants from "../ui/Accordions";
import TextFieldVariants from "../ui/TextFields";

const componentVariants = {
  accordions: ["brutalist", "dashed", "minimal", "modern"],
  cards: [
    "lens",
    "twitterCarousel",
    "meteorShower",
    "dynamicOverlay",
    "contentCard",
    "animatedBorder",
  ],
  grids: ["masonry", "bento", "glassmorphism", "organicShapes", "minimalCards"],
  docks: ["modern", "categorical", "dynamic", "glass"],
  pointers: [
    "glowingDot",
    "followingRing",
    "magneticArrow",
    "trailingDots",
    "emojiFollower",
    "gradientBlob",
  ],
  carousels: ["scale", "parallax", "fade", "cards"],
  marquees: ["horizontal", "vertical", "diagonal"],
  buttons: [
    "neubrutalism",
    "animatedBorder",
    "gradientShine",
    "underline",
    "sendIcon",
    "expand",
    "hoverArrow",
    "glitch",
    "outlineFill",
    "elasticSlide",
  ],
  loaders: [
    "pulsatingDots",
    "morphingCube",
    "pulsatingRing",
    "circularSweep",
    "fadingSquares",
    "orbitalSpin",
    "triadicOrbit",
    "barWave",
  ],
  backgrounds: [
    "geminiWave",
    "gradientMesh",
    "movingShapes",
    "flickeringGrid",
    "interactiveGrid",
    "grid",
    "magneticConnections",
    "dots",
  ],
  avatars: [
    "modernShowcase",
    "floatingCards",
    "minimalGrid",
    "overlappingCircles",
  ],
  tabs: [
    "slidingUnderline",
    "floatingBackground",
    "elevatedCards",
    "growingBackground",
  ],
  tables: ["modern", "minimal", "expandable"],
  paginations: [
    "simple",
    "numbered",
    "compact",
    "with-dropdown",
    "rows-per-page",
    "fading",
    "sliding",
    "expanding",
  ],
  separators: [
    { variant: "dashed", label: "Dashed" },
    { variant: "icon", label: "Icon" },
    { variant: "zigzag", label: "Zigzag" },
    { variant: "gradient", label: "Gradient" },
    { variant: "shimmer", label: "Shimmer" },
    { variant: "dotted", label: "Dotted" },
    { variant: "starry", label: "Starry" },
  ],
  texts: [
    "videoText",
    "blurIn",
    "splitReveal",
    "staggeredScale",
    "lettersPullUp",
    "waveEffect",
    "neonGlow",
    "wordsPullUp",
    "typewriter",
    "rotateWords",
    "morphingText",
  ],
  textfields: ["endIcon", "startInline", "endInline", "currency", "aiPrompt"],
};

const SectionContent = ({ title, description, children, url }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {description}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          {children}
        </Box>
        <Divider />
        <Box
          sx={{
            p: 1,
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="text"
            startIcon={<RiCodeSSlashLine />}
            onClick={() => router.push(url)}
            sx={{
              color: theme.palette.mode === "light" ? "black" : "white",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Get Code
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

const TabsSection = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: "background.default" }}>
      <Container
        maxWidth="md"
        sx={{ paddingX: { md: "0px !important", xs: "16px !important" } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Modern UI Components
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              A handcrafted collection of responsive, customizable components
              designed to elevate your next web project.
            </Typography>
          </Box>

          <SectionContent
            title="Interactive Buttons"
            description="Captivating action elements with unique hover animations and tactile feedback."
            url="/docs/buttons"
          >
            {componentVariants.textfields.map((variant, index) => (
              <TextFieldVariants key={index} variant={variant} />
            ))}
          </SectionContent>

          {/* Buttons Section - Primary interaction elements first */}
          <SectionContent
            title="Interactive Buttons"
            description="Captivating action elements with unique hover animations and tactile feedback."
            url="/docs/buttons"
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {componentVariants.buttons.map((variant) => (
                <Box key={variant} sx={{ m: 1 }}>
                  <ButtonVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Cards Section - Content containers */}
          <SectionContent
            title="Elegant Cards"
            description="Sophisticated content containers with smooth hover effects and adaptive layouts."
            url="/docs/cards"
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {componentVariants.cards.map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <CardVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Pointers Section */}
          <SectionContent
            title="Magnetic Pointers"
            description="Captivating cursor effects that respond intelligently to user movements and interactions."
            url="/docs/pointers"
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 4,
                justifyItems: "center",
              }}
            >
              {componentVariants.pointers.map((variant) => (
                <Box key={variant} sx={{ width: "100%" }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                      mb: 2,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {variant
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                  <Box
                    sx={{
                      height: 250,
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <PointerVariants variant={variant} />
                  </Box>
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Backgrounds Section */}
          <SectionContent
            title="Immersive Backgrounds"
            description="Mesmerizing animated patterns that create depth and visual interest in your layouts."
            url="/docs/backgrounds"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              {componentVariants.backgrounds.map((variant, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <BackgroundVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Loaders Section */}
          <SectionContent
            title="Sophisticated Loaders"
            description="Engaging wait-time animations that reflect your brand's personality and style."
            url="/docs/loaders"
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {componentVariants.loaders.map((variant) => (
                <Box key={variant} sx={{ m: 1 }}>
                  <LoaderVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Grids Section */}
          <SectionContent
            title="Responsive Grids"
            description="Beautifully animated layouts that adapt and transform with your content."
            url="/docs/grids"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              {componentVariants.grids.map((variant, index) => (
                <Box key={index} sx={{ m: 1 }}>
                  <GridVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Accordions Section */}
          <SectionContent
            title="Collapsible Accordions"
            description="Versatile content organizers with elegant transitions and interactive states."
            url="/docs/accordions"
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {componentVariants.accordions.map((variant) => (
                <Box key={variant}>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      my: 1,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {variant
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                    Style
                  </Typography>
                  <AccordionVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Tabs Section - Navigation elements */}
          <SectionContent
            title="Seamless Tabs"
            description="Intuitive navigation elements with graceful transitions between content sections."
            url="/docs/tabs"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 4,
              }}
            >
              {componentVariants.tabs.map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      my: 1,
                      textTransform: "capitalize",
                      fontWeight: 400,
                    }}
                  >
                    {variant
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                  <TabVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Tables Section - Data display */}
          <SectionContent
            title="Adaptive Tables"
            description="Responsive data grids with built-in animations and intelligent sorting capabilities."
            url="/docs/tables"
          >
            <AnimatePresence mode="wait">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: "100%",
                }}
              >
                {componentVariants.tables.map((variant) => (
                  <Box
                    key={variant}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    sx={{
                      width: "100%",
                      minHeight: "400px",
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="h5"
                      textAlign="center"
                      sx={{
                        mb: 2,
                        textTransform: "capitalize",
                        fontWeight: 500,
                      }}
                    >
                      {variant === "modern" &&
                        "Modern Table - Full-Featured Data Grid"}
                      {variant === "minimal" &&
                        "Minimal Table - Streamlined Design"}
                      {variant === "expandable" &&
                        "Expandable Table - Collapsible Details"}
                    </Typography>
                    <TableVariants variant={variant} />
                  </Box>
                ))}
              </Box>
            </AnimatePresence>
          </SectionContent>

          {/* Carousels Section */}
          <SectionContent
            title="Cinematic Carousels"
            description="Immersive content galleries with smooth-sliding transitions for stunning showcases."
            url="/docs/carousels"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                width: "100%",
              }}
            >
              {componentVariants.carousels.map((variant) => (
                <Box
                  key={variant}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  sx={{
                    width: "100%",
                    minHeight: "400px",
                    position: "relative",
                  }}
                >
                  <CarouselVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Paginations Section */}
          <SectionContent
            title="Intuitive Pagination"
            description="Effortless page navigation with polished selection components and smooth transitions."
            url="/docs/paginations"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 4,
              }}
            >
              {componentVariants.paginations.map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      my: 1,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {variant
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                    Pagination
                  </Typography>

                  <PaginationVariants
                    variant={variant}
                    currentPage={3}
                    totalPages={10}
                  />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Avatars Section */}
          <SectionContent
            title="Expressive Avatars"
            description="Personalized profile containers with creative hover states and grouping options."
            url="/docs/avatars"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {componentVariants.avatars.map((variant) => (
                <Box key={variant}>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      my: 1.5,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {variant
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                  <AvatarVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Docks Section */}
          <SectionContent
            title="Refined Docks"
            description="Innovative navigation patterns with seamless interactions and smooth scaling effects."
            url="/docs/docks"
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {componentVariants.docks.map((variant) => (
                <Box key={variant}>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {variant
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                    Style
                  </Typography>
                  <DockVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Animated Typography Section */}
          <SectionContent
            title="Kinetic Typography"
            description="Memorable text animations with precise motion effects that enhance readability."
            url="/docs/texts"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 4,
              }}
            >
              {componentVariants.texts.map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <TextVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Marquees Section */}
          <SectionContent
            title="Flowing Marquees"
            description="Natural content movement with smooth-scrolling text and element animations."
            url="/docs/marquees"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 4,
              }}
            >
              {componentVariants.marquees.map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      my: 2,
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {variant
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                    Marquee
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <MarqueeVariants variant={variant} />
                  </Box>
                </Box>
              ))}
            </Box>
          </SectionContent>

          {/* Separators Section */}
          <SectionContent
            title="Artistic Dividers"
            description="Eye-catching separator designs that structure content and adapt to your theme."
            url="/docs/separators"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 4,
              }}
            >
              {componentVariants.separators.map((separatorProps, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: 500,
                    }}
                  >
                    {separatorProps.label
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                  </Typography>
                  <SeparatorVariants {...separatorProps} width="80%" />
                </Box>
              ))}
            </Box>
          </SectionContent>
        </Box>
      </Container>
    </Box>
  );
};

export default TabsSection;
