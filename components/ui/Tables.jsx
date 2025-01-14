import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Checkbox,
  useTheme,
  alpha,
  Tooltip,
  CircularProgress,
  Collapse,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuChevronDown,
  LuArrowUpDown,
  LuSearch,
  LuFilter,
} from "react-icons/lu";

const MotionTableRow = motion(TableRow);
const MotionPaper = motion(Paper);

const animations = {
  table: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  row: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.1,
    },
  },
  cell: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  expand: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  progress: {
    initial: { width: 0, opacity: 0 },
    animate: { width: "100%", opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const createData = (id, name, role, status, progress, date) => ({
  id,
  name,
  role,
  status,
  progress,
  date,
  details: {
    email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
    phone: "+1 (555) 000-0000",
    address: "123 Business Street, Tech City, 12345",
    department: "Technology",
    joinDate: "2023-01-01",
    projects: ["Project Alpha", "Project Beta"],
  },
});

const sampleData = [
  createData(1, "Alex Thompson", "Developer", "Active", 75, "2025-01-01"),
  createData(2, "Sarah Wilson", "Designer", "Inactive", 45, "2025-01-02"),
  createData(3, "Michael Chen", "Manager", "Active", 90, "2025-01-03"),
  createData(4, "Emily Davis", "Analyst", "Active", 60, "2025-01-04"),
  createData(5, "James Wilson", "Developer", "Inactive", 30, "2025-01-05"),
];

const TableVariants = ({ variant = "modern" }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    variant === "minimal" ? 3 : variant === "expandable" ? 4 : 5
  );
  const [selected, setSelected] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(false);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return sampleData;
    return [...sampleData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAllClick = useCallback((event) => {
    setSelected(event.target.checked ? sampleData.map((row) => row.id) : []);
  }, []);

  const handleSelectClick = useCallback((id) => {
    setSelected((prev) => {
      const selectedIndex = prev.indexOf(id);
      if (selectedIndex === -1) return [...prev, id];
      return prev.filter((itemId) => itemId !== id);
    });
  }, []);

  const StatusBadge = ({ status }) => (
    <Box
      component={motion.div}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      sx={{
        display: "inline-flex",
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        bgcolor:
          status === "Active"
            ? alpha(theme.palette.success.main, 0.1)
            : alpha(theme.palette.error.main, 0.1),
        color:
          status === "Active"
            ? theme.palette.success.main
            : theme.palette.error.main,
        fontWeight: 500,
      }}
    >
      {status}
    </Box>
  );

  const ProgressBar = ({ value, delay = 0 }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          sx={{
            height: 6,
            bgcolor: theme.palette.primary.main,
            borderRadius: 1,
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
        {value}%
      </Typography>
    </Box>
  );

  const renderVariant = () => {
    switch (variant) {
      case "minimal":
        return (
          <MotionPaper
            {...animations.table}
            elevation={0}
            sx={{
              // width: "100%",
              overflow: "hidden",
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)) !important",
              border: `1px solid ${theme.palette.divider}`,

              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {sortedData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <MotionTableRow
                          key={row.id}
                          {...animations.row}
                          transition={{ delay: index * 0.05 }}
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                            },
                          }}
                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>
                            <StatusBadge status={row.status} />
                          </TableCell>
                          <TableCell align="right">
                            <ProgressBar
                              value={row.progress}
                              delay={index * 0.05}
                            />
                          </TableCell>
                        </MotionTableRow>
                      ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={sampleData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[5, 10, 15, 25]}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
              }
              SelectProps={{
                IconComponent: LuChevronDown,
                native: false,
                renderValue: (value) => `${value}`,
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 200 },
                  },
                },
                sx: {
                  fontSize: "16px !important",
                },
              }}
            />
          </MotionPaper>
        );

      case "expandable":
        return (
          <MotionPaper
            {...animations.table}
            sx={{
              // width: "100%",
              overflow: "hidden",
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell sx={{ minWidth: "120px", maxWidth: "120px" }}>
                      Date
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <React.Fragment key={row.id}>
                        <MotionTableRow
                          {...animations.row}
                          transition={{ delay: index * 0.05 }}
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <IconButton
                              size="small"
                              onClick={() =>
                                setExpandedRow(
                                  expandedRow === row.id ? null : row.id
                                )
                              }
                              sx={{
                                transition: "transform 0.2s",
                                transform:
                                  expandedRow === row.id
                                    ? "rotate(-180deg)"
                                    : "none",
                              }}
                            >
                              <LuChevronDown />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <Box component={motion.div} {...animations.cell}>
                              <Typography variant="subtitle2">
                                {row.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {row.details.email}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>
                            <StatusBadge status={row.status} />
                          </TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell align="right">
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Tooltip arrow title="View Details">
                                <IconButton size="small">
                                  <LuSearch />
                                </IconButton>
                              </Tooltip>
                              <Tooltip arrow title="Filter">
                                <IconButton size="small">
                                  <LuFilter />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </MotionTableRow>
                        <TableRow>
                          <TableCell colSpan={6} sx={{ p: 0, border: 0 }}>
                            <Collapse
                              in={expandedRow === row.id}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box
                                sx={{
                                  p: 3,
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.04
                                  ),
                                }}
                              >
                                <Typography variant="h6" gutterBottom>
                                  Additional Details
                                </Typography>
                                <Box
                                  sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                      xs: "1fr",
                                      sm: "repeat(2, 1fr)",
                                      md: "repeat(3, 1fr)",
                                    },
                                    gap: 3,
                                  }}
                                >
                                  {Object.entries(row.details).map(
                                    ([key, value]) => (
                                      <Box key={key}>
                                        <Typography
                                          variant="subtitle2"
                                          color="text.secondary"
                                          sx={{ mb: 0.5 }}
                                        >
                                          {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                        </Typography>
                                        <Typography>
                                          {Array.isArray(value)
                                            ? value.join(", ")
                                            : value}
                                        </Typography>
                                      </Box>
                                    )
                                  )}
                                </Box>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={sampleData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[5, 10, 15, 25]}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
              }
              SelectProps={{
                IconComponent: LuChevronDown,
                native: false,
                renderValue: (value) => `${value}`,
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 200 },
                  },
                },
                sx: {
                  fontSize: "16px !important",
                },
              }}
            />
          </MotionPaper>
        );

      case "modern":
      default:
        return (
          <MotionPaper
            {...animations.table}
            sx={{
              // width: "100%",
              overflow: "hidden",
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < sampleData.length
                        }
                        checked={selected.length === sampleData.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {[
                      { key: "name", label: "Name" },
                      { key: "role", label: "Role" },
                      { key: "status", label: "Status" },
                      { key: "progress", label: "Progress" },
                      { key: "date", label: "Date" },
                    ].map((header) => (
                      <TableCell
                        key={header.key}
                        sortDirection={
                          sortConfig.key === header.key
                            ? sortConfig.direction
                            : false
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            cursor: "pointer",
                            userSelect: "none",
                            "&:hover": {
                              color: theme.palette.primary.main,
                            },
                          }}
                          onClick={() => handleSort(header.key)}
                        >
                          <Box
                            component="span"
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              lineHeight: 1,
                            }}
                          >
                            {header.label}
                          </Box>
                          <Box
                            component={motion.div}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                            animate={{
                              rotate:
                                sortConfig.key === header.key
                                  ? sortConfig.direction === "desc"
                                    ? 180
                                    : 0
                                  : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                            }}
                          >
                            <LuArrowUpDown size={16} />
                          </Box>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                          <CircularProgress size={40} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isSelected = selected.indexOf(row.id) !== -1;
                          return (
                            <MotionTableRow
                              key={row.id}
                              {...animations.row}
                              transition={{ delay: index * 0.05 }}
                              sx={{
                                bgcolor: isSelected
                                  ? alpha(theme.palette.primary.main, 0.08)
                                  : "transparent",
                                "&:hover": {
                                  bgcolor: isSelected
                                    ? alpha(theme.palette.primary.main, 0.12)
                                    : alpha(theme.palette.primary.main, 0.04),
                                },
                              }}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => handleSelectClick(row.id)}
                                />
                              </TableCell>
                              <TableCell>
                                <Box
                                  component={motion.div}
                                  {...animations.cell}
                                >
                                  <Typography variant="subtitle2">
                                    {row.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {row.details.email}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{row.role}</TableCell>
                              <TableCell>
                                <StatusBadge status={row.status} />
                              </TableCell>
                              <TableCell>
                                <ProgressBar
                                  value={row.progress}
                                  delay={index * 0.05}
                                />
                              </TableCell>
                              <TableCell sx={{ minWidth: "120px" }}>
                                {row.date}
                              </TableCell>
                            </MotionTableRow>
                          );
                        })
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={sampleData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[5, 10, 15, 25]}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
              }
              SelectProps={{
                IconComponent: LuChevronDown,
                native: false,
                renderValue: (value) => `${value}`,
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 200 },
                  },
                },
                sx: {
                  fontSize: "16px !important",
                },
              }}
            />
          </MotionPaper>
        );
    }
  };

  return renderVariant();
};

export default TableVariants;
