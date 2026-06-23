import { Typography, Button, Box, Container, useTheme } from "@mui/material";
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

const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          animation: "heroFadeIn 0.35s cubic-bezier(0.25,0.1,0.25,1) both",
          "@keyframes heroFadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
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
              priority
              style={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                filter: !isDark ? "invert(1)" : "none",
              }}
            />
          </a>
        </Box>

        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontWeight: 600,
            letterSpacing: "-0.05em",
            mb: 1.5,
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
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
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
                    backgroundColor: isDark ? "#1a1a1a" : "#fff",
                    boxShadow: isDark
                      ? "0 2px 8px rgba(0,0,0,0.4)"
                      : "0 2px 8px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    textDecoration: "none",
                    // GPU-composited — only transform & opacity, never layout props
                    willChange: "transform",
                    transition:
                      "transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1)",
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
                        title === "Next.js" ? (isDark ? "#fff" : "#000") : color
                      }
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Typography>

        <Typography
          component="p"
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 3,
            fontSize: { xs: "16px", sm: "18px" },
            lineHeight: 1.6,
          }}
        >
          125+ components, 13+ blocks, and premium templates built with MUI and
          Motion. Add anything via CLI or copy directly into your project.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/docs">
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
                transition: "box-shadow 0.18s ease",
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

          <Button
            component="a"
            href="https://www.npmjs.com/package/@abhivarde/syncui"
            target="_blank"
            rel="noopener noreferrer"
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
            Install CLI
            <Box
              component="span"
              className="arrow"
              sx={{
                display: "inline-flex",
                transition: "transform 0.15s ease",
                willChange: "transform",
              }}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Box>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;