import React from "react";
import { Box, Paper, Typography, alpha } from "@mui/material";
import { motion } from "motion/react";
import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useChartTheme } from "@/hooks/useChartTheme";
import ChartTooltip from "@/components/ChartTooltip";

const MotionPaper = motion.create(Paper);

const defaultData = [
  { label: "Agents", value: 920 },
  { label: "MCP", value: 780 },
  { label: "Context Eng.", value: 640 },
  { label: "Multi-Agent", value: 560 },
  { label: "RAG", value: 430 },
  { label: "Evals", value: 340 },
  { label: "Guardrails", value: 260 },
];

const AnimatedBar = ({ x, y, width, height, fill, index, staggered }) => (
  <motion.rect
    x={x}
    width={width}
    rx={4}
    ry={4}
    fill={fill}
    initial={{ height: 0, y: y + height }}
    animate={{ height, y }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 24,
      delay: staggered ? index * 0.05 : 0,
    }}
  />
);

const BarChart = ({
  data = defaultData,
  variant = "default",
  height = 280,
  dataKey = "value",
  labelKey = "label",
}) => {
  const mono = useChartTheme();

  const ranked = React.useMemo(
    () => [...data].sort((a, b) => b[dataKey] - a[dataKey]),
    [data, dataKey],
  );

  const chartData = variant === "ranked" ? ranked : data;

  const maxIndex = chartData.reduce(
    (best, item, i) => (item[dataKey] > chartData[best][dataKey] ? i : best),
    0,
  );

  const rankTick = (value) => {
    const idx = ranked.findIndex((d) => d[labelKey] === value);
    return `${String(idx + 1).padStart(2, "0")}  ${value}`;
  };

  const HighlightBar = (props) => (
    <AnimatedBar
      {...props}
      fill={props.index === maxIndex ? mono.fg : mono.fade}
      staggered={variant === "ranked"}
    />
  );

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
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart
          data={chartData}
          barCategoryGap="35%"
          margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
        >
          <CartesianGrid stroke={mono.grid} vertical={false} />
          <XAxis
            dataKey={labelKey}
            axisLine={false}
            tickLine={false}
            tickFormatter={variant === "ranked" ? rankTick : undefined}
            tick={{ fill: mono.axis, fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: mono.axis, fontSize: 12 }}
          />
          <Tooltip
            content={<ChartTooltip mono={mono} />}
            cursor={{ fill: alpha(mono.fg, 0.06) }}
          />
          <Bar dataKey={dataKey} barSize={42} shape={HighlightBar} />
        </RBarChart>
      </ResponsiveContainer>
    </MotionPaper>
  );
};

export default BarChart;
