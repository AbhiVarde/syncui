import React from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GiscusComponent from "@/components/guestbook";

const GuestBook = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md">
      <Box my={isMobile ? 2 : 4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Hey there! 👋 We're glad you're here!
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Loving what you see? Got a brilliant idea? Or just want to say hi?
          Drop us a line below and become part of our awesome community! 🌈✨
        </Typography>
        <Box width="100%">
          <GiscusComponent />
        </Box>
      </Box>
    </Container>
  );
};

export default GuestBook;
