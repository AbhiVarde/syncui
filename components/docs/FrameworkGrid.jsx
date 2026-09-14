import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import Link from "next/link";
import {
  SiNextdotjs,
  SiVite,
  SiReactrouter,
  SiAstro,
  SiReact,
} from "react-icons/si";
import { TanStackIcon } from "@/components/icons/TanStackIcon";
import { useTheme } from "@/context/ThemeContext";

const frameworks = [
  { name: "Next.js", slug: "nextjs", icon: SiNextdotjs },
  { name: "TanStack Start", slug: "tanstack-start", icon: TanStackIcon },
  { name: "Astro", slug: "astro", icon: SiAstro },
  { name: "Vite", slug: "vite", icon: SiVite },
  { name: "React Router", slug: "react-router", icon: SiReactrouter },
  { name: "Manual", slug: "manual", icon: SiReact },
];

export const FrameworkGrid = () => {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        gap: 2,
        mt: 3,
        mb: 4,
      }}
    >
      {frameworks.map((fw) => (
        <Link
          key={fw.slug}
          href={`/docs/installation/${fw.slug}`}
          style={{ textDecoration: "none" }}
        >
          <ButtonBase
            sx={{
              width: "100%",
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              bgcolor: "background.paper",
              borderRadius: 2,
              minHeight: 160,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <fw.icon size={40} />
            <Typography fontWeight={500} fontSize="15px">
              {fw.name}
            </Typography>
          </ButtonBase>
        </Link>
      ))}
    </Box>
  );
};
