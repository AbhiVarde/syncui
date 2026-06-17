import {
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  GlobalStyles,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import { SiReact, SiNextdotjs, SiJavascript, SiMui } from "react-icons/si";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

const TECH_ICONS = [
  { Icon: SiMui, title: "MUI", color: "#007FFF", url: "https://mui.com/" },
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
    color: null,
    url: "https://nextjs.org/",
  },
  { Icon: null, title: "Motion", url: "https://motion.dev/" },
];

const MotionIcon = () => (
  <img
    src="https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png"
    alt="Motion"
    width={26}
    height={26}
  />
);

const fadeUp = (delay) => ({
  animation: `heroFadeUp 0.35s ease-out ${delay}s both`,
});

const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes heroFadeUp": {
            from: { opacity: 0, transform: "translateY(10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      />

      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 2, ...fadeUp(0) }}>
            <a
              href="https://vercel.com/open-source-program"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Vercel OSS Program"
                src="/vercel-oss.svg"
                width={240}
                height={44}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </a>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.05em",
              mb: 1.5,
              display: "flex",
              flexDirection: "column",
              ...fadeUp(0.07),
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
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  position: "relative",
                  height: { xs: "48px", sm: "52px" },
                  ml: 0.5,
                }}
              >
                {TECH_ICONS.map(({ Icon, title, color, url }, index) => (
                  <Box
                    key={title}
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={title}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: { xs: "48px", sm: "52px" },
                      height: { xs: "48px", sm: "52px" },
                      borderRadius: "50%",
                      border: "3px solid",
                      borderColor: isDark ? "#000" : "#fff",
                      ml: index > 0 ? { xs: "-8px", sm: "-15px" } : 0,
                      zIndex: 5 - index,
                      transition:
                        "transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)",
                      backgroundColor: isDark ? "#1a1a1a" : "#fff",
                      boxShadow: isDark
                        ? "0 2px 8px rgba(0,0,0,0.4)"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      textDecoration: "none",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.12)",
                        zIndex: 10,
                        boxShadow: isDark
                          ? "0 6px 16px rgba(0,0,0,0.5)"
                          : "0 6px 16px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    {title === "Motion" ? (
                      <MotionIcon />
                    ) : (
                      <Icon
                        size={26}
                        color={
                          title === "Next.js"
                            ? isDark
                              ? "#fff"
                              : "#000"
                            : color
                        }
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              fontSize: { xs: "16px", sm: "18px" },
              lineHeight: 1.6,
              ...fadeUp(0.14),
            }}
          >
            125+ open-source components, 13+ blocks, and premium templates built
            with MUI and Motion. Copy, customize, and ship faster.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.25, sm: 1.5 },
              alignItems: "center",
              flexWrap: "wrap",
              ...fadeUp(0.2),
            }}
          >
            <Link href="/docs/installation">
              <Button
                variant="contained"
                sx={{
                  px: { xs: 2, sm: 2.5 },
                  py: 0.4,
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: isDark
                    ? "0 4px 12px rgba(0,0,0,0.4)"
                    : "0 1px 4px rgba(0,0,0,0.12)",
                  transition: "box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: isDark
                      ? "0 6px 16px rgba(0,0,0,0.5)"
                      : "0 4px 12px rgba(0,0,0,0.18)",
                  },
                }}
              >
                Get started
              </Button>
            </Link>

            <Link href="/components">
              <Button
                variant="text"
                sx={{
                  px: { xs: 2, sm: 2.5 },
                  py: 0.4,
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                  color: "text.primary",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                    "& .arrow": { transform: "translateX(3px)" },
                  },
                }}
              >
                View components
                <Box
                  component="span"
                  className="arrow"
                  sx={{
                    display: "inline-flex",
                    transition: "transform 0.18s ease",
                  }}
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </Box>
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HeroSection;
