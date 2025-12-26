import { Box, Typography, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();

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
        Hang tight, we’re almost there! 😅
      </Typography>
    </Box>
  );
};

export default Loader;
