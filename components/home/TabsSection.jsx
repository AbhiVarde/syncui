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
import { motion } from "framer-motion";
import { RiCodeSSlashLine } from "react-icons/ri";
import ButtonVariants from "../ui/Buttons";
import CardVariants from "../ui/Cards";
import TextVariants from "../ui/Texts";
import AvatarVariants from "../ui/Avatars";
import LoaderVariants from "../ui/Loaders";
import SeparatorVariants from "../ui/Separators";
import BackgroundVariants from "../ui/Backgrounds";
import MarqueeVariants from "../ui/Marquees";
import TabVariants from "../ui/Tabs";
import PaginationVariants from "../ui/Paginations";
import { useRouter } from "next/navigation";

const componentVariants = {
  buttons: [
    "neubrutalism",
    "animatedBorder",
    "gradientShine",
    "underline",
    "sendIcon",
    "expand",
    "glitch",
    "outlineFill",
    "elasticSlide",
    "magnetic",
  ],
  cards: [
    "dynamicOverlay",
    "contentCard",
    "meteorShower",
    "animatedBorder",
    "multilayerStack",
    "infoCard",
    "neubrutalism",
    "3dCard",
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
    "gradualSpacing",
    "typingEffect",
    "staggeredFade",
    "rotateWords",
    "lettersPullUp",
    "wordsPullUp",
    "blurIn",
    "textFade",
  ],
  avatars: [
    "overlappingCircles",
    "animatedTooltip",
    "statusIndicator",
    "groupedAvatars",
  ],
  tabs: [
    "slidingUnderline",
    "floatingBackground",
    "elevatedCards",
    "growingBackground",
  ],
  paginations: ["fading", "sliding", "expanding", "orbit"],
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
        <Box sx={{ p: title === "Interactive Buttons" ? 2.5 : 4 }}>
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
      <Container maxWidth="md">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Elevate Your UI Design
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              Discover our curated collection of polished, customizable
              components. Seamlessly integrate and enhance your user interface.
            </Typography>
          </Box>

          <SectionContent
            title="Dynamic Backgrounds"
            description="Enhance your UI with these eye-catching, animated background designs that add depth and interactivity to your layouts."
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

          <SectionContent
            title="Engaging Cards"
            description="Discover our range of dynamic card components that add depth and interactivity to your layouts."
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
                <Box key={variant}>
                  <CardVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Interactive Buttons"
            description="Explore our collection of beautifully designed, interactive buttons that will enhance your user interface."
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

          <SectionContent
            title="Captivating Loaders"
            description="Engage your users with these unique, smoothly animated loaders that add a touch of sophistication to your loading states."
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

          <SectionContent
            title="Reactive Marquees"
            description="Showcase content with these engaging, animated marquees that add movement and interest to your layouts."
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
              {["horizontal", "vertical", "3D"].map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    m: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MarqueeVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Transformative Tabs"
            description="Explore our collection of engaging, animated tab designs that enhance user navigation and content organization."
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
                    m: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Interactive Paginations"
            description="Enhance your multi-page layouts with these smooth, animated pagination designs that improve user navigation."
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
                    justifyContent: "center",
                  }}
                >
                  <PaginationVariants
                    variant={variant}
                    currentPage={3}
                    totalPages={10}
                  />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Versatile Avatars"
            description="Enhance user profiles and interactions with these animated, eye-catching avatar designs."
            url="/docs/avatars"
          >
            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {componentVariants.avatars.map((variant) => (
                <Box key={variant} sx={{ m: 1 }}>
                  <AvatarVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Stylish Dividers"
            description="Add visual interest and structure to your layouts with these unique, theme-adaptive separator designs."
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
                  <SeparatorVariants {...separatorProps} width="80%" />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Animated Typography"
            description="Bring your content to life with these eye-catching text animations, perfect for headers, highlights, and more."
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
