import { useTheme } from "@mui/material";

export const useChartTheme = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return {
    isDark,
    fg: isDark ? "#FFFFFF" : "#111111",
    bg: isDark ? "#000000" : "#FFFFFF",
    grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    axis: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
    fade: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
    border: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
  };
};
