import React, { useState } from "react";
import { Divider, Box, useTheme } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { RxStar, RxStarFilled, RxPlus } from "react-icons/rx";

const StyledDivider = styled(Divider)(({ theme, variant }) => ({
  width: "100%",
  ...(variant === "dashed" && {
    borderStyle: "dashed",
    borderWidth: "1.5px",
  }),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(1, 2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "9999px",
}));

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SeparatorVariants = ({ variant, label, preview = false, ...props }) => {
  const theme = useTheme();

  const [isStarFilled, setIsStarFilled] = useState(false);

  const handleStarClick = () => {
    if (preview) return;
    setIsStarFilled(!isStarFilled);
  };

  const renderSeparator = () => {
    switch (variant) {
      case "dashed":
        return <StyledDivider variant="dashed" {...props} />;
      case "icon":
        return (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <StyledDivider sx={{ flex: 1 }} {...props} />
            <IconWrapper
              sx={preview ? { padding: (t) => t.spacing(0.5, 1) } : undefined}
            >
              <RxPlus size={preview ? 14 : 19} />
            </IconWrapper>
            <StyledDivider sx={{ flex: 1 }} {...props} />
          </Box>
        );
      case "zigzag":
        return (
          <Box
            sx={{
              width: "100%",
              height: "10px",
              backgroundImage: `linear-gradient(135deg, ${theme.palette.divider} 25%, transparent 25%, transparent 50%, ${theme.palette.divider} 50%, ${theme.palette.divider} 75%, transparent 75%, transparent 100%)`,
              backgroundSize: "20px 20px",
            }}
          />
        );
      case "gradient":
        return (
          <Box
            sx={{
              width: "100%",
              height: "2px",
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />
        );
      case "shimmer":
        return (
          <Box
            sx={{
              width: "100%",
              height: "2px",
              background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.primary.main}, ${theme.palette.background.paper})`,
              backgroundSize: "1000px 100%",
              animation: `${shimmer} 5s infinite linear`,
            }}
          />
        );
      case "dotted":
        return (
          <Box
            sx={{
              width: "100%",
              height: "10px",
              backgroundImage: `radial-gradient(circle, ${theme.palette.divider} 1.5px, transparent 1.5px)`,
              backgroundSize: "10px 10px",
            }}
          />
        );
      case "starry":
        return (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <StyledDivider sx={{ flex: 1 }} {...props} />
            <Box
              sx={{
                mx: preview ? 1 : 2,
                cursor: preview ? "default" : "pointer",
              }}
              onClick={handleStarClick}
            >
              {isStarFilled ? (
                <RxStarFilled size={preview ? 16 : 22} />
              ) : (
                <RxStar size={preview ? 16 : 22} />
              )}
            </Box>
            <StyledDivider sx={{ flex: 1 }} {...props} />
          </Box>
        );
      default:
        return <Divider {...props} />;
    }
  };

  return (
    <Box
      sx={{
        width: preview ? "80%" : "100%",
        pointerEvents: preview ? "none" : "auto",
      }}
    >
      {renderSeparator()}
    </Box>
  );
};

export default SeparatorVariants;
