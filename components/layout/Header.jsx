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
  RxCube,
} from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoSidebarCollapse } from "react-icons/go";
import { useGitHub } from "@/context/GithubContext";
import HeaderIcons from "../headerIcons";
import { AnimatePresence, motion } from "framer-motion";
import LinkPreview from "../common/LinkPreview";
import TemplatesPreview from "../common/TemplatesPreview";
import Image from "next/image";
import Search from "../common/Search";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.2,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  overflow: "hidden",
  minWidth: 200,
  maxWidth: 200,
}));

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: theme.spacing("4px 8px"),
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
      label: "Changelog",
      href: "/docs/changelog",
      external: false,
      icon: <RxExternalLink size={18} />,
      comingSoon: false,
      disabled: false,
    },
  ];

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
      if (
        item.title === "Setup" ||
        item.title === "Changelog" ||
        item.title === "The Story of Sync UI"
      ) {
        grouped["Getting Started"].push(item);
      } else {
        if (!grouped["Components"]) {
          grouped["Components"] = [];
        }
        grouped["Components"].push(item);
      }
    });

    grouped["Getting Started"].sort((a, b) => {
      const order = {
        Setup: 1,
        Changelog: 2,
        Templates: 3,
        "The Story of Sync UI": 4,
      };
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
        <RxCross2 size={18} color="inherit" />
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
                      {(item.title === "Time Pickers" ||
                        item.title === "Date Pickers" ||
                        item.title === "Autocompletes" ||
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
        borderRadius: "6px",
        fontSize: "14px",
        p: "4px !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
        }}
      >
        {item.icon}
      </Box>

      {/* Label + Badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          {item.label}
        </Typography>

        {item.comingSoon && (
          <Box
            component="span"
            sx={{
              px: "6px",
              py: "2px",
              bgcolor: "#008080",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 500,
              lineHeight: "14px",
            }}
          >
            New
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
          transition: "all 0.2s ease",
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
          <AnimatePresence mode="sync">
            <motion.div
              key="not-scrolled"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    Sync UI
                  </Typography>
                </Box>

                {isMediumUp && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      ml: 2,
                    }}
                  >
                    <TemplatesPreview
                      width={400}
                      height={180}
                      placement="bottom"
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
                        textDecoration: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          opacity: 0.75,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                        }}
                      >
                        Templates
                        <Box
                          component="span"
                          sx={{
                            px: "6px",
                            py: "1px",
                            bgcolor: "#008080",
                            color: "#ffffff",
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
                          New
                        </Box>
                      </Box>
                    </TemplatesPreview>

                    {renderDivider()}

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

                {renderDivider()}

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
          placement="bottom-end"
          disablePortal
          sx={{ zIndex: 999, mt: "8px !important", boxShadow: "revert" }}
        >
          <StyledPaper elevation={3}>
            <ClickAwayListener onClickAway={handleClose}>
              <StyledMenuList dense>
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
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
                  </React.Fragment>
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
