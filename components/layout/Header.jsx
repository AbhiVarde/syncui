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
  Grow,
  Paper,
  Stack,
  ClickAwayListener,
  MenuList,
  MenuItem,
  styled,
} from "@mui/material";
import {
  RxChatBubble,
  RxTextAlignLeft,
  RxChevronRight,
  RxCross2,
  RxExternalLink,
  RxCube,
} from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoSidebarCollapse } from "react-icons/go";
import { useGitHub } from "@/context/GithubContext";
import HeaderIcons from "../headerIcons";
import { AnimatePresence, motion } from "framer-motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.2,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  overflow: "hidden",
  minWidth: 250,
  maxWidth: 300,
}));

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: "0.875rem",
  padding: theme.spacing(1.5),
  margin: theme.spacing(0),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

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
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };

  const menuItems = [
    {
      label: "Templates",
      href: "/templates",
      external: false,
      icon: <RxCube size={18} />,
      comingSoon: true,
      disabled: false,
    },
    {
      label: "Guestbook",
      href: "/guestbook",
      external: false,
      icon: <RxChatBubble size={16} />,
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

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    toc?.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isDocsPage, toc]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const groupDocsTree = (docsTree) => {
    const grouped = {
      "Getting Started": [],
    };

    // Add Templates to the Getting Started section
    grouped["Getting Started"].push({
      title: "Templates",
      url: "/templates",
      slug: "templates",
    });

    docsTree?.forEach((item) => {
      if (item.title === "Setup" || item.title === "Changelog") {
        grouped["Getting Started"].push(item);
      } else {
        if (!grouped["Components"]) {
          grouped["Components"] = [];
        }
        grouped["Components"].push(item);
      }
    });

    grouped["Getting Started"].sort((a, b) => {
      const order = { Setup: 1, Changelog: 2, Templates: 3 };
      return (order[a.title] || 99) - (order[b.title] || 99);
    });

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
        <RxCross2 size={22} color="inherit" />
      </IconButton>
      <Typography variant="body1" sx={{ my: 1, fontWeight: 500 }}>
        Sync UI Docs
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 0.2 }}>
        {Object.entries(groupDocsTree(docsTree)).map(([category, items]) => (
          <Box key={category} sx={{ my: 2 }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                color: "text.secondary",
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
                      borderRadius: 0.75,
                      transition: "all 0.15s ease-in-out",
                      ...(isActive && {
                        bgcolor: "background.paper",
                        boxShadow: (theme) =>
                          `0 0 0 1px ${theme.palette.divider}`,
                      }),
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: {
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? "text.primary" : "text.secondary",
                          },
                        }}
                      />
                      {(item.title === "Backgrounds" ||
                        item.title === "Pointers" ||
                        item.title === "Grids" ||
                        item.title === "Texts" ||
                        item.title === "Templates") && (
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
          <a
            href="https://abhivarde.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecorationLine: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 500,
              color: "inherit",
            }}
          >
            abhivarde.in
          </a>
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
          <RxTextAlignLeft size={20} color="inherit" />
          On this page
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
      component={item.external ? "a" : Link}
      href={item.href}
      onClick={item.disabled ? undefined : handleClose}
      sx={{
        borderRadius: "10px",
        fontSize: "0.875rem",
        padding: 1.5,
        margin: 0,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      {item.icon && (
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          {item.icon}
        </Box>
      )}
      {item.label}
      {item.comingSoon && (
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
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: "blur(10px)",
          transition: "background-color 0.3s ease",
          backgroundColor: isScrolled ? "transparent" : "background.default",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            padding: isMediumUp ? "12px 24px" : "16px 12px",
          }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key="not-scrolled"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {isDocsPage && !isMediumUp && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer}
                  >
                    <GoSidebarCollapse />
                  </IconButton>
                )}
                <Box
                  onClick={() => router.push("/")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                      display:
                        asPath.startsWith("/docs") && !isMediumUp
                          ? "none"
                          : "flex",
                    }}
                  />
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    component="div"
                    sx={{
                      opacity: 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    Sync UI
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {isMediumUp && (
                  <Stack direction="row" spacing={1} marginRight="10px">
                    <Button
                      color="inherit"
                      href="/templates"
                      sx={{
                        fontSize: "15px !important",
                        padding: "4px 8px !important",
                        fontWeight: 400,
                        textTransform: "none",
                      }}
                    >
                      Templates
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
                    </Button>
                    <Button
                      color="inherit"
                      endIcon={<RxChatBubble size={16} />}
                      href="/guestbook"
                      sx={{
                        fontSize: "15px !important",
                        padding: "4px 8px !important",
                        fontWeight: 400,
                        textTransform: "none",
                      }}
                    >
                      Guestbook
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      endIcon={<RxExternalLink size={16} />}
                      href="/docs/changelog"
                      sx={{
                        fontSize: "15px !important",
                        padding: "4px 8px !important",
                        fontWeight: 400,
                        textTransform: "none",
                      }}
                    >
                      Changelog
                    </Button>
                  </Stack>
                )}
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
            </motion.div>
            {/* )} */}
          </AnimatePresence>
        </Toolbar>
        {isDocsPage && (
          <Drawer
            anchor="left"
            open={!isMediumUp && drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
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
          role={undefined}
          transition
          disablePortal
          placement="bottom-end"
          style={{ zIndex: 999 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <StyledPaper elevation={3}>
                <ClickAwayListener onClickAway={handleClose}>
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                      >
                        <StyledMenuList
                          autoFocusItem={menuOpen}
                          id="menu-list-grow"
                        >
                          {menuItems.map((item, index) =>
                            renderPopoverMenuItem(item, index)
                          )}
                        </StyledMenuList>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ClickAwayListener>
              </StyledPaper>
            </Grow>
          )}
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
            zIndex: 99,
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
