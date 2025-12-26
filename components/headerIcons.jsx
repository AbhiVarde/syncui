import { RiGithubFill, RiTwitterXLine } from "react-icons/ri";
import { RxDotsVertical } from "react-icons/rx";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import { GITHUB_URL, TWITTER_URL } from "@/utils/constants";
import AnimatedCounter from "./animatedCounter";

const HeaderIcons = ({
  stars,
  loading,
  toggleTheme,
  isMediumUp,
  handleToggle,
  anchorRef,
  menuOpen,
}) => {
  const renderDivider = () => (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        alignSelf: "center",
        mx: 0.5,
        height: 24,
        borderColor: "divider",
      }}
    />
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 0.5, sm: 1 },
      }}
    >
      {/* GitHub Icon with Stars */}
      {(typeof stars === "number" || loading) && (
        <>
          <Box
            component="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.primary",
              textDecoration: "none",
              cursor: "pointer",
              transition: "opacity 0.1s ease",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          >
            <RiGithubFill size={20} style={{ cursor: "pointer" }} />
            {!loading && stars > 0 && (
              <Typography
                variant="body2"
                component="span"
                fontWeight={500}
                sx={{ fontSize: 14 }}
              >
                <AnimatedCounter
                  value={stars}
                  duration={1}
                  formatter={(val) => val.toLocaleString()}
                  delay={0}
                />
              </Typography>
            )}
          </Box>

          {renderDivider()}
        </>
      )}

      <IconButton
        component="a"
        href={TWITTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseLeave={(e) => e.target.blur()}
        sx={{
          color: "text.primary",
          p: 0.5,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.7,
          },
          "&:focus": {
            backgroundColor: "transparent",
            opacity: 1,
          },
          "&:active": {
            backgroundColor: "transparent",
            opacity: 0.7,
          },
        }}
      >
        <RiTwitterXLine size={18} style={{ cursor: "pointer" }} />
      </IconButton>

      {renderDivider()}

      <IconButton
        onClick={toggleTheme}
        onMouseLeave={(e) => e.target.blur()}
        aria-label="Toggle theme"
        sx={{
          color: "text.primary",
          p: 0.5,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.7,
          },
          "&:focus": {
            backgroundColor: "transparent",
            opacity: 1,
          },
          "&:active": {
            backgroundColor: "transparent",
            opacity: 0.7,
          },
        }}
      >
        <WiMoonAltThirdQuarter size={24} style={{ cursor: "pointer" }} />
      </IconButton>

      {!isMediumUp && (
        <>
          {renderDivider()}

          <IconButton
            ref={anchorRef}
            aria-controls={menuOpen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            onMouseLeave={(e) => e.target.blur()}
            sx={{
              color: "text.primary",
              p: 0.5,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "transparent",
                opacity: 0.7,
              },
              "&:focus": {
                backgroundColor: "transparent",
                opacity: 1,
              },
              "&:active": {
                backgroundColor: "transparent",
                opacity: 0.7,
              },
            }}
          >
            <RxDotsVertical size={20} style={{ cursor: "pointer" }} />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default HeaderIcons;
