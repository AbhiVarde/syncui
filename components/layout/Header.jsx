import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  styled,
  Divider,
} from "@mui/material";
import {
  RxTextAlignLeft,
  RxChevronRight,
  RxCross2,
  RxExternalLink,
  RxComponent2,
  RxLayers,
  RxChevronDown,
} from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoSidebarCollapse } from "react-icons/go";
import { useGitHub } from "@/context/GithubContext";
import HeaderIcons from "../headerIcons";
import LinkPreview from "../common/LinkPreview";
import Image from "next/image";
import Search from "../common/Search";

const menuItems = [
  {
    label: "Blocks",
    href: "/blocks",
    external: false,
    icon: <RxComponent2 size={18} />,
    comingSoon: true,
    disabled: true,
  },
  {
    label: "Templates",
    href: "/templates",
    external: false,
    icon: <RxLayers size={18} />,
    comingSoon: false,
    disabled: false,
  },
  {
    label: "Changelog",
    href: "/docs/changelog",
    external: false,
    icon: <RxExternalLink size={18} />,
    comingSoon: false,
    disabled: false,
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
      : "0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
  overflow: "hidden",
  minWidth: 180,
  maxWidth: 180,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

const RotatingChevron = ({ isOpen }) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
      transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
  >
    <RxChevronDown size={16} />
  </Box>
);

const Header = ({ toggleTheme, isDarkMode, docsTree, toc }) => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const { asPath } = router;
  const { stars, loading } = useGitHub();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDocsPage = router.pathname.startsWith("/docs");
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isComponentsOpen, setIsComponentsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = (event) => {
    if (anchorRef.current?.contains(event.target)) return;
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }),
      { rootMargin: "-20% 0px -60% 0px" }
    );
    toc?.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [isDocsPage, toc]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const groupDocsTree = (docsTree) => {
    const grouped = { "Getting Started": [] };
    grouped["Getting Started"].push({
      title: "Templates",
      url: "/templates",
      slug: "templates",
    });

    docsTree?.forEach((item) => {
      if (["Setup", "Changelog", "The Story of Sync UI"].includes(item.title)) {
        grouped["Getting Started"].push(item);
      } else {
        grouped["Components"] = grouped["Components"] || [];
        grouped["Components"].push(item);
      }
    });

    grouped["Getting Started"].sort(
      (a, b) =>
        ({ Setup: 1, Changelog: 2, Templates: 3, "The Story of Sync UI": 4 })[
          a.title
        ] -
          { Setup: 1, Changelog: 2, Templates: 3, "The Story of Sync UI": 4 }[
            b.title
          ] || 0
    );
    return grouped;
  };

  const renderDocsTree = () => (
    <Box
      sx={{
        width: 320,
        py: 4,
        px: 2,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          color: "text.secondary",
          bgcolor: "background.paper",
          borderRadius: "8px",
        }}
      >
        <RxCross2 size={18} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1 }}>
        <Image
          src="/logo.png"
          alt="Sync UI Logo"
          width={28}
          height={28}
          style={{ borderRadius: "4px" }}
        />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Sync UI Docs
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 0.2 }}>
        {Object.entries(groupDocsTree(docsTree)).map(([category, items]) => (
          <Box key={category} sx={{ my: 2 }}>
            {category === "Components" ? (
              <>
                <Box
                  onClick={() => setIsComponentsOpen(!isComponentsOpen)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    mb: 1,
                    userSelect: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      letterSpacing: 0.5,
                      color: "text.secondary",
                    }}
                  >
                    {category}
                  </Typography>
                  <RotatingChevron isOpen={isComponentsOpen} />
                </Box>
                {isComponentsOpen && (
                  <List disablePadding>
                    {items.map((item) => {
                      const isActive = router.asPath === item.url;
                      return (
                        <ListItem
                          key={item.url}
                          button
                          component={Link}
                          href={item.url}
                          onClick={() => {
                            toggleDrawer();
                            setTimeout(() => router.push(item.url), 500);
                          }}
                          sx={{
                            mb: 0.5,
                            px: 1.5,
                            py: 0.4,
                            borderRadius: 1.2,
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            cursor: "pointer",
                            letterSpacing: 0.2,
                            color: isActive ? "text.primary" : "text.secondary",
                            textShadow: isActive
                              ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
                              : "none",
                            border: "1px solid transparent",
                            transition:
                              "background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
                            "&:hover": {
                              bgcolor: "action.hover",
                              color: "text.primary",
                            },
                            ...(isActive && {
                              bgcolor: "action.hover",
                              borderColor: "divider",
                            }),
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <ListItemText
                              primary={item.title}
                              primaryTypographyProps={{
                                variant: "body2",
                                sx: {
                                  fontWeight: 400,
                                  textShadow: isActive
                                    ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
                                    : "none",
                                  color: isActive
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }}
                            />
                            {[
                              "Time Pickers",
                              "Date Pickers",
                              "Autocompletes",
                            ].includes(item.title) && (
                              <Box
                                component="span"
                                sx={{
                                  ml: 1,
                                  px: 0.8,
                                  py: 0.2,
                                  bgcolor: "#008080",
                                  color: "#ffffff",
                                  borderRadius: "10px",
                                  fontSize: "0.65rem",
                                  fontWeight: 500,
                                  lineHeight: 1,
                                  letterSpacing: "0.02em",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                New
                              </Box>
                            )}
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </>
            ) : (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {category}
                </Typography>
                <List disablePadding>
                  {items.map((item) => {
                    const isActive =
                      (item.title === "Setup" && router.asPath === "/docs") ||
                      (item.title === "Changelog" &&
                        router.asPath === "/docs/changelog") ||
                      (item.title === "Templates" &&
                        router.asPath === "/templates") ||
                      router.asPath === item.url;
                    return (
                      <ListItem
                        key={item.url}
                        button
                        component={Link}
                        href={item.url}
                        onClick={() => {
                          toggleDrawer();
                          setTimeout(() => router.push(item.url), 500);
                        }}
                        sx={{
                          mb: 0.5,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.2,
                          transition: "all 0.15s",
                          ...(isActive && {
                            bgcolor: "background.paper",
                            boxShadow: (theme) =>
                              `0 0 0 1px ${theme.palette.divider}`,
                          }),
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                              variant: "body2",
                              sx: {
                                fontWeight: 400,
                                textShadow: isActive
                                  ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
                                  : "none",
                                color: isActive
                                  ? "text.primary"
                                  : "text.secondary",
                              },
                            }}
                          />
                          {item.title === "Templates" && (
                            <Box
                              component="span"
                              sx={{
                                ml: 1,
                                px: 0.8,
                                py: 0.2,
                                bgcolor: "#008080",
                                color: "#ffffff",
                                borderRadius: "10px",
                                fontSize: "0.65rem",
                                fontWeight: 500,
                                lineHeight: 1,
                                letterSpacing: "0.02em",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              New
                            </Box>
                          )}
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Box>
        ))}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 2,
          pt: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="caption">
          Brought to you by{" "}
          <LinkPreview url="https://abhivarde.in" placement="top">
            abhivarde.in
          </LinkPreview>
          .
        </Typography>
      </Box>
    </Box>
  );

  const renderBreadcrumbs = () => {
    const activeTocItem = toc?.find((item) => item?.id === activeId);
    const activeText = activeTocItem ? activeTocItem?.text : "";

    return (
      <Breadcrumbs
        separator={<RxChevronRight size={18} />}
        aria-label="breadcrumb"
        sx={{ display: { xs: "flex", md: "none" } }}
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
          <RxTextAlignLeft size={20} color="inherit" /> On this page
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

  const renderPopoverMenuItem = (item, index) => (
    <MenuItem
      key={index}
      disabled={item.disabled}
      component={item.disabled ? "div" : item.external ? "a" : Link}
      href={item.disabled ? undefined : item.href}
      onClick={item.disabled ? undefined : handleClose}
      sx={{
        borderRadius: "8px",
        fontSize: "14px",
        px: 1.25,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1.25,
        cursor: item.disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        "&:hover": {
          backgroundColor: item.disabled
            ? "transparent"
            : theme.palette.action.hover,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: item.disabled ? "text.secondary" : "text.primary",
          opacity: item.disabled ? 0.5 : 1,
        }}
      >
        {item.icon}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flex: 1 }}>
        <Typography
          sx={{
            color: item.disabled ? "text.secondary" : "text.primary",
            fontSize: "14px",
            fontWeight: item.disabled ? 400 : 450,
          }}
        >
          {item.label}
        </Typography>
        {item.comingSoon && (
          <Box
            component="span"
            sx={{
              px: 0.75,
              py: 0.25,
              bgcolor: "#FFA500",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "10px",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "0.3px",
              textTransform: "uppercase",
            }}
          >
            Soon
          </Box>
        )}
      </Box>
    </MenuItem>
  );

  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          height: "60px",
          width: "100%",
          top: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: "blur(10px)",
          transition: "background-color 0.15s ease",
          backgroundColor: isScrolled ? "transparent" : "background.default",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            padding: isMediumUp ? "12px 24px" : "16px 12px",
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
              {isDocsPage && !isMediumUp && (
                <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                  <GoSidebarCollapse />
                </IconButton>
              )}
              <Box
                onClick={() => router.push("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  textDecoration: "none",
                  minWidth: 0,
                }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Logo"
                  sx={{
                    width: 24,
                    height: 24,
                    display:
                      asPath.startsWith("/docs") && !isMediumUp
                        ? "none"
                        : "inline-block",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  noWrap
                  sx={{
                    color: "text.primary",
                    lineHeight: 1,
                  }}
                >
                  Sync UI
                </Typography>
              </Box>

              {isMediumUp && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}
                >
                  <Button
                    disabled
                    sx={{
                      color: "text.secondary",
                      fontSize: "15px",
                      fontWeight: 400,
                      textTransform: "none",
                      px: "6px",
                      py: "4px",
                      minWidth: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      cursor: "not-allowed",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    Blocks
                    <Box
                      component="span"
                      sx={{
                        px: "6px",
                        py: "1px",
                        bgcolor: "#FFA500",
                        color: "#fff",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 500,
                        lineHeight: "14px",
                        letterSpacing: "0.25px",
                        minHeight: "18px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Soon
                    </Box>
                  </Button>
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
                  <Button
                    component={Link}
                    href="/templates"
                    sx={{
                      color: "text.primary",
                      fontSize: "15px",
                      fontWeight: 400,
                      textTransform: "none",
                      px: "6px",
                      py: "4px",
                      minWidth: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      "&:hover": {
                        backgroundColor: "transparent",
                        opacity: 0.75,
                      },
                    }}
                  >
                    Templates
                  </Button>
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
                  <Button
                    component={Link}
                    href="/docs/changelog"
                    endIcon={<RxExternalLink size={16} />}
                    sx={{
                      color: "text.primary",
                      fontSize: "15px",
                      fontWeight: 400,
                      textTransform: "none",
                      padding: "4px 8px",
                      minWidth: "auto",
                      "&:hover": {
                        backgroundColor: "transparent",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Changelog
                  </Button>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <Search docsTree={docsTree} isMediumUp={isMediumUp} />
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
              <HeaderIcons
                isMediumUp={isMediumUp}
                anchorRef={anchorRef}
                menuOpen={menuOpen}
                stars={stars}
                loading={loading}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                handleToggle={handleToggle}
              />
            </Box>
          </Box>
        </Toolbar>

        {isDocsPage && (
          <Drawer
            anchor="left"
            open={!isMediumUp && drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
              sx: {
                width: 320,
                backgroundColor: "background.default",
                backgroundImage: "none",
              },
            }}
          >
            {renderDocsTree()}
          </Drawer>
        )}

        <Popper
          open={menuOpen && !isMediumUp}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal
          sx={{ zIndex: 999, mt: "8px !important", boxShadow: "revert" }}
        >
          <StyledPaper elevation={3}>
            <ClickAwayListener onClickAway={handleClose}>
              <StyledMenuList dense>
                {menuItems.map((item, index) => (
                  <Fragment key={index}>
                    {renderPopoverMenuItem(item, index)}
                    {index < menuItems.length - 1 && (
                      <Divider
                        sx={{
                          mx: "0px !important",
                          my: 0.25,
                          borderColor: "divider",
                        }}
                      />
                    )}
                  </Fragment>
                ))}
              </StyledMenuList>
            </ClickAwayListener>
          </StyledPaper>
        </Popper>
      </AppBar>

      {isDocsPage && !isMediumUp && (
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            top: 60,
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
              padding: isMediumUp ? "12px 24px" : "16px 12px",
              maxHeight: "40px !important",
              minHeight: "40px !important",
            }}
          >
            {renderBreadcrumbs()}
          </Toolbar>
        </AppBar>
      )}
    </Fragment>
  );
};

export default Header;
