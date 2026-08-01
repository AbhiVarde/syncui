import { Box, Typography } from "@mui/material";
import { motion } from "motion/react";

const ChartTooltip = ({ active, payload, label, mono, formatter }) => {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      sx={{
        bgcolor: mono.bg,
        border: "1px solid",
        borderColor: mono.fg,
        borderRadius: 1,
        px: 1.5,
        py: 1,
      }}
    >
      <Typography variant="caption" sx={{ color: mono.fg, opacity: 0.6 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, color: mono.fg }}>
        {formatter ? formatter(value) : value.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ChartTooltip;
