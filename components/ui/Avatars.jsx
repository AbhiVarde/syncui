import React from "react";
import { Box, Tooltip, Typography, Avatar, Badge, Zoom } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const AvatarVariants = ({ variant, totalUsers = 103 }) => {
  const router = useRouter();
  const { asPath } = router;

  const avatarUrls = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  ];

  const renderVariant = () => {
    switch (variant) {
      case "overlappingCircles":
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {avatarUrls.map((url, index) => (
              <Tooltip
                key={index}
                title={`User ${index + 1}`}
                arrow
                placement="top"
              >
                <motion.div
                  initial={{ x: -20 * index, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{
                    y: -5,
                    zIndex: 10,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <Avatar
                    src={url}
                    sx={{
                      width: 50,
                      height: 50,
                      border: "2px solid white",
                      marginLeft: index > 0 ? -2 : 0,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </motion.div>
              </Tooltip>
            ))}
          </Box>
        );

      case "animatedTooltip":
        return (
          <Box sx={{ display: "flex", gap: 2, perspective: "1000px" }}>
            <AnimatePresence>
              {avatarUrls.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Tooltip
                    title={`User ${index + 1}`}
                    arrow
                    placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 500 }}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <Avatar
                        src={url}
                        sx={{
                          width: 50,
                          height: 50,
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    </motion.div>
                  </Tooltip>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        );

      case "statusIndicator":
        const statusColors = ["success", "warning", "error", "info", "default"];
        return (
          <Box sx={{ display: "flex", gap: 2 }}>
            {avatarUrls.map((url, index) => (
              <Tooltip
                key={index}
                title={`User ${index + 1} - ${statusColors[index]} status`}
                arrow
                placement="top"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Box
                        component="span"
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: (theme) =>
                            statusColors[index] === "default"
                              ? theme.palette.grey[500]
                              : theme.palette[statusColors[index]].main,
                          border: "2px solid white",
                        }}
                      />
                    }
                  >
                    <Avatar
                      src={url}
                      sx={{
                        width: 50,
                        height: 50,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  </Badge>
                </motion.div>
              </Tooltip>
            ))}
          </Box>
        );

      case "groupedAvatars":
        const visibleAvatars = 4;
        const remainingUsers = totalUsers - visibleAvatars;
        const displayCount = remainingUsers > 99 ? "99+" : remainingUsers;

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
                  initial={{ x: -20 * index, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{
                    zIndex: 10,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    zIndex: visibleAvatars - index,
                    position: "relative",
                  }}
                >
                  <Avatar
                    src={url}
                    sx={{
                      width: 50,
                      height: 50,
                      border: "2px solid white",
                      marginLeft: index > 0 ? -1.5 : 0,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </motion.div>
              </Tooltip>
            ))}

            {remainingUsers > 0 && (
              <Tooltip
                title={`${remainingUsers} more ${
                  remainingUsers === 1 ? "user" : "users"
                }`}
                arrow
                placement="top"
              >
                <motion.div
                  initial={{ x: -80, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  style={{ zIndex: 1, position: "relative" }}
                  whileHover={{
                    zIndex: 10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: (theme) => theme.palette.primary.main,
                      border: "2px solid white",
                      marginLeft: -1.5,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "white",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    +{displayCount}
                  </Avatar>
                </motion.div>
              </Tooltip>
            )}
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
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {asPath !== "/docs/avatars" && (
        <Typography variant="h6">
          {variant
            .split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Typography>
      )}
      {renderVariant()}
    </Box>
  );
};

export default AvatarVariants;
