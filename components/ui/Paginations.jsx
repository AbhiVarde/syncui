import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import {
  RxChevronDown,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

const PaginationVariants = ({ variant, initialPage = 1, totalPages = 10 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [goToPage, setGoToPage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const textColor = theme.palette.text.primary;
  const secondaryColor = theme.palette.text.secondary;
  const bubbleColor = theme.palette.action.selected;

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const getPageNumbers = (current, total) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, 4, "...", total];
    if (current >= total - 2)
      return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const renderPageControl = (showText = true) => (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        size={isMobile ? "small" : "medium"}
      >
        <RxChevronLeft style={{ color: textColor }} />
      </IconButton>
      {showText && (
        <Typography variant="body2">
          Page {currentPage} of {totalPages}
        </Typography>
      )}
      <IconButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        size={isMobile ? "small" : "medium"}
      >
        <RxChevronRight style={{ color: textColor }} />
      </IconButton>
    </Box>
  );

  const renderPagination = () => {
    switch (variant) {
      case "simple":
        return (
          <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
            <Typography variant="body2" color={textColor}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Box display="flex" gap={0.5}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <RxChevronLeft style={{ color: textColor }} />
                </IconButton>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <RxChevronRight style={{ color: textColor }} />
                </IconButton>
              </motion.div>
            </Box>
          </Box>
        );

      case "numbered":
        return (
          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color: textColor }} />
            </IconButton>
            {getPageNumbers(currentPage, totalPages).map((page, index) =>
              page === "..." ? (
                <Typography
                  key={`ellipsis-${index}`}
                  color={secondaryColor}
                  px={0.5}
                >
                  ...
                </Typography>
              ) : (
                <motion.div
                  key={`page-${page}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                >
                  <Box
                    width={isMobile ? 28 : 36}
                    height={isMobile ? 28 : 36}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={0.5}
                    cursor="pointer"
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      backgroundColor:
                        page === currentPage ? bubbleColor : "transparent",
                      fontWeight: page === currentPage ? 600 : 400,
                      color: textColor,
                      transition: "background-color 0.15s",
                    }}
                  >
                    {page}
                  </Box>
                </motion.div>
              )
            )}
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronRight style={{ color: textColor }} />
            </IconButton>
          </Box>
        );

      case "compact":
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            border={`1px solid ${theme.palette.divider}`}
            borderRadius={1}
            overflow="hidden"
          >
            <IconButton
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              size="small"
              sx={{ borderRadius: 0 }}
            >
              <RxDoubleArrowLeft
                style={{ color: textColor, fontSize: isMobile ? 16 : 20 }}
              />
            </IconButton>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size="small"
              sx={{ borderRadius: 0 }}
            >
              <RxChevronLeft
                style={{ color: textColor, fontSize: isMobile ? 16 : 20 }}
              />
            </IconButton>
            {getPageNumbers(currentPage, totalPages)
              .slice(0, 5)
              .map((page, index) =>
                page === "..." ? (
                  <Typography
                    key={`ellipsis-${index}`}
                    color={secondaryColor}
                    px={0.5}
                  >
                    ...
                  </Typography>
                ) : (
                  <motion.div
                    key={`page-${page}`}
                    whileHover={{
                      backgroundColor:
                        page !== currentPage
                          ? theme.palette.action.hover
                          : bubbleColor,
                    }}
                  >
                    <Box
                      width={isMobile ? 28 : 36}
                      height={isMobile ? 28 : 36}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      onClick={() => setCurrentPage(page)}
                      sx={{
                        backgroundColor:
                          page === currentPage ? bubbleColor : "transparent",
                        fontWeight: page === currentPage ? 600 : 400,
                        color: textColor,
                        transition: "background-color 0.15s",
                      }}
                    >
                      {page}
                    </Box>
                  </motion.div>
                )
              )}
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size="small"
              sx={{ borderRadius: 0 }}
            >
              <RxChevronRight
                style={{ color: textColor, fontSize: isMobile ? 16 : 20 }}
              />
            </IconButton>
            <IconButton
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              size="small"
              sx={{ borderRadius: 0 }}
            >
              <RxDoubleArrowRight
                style={{ color: textColor, fontSize: isMobile ? 16 : 20 }}
              />
            </IconButton>
          </Box>
        );

      case "with-dropdown":
        return (
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">Rows per page</Typography>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                size="small"
                sx={{ minWidth: 100 }}
                IconComponent={RxChevronDown}
              >
                {[10, 25, 50, 100].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              {renderPageControl(false)}
              <Select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                size="small"
                sx={{ minWidth: 100 }}
                IconComponent={RxChevronDown}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    Page {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        );

      case "rows-per-page":
        const start = (currentPage - 1) * rowsPerPage + 1;
        const end = Math.min(
          currentPage * rowsPerPage,
          totalPages * rowsPerPage
        );

        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2">Rows per page</Typography>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                size="small"
                sx={{ minWidth: 100 }}
                IconComponent={RxChevronDown}
              >
                {[10, 25, 50, 100].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body2">{`${start}-${end} of ${
                totalPages * rowsPerPage
              }`}</Typography>
            </Box>
          </Box>
        );

      case "fading":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color: textColor }} />
            </IconButton>
            <Box position="relative" width={40} height={40}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: textColor,
                    fontWeight: 500,
                    fontSize: "1.25rem",
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
              <RxChevronRight style={{ color: textColor }} />
            </IconButton>
          </Box>
        );

      case "sliding":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color: textColor }} />
            </IconButton>
            <Box
              width={isMobile ? 90 : 120}
              height={30}
              overflow="hidden"
              position="relative"
            >
              <motion.div
                animate={{ x: -((currentPage - 1) * (isMobile ? 30 : 40)) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  display: "flex",
                  position: "absolute",
                  height: "100%",
                }}
              >
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: isMobile ? 30 : 40,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: i + 1 === currentPage ? textColor : secondaryColor,
                      scale: i + 1 === currentPage ? 1.2 : 0.9,
                      fontWeight: i + 1 === currentPage ? 600 : 400,
                      transition: "all 0.15s",
                    }}
                  >
                    {i + 1}
                  </Box>
                ))}
              </motion.div>
            </Box>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronRight style={{ color: textColor }} />
            </IconButton>
          </Box>
        );

      case "expanding":
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              size={isMobile ? "small" : "medium"}
            >
              <RxChevronLeft style={{ color: textColor }} />
            </IconButton>
            <Box display="flex" gap={0.5} height={30} alignItems="center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i + 1 === currentPage ? 30 : 8,
                    opacity: i + 1 === currentPage ? 1 : 0.6,
                    backgroundColor:
                      i + 1 === currentPage ? bubbleColor : "transparent",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    height: 30,
                    borderRadius: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatePresence mode="wait">
                    {i + 1 === currentPage && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ color: textColor, fontSize: "0.875rem" }}
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
              <RxChevronRight style={{ color: textColor }} />
            </IconButton>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor={theme.palette.background.paper}
      borderRadius={1}
    >
      {renderPagination()}
    </Box>
  );
};

export default PaginationVariants;
