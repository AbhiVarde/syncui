import React, { useEffect } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";

const MotionPaper = motion.create(Paper);

const CARD_HEIGHT = 200;

const defaultTrend = [
  { value: 12 },
  { value: 18 },
  { value: 15 },
  { value: 24 },
  { value: 21 },
  { value: 30 },
  { value: 28 },
  { value: 36 },
];

const AnimatedNumber = ({ value, mono, prefix = "", suffix = "" }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(
    mv,
    (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`,
  );

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span style={{ color: mono.fg }}>{rounded}</motion.span>;
};

const TrendArea = ({ trend, mono, gradientId }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={trend} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mono.fg} stopOpacity={0.24} />
          <stop offset="100%" stopColor={mono.fg} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="value"
        stroke={mono.fg}
        strokeWidth={1.5}
        fill={`url(#${gradientId})`}
        isAnimationActive
        animationDuration={800}
      />
    </AreaChart>
  </ResponsiveContainer>
);

const Stat = ({
  label = "Active agents",
  value = 1280,
  delta = 12.4,
  prefix = "",
  suffix = "",
  trend = defaultTrend,
  variant = "default",
}) => {
  const mono = useChartTheme();
  const isUp = delta >= 0;
  const isSpark = variant === "spark";

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
        height: CARD_HEIGHT,
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={isSpark ? "row" : "column"}
        alignItems="stretch"
        spacing={2}
        sx={{ width: "100%", height: "100%" }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Typography variant="caption" sx={{ color: mono.axis }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500, mt: 0.5 }}>
            <AnimatedNumber
              value={value}
              mono={mono}
              prefix={prefix}
              suffix={suffix}
            />
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: isUp ? mono.fg : mono.axis, fontWeight: 500 }}
          >
            {isUp ? "↑" : "↓"} {Math.abs(delta)}%
          </Typography>
        </Box>

        <Box sx={{ width: "100%", flexGrow: 1, alignSelf: "stretch" }}>
          <TrendArea
            trend={trend}
            mono={mono}
            gradientId={isSpark ? "statFadeSpark" : "statFadeFull"}
          />
        </Box>
      </Stack>
    </MotionPaper>
  );
};

export default Stat;
