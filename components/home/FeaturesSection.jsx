import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowUpRight01Icon from "@hugeicons/core-free-icons/ArrowUpRight01Icon";
import dynamic from "next/dynamic";

const ButtonVariants = dynamic(
  () => import("@/components/ui/components/Buttons"),
  { ssr: false },
);
const HeroVariants = dynamic(() => import("@/components/ui/blocks/Hero/Hero"), {
  ssr: false,
});
const BarChart = dynamic(() => import("@/components/ui/charts/bar"), {
  ssr: false,
});

const FEATURES = [
  {
    title: "Components",
    renderPreview: () => <ButtonVariants variant="neubrutalism" />,
    count: "125+ variants",
    description: "Buttons, cards, tables, dialogs, and more",
    route: "/components",
  },
  {
    title: "Blocks",
    renderPreview: () => <HeroVariants variant="center" height={150} />,
    count: "13+ blocks",
    description: "Ready-to-use sections for landing pages",
    route: "/blocks",
  },
  {
    title: "Charts",
    renderPreview: () => <BarChart variant="ranked" height={150} />,
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

const useInView = (margin = "-80px") => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView];
};

const FeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView();

  return (
    <Box
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
        ref={ref}
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
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.24s ease-out ${index * 0.03}s, transform 0.24s ease-out ${index * 0.03}s`,
          willChange: "transform, opacity",
          "@media (prefers-reduced-motion: reduce)": {
            opacity: 1,
            transform: "none",
            transition: "none",
          },
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
          ) : inView ? (
            feature.renderPreview()
          ) : null}
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
                transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
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
  );
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
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </Box>
    </Container>
  );
};

export default FeaturesSection;
