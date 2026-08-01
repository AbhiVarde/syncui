import React, { useEffect } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";
import ChartTooltip from "@/components/ChartTooltip";

const MotionPaper = motion.create(Paper);

const defaultData = [
  { label: "Passing", value: 640 },
  { label: "Flagged", value: 90 },
  { label: "Failing", value: 30 },
];

const RING_SIZE = 200;

const CenterValue = ({ value, mono }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span style={{ color: mono.fg }}>{rounded}</motion.span>;
};

const Legend = ({ data, colors, mono }) => (
  <Stack spacing={1.25} justifyContent="center" sx={{ minWidth: 0 }}>
    {data.map((d, i) => (
      <Stack key={d.label} direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "2px",
            bgcolor: colors[i],
            flexShrink: 0,
          }}
        />
        <Typography
          variant="body2"
          sx={{ color: mono.fg, whiteSpace: "nowrap" }}
        >
          {d.label}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: mono.axis, ml: "auto !important", pl: 2 }}
        >
          {d.value.toLocaleString()}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

const Ring = ({
  data,
  dataKey,
  labelKey,
  colors,
  mono,
  total,
  centerLabel,
}) => (
  <Box
    sx={{
      position: "relative",
      width: RING_SIZE,
      height: RING_SIZE,
      flexShrink: 0,
    }}
  >
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<ChartTooltip mono={mono} />} />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={labelKey}
          innerRadius="68%"
          outerRadius="100%"
          paddingAngle={3}
          cornerRadius={4}
          isAnimationActive
          animationDuration={700}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        <CenterValue value={total} mono={mono} />
      </Typography>
      <Typography variant="caption" sx={{ color: mono.axis }}>
        {centerLabel}
      </Typography>
    </Box>
  </Box>
);

const Donut = ({
  data = defaultData,
  variant = "default",
  dataKey = "value",
  labelKey = "label",
  centerLabel = "Total",
}) => {
  const mono = useChartTheme();
  const total = data.reduce((sum, d) => sum + d[dataKey], 0);
  const colors = data.map((_, i) =>
    i === 0 ? mono.fg : `${mono.fg}${Math.max(15, 55 - i * 18)}`,
  );
  const showLegend = variant === "legend";

  return (
    <MotionPaper
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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction={showLegend ? "row" : "column"}
        spacing={showLegend ? 4 : 0}
        alignItems="center"
        justifyContent="center"
      >
        <Ring
          data={data}
          dataKey={dataKey}
          labelKey={labelKey}
          colors={colors}
          mono={mono}
          total={total}
          centerLabel={centerLabel}
        />
        {showLegend && <Legend data={data} colors={colors} mono={mono} />}
      </Stack>
    </MotionPaper>
  );
};

export default Donut;
