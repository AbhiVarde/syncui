import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import ButtonVariants from "@/components/ui/components/Buttons";
import HeroVariants from "@/components/ui/blocks/Hero/Hero";
import BarChart from "@/components/ui/charts/bar";

const FEATURES = [
  {
    title: "Components",
    preview: <ButtonVariants variant="neubrutalism" />,
    count: "125+ variants",
    description: "Buttons, cards, tables, dialogs, and more",
    route: "/components",
  },
  {
    title: "Blocks",
    preview: <HeroVariants variant="center" height={150} />,
    count: "13+ blocks",
    description: "Ready-to-use sections for landing pages",
    route: "/blocks",
  },
  {
    title: "Charts",
    preview: <BarChart variant="ranked" height={150} />,
    count: "12+ variants",
    description: "Line, bar, donut, stat, progress, and heatmap",
    route: "/charts",
  },
  {
    title: "Templates",
    image: "/template-img.webp",
    count: "3 templates",
    description: "SaaS, startup, and portfolio, ready to launch",
    route: "/templates",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <Container maxWidth="md" sx={{ px: { lg: 0 }, py: 5 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {FEATURES.map((feature, index) => (
          <Box
            key={feature.title}
            component={Link}
            href={feature.route}
            sx={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              minWidth: 0,
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
                delay: index * 0.03,
              }}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "transparent",
                p: 1.5,
                minWidth: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                "&:hover .icon": { transform: "rotate(45deg)" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 150,
                  overflow: "hidden",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.default",
                  pointerEvents: "none",
                  userSelect: "none",
                  "& *": {
                    pointerEvents: "none !important",
                    userSelect: "none !important",
                  },
                }}
              >
                {feature.image ? (
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 600px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  feature.preview
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 0.5,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography variant="body1" fontWeight={500} noWrap>
                    {feature.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {feature.count}
                  </Typography>
                </Box>
                <Box
                  aria-hidden="true"
                  sx={{
                    display: "inline-flex",
                    color: "text.primary",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    className="icon"
                    sx={{
                      display: "inline-flex",
                      transition:
                        "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={18}
                      aria-hidden="true"
                    />
                  </Box>
                </Box>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{
                  px: 0.5,
                  mt: -1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FeaturesSection;
