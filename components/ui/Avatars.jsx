import React, { useEffect, useState } from "react";
import {
  Box,
  Tooltip,
  Typography,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";

const AvatarVariants = ({ variant, totalUsers = 60 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loadedImages, setLoadedImages] = useState({});

  const baseUrl =
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61";

  const avatarUrls = [
    baseUrl,
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    baseUrl,
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    baseUrl,
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    baseUrl,
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    baseUrl,
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
    baseUrl,
  ];

  const avatarSize = isMobile ? 35 : 50;
  const visibleAvatars = isMobile ? 5 : 8;
  const gridColumns = isMobile ? 3 : 4;

  useEffect(() => {
    avatarUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages((prev) => ({
          ...prev,
          [index]: true,
        }));
      };
      img.onerror = () => {
        setLoadedImages((prev) => ({
          ...prev,
          [index]: "error",
        }));
      };
    });
  }, []);

  const AvatarWithFallback = ({ url, index, ...props }) => {
    if (!loadedImages[index]) {
      return (
        <Skeleton
          variant="circular"
          width={props.sx?.width || avatarSize}
          height={props.sx?.height || avatarSize}
        />
      );
    }

    return (
      <Avatar
        src={loadedImages[index] === "error" ? undefined : url}
        {...props}
      />
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case "overlappingCircles":
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {avatarUrls.slice(0, visibleAvatars).map((url, index) => (
              <Tooltip
                key={index}
                title={`User ${index + 1}`}
                arrow
                placement="top"
              >
                <motion.div
                  whileHover={{
                    y: -5,
                    zIndex: 10,
                    transition: { duration: 0.15 },
                  }}
                  style={{
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <AvatarWithFallback
                    url={url}
                    index={index}
                    sx={{
                      width: avatarSize,
                      height: avatarSize,
                      border: "2px solid white",
                      marginLeft: index > 0 ? -2 : 0,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  />
                </motion.div>
              </Tooltip>
            ))}
          </Box>
        );

      case "minimalGrid":
        return (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              gap: 1,
              maxWidth: isMobile ? 200 : 300,
            }}
          >
            {avatarUrls.slice(0, gridColumns * 3).map((url, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.1,
                  zIndex: 1,
                  transition: { duration: 0.15 },
                }}
              >
                <AvatarWithFallback
                  url={url}
                  index={index}
                  sx={{
                    width: avatarSize,
                    height: avatarSize,
                    border: "2px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}
                />
              </motion.div>
            ))}
          </Box>
        );

      case "floatingCards":
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: isMobile ? 1 : 2,
              maxWidth: isMobile ? 280 : 400,
            }}
          >
            <AnimatePresence>
              {avatarUrls.slice(0, isMobile ? 6 : 10).map((url, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.15 },
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 0.5,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                  >
                    <AvatarWithFallback
                      url={url}
                      index={index}
                      sx={{
                        width: avatarSize - 5,
                        height: avatarSize - 5,
                        border: "2px solid",
                        borderColor: "primary.light",
                        cursor: "pointer",
                      }}
                    />
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        );

      case "modernShowcase":
        return (
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? 0.5 : 1,
                justifyContent: "center",
                maxWidth: isMobile ? 240 : 320,
                mb: isMobile ? 1 : 2,
              }}
            >
              {avatarUrls.slice(0, isMobile ? 6 : 8).map((url, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.1,
                    rotate: 10,
                    transition: { duration: 0.15 },
                  }}
                >
                  <AvatarWithFallback
                    url={url}
                    index={index}
                    sx={{
                      width: avatarSize,
                      height: avatarSize,
                      border: "2px solid",
                      borderColor: "background.paper",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  />
                </motion.div>
              ))}
            </Box>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{ fontWeight: 500 }}
            >
              {totalUsers}+ Contributors
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        py: isMobile ? 2 : 3,
      }}
    >
      {renderVariant()}
    </Box>
  );
};

export default AvatarVariants;
