import { useState, useEffect } from "react";
import { Typography, Button, Box, Container, useTheme } from "@mui/material";
import { RxArrowRight } from "react-icons/rx";
import Link from "next/link";
import { SiReact, SiNextdotjs, SiJavascript, SiMui } from "react-icons/si";

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
          <Link href="/docs/components/skeletons">
            <Box
              component="button"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.25,
                py: 0.75,
                mb: 2,
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
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.05em",
              mb: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box component="span">Beautifully designed components</Box>
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              and templates built with
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  position: "relative",
                  height: { xs: "48px", sm: "52px" },
                  ml: 0.5,
                }}
              >
                {[
                  {
                    Icon: SiMui,
                    title: "MUI",
                    color: "#007FFF",
                    url: "https://mui.com/",
                  },
                  {
                    Icon: SiJavascript,
                    title: "JavaScript",
                    color: "#F7DF1E",
                    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                  },
                  {
                    Icon: SiReact,
                    title: "React",
                    color: "#61DAFB",
                    url: "https://react.dev/",
                  },
                  {
                    Icon: SiNextdotjs,
                    title: "Next.js",
                    color:
                      theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                    url: "https://nextjs.org/",
                  },
                  {
                    Icon: () => (
                      <img
                        src="https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png"
                        alt="Motion"
                        style={{ width: "26px", height: "26px" }}
                      />
                    ),
                    title: "Motion",
                    url: "https://motion.dev/",
                  },
                ].map(({ Icon, title, color, url }, index) => (
                  <Box
                    key={title}
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: { xs: "48px", sm: "52px" },
                      height: { xs: "48px", sm: "52px" },
                      borderRadius: "50%",
                      border: "3px solid",
                      borderColor:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                      marginLeft: index > 0 ? { xs: "-8px", sm: "-15px" } : 0,
                      zIndex: 5 - index,
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 2px 8px rgba(0,0,0,0.4)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      textDecoration: "none",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.12)",
                        zIndex: 10,
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 6px 16px rgba(0,0,0,0.5)"
                            : "0 6px 16px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    {title === "Motion" ? (
                      <Icon />
                    ) : (
                      <Icon size={26} color={color} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Typography>
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
            variant="body1"
            sx={{
              fontWeight: 400,
              color: "text.secondary",
              mb: 3,
              fontSize: { xs: "16px", sm: "18px" },
              lineHeight: 1.6,
            }}
          >
            125+ beautifully designed components and 3 premium templates that
            you can customize and build on. Start here then make it your own.
            Open Source. Open Code.
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
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, sm: 2 },
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/docs">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  padding: { xs: "6px 16px", sm: "6px 20px" },
                  minHeight: "38px",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: { xs: "15px", sm: "16px" },
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
                    minWidth: { xs: "auto", sm: "120px" },
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

            <Link href="/docs/components/accordions">
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: { xs: "6px 12px", sm: "6px 20px" },
                  minHeight: "38px",
                  borderRadius: "12px",
                  textTransform: "none",
                  color: "text.primary",
                  fontSize: { xs: "15px", sm: "16px" },
                  fontWeight: 500,
                  transition: "opacity 0.15s ease",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.7,
                  },
                }}
              >
                View Components
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
