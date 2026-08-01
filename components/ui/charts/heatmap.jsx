import React, { useMemo } from "react";
import { Box, Paper, Typography, Stack, Tooltip } from "@mui/material";
import { motion } from "motion/react";
import { useChartTheme } from "../../../hooks/useChartTheme";

const DAY_MS = 86400000;
const LEVEL_OPACITY = [0.06, 0.22, 0.42, 0.64, 1];
const LEVEL_WEIGHTS = [0.45, 0.25, 0.15, 0.1, 0.05];

const weightedLevel = () => {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < LEVEL_WEIGHTS.length; i++) {
    acc += LEVEL_WEIGHTS[i];
    if (r <= acc) return i;
  }
  return LEVEL_WEIGHTS.length - 1;
};

const generateData = (weeks) => {
  const days = weeks * 7;
  const today = new Date();
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today.getTime() - i * DAY_MS);
    data.push({ date, level: weightedLevel() });
  }
  return data;
};

const Cell = ({ level, mono, date }) => (
  <Tooltip
    title={`${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} — ${
      level === 0 ? "no activity" : `level ${level}`
    }`}
    arrow
  >
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: LEVEL_OPACITY[level], scale: 1 }}
      transition={{ duration: 0.2 }}
      sx={{
        width: 11,
        height: 11,
        borderRadius: "2px",
        bgcolor: mono.fg,
        cursor: "pointer",
        flexShrink: 0,
      }}
    />
  </Tooltip>
);

const Heatmap = ({ variant = "grid", data }) => {
  const mono = useChartTheme();
  const weeks = variant === "compact" ? 24 : 48;
  const cells = useMemo(() => data || generateData(weeks), [data, weeks]);

  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < cells.length; i += 7) {
      cols.push(cells.slice(i, i + 7));
    }
    return cols;
  }, [cells]);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: mono.border,
        bgcolor: "background.paper",
        width: "100%",
      }}
    >
      <Stack spacing={1.5} sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              gap: "3px",
              overflowX: "auto",
              pb: 0.5,
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            {columns.map((col, i) => (
              <Stack key={i} spacing="3px">
                {col.map((d, j) => (
                  <Cell key={j} level={d.level} mono={mono} date={d.date} />
                ))}
              </Stack>
            ))}
          </Box>
        </Box>
        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: mono.axis }}>
            Less
          </Typography>
          {LEVEL_OPACITY.map((op, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "2px",
                bgcolor: mono.fg,
                opacity: op,
              }}
            />
          ))}
          <Typography variant="caption" sx={{ color: mono.axis }}>
            More
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Heatmap;
