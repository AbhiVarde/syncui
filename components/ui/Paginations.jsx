import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { useRouter } from "next/router";

const PaginationVariants = ({ variant, initialPage = 1, totalPages = 10 }) => {
  const router = useRouter();
  const { asPath } = router;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const color = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";
  const bubbleColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const renderPagination = () => {
    switch (variant) {
      case "fading":
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color }} />
            </IconButton>
            <Box
              sx={{
                position: "relative",
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    fontWeight: 500,
                    fontSize: isMobile ? "16px" : "20px",
                  }}
                >
                  {currentPage}
                </motion.div>
              </AnimatePresence>
            </Box>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronRight style={{ color }} />
            </IconButton>
          </Box>
        );

      case "sliding":
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color }} />
            </IconButton>
            <Box
              sx={{
                position: "relative",
                width: isMobile ? 90 : 120,
                height: isMobile ? 24 : 30,
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ x: -((currentPage - 1) * (isMobile ? 22.5 : 30)) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ display: "flex", position: "absolute" }}
              >
                {[...Array(totalPages)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: isMobile ? 22.5 : 30,
                      height: isMobile ? 24 : 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    animate={{
                      color:
                        i + 1 === currentPage
                          ? color
                          : theme.palette.text.secondary,
                      fontWeight: i + 1 === currentPage ? 500 : 400,
                      scale: i + 1 === currentPage ? 1.2 : 1,
                    }}
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </motion.div>
            </Box>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronRight style={{ color }} />
            </IconButton>
          </Box>
        );

      case "expanding":
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color }} />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                height: isMobile ? 24 : 30,
                alignItems: "center",
              }}
            >
              {[...Array(totalPages)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ width: isMobile ? 6 : 8, opacity: 0.5 }}
                  animate={{
                    width:
                      i + 1 === currentPage
                        ? isMobile
                          ? 24
                          : 30
                        : isMobile
                        ? 6
                        : 8,
                    opacity: i + 1 === currentPage ? 1 : 0.5,
                    backgroundColor:
                      i + 1 === currentPage
                        ? color
                        : theme.palette.action.disabled,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    height: isMobile ? 24 : 30,
                    borderRadius: isMobile ? 12 : 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  <AnimatePresence mode="wait">
                    {i + 1 === currentPage && (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#000000"
                              : "#FFFFFF",
                          fontWeight: 500,
                          fontSize: isMobile ? "14px" : "16px",
                        }}
                      >
                        {i + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </Box>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronRight style={{ color }} />
            </IconButton>
          </Box>
        );

      case "orbit":
        const size = isMobile ? 150 : 200;
        const radius = size / 2 - 20;
        const itemSize = isMobile ? 24 : 28;
        const fontSize = isMobile ? 12 : 14;

        return (
          <>
            <Box
              sx={{
                position: "relative",
                width: size,
                height: size,
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              {[...Array(totalPages)].map((_, i) => {
                const angle = (i / totalPages) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={i}
                    style={{
                      position: "absolute",
                      width: itemSize,
                      height: itemSize,
                      borderRadius: "50%",
                      x,
                      y,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    animate={{
                      scale: i + 1 === currentPage ? 1.2 : 1,
                      backgroundColor:
                        i + 1 === currentPage ? color : bubbleColor,
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          i + 1 === currentPage
                            ? theme.palette.mode === "dark"
                              ? "#000000"
                              : "#FFFFFF"
                            : color,
                        fontWeight: i + 1 === currentPage ? 500 : 400,
                        fontSize: fontSize,
                      }}
                    >
                      {i + 1}
                    </Typography>
                  </motion.div>
                );
              })}
              <motion.div
                style={{
                  position: "absolute",
                  width: itemSize * 1.2,
                  height: itemSize * 1.2,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.background.default,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: theme.shadows[4],
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={500}
                  sx={{ color, fontSize: fontSize * 1.2 }}
                >
                  {currentPage}
                </Typography>
              </motion.div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[2],
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  <RxChevronLeft style={{ color }} />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[2],
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  <RxChevronRight style={{ color }} />
                </IconButton>
              </motion.div>
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(1),
      }}
    >
      {renderPagination()}
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        Page {currentPage} of {totalPages}
      </Typography>
    </Box>
  );
};

export default PaginationVariants;
