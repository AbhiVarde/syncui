import { RiGithubFill, RiTwitterXLine } from "react-icons/ri";
import { RxMoon, RxSun, RxDotsVertical } from "react-icons/rx";
import { Box, IconButton, Typography } from "@mui/material";
import { GITHUB_URL, TWITTER_URL } from "@/utils/constants";

const ICON_SIZE = 20;
const CONTAINER_SIZE = 36;

const IconContainer = ({ component = "a", children, ...props }) => (
  <Box
    component={component}
    sx={{
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "inherit",
      textDecoration: "none",
      bgcolor: (theme) => theme.palette.action.hover,
      height: CONTAINER_SIZE,
      minWidth: CONTAINER_SIZE,
      borderRadius: "8px",
      transition: "all 0.2s ease-in-out",
      border: "1px solid",
      borderColor: "divider",
      gap: 1,
      px: 1.5,
      "&:hover": {
        bgcolor: (theme) => theme.palette.action.selected,
        transform: "translateY(-1px)",
      },
    }}
    {...props}
  >
    {children}
  </Box>
);

const HeaderIcons = ({
  stars,
  loading,
  isDarkMode,
  toggleTheme,
  isMediumUp,
  handleToggle,
  anchorRef,
  menuOpen,
}) => {
  return (
    <>
      <IconContainer
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiGithubFill size={ICON_SIZE} />
        {!loading && (
          <Typography variant="caption" component="span" fontWeight={500}>
            {stars.toLocaleString()}
          </Typography>
        )}
      </IconContainer>

      <IconContainer
        href={TWITTER_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiTwitterXLine size={16} />
      </IconContainer>

      <IconContainer
        component="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <RxMoon size={17} /> : <RxSun size={17} />}
      </IconContainer>

      {!isMediumUp && (
        <IconButton
          ref={anchorRef}
          aria-controls={menuOpen ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            width: CONTAINER_SIZE,
            height: CONTAINER_SIZE,
          }}
        >
          <RxDotsVertical size={ICON_SIZE} />
        </IconButton>
      )}
    </>
  );
};

export default HeaderIcons;
