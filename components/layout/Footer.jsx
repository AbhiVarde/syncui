import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { RiGithubFill, RiTwitterXLine } from "react-icons/ri";
import { GITHUB_URL, TWITTER_URL } from "../../utils/constants";

const Footer = () => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="footer"
      sx={{
        height: "60px",
        borderTop: `1px solid ${theme.palette.divider}`,
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
          <Typography variant="body2">
            © {new Date().getFullYear()} Sync UI. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="inherit"
            >
              <RiGithubFill size={22} />
            </IconButton>
            <IconButton
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="inherit"
            >
              <RiTwitterXLine size={17} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
