import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import { RiGithubFill, RiTwitterXLine } from "react-icons/ri";
import { GITHUB_URL, TWITTER_URL } from "../../utils/constants";
import LinkPreview from "../common/LinkPreview";

const Footer = () => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  const renderDivider = () => (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        alignSelf: "center",
        height: 20,
        mx: 0.5,
        borderColor: "divider",
      }}
    />
  );

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
            <LinkPreview url="https://abhivarde.in" placement="top">
              abhivarde.in
            </LinkPreview>
            .
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.primary",
                p: 0.5,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
              }}
            >
              <RiGithubFill size={20} style={{ cursor: "pointer" }} />
            </IconButton>

            {renderDivider()}

            <IconButton
              component="a"
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.primary",
                p: 0.5,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
              }}
            >
              <RiTwitterXLine size={18} style={{ cursor: "pointer" }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
