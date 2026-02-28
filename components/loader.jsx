import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Loader = ({ delay = 300 }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <Box
      sx={{
        px: 0.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h6" textAlign="center" fontWeight={500}>
        Loading... ⏳
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ mt: 1 }}>
        Hang tight, we're almost there! 😅
      </Typography>
    </Box>
  );
};

export default Loader;
