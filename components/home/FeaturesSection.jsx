"use client";

import React from "react";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Layers01Icon,
  IceCubesIcon,
  DashboardSquare01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const MotionPaper = motion.create(Paper);

const TextLink = ({ children, disabled, onClick }) => {
  return (
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
          "& .chevron": {
            transform: "translateX(4px)",
          },
        },
      }}
    >
      {children}
      <Box
        className="chevron"
        sx={{
          display: "inline-flex",
          transition: "transform 0.18s ease",
        }}
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
      </Box>
    </Button>
  );
};

const FeatureCard = ({ icon, title, description, cta, disabled, onClick }) => {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      elevation={0}
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
    </MotionPaper>
  );
};

const FeaturesSection = () => {
  const router = useRouter();

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
            Sync UI provides carefully crafted components, templates, and
            reusable blocks for building React and Next.js applications with
            clarity and consistency.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          <FeatureCard
            icon={Layers01Icon}
            title="Templates"
            description="Ready made templates for SaaS, startup, and portfolio websites. Available individually or as a complete bundle."
            cta="View templates"
            onClick={() => router.push("/templates")}
          />

          <FeatureCard
            icon={DashboardSquare01Icon}
            title="Blocks"
            description="Reusable sections such as heroes, feature layouts, and pricing tables. Designed to integrate seamlessly."
            cta="Browse blocks"
            onClick={() => router.push("/blocks")}
            // disabled
          />
        </Box>

        <MotionPaper
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          elevation={0}
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
            <HugeiconsIcon icon={IceCubesIcon} size={20} />
            <Typography variant="h6" fontWeight={600}>
              Components
            </Typography>
          </Box>

          <Typography variant="body2" fontWeight={400} color="text.secondary">
            Over 125 free animated components built with MUI and motion/react.
            Designed for React and Next.js projects with a focus on clarity,
            consistency, and production readiness.
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <TextLink onClick={() => router.push("/docs/components/accordions")}>
            Browse components
          </TextLink>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
