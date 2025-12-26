import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "motion/react";

const SkeletonVariants = ({
  variant = "shimmer",
  width = "100%",
  height = 20,
  rounded = false,
}) => {
  const theme = useTheme();

  const baseColor = theme.palette.mode === "dark" ? "#2a2a2a" : "#e8e8e8";
  const highlightColor = theme.palette.mode === "dark" ? "#3a3a3a" : "#f5f5f5";

  const baseStyle = {
    width,
    height,
    borderRadius: rounded ? 1 : 0,
    overflow: "hidden",
    position: "relative",
  };

  const renderSkeleton = () => {
    switch (variant) {
      case "shimmer":
        return (
          <Box sx={{ ...baseStyle, backgroundColor: baseColor }}>
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, transparent, ${highlightColor}, transparent)`,
              }}
            />
          </Box>
        );

      case "pulse":
        return (
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              ...baseStyle,
              backgroundColor: baseColor,
            }}
          />
        );

      case "wave":
        return (
          <Box sx={{ ...baseStyle }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${i * 20}%`,
                  width: "20%",
                  height: "100%",
                  backgroundColor: baseColor,
                }}
              />
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return renderSkeleton();
};

export const SkeletonCard = ({ variant = "shimmer" }) => (
  <Box sx={{ p: 2, width: "100%", maxWidth: 400 }}>
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <SkeletonVariants variant={variant} width={50} height={50} rounded />
      <Box sx={{ flex: 1 }}>
        <SkeletonVariants variant={variant} width="70%" height={16} />
        <Box sx={{ mt: 1 }}>
          <SkeletonVariants variant={variant} width="90%" height={12} />
        </Box>
      </Box>
    </Box>
    <SkeletonVariants variant={variant} width="100%" height={12} />
    <Box sx={{ mt: 1 }}>
      <SkeletonVariants variant={variant} width="95%" height={12} />
    </Box>
    <Box sx={{ mt: 1 }}>
      <SkeletonVariants variant={variant} width="80%" height={12} />
    </Box>
  </Box>
);

export const SkeletonText = ({ variant = "shimmer", lines = 3 }) => (
  <Box sx={{ width: "100%" }}>
    {Array.from({ length: lines }).map((_, i) => (
      <Box key={i} sx={{ mb: 1 }}>
        <SkeletonVariants
          variant={variant}
          width={i === lines - 1 ? "60%" : "100%"}
          height={14}
        />
      </Box>
    ))}
  </Box>
);

export const SkeletonList = ({ variant = "shimmer", items = 5 }) => (
  <Box sx={{ width: "100%" }}>
    {Array.from({ length: items }).map((_, i) => (
      <Box
        key={i}
        sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
      >
        <SkeletonVariants variant={variant} width={40} height={40} rounded />
        <Box sx={{ flex: 1 }}>
          <SkeletonVariants variant={variant} width="60%" height={14} />
          <Box sx={{ mt: 0.5 }}>
            <SkeletonVariants variant={variant} width="40%" height={10} />
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

export default SkeletonVariants;
