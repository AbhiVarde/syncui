import { useState, useEffect } from "react";
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

const HeroSection = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: { md: 12, xs: 8 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      >
        <Box
          sx={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.2s ease-out 0.03s, transform 0.2s ease-out 0.03s",
          }}
        >
          <Link href="/docs/components/skeletons" passHref>
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
                transition: "background-color 0.15s ease",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.1)"
                      : "rgba(255,255,255,0.12)",
                },
              }}
            >
              📦 New: Skeleton Components
              <RxArrowRight size={16} />
            </Box>
          </Link>
        </Box>

        <Box
          sx={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.2s ease-out 0.06s, transform 0.2s ease-out 0.06s",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
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
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 1px 3px rgba(0,0,0,0.06)"
                      : "0 2px 8px rgba(0,0,0,0.3)",
                  transition:
                    "transform 0.15s cubic-bezier(.2,0,.2,1), box-shadow 0.15s cubic-bezier(.2,0,.2,1)",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 4px 12px rgba(0,0,0,0.12)"
                        : "0 4px 14px rgba(0,0,0,0.45)",
                  },
                  "&:active": {
                    transform: "translateY(0px) scale(0.99)",
                  },
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
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 1px 3px rgba(0,0,0,0.06)"
                      : "0 2px 8px rgba(0,0,0,0.3)",
                  transition:
                    "transform 0.15s cubic-bezier(.2,0,.2,1), box-shadow 0.15s cubic-bezier(.2,0,.2,1)",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 4px 12px rgba(0,0,0,0.12)"
                        : "0 4px 14px rgba(0,0,0,0.45)",
                  },
                  "&:active": {
                    transform: "translateY(0px) scale(0.99)",
                  },
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
        </Box>

        <Box
          sx={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.2s ease-out 0.09s, transform 0.2s ease-out 0.09s",
          }}
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

        <Box
          sx={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.2s ease-out 0.12s, transform 0.2s ease-out 0.12s",
          }}
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

        <Box
          sx={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.2s ease-out 0.15s, transform 0.2s ease-out 0.15s",
          }}
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
                    transition: "transform 0.15s ease, opacity 0.15s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  <Icon size={32} />
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <Box>
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
                borderRadius: "12px",
                textTransform: "none",
                transition: "box-shadow 0.15s cubic-bezier(.2,0,.2,1)",
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 2px 6px rgba(0,0,0,0.12)"
                    : "0 4px 12px rgba(0,0,0,0.4)",
                "&:hover": {
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 6px 16px rgba(0,0,0,0.18)"
                      : "0 6px 18px rgba(0,0,0,0.5)",
                  "& svg": {
                    transform: "translateX(4px)",
                  },
                },
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
                  "& svg": {
                    transition: "transform 0.15s cubic-bezier(.2,0,.2,1)",
                  },
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
