"use client";

import React, { useRef, useEffect } from "react";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Layers01Icon,
  IceCubesIcon,
  DashboardSquare01Icon,
  ChartLineData01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

function useFadeInRef(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.style.transitionDelay = `${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "none";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

const revealStyle = {
  opacity: 0,
  transform: "translateY(12px)",
  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
  willChange: "transform, opacity",
};

const TextLink = ({ children, disabled, onClick }) => (
  <Button
    variant="text"
    disabled={disabled}
    onClick={onClick}
    sx={{
      px: 0,
      py: 0.25,
      fontWeight: 500,
      textTransform: "none",
      color: disabled ? "text.disabled" : "text.primary",
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        "& .chevron": { transform: "translateX(4px)" },
      },
    }}
  >
    {children}
    <Box
      className="chevron"
      sx={{ display: "inline-flex", transition: "transform 0.18s ease" }}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
    </Box>
  </Button>
);

const FeatureCard = ({
  icon,
  title,
  description,
  cta,
  disabled,
  onClick,
  delay,
}) => {
  const ref = useFadeInRef(delay);
  return (
    <Paper
      ref={ref}
      elevation={0}
      style={revealStyle}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "transparent",
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <HugeiconsIcon icon={icon} size={18} />
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Box>

      <Typography variant="body2" fontWeight={400} color="text.secondary">
        {description}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <TextLink disabled={disabled} onClick={onClick}>
        {cta}
      </TextLink>
    </Paper>
  );
};

const FEATURES = [
  {
    icon: IceCubesIcon,
    title: "Components",
    description: "125+ animated components built with MUI and motion/react.",
    cta: "Browse components",
    path: "/components",
  },
  {
    icon: DashboardSquare01Icon,
    title: "Blocks",
    description: "Ready to use sections. Heroes, pricing tables, and more.",
    cta: "Browse blocks",
    path: "/blocks",
  },
  {
    icon: ChartLineData01Icon,
    title: "Charts",
    description: "Bar, line, donut, and more. Animated, two variants each.",
    cta: "Browse charts",
    path: "/charts",
  },
  {
    icon: Layers01Icon,
    title: "Templates",
    description: "SaaS, startup, and portfolio. Individually or as a bundle.",
    cta: "View templates",
    path: "/templates",
  },
];

const FeaturesSection = () => {
  const router = useRouter();
  const headerRef = useFadeInRef(0);

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box
          ref={headerRef}
          style={revealStyle}
          sx={{ textAlign: "center", mb: 6 }}
        >
          <Typography variant="h3" fontWeight={500} gutterBottom>
            Designed for modern product teams
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Components, blocks, charts, and templates for building React and
            Next.js applications with clarity and consistency.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              cta={feature.cta}
              onClick={() => router.push(feature.path)}
              delay={index * 40}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
