import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LinkPreview from "../common/LinkPreview";

const Footer = () => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="footer"
      sx={{
        height: "60px",
        borderTop: `1px solid ${theme.palette.divider}`,
        position: "relative",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          padding: isMediumUp ? "12px 24px" : "16px 8px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Typography variant="caption">
            Brought to you by{" "}
            <LinkPreview
              url="https://abhivarde.in"
              placement="top"
              staticImage="/author-image.png"
            >
              abhivarde.in
            </LinkPreview>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
