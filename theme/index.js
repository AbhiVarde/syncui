import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const pxToRem = (px) => `${px / 16}rem`;

function customResponsiveFontSizes({ sm, md, lg }) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const baseTheme = {
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: pxToRem(42),
      ...customResponsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.33,
      fontSize: pxToRem(34),
      ...customResponsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(26),
      ...customResponsiveFontSizes({ sm: 32, md: 36, lg: 40 }),
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(22),
      ...customResponsiveFontSizes({ sm: 24, md: 28, lg: 32 }),
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...customResponsiveFontSizes({ sm: 20, md: 24, lg: 28 }),
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.56,
      fontSize: pxToRem(18),
      ...customResponsiveFontSizes({ sm: 18, md: 20, lg: 22 }),
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
      ...customResponsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: 1.57,
      fontSize: pxToRem(14),
      ...customResponsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
      ...customResponsiveFontSizes({ sm: 16, md: 16, lg: 18 }),
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.57,
      fontSize: pxToRem(14),
      ...customResponsiveFontSizes({ sm: 14, md: 14, lg: 16 }),
    },
    button: {
      fontWeight: 600,
      lineHeight: 1.71,
      fontSize: pxToRem(14),
      textTransform: "capitalize",
      ...customResponsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      ...customResponsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      textTransform: "uppercase",
      ...customResponsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          transition: "all 0.3s ease-in-out",
          padding: "8px 20px",
          fontSize: "16px",
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: ({ theme }) => ({
            border: `1px solid`,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            "&:hover": {
              border: `1px solid`,
              backgroundColor: theme.palette.background.default,
            },
          }),
        },
        {
          props: { variant: "contained" },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.text.primary}`,
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.default,
            "&:hover": {
              border: `1px solid ${theme.palette.text.primary}`,
              backgroundColor: theme.palette.text.primary,
            },
          }),
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "black",
          color: "white",
          fontSize: "12px",
          padding: "6px",
          borderRadius: "4px",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        },
        arrow: {
          color: "black",
        },
      },
    },
  },
};

const createResponsiveTheme = (palette) => {
  const theme = createTheme({
    ...baseTheme,
    palette,
    components: {
      ...baseTheme.components,
      MuiTooltip: {
        ...baseTheme.components.MuiTooltip,
        styleOverrides: {
          ...baseTheme.components.MuiTooltip.styleOverrides,
          tooltip: {
            ...baseTheme.components.MuiTooltip.styleOverrides.tooltip,
            backgroundColor: palette.mode === "dark" ? "white" : "black",
            color: palette.mode === "dark" ? "black" : "white",
          },
          arrow: {
            color: palette.mode === "dark" ? "white" : "black",
          },
        },
      },
    },
  });
  return responsiveFontSizes(theme);
};

export const lightTheme = createResponsiveTheme({
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#F8F8F8",
  },
  text: {
    primary: "#1A1A1A",
    secondary: "#585858",
  },
  primary: {
    main: "#3366FF",
    light: "#6690FF",
    dark: "#0040FF",
  },
  secondary: {
    main: "#FF3366",
    light: "#FF6690",
    dark: "#FF0040",
  },
  divider: "rgba(0, 0, 0, 0.12)",
});

export const darkTheme = createResponsiveTheme({
  mode: "dark",
  background: {
    default: "#000000",
    paper: "#111111",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B0B0",
  },
  primary: {
    main: "#66A3FF",
    light: "#99C2FF",
    dark: "#3385FF",
  },
  secondary: {
    main: "#FF6699",
    light: "#FF99BB",
    dark: "#FF3377",
  },
  divider: "rgba(255, 255, 255, 0.12)",
});
