"use client";
import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

const MotionBox = motion(Box);

const GridVariants = ({ variant = "masonry" }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const shouldShowHeading = pathname !== "/docs/components/grids";

  const unsplashImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=60",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=60",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=60",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=60",
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&q=60",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=60",
  ];

  const items = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    imageUrl: unsplashImages[i % unsplashImages.length],
  }));

  const getVariantName = (v) => {
    return {
      masonry: "Masonry Grid",
      bento: "Bento Grid",
      glassmorphism: "Glassmorphism Grid",
      organicShapes: "Organic Shapes Grid",
      minimalCards: "Minimal Cards Grid",
    }[v];
  };

  const shapes = React.useMemo(() => {
    return items.map(() => {
      const rand = () => Math.floor(Math.random() * 20) + 25;
      return `${rand()}px ${rand()}px ${rand()}px ${rand()}px`;
    });
  }, []);

  const renderMasonry = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        columnCount: { xs: 1, sm: 2, md: 3 },
        columnGap: "16px",
        width: "100%",
        padding: 2,
      }}
    >
      {items.map((item, index) => (
        <MotionBox
          key={item.id}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          sx={{
            mb: "16px",
            breakInside: "avoid-column",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 250 + (index % 4) * 40,
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </MotionBox>
      ))}
    </MotionBox>
  );

  const renderBento = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        padding: 2,
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
        gridTemplateRows: "auto auto auto",
      }}
    >
      <MotionBox
        sx={{
          gridColumn: { md: "1" },
          gridRow: { md: "1 / 3" },
          minHeight: { xs: 260, md: 480 },
          backgroundImage: `url(${unsplashImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          boxShadow: `0 0 0 1px ${theme.palette.divider}`,
        }}
      />

      {[1, 2].map((i) => (
        <MotionBox
          key={i}
          sx={{
            minHeight: 200,
            backgroundImage: `url(${unsplashImages[i]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 3,
            boxShadow: `0 0 0 1px ${theme.palette.divider}`,
          }}
        />
      ))}

      <MotionBox
        sx={{
          gridColumn: { md: "1" },
          height: 200,
          borderRadius: 3,
          backgroundImage: `url(${unsplashImages[3]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <MotionBox
        sx={{
          gridColumn: { md: "2" },
          height: 200,
          borderRadius: 3,
          backgroundImage: `url(${unsplashImages[4]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <MotionBox
        sx={{
          gridColumn: "1 / 3",
          height: 200,
          backgroundImage: `url(${unsplashImages[5]})`,
          borderRadius: 3,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      />
    </MotionBox>
  );

  const renderGlass = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: "grid",
        padding: 2,
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
        },
      }}
    >
      {items.slice(0, 6).map((item) => (
        <MotionBox
          key={item.id}
          sx={{
            height: 260,
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.2)",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              height: "90%",
              width: "90%",
              borderRadius: 3,
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
          />
        </MotionBox>
      ))}
    </MotionBox>
  );

  const renderOrganic = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: "grid",
        gap: 2,
        padding: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
        },
      }}
    >
      {items.slice(0, 6).map((item, i) => (
        <MotionBox
          key={item.id}
          sx={{
            height: 260,
            borderRadius: shapes[i],
            backgroundImage: `url(${item.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: `0 0 0 1px ${theme.palette.divider}`,
          }}
        />
      ))}
    </MotionBox>
  );

  const renderMinimal = () => (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        padding: 2,
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
        },
      }}
    >
      {items.slice(0, 6).map((item) => (
        <MotionBox
          key={item.id}
          whileHover={{ scale: 1.02 }}
          sx={{
            height: 260,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0 0 0 1px ${theme.palette.divider}`,
            backgroundImage: `url(${item.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </MotionBox>
  );

  const renderVariant = () => {
    switch (variant) {
      case "masonry":
        return renderMasonry();
      case "bento":
        return renderBento();
      case "glassmorphism":
        return renderGlass();
      case "organicShapes":
        return renderOrganic();
      case "minimalCards":
        return renderMinimal();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {shouldShowHeading && (
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {getVariantName(variant)}
        </Typography>
      )}

      <AnimatePresence mode="wait">{renderVariant()}</AnimatePresence>
    </Box>
  );
};

export default GridVariants;
