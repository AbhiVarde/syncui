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
import { useRouter } from "next/navigation";
import DockVariants from "../ui/Docks";

const componentVariants = {
  cards: [
    "lens",
    "twitterCarousel",
    "meteorShower",
    "dynamicOverlay",
    "contentCard",
    "animatedBorder",
  ],
  docks: ["modern", "categorical", "dynamic", "glass"],
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
    "movingShapes",
    "gradientMesh",
    "flickeringGrid",
    "dots",
    "grid",
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
        sx={{ paddingX: { sm: "0px !important", xs: "16px !important" } }}
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

          {/* Cards Section */}
          <SectionContent
            title="Smart Cards"
            description="Showcase content elegantly with these responsive card designs featuring smooth hover effects and dynamic layouts."
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

          {/* Docks Section */}
          <SectionContent
            title="Refined Docks"
            description="Explore innovative dock animation patterns designed to enhance user experience and showcase seamless interactions for your projects."
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
                <>
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
                </>
              ))}
            </Box>
          </SectionContent>

          {/* Carousels Section */}
          <SectionContent
            title="Seamless Carousels"
            description="Present your content in motion with these smooth-sliding galleries, perfect for showcasing products or stories."
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

          {/* Marquees Section */}
          <SectionContent
            title="Dynamic Marquees"
            description="Add natural movement to your content with these smooth-flowing text and element animations."
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

          {/* Buttons Section */}
          <SectionContent
            title="Responsive Buttons"
            description="Capture user attention with these beautifully crafted action elements featuring unique hover and click animations."
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

          {/* Loaders Section */}
          <SectionContent
            title="Elegant Loaders"
            description="Keep users engaged during wait times with these sophisticated animation patterns that reflect your brand's personality."
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

          {/* Backgrounds Section */}
          <SectionContent
            title="Fluid Backgrounds"
            description="Transform your layouts with mesmerizing animated patterns that create depth and visual interest."
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

          {/* Avatars Section */}
          <SectionContent
            title="Expressive Avatars"
            description="Personalize user profiles with these dynamic image containers featuring creative hover states and grouping options."
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
                <>
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
                </>
              ))}
            </Box>
          </SectionContent>

          {/* Tabs Section */}
          <SectionContent
            title="Intuitive Tabs"
            description="Guide users through content sections with these smooth-transitioning navigation elements."
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

          {/* Tables Section */}
          <SectionContent
            title="Content Tables"
            description="Interactive data tables with built-in animations, sorting, and responsive layouts for efficient data presentation."
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

          {/* Paginations Section */}
          <SectionContent
            title="Smooth Pagination"
            description="Navigate through multi-page content effortlessly with these polished page selection components."
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

          {/* Separators Section */}
          <SectionContent
            title="Creative Dividers"
            description="Structure your content with these eye-catching separator designs that adapt to your theme seamlessly."
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

          {/* Typography Section */}
          <SectionContent
            title="Animated Typography"
            description="Make your text memorable with these precisely crafted motion effects that enhance readability and impact."
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
        </Box>
      </Container>
    </Box>
  );
};

export default TabsSection;
