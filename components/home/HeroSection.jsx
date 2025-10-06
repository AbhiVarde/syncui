import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Tooltip,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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

const MotionButton = motion(Button);

const HeroSection = () => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: { md: 12, xs: 8 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/docs/datepickers" passHref>
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
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.1)"
                      : "rgba(255,255,255,0.12)",
                },
              }}
            >
              🗓️ New: Date Picker Components
              <RxArrowRight size={16} />
            </Box>
          </Link>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
            <Link href="/templates" passHref>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
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

        <Box sx={{ mt: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.05em",
                mb: "0px !important",
              }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Beautifully designed components
              </motion.span>
              <br />
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                built with MUI and Framer Motion
              </motion.span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              mt
              variant="body1"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              Accessible and customizable components that you can copy and paste
              into your apps. Built with MUI and Framer Motion for seamless
              integration and stunning animations. Free. Open Source. Ready for
              your next project.
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 2,
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
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 3,
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "0.3s",
                  flexShrink: 0,
                  padding: "6px 20px",
                  minHeight: "38px",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", lineHeight: 1 }}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, width: 0, marginRight: 0 }}
                        animate={{ opacity: 1, width: "auto", marginRight: 8 }}
                        exit={{ opacity: 0, width: 0, marginRight: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "inline-flex", overflow: "hidden" }}
                      >
                        <RxArrowRight size={19} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  Get Started
                  <AnimatePresence>
                    {!isHovered && (
                      <motion.span
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "inline-flex", overflow: "hidden" }}
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
