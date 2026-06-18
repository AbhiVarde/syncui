import React, { useState, useEffect, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Button,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGitHub } from "@/context/GithubContext";
import Search from "../common/Search";
import AnimatedCounter from "../AnimatedCounter";
import { GITHUB_URL, TWITTER_URL } from "@/utils/constants";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu02Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Menu09Icon,
  GithubIcon,
  NewTwitterIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";

const navItems = [
  { label: "Home", href: "/", external: false },
  { label: "Docs", href: "/docs", external: false },
  { label: "Components", href: "/components", external: false },
  { label: "Blocks", href: "/blocks", external: false },
  { label: "Templates", href: "/templates", external: false },
  { label: "Showcase", href: "/showcase", external: false },
  { label: "Changelog", href: "/docs/changelog", external: false },
  {
    label: "Skills",
    href: "https://www.skills.sh/abhivarde/syncui/syncui",
    external: true,
  },
];

const ANIMATION_MS = 220;

const FullScreenMenu = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 56,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  zIndex: 1200,
  overflowY: "auto",
  overflowX: "hidden",
  willChange: "opacity, transform",
  opacity: 0,
  transition: `opacity ${ANIMATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
  "&.menu-visible": {
    opacity: 1,
  },
}));

const MenuPanel = styled(Box)(() => ({
  maxWidth: 600,
  margin: "0 auto",
  padding: "32px 24px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  opacity: 0,
  transform: "translateY(-10px)",
  willChange: "opacity, transform",
  transition: `opacity ${ANIMATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1), transform ${ANIMATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
  "&.menu-visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const NavItemRow = styled(Box)(() => ({
  textDecoration: "none",
  opacity: 0,
  transform: "translateY(-6px)",
  transition:
    "opacity 0.18s ease-out, transform 0.18s ease-out, color 0.15s ease",
  "&.menu-visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
  "&:hover": {
    opacity: 0.6,
  },
}));

const Header = ({ toggleTheme, isDarkMode, docsTree, toc }) => {
  const theme = useTheme();
  const isLargeUp = useMediaQuery(theme.breakpoints.up("lg"));
  const router = useRouter();
  const { stars, loading } = useGitHub();

  const isDocsPage = router.pathname.startsWith("/docs");
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  useEffect(() => {
    let timeoutId;

    if (menuOpen) {
      setMenuMounted(true);
    } else if (menuMounted) {
      timeoutId = setTimeout(() => setMenuMounted(false), ANIMATION_MS);
    }

    return () => clearTimeout(timeoutId);
  }, [menuOpen, menuMounted]);

  // Observe headings for breadcrumbs (docs pages only)
  useEffect(() => {
    if (!isDocsPage) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }),
      { rootMargin: "-20% 0px -60% 0px" },
    );
    toc?.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [isDocsPage, toc]);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = () => setMenuOpen(false);

  const renderBreadcrumbs = () => {
    const activeTocItem = toc?.find((item) => item?.id === activeId);
    const activeText = activeTocItem ? activeTocItem?.text : "";

    return (
      <Breadcrumbs
        separator={<HugeiconsIcon icon={ArrowRight01Icon} size={18} />}
        aria-label="breadcrumb"
        sx={{ display: { xs: "flex", lg: "none" } }}
      >
        <Typography
          color="text.primary"
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 500,
          }}
        >
          <HugeiconsIcon icon={Menu02Icon} size={20} /> On this page
        </Typography>
        {activeText && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: { sm: "100%", xs: "180px" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {activeText}
          </Typography>
        )}
      </Breadcrumbs>
    );
  };

  const renderHeaderIcons = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {(typeof stars === "number" || loading) && (
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
            "&:hover": { opacity: 0.7 },
          }}
        >
          <HugeiconsIcon icon={GithubIcon} size={20} />
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
      )}

      <IconButton
        component="a"
        href={TWITTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "text.primary",
          p: 0.5,
          "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
        }}
      >
        <HugeiconsIcon icon={NewTwitterIcon} size={18} />
      </IconButton>

      <IconButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
        sx={{
          color: "text.primary",
          p: 0.5,
          "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
        }}
      >
        <HugeiconsIcon icon={isDarkMode ? Sun01Icon : Moon01Icon} size={22} />
      </IconButton>
    </Box>
  );

  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          height: "56px",
          width: "100%",
          top: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.75)"
              : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            padding: isLargeUp ? "8px 24px" : "8px 16px",
            minHeight: "56px !important",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.1s ease-out",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isLargeUp && (
                <Button
                  onClick={handleToggle}
                  disableRipple
                  startIcon={
                    <HugeiconsIcon
                      icon={menuOpen ? Cancel01Icon : Menu09Icon}
                      size={24}
                    />
                  }
                  sx={{
                    minWidth: "auto",
                    px: 0,
                    py: 0,
                    typography: "body1",
                    fontWeight: 500,
                    textTransform: "none",
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Menu
                </Button>
              )}

              {isLargeUp && (
                <Box
                  component="nav"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      component={item.external ? "a" : Link}
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      disableRipple
                      sx={{
                        minWidth: "auto",
                        height: 32,
                        px: 1.25,
                        borderRadius: 1.5,
                        typography: "body2",
                        fontWeight: 500,
                        textTransform: "none",
                        color: "text.primary",
                        transition:
                          "background-color 0.15s ease, color 0.15s ease",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Search docsTree={docsTree} />
              {renderHeaderIcons()}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {isDocsPage && !isLargeUp && (
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            top: 56,
            height: "40px !important",
            width: "100%",
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.default",
            zIndex: 1050,
          }}
        >
          <Toolbar
            sx={{
              height: "100%",
              padding: isLargeUp ? "8px 24px" : "8px 12px",
              maxHeight: "40px !important",
              minHeight: "40px !important",
            }}
          >
            {renderBreadcrumbs()}
          </Toolbar>
        </AppBar>
      )}

      {menuMounted && !isLargeUp && (
        <FullScreenMenu className={menuOpen ? "menu-visible" : ""}>
          <MenuPanel className={menuOpen ? "menu-visible" : ""}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                mb: 3,
              }}
            >
              Menu
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {navItems.map((item, index) => (
                <NavItemRow
                  key={item.href}
                  component={item.external ? "a" : Link}
                  href={item.href}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  onClick={handleClose}
                  className={menuOpen ? "menu-visible" : ""}
                  sx={{
                    color: "text.primary",
                    transitionDelay: menuOpen ? `${index * 25}ms` : "0ms",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {item.label}
                  </Typography>
                </NavItemRow>
              ))}
            </Box>
          </MenuPanel>
        </FullScreenMenu>
      )}
    </Fragment>
  );
};

export default Header;
