import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  AreaChart as RAreaChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";
import ChartTooltip from "@/components/ChartTooltip";

const MotionPaper = motion.create(Paper);

const defaultData = [
  { label: "Feb", value: 320 },
  { label: "Mar", value: 410 },
  { label: "Apr", value: 480 },
  { label: "May", value: 590 },
  { label: "Jun", value: 710 },
  { label: "Jul", value: 860 },
  { label: "Aug", value: 940 },
];

const AnimatedValue = ({ value, mono }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span style={{ color: mono.fg }}>{rounded}</motion.span>;
};

const LiveDot = ({ cx, cy, index, dataLength, mono }) => {
  if (index !== dataLength - 1) return null;

  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={10}
        fill="none"
        stroke={mono.fg}
        strokeWidth={2}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <circle cx={cx} cy={cy} r={4} fill={mono.fg} />
    </g>
  );
};

const LineChart = ({
  data = defaultData,
  variant = "default",
  height = 280,
  dataKey = "value",
  labelKey = "label",
  label = "Latest value",
}) => {
  const mono = useChartTheme();
  const latest = data[data.length - 1]?.[dataKey] ?? 0;

  const renderDot = (props) => (
    <LiveDot
      {...props}
      dataLength={data.length}
      mono={mono}
      key={props.index}
    />
  );

  const renderChart = () => {
    if (variant === "area") {
      return (
        <RAreaChart
          data={data}
          margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="syncFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={mono.fg} stopOpacity={0.25} />
              <stop offset="100%" stopColor={mono.fg} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={mono.grid} vertical={false} />
          <XAxis
            dataKey={labelKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: mono.axis, fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: mono.axis, fontSize: 12 }}
          />
          <Tooltip
            content={<ChartTooltip mono={mono} />}
            cursor={{ stroke: mono.grid, strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={mono.fg}
            strokeWidth={2}
            fill="url(#syncFade)"
            isAnimationActive
            animationDuration={800}
          />
        </RAreaChart>
      );
    }

    return (
      <RLineChart
        data={data}
        margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
      >
        <CartesianGrid stroke={mono.grid} vertical={false} />
        <XAxis
          dataKey={labelKey}
          axisLine={false}
          tickLine={false}
          tick={{ fill: mono.axis, fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: mono.axis, fontSize: 12 }}
        />
        <Tooltip
          content={<ChartTooltip mono={mono} />}
          cursor={{ stroke: mono.grid, strokeWidth: 1 }}
        />
        <Line
          type="linear"
          dataKey={dataKey}
          stroke={mono.fg}
          strokeWidth={2}
          dot={renderDot}
          isAnimationActive
          animationDuration={700}
        />
      </RLineChart>
    );
  };

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
        overflow: "hidden",
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="caption" sx={{ color: mono.axis }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          <AnimatedValue value={latest} mono={mono} />
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </MotionPaper>
  );
};

export default LineChart;
