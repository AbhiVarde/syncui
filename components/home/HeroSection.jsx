import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Tooltip,
  useTheme,
} from "@mui/material";
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
import { motion } from "motion/react";

const HeroSection = () => {
  const theme = useTheme();

  // Common motion props for fade + upward movement
  const fadeUpProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <Container maxWidth="md" sx={{ py: { md: 12, xs: 8 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        {/* New Feature Link */}
        <Box
          component={motion.div}
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.05 }}
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
        </Box>

        {/* Buttons */}
        <Box
          component={motion.div}
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.15 }}
          sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}
        >
          <Link href="/templates" passHref>
            <Button
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
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IoSparkles size={16} />
                Introducing Templates
              </Box>
            </Button>
          </Link>

          <Box
            component="a"
            href="https://community.vercel.com/t/sync-ui-animated-ui-kit-with-mui-framer-motion-next-js-vercel/18039"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <Button
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
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
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
            </Button>
          </Box>
        </Box>

        {/* Heading */}
        <Box
          component={motion.div}
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.25 }}
          sx={{ mt: 1 }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: 800, letterSpacing: "-0.05em", mb: 2 }}
          >
            Beautifully designed components
            <br />
            built with MUI and Framer Motion
          </Typography>
        </Box>

        {/* Description */}
        <Box
          component={motion.div}
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.35 }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 400, color: "text.secondary", mb: 3 }}
          >
            Accessible and customizable components that you can copy and paste
            into your apps. Built with MUI and Framer Motion for seamless
            integration and smooth animations.
          </Typography>
        </Box>

        {/* Icons */}
        <Box
          component={motion.div}
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.45 }}
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

        {/* CTA Button */}
        <Box
          component={motion.div}
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.55 }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Link href="/docs" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                padding: "6px 20px",
                minHeight: "38px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  lineHeight: 1,
                  minWidth: "120px",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                Get Started <RxArrowRight size={19} />
              </Box>
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
