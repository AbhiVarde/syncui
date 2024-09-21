import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();
  const [timeoutActive, setTimeoutActive] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeoutActive(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

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
      {timeoutActive ? (
        <>
          <Typography variant="h6" textAlign="center" fontWeight={500}>
            Loading...⏳
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1 }}>
            Hang tight, we’re almost there! 😅
          </Typography>
        </>
      ) : (
        <Typography variant="body1" textAlign="center" fontWeight={400}>
          😅 Oops! Taking longer than expected. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
