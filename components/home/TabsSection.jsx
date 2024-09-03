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
import LoaderVariants from "../ui/Loaders";
import { useRouter } from "next/navigation";

const buttonVariants = [
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
];

const cardVariants = [
  "meteorShower",
  "animatedBorder",
  "multilayerStack",
  "infoCard",
  "neubrutalism",
  "3dCard",
];

const textVariants = [
  "gradualSpacing",
  "typingEffect",
  "staggeredFade",
  "rotateWords",
  "lettersPullUp",
  "wordsPullUp",
  "blurIn",
  "textFade",
];

const loaderVariants = [
  "pulsatingDots",
  "morphingCube",
  "pulsatingRing",
  "circularSweep",
  "fadingSquares",
  "orbitalSpin",
  "triadicOrbit",
  "barWave",
];

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
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[80],
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
              {buttonVariants.map((variant) => (
                <Box key={variant} sx={{ m: 1 }}>
                  <ButtonVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Dynamic Cards"
            description="Discover our range of dynamic card components that add depth and interactivity to your layouts."
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {cardVariants.map((variant) => (
                <Box key={variant} sx={{ m: 1 }}>
                  <CardVariants variant={variant} />
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
              {loaderVariants.map((variant) => (
                <Box key={variant} sx={{ m: 1 }}>
                  <LoaderVariants variant={variant} />
                </Box>
              ))}
            </Box>
          </SectionContent>

          <SectionContent
            title="Animated Text"
            description="Bring your content to life with these eye-catching text animations, perfect for headers, highlights, and more."
            url="/docs/texts"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              {textVariants.map((variant) => (
                <Box
                  key={variant}
                  sx={{
                    m: 1,
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
