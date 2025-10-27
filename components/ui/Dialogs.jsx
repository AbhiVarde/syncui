import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  useTheme,
  Slide,
  Fade,
  Grow,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import {
  RxGear,
  RxDashboard,
  RxPerson,
  RxBell,
  RxChevronRight,
  RxCross2,
  RxCheck,
} from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const TransitionSlide = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionFade = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const MotionBox = motion.create(Box);

const DialogVariants = ({ variant }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isDark = theme.palette.mode === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";
  const bgColor = isDark ? "#1a1a1a" : "#ffffff";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  // Auto-close for notification and info dialogs
  useEffect(() => {
    if (open && (variant === "notification" || variant === "info")) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [open, variant]);

  const getButtonText = () => {
    switch (variant) {
      case "slideUp":
        return "Slide Up";
      case "blur":
        return "Blur Modal";
      case "form":
        return "Form Dialog";
      case "info":
        return "Info Dialog";
      case "fullscreen":
        return "Fullscreen";
      case "sidebar":
        return "Sidebar";
      case "notification":
        return "Notification";
      default:
        return "Default";
    }
  };

  const commonDialogProps = {
    maxWidth: "sm",
    fullWidth: true,
    PaperProps: {
      sx: {
        borderRadius: 2,
        width: isMobile ? "90vw" : isTablet ? "80vw" : 480,
        maxWidth: isMobile ? "90vw" : 480,
        backgroundColor: bgColor,
        backgroundImage: "none !important",
        border: `1px solid ${borderColor}`,
        boxShadow: isDark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  };

  const CloseButton = ({ onClick, style = {} }) => (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{
        width: 32,
        height: 32,
        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        color: textColor,
        "&:hover": {
          backgroundColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
        },
        ...style,
      }}
    >
      <RxCross2 size={16} />
    </IconButton>
  );

  const renderDialog = () => {
    switch (variant) {
      case "slideUp":
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionSlide}
            keepMounted
            {...commonDialogProps}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontSize: "1.2rem" }}>🚀</Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: textColor }}
                >
                  Slide Up Animation
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ pb: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                Experience smooth slide-up transitions that feel natural and
                engaging. Perfect for mobile-first interactions.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  backgroundColor: textColor,
                  color: bgColor,
                  "&:hover": {
                    backgroundColor: isDark ? "#e0e0e0" : "#333333",
                  },
                }}
              >
                Got it
              </Button>
            </DialogActions>
          </Dialog>
        );

      case "blur":
        return (
          <Dialog
            open={open}
            TransitionComponent={TransitionFade}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: 2,
                width: isMobile ? "90vw" : isTablet ? "80vw" : 480,
                maxWidth: 480,
                backdropFilter: "blur(8px)",
                backgroundColor: bgColor,
                backgroundImage: "none !important",
                border: `1px solid ${borderColor}`,
                boxShadow: isDark
                  ? "0 5px 20px rgba(0,0,0,0.5)"
                  : "0 5px 20px rgba(0,0,0,0.15)",
              },
            }}
            BackdropProps={{
              sx: {
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
          >
            <DialogTitle
              sx={{
                pb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontSize: "1.2rem" }}>✨</Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: textColor }}
                >
                  Glassmorphism Effect
                </Typography>
              </Box>
              <CloseButton onClick={handleClose} />
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                Beautiful frosted glass effect with a clean, fast-loading UI.
                Optimized for instant rendering.
              </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  backgroundColor: textColor,
                  color: bgColor,
                  "&:hover": {
                    backgroundColor: isDark ? "#e0e0e0" : "#333333",
                  },
                }}
              >
                Amazing
              </Button>
            </DialogActions>
          </Dialog>
        );

      case "form":
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionGrow}
            {...commonDialogProps}
          >
            <DialogTitle
              sx={{
                pb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontSize: "1.2rem" }}>📝</Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: textColor }}
                >
                  Contact Form
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                pt: 2,
                pb: 2,
              }}
            >
              <TextField
                placeholder="Full Name"
                type="text"
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                    "& fieldset": {
                      borderColor: borderColor,
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                placeholder="Email Address"
                type="email"
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                    "& fieldset": {
                      borderColor: borderColor,
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                placeholder="Your Message"
                multiline
                rows={3}
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                    "& fieldset": {
                      borderColor: borderColor,
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                    opacity: 1,
                  },
                }}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  backgroundColor: textColor,
                  color: bgColor,
                  "&:hover": {
                    backgroundColor: isDark ? "#e0e0e0" : "#333333",
                  },
                }}
              >
                Send Message
              </Button>
            </DialogActions>
          </Dialog>
        );

      case "info":
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionSlide}
            {...commonDialogProps}
          >
            <DialogContent
              sx={{ textAlign: "center", py: 4, position: "relative" }}
            >
              <CloseButton
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
              />
              <Box sx={{ fontSize: "3rem", mb: 2 }}>💡</Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, mb: 2, color: textColor }}
              >
                Quick Tip
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6, mb: 3 }}
              >
                Did you know? You can use keyboard shortcuts to navigate faster.
                Press Ctrl+K to open quick search.
              </Typography>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: textColor,
                  color: bgColor,
                  minWidth: 120,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: isDark ? "#e0e0e0" : "#333333",
                  },
                }}
              >
                Thanks!
              </Button>
            </DialogContent>
          </Dialog>
        );

      case "fullscreen":
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={TransitionSlide}
            PaperProps={{
              sx: {
                backgroundColor: bgColor,
                backgroundImage: "none !important",
              },
            }}
          >
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                p: 4,
                textAlign: "center",
                position: "relative",
              }}
            >
              <CloseButton
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 40,
                  height: 40,
                }}
              />
              <Box sx={{ fontSize: "62px", mb: 2 }}>🎯</Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 500,
                  mb: 1,
                  color: textColor,
                }}
              >
                Focus Mode
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  color: "text.secondary",
                  maxWidth: 500,
                  lineHeight: 1.6,
                }}
              >
                Perfect for presentations, forms, or detailed views.
              </Typography>
            </Box>
          </Dialog>
        );

      case "sidebar":
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionSlide}
            keepMounted
            sx={{
              "& .MuiDialog-container": {
                justifyContent: "flex-start",
                alignItems: "stretch",
              },
            }}
            PaperProps={{
              sx: {
                width: isMobile ? "260px" : "300px",
                height: "100vh",
                borderRadius: 2,
                backgroundColor: bgColor,
                backgroundImage: "none !important",
                borderRight: `1px solid ${borderColor}`,
              },
            }}
          >
            <Box sx={{ p: 2, height: "100%" }}>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RxGear size={20} color={textColor} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, color: textColor }}
                  >
                    Settings
                  </Typography>
                </Box>
                <CloseButton onClick={handleClose} />
              </Box>

              {/* List */}
              <List
                sx={{
                  "& .MuiListItem-root": {
                    borderRadius: 2,
                    padding: "8px",
                    mb: 0.5,
                  },
                }}
              >
                <ListItem
                  button
                  sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <RxDashboard size={18} color={textColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    secondary="Main overview"
                    primaryTypographyProps={{
                      color: textColor,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      opacity: 0.7,
                    }}
                  />
                  <RxChevronRight size={16} color={textColor} opacity={0.6} />
                </ListItem>

                <Divider sx={{ my: 0.5 }} />

                <ListItem
                  button
                  sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <RxPerson size={18} color={textColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    secondary="Personal settings"
                    primaryTypographyProps={{
                      color: textColor,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      opacity: 0.7,
                    }}
                  />
                  <RxChevronRight size={16} color={textColor} opacity={0.6} />
                </ListItem>

                <Divider sx={{ my: 0.5 }} />

                <ListItem
                  button
                  sx={{
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <RxBell size={18} color={textColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    secondary="Manage alerts"
                    primaryTypographyProps={{
                      color: textColor,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      opacity: 0.7,
                    }}
                  />
                  <RxChevronRight size={16} color={textColor} opacity={0.6} />
                </ListItem>
              </List>
            </Box>
          </Dialog>
        );

      case "notification":
        return (
          <AnimatePresence>
            {open && (
              <MotionBox
                initial={{ opacity: 0, y: -100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                }}
                sx={{
                  position: "fixed",
                  top: 20,
                  right: 20,
                  zIndex: 9999,
                  width: isMobile ? "calc(100vw - 40px)" : 420,
                  maxWidth: "calc(100vw - 40px)",
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 2,
                  boxShadow: isDark
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <RxCheck size={20} color="white" />
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: textColor, mb: 0.5 }}
                    >
                      Successfully saved! 🎉
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", lineHeight: 1.5 }}
                    >
                      Your changes have been saved and will take effect
                      immediately.
                    </Typography>
                  </Box>

                  <CloseButton onClick={handleClose} />
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        );

      default:
        return (
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionFade}
            {...commonDialogProps}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontSize: "1.2rem" }}>💬</Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: textColor }}
                >
                  Simple Dialog
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ pb: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                Clean and minimal dialog design with consistent spacing and
                typography. Perfect for simple interactions.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  backgroundColor: textColor,
                  color: bgColor,
                  "&:hover": {
                    backgroundColor: isDark ? "#e0e0e0" : "#333333",
                  },
                }}
              >
                Understood
              </Button>
            </DialogActions>
          </Dialog>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          borderColor: borderColor,
          color: textColor,
          borderRadius: 2,
          px: 3,
          py: 1,
          fontWeight: 500,
          "&:hover": {
            borderColor: textColor,
            backgroundColor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.05)",
          },
        }}
      >
        {getButtonText()}
      </Button>
      {renderDialog()}
    </Box>
  );
};

export default DialogVariants;
