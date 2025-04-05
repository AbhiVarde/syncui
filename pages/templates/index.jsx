import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { LuExternalLink, LuShoppingCart, LuCheck } from "react-icons/lu";
import Head from "next/head";

// Template data
const templatesData = [
  {
    id: "saas-template",
    title: "SaaS Template",
    src: "/videos/SaaS-Template.mp4",
    price: 45,
    description:
      "A modern, conversion-focused SaaS landing page with smooth animations. Fully responsive, highly customizable, and optimized for performance and lead generation.",
    features: [
      "Built for enterprise-level scalability",
      "Component-based architecture",
      "Feature, Pricing (Monthly/Yearly), and Contact pages",
      "Full policy set: Terms, Cookie, Privacy",
      "Engaging micro-interactions",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/saas-template-syncui",
    demoUrl: "https://saas-syncui.vercel.app/",
  },
  {
    id: "portfolio-template",
    title: "Portfolio Template",
    src: "/videos/Portfolio-Template.mov",
    price: 35,
    description:
      "Sleek portfolio template with micro-animations, dark mode, and smooth UX. Perfect for showcasing work, skills, and professional journey.",
    features: [
      "Three pages: Home, Work, Contact",
      "Dark/Light theme toggle",
      "Project showcase system",
      "Interactive contact form",
      "Animated custom cursor",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
    demoUrl: "https://portfolio-syncui.vercel.app/",
  },
];

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

const Templates = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const animations = {
    container: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          duration: 0.8,
        },
      },
    },
    item: {
      initial: { y: 30, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.7 },
      },
    },
    card: {
      initial: { y: 50, opacity: 0 },
      animate: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: i * 0.2,
        },
      }),
    },
    feature: {
      initial: { opacity: 0, x: -15 },
      animate: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: 0.2 + i * 0.1, duration: 0.6 },
      }),
    },
    video: {
      initial: { opacity: 0, scale: 0.92 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { delay: 0.3, duration: 0.9 },
      },
    },
    button: {
      initial: { opacity: 0, y: 15 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.6 },
      },
    },
  };

  return (
    <>
      <Head>
        <title>Templates // Sync UI</title>
      </Head>
      <Container maxWidth="xl" sx={{ px: "0px !important" }}>
        <MotionBox
          initial="initial"
          animate="animate"
          variants={animations.container}
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
            <MotionBox
              variants={animations.container}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: { md: 2, xs: 0 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MotionButton
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: 14,
                    fontWeight: 500,
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(120deg, rgba(255,255,255,0.9) 30%, rgba(245,245,245,0.9) 100%)"
                        : "linear-gradient(120deg, rgba(30,30,30,0.9) 30%, rgba(50,50,50,0.9) 100%)",
                    border: "1px solid",
                    borderColor: "divider",
                    backdropFilter: "blur(4px)",
                    textTransform: "none",
                    color: "#008080",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    pointerEvents: "none",
                  }}
                >
                  Sync UI Templates
                </MotionButton>
              </motion.div>

              <MotionTypography
                variant="h2"
                component="h1"
                sx={{ fontWeight: 700, mt: 1 }}
                variants={animations.item}
              >
                Premium UI templates for web applications
              </MotionTypography>

              <MotionTypography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  maxWidth: "700px",
                  mt: 2,
                  lineHeight: 1.6,
                }}
                variants={animations.item}
              >
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  Professionally designed, fully responsive, and highly
                  customizable UI templates built with MUI and Framer Motion.
                  Get started quickly and enhance your project's look and feel
                  instantly.
                </Box>
                <Box
                  component="span"
                  sx={{ display: { xs: "inline", sm: "none" } }}
                >
                  Professional UI templates built with MUI & Framer Motion.
                  Enhance your project's look instantly.
                </Box>
              </MotionTypography>
            </MotionBox>
          </Container>
        </MotionBox>

        <Container maxWidth="md" sx={{ px: { lg: 0 } }}>
          {templatesData.map((template, index) => (
            <MotionBox
              key={template.id}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: false,
                amount: 0.2,
                margin: "100px 0px 0px 0px",
              }}
              custom={index}
              variants={animations.card}
            >
              <Grid
                container
                spacing={6}
                alignItems="center"
                sx={{ my: { md: 5, sm: 3, xs: 2 } }}
              >
                {/* Template Info */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  order={{
                    xs: 2,
                    md: index % 2 === 0 ? 1 : 2,
                  }}
                >
                  <MotionBox
                    variants={animations.container}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <MotionTypography
                      variant="h4"
                      sx={{ fontWeight: 700 }}
                      variants={animations.item}
                    >
                      {template.title}
                    </MotionTypography>

                    <MotionTypography
                      variant="body1"
                      sx={{ color: alpha(theme.palette.text.primary, 0.8) }}
                      variants={animations.item}
                    >
                      {template.description}
                    </MotionTypography>

                    <MotionBox variants={animations.container} sx={{ my: 2 }}>
                      {template.features.map((feature, i) => (
                        <MotionBox
                          key={i}
                          custom={i}
                          variants={animations.feature}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            mb: 2,
                          }}
                        >
                          <Box sx={{ mt: 0.5, flexShrink: 0, mr: 1 }}>
                            <LuCheck
                              size={18}
                              style={{
                                color: "teal",
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: alpha(theme.palette.text.primary, 0.8),
                            }}
                          >
                            {feature}
                          </Typography>
                        </MotionBox>
                      ))}
                    </MotionBox>
                  </MotionBox>
                </Grid>

                {/* Video & Buttons */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  order={{
                    xs: 1,
                    md: index % 2 === 0 ? 2 : 1,
                  }}
                >
                  <MotionBox
                    variants={animations.video}
                    sx={{
                      position: "relative",
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      width: "100%",
                      aspectRatio: "16/9",
                    }}
                  >
                    {/* Border Animation */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -2,
                        left: -2,
                        right: -2,
                        bottom: -2,
                        borderRadius: "24px",
                        background: "transparent",
                        overflow: "hidden",
                        zIndex: 0,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: "-50%",
                          left: "-50%",
                          height: "200%",
                          width: "200%",
                          background:
                            "conic-gradient(from 0deg, transparent 0 340deg, #00B5AD 360deg)",
                          animation: "rotate 5s linear infinite",
                        },
                        "@keyframes rotate": {
                          from: { transform: "rotate(0deg)" },
                          to: { transform: "rotate(360deg)" },
                        },
                      }}
                    />

                    {/* Background */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 2,
                        left: 2,
                        right: 2,
                        bottom: 2,
                        borderRadius: "20px",
                        bgcolor: isDarkMode ? "#111" : "#f8f9fa",
                        zIndex: 1,
                      }}
                    />

                    {/* Video Container */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        zIndex: 2,
                        padding: "4px",
                        boxSizing: "border-box",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                          borderRadius: "18px",
                        }}
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          src={template.src}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </Box>
                  </MotionBox>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 3,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    {/* Get Access Button */}
                    <MotionButton
                      variants={animations.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variant="contained"
                      startIcon={<LuShoppingCart />}
                      component="a"
                      href={template.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode !== "light"
                            ? "linear-gradient(110deg, #fff 45%, #e4e4e7 55%, #fff)"
                            : "linear-gradient(110deg, #000 45%, #333 55%, #000)",
                        backgroundSize: "200% 100%",
                        animation: "shine 3s linear infinite",
                        color: theme.palette.mode !== "light" ? "#000" : "#FFF",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          borderColor: "divider",
                          backgroundSize: "200% 100%",
                        },
                        "@keyframes shine": {
                          "0%": { backgroundPosition: "200% 0" },
                          "100%": { backgroundPosition: "-200% 0" },
                        },
                      }}
                    >
                      Get Access - ${template.price} USD
                    </MotionButton>

                    {/* Live Preview Button */}
                    <MotionButton
                      variants={animations.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variant="outlined"
                      startIcon={<LuExternalLink />}
                      component="a"
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "text.primary",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      Live Preview
                    </MotionButton>
                  </Box>
                </Grid>
              </Grid>
            </MotionBox>
          ))}
        </Container>
      </Container>
    </>
  );
};

export default Templates;
