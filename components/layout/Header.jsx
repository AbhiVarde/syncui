import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useMemo,
} from "react";
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
  RxDashboard,
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
import { motion, AnimatePresence } from "motion/react";

const menuItems = [
  {
    label: "Blocks",
    href: "/blocks",
    external: false,
    icon: <RxDashboard size={18} />,
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
  const [mounted, setMounted] = useState(false);
  const [activeUrl, setActiveUrl] = useState(router.asPath);
  const anchorRef = useRef(null);

  const [openCategories, setOpenCategories] = useState(() => new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveUrl(router.asPath);
  }, [router.asPath]);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = (event) => {
    if (anchorRef.current?.contains(event.target)) return;
    setMenuOpen(false);
  };

  const getActiveCategory = useCallback((docsTree, path) => {
    const activeItem = docsTree?.find((item) => item.url === path);
    return activeItem?.category || null;
  }, []);

  useEffect(() => {
    const activeCategory = getActiveCategory(docsTree, router.asPath);

    if (!activeCategory) return;

    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.add(activeCategory);
      return next;
    });
  }, [router.asPath, docsTree, getActiveCategory]);

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

  const groupDocsTree = useCallback((docsTree) => {
    const grouped = {
      "Getting Started": [],
      Templates: [],
      // Blocks: [],
      Components: [],
    };

    docsTree?.forEach((item) => {
      if (item.category === "Components") {
        grouped["Components"].push(item);
      } /* else if (item.category === "Blocks") {
        grouped["Blocks"].push(item);
      } */ else {
        grouped["Getting Started"].push(item);
      }
    });

    grouped["Templates"].push(
      {
        title: "Startup",
        url: "https://abhivarde.gumroad.com/l/startup-template-syncui",
        slug: "startup-template",
        external: true,
      },
      {
        title: "SaaS",
        url: "https://abhivarde.gumroad.com/l/saas-template-syncui",
        slug: "saas-template",
        external: true,
      },
      {
        title: "Portfolio",
        url: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
        slug: "portfolio-template",
        external: true,
      }
    );

    grouped["Getting Started"].sort(
      (a, b) =>
        ({ Setup: 1, Changelog: 2, "The Story of Sync UI": 3 })[a.title] -
          { Setup: 1, Changelog: 2, "The Story of Sync UI": 3 }[b.title] || 0
    );

    return grouped;
  }, []);

  const groupedDocsTree = useMemo(
    () => groupDocsTree(docsTree),
    [docsTree, groupDocsTree]
  );

  const renderCollapsibleCategory = useCallback(
    (category, items) => {
      const isOpen = openCategories.has(category);

      return (
        <>
          <Box
            onClick={() =>
              setOpenCategories((prev) => {
                const next = new Set(prev);
                next.has(category) ? next.delete(category) : next.add(category);
                return next;
              })
            }
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
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: 0.5,
              }}
            >
              {category}
            </Typography>

            <motion.div
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.15 }}
            >
              <RxChevronDown size={16} />
            </motion.div>
          </Box>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                transition={{
                  duration: 0.18,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  display: "grid",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ overflow: "hidden" }}>
                  <List disablePadding>
                    {items.map((item) => {
                      const isActive = router.asPath === item.url;
                      const isHighlighted = isActive || activeUrl === item.url;
                      const isExternal =
                        item.external || category === "Templates";

                      return (
                        <ListItem
                          key={item.url}
                          component={isExternal ? "a" : Link}
                          href={item.url}
                          {...(isExternal && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          scroll={false}
                          onClick={() => {
                            if (!isExternal) {
                              setActiveUrl(item.url);
                              toggleDrawer();
                              setTimeout(() => router.push(item.url), 300);
                            } else {
                              toggleDrawer();
                            }
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
                            color: isHighlighted
                              ? "text.primary"
                              : "text.secondary",
                            textShadow: isHighlighted
                              ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
                              : "none",
                            transition:
                              "color 0.15s ease, background-color 0.15s ease",
                            "&:hover": {
                              bgcolor: "action.hover",
                              color: "text.primary",
                            },
                            ...(isHighlighted && {
                              bgcolor: "action.hover",
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
                                  textShadow: isHighlighted
                                    ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
                                    : "none",
                                  color: isHighlighted
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }}
                            />
                            {["Skeletons", "Time Pickers"].includes(
                              item.title
                            ) && (
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
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    },
    [openCategories, router.asPath, activeUrl]
  );

  const renderDocsTree = () => (
    <Box
      sx={{
        width: 320,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ py: 4, px: 2, flexGrow: 1, overflowY: "auto" }}>
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            my: 0.5,
            mb: 2,
          }}
        >
          <Image
            src="/logo.png"
            alt="Sync UI Logo"
            width={24}
            height={24}
            style={{
              borderRadius: "4px",
              display: "block",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Sync UI Docs
          </Typography>
        </Box>

        <Box sx={{ px: 0.2 }}>
          {Object.entries(groupedDocsTree).map(([category, items]) => (
            <Box key={category} sx={{ my: 2 }}>
              {["Components", "Blocks", "Templates"].includes(category) ? (
                renderCollapsibleCategory(category, items)
              ) : (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      letterSpacing: 0.5,
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
                        router.asPath === item.url;
                      const isHighlighted = isActive || activeUrl === item.url;
                      return (
                        <ListItem
                          key={item.url}
                          component={Link}
                          href={item.url}
                          scroll={false}
                          onClick={() => {
                            setActiveUrl(item.url);
                            toggleDrawer();
                            setTimeout(() => router.push(item.url), 300);
                          }}
                          sx={{
                            mb: 0.5,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.2,
                            transition:
                              "color 0.15s ease, background-color 0.15s ease",
                            "&:hover": {
                              bgcolor: "action.hover",
                              color: "text.primary",
                            },
                            ...(isHighlighted && {
                              bgcolor: "action.hover",
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
                                  textShadow: isHighlighted
                                    ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
                                    : "none",
                                  color: isHighlighted
                                    ? "text.primary"
                                    : "text.secondary",
                                },
                              }}
                            />
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
      </Box>

      <Box
        sx={{
          borderTop: "1.5px dashed",
          borderColor: "divider",
          p: 1.5,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="caption">
          Brought to you by{" "}
          <LinkPreview
            url="https://abhivarde.in"
            placement="top"
            staticImage="/og-image.png"
          >
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
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleDrawer}
                  sx={{ pr: 0 }}
                >
                  <GoSidebarCollapse size={22} />
                </IconButton>
              )}
              <Box
                onClick={() => router.push("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Logo"
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 0.5,
                    display:
                      asPath.startsWith("/docs") && !isMediumUp
                        ? "none"
                        : "block",
                  }}
                />

                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.2,
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
                {menuItems.flatMap((item, index) => {
                  const elements = [renderPopoverMenuItem(item, index)];
                  if (index < menuItems.length - 1) {
                    elements.push(
                      <Divider
                        key={`divider-${index}`}
                        sx={{
                          mx: "0px !important",
                          my: 0.25,
                          borderColor: "divider",
                        }}
                      />
                    );
                  }
                  return elements;
                })}
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
