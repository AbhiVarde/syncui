import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Tooltip,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { RxArrowRight } from "react-icons/rx";
import Link from "next/link";
import {
  SiReact,
  SiNextdotjs,
  SiFramer,
  SiJavascript,
  SiMui,
} from "react-icons/si";
import { IoSparkles } from "react-icons/io5";

const MotionButton = motion.create(Button);

const fastTransition = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
};

const HeroSection = () => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: { md: 12, xs: 8 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={fastTransition}
        >
          <Link href="/docs/timepickers" passHref>
            <Box
              component="button"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.25,
                py: 0.75,
                mb: 1.5,
                borderRadius: theme.shape.borderRadius * 2,
                fontSize: 14,
                fontWeight: 500,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.08)",
                border: "none",
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.text.primary
                    : "rgba(255,255,255,0.9)",
                cursor: "pointer",
                transition: "background-color 0.12s ease",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.1)"
                      : "rgba(255,255,255,0.12)",
                },
              }}
            >
              ⏰ New: Time Picker Components
              <RxArrowRight size={16} />
            </Box>
          </Link>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
            <Link href="/templates" passHref>
              <MotionButton
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 40,
                  mass: 0.3,
                }}
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
                  color: "text.primary",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IoSparkles size={16} />
                  Introducing Templates
                </Box>
              </MotionButton>
            </Link>

            <Box
              component="a"
              href="https://community.vercel.com/t/sync-ui-animated-ui-kit-with-mui-framer-motion-next-js-vercel/18039"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <MotionButton
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 40,
                  mass: 0.3,
                }}
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
                  color: "text.primary",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  willChange: "transform",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src="https://vercel.com/favicon.ico"
                    alt="Vercel"
                    width="16"
                    height="16"
                    style={{ borderRadius: "2px" }}
                  />
                  Community Showcase
                </Box>
              </MotionButton>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ ...fastTransition, delay: 0.03 }}
        >
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.05em",
                mb: 2,
              }}
            >
              Beautifully designed components
              <br />
              built with MUI and Framer Motion
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ ...fastTransition, delay: 0.06 }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 400, color: "text.secondary", mb: 3 }}
          >
            Accessible and customizable components that you can copy and paste
            into your apps. Built with MUI and Framer Motion for seamless
            integration and stunning animations. Free. Open Source. Ready for
            your next project.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ ...fastTransition, delay: 0.09 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 3,
              alignItems: "center",
            }}
          >
            {[
              { Icon: SiMui, title: "MUI", color: "#007FFF" },
              { Icon: SiJavascript, title: "JavaScript", color: "#F7DF1E" },
              { Icon: SiReact, title: "React", color: "#61DAFB" },
              {
                Icon: SiNextdotjs,
                title: "Next.js",
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
              },
              { Icon: SiFramer, title: "Framer Motion", color: "#FF0050" },
            ].map(({ Icon, title, color }) => (
              <Tooltip arrow key={title} title={title} placement="top">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color,
                  }}
                >
                  <Icon size={32} />
                </Box>
              </Tooltip>
            ))}
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ ...fastTransition, delay: 0.12 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Link href="/docs" passHref>
              <MotionButton
                variant="contained"
                color="primary"
                size="large"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 40,
                  mass: 0.3,
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  padding: "6px 20px",
                  minHeight: "38px",
                  willChange: "transform",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    lineHeight: 1,
                    minWidth: "130px",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence initial={false} mode="wait">
                    {isHovered && (
                      <motion.span
                        key="left-arrow"
                        initial={{ opacity: 0, width: 0, marginRight: 0 }}
                        animate={{ opacity: 1, width: "auto", marginRight: 8 }}
                        exit={{ opacity: 0, width: 0, marginRight: 0 }}
                        transition={{
                          duration: 0.1,
                          ease: [0.16, 1, 0.3, 1],
                          opacity: { duration: 0.06 },
                        }}
                        style={{
                          display: "inline-flex",
                          overflow: "hidden",
                          willChange: "width, opacity",
                        }}
                      >
                        <RxArrowRight size={19} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  Get Started
                  <AnimatePresence initial={false} mode="wait">
                    {!isHovered && (
                      <motion.span
                        key="right-arrow"
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{
                          duration: 0.1,
                          ease: [0.16, 1, 0.3, 1],
                          opacity: { duration: 0.06 },
                        }}
                        style={{
                          display: "inline-flex",
                          overflow: "hidden",
                          willChange: "width, opacity",
                        }}
                      >
                        <RxArrowRight size={19} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Box>
              </MotionButton>
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default HeroSection;
