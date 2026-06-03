import React, {
  useState,
  useEffect,
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
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGitHub } from "@/context/GithubContext";
import LinkPreview from "../common/LinkPreview";
import Image from "next/image";
import Search from "../common/Search";
import AnimatedCounter from "../AnimatedCounter";
import { motion, AnimatePresence } from "motion/react";
import { GITHUB_URL, TWITTER_URL } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu02Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  ArrowDown01Icon,
  LayoutRightIcon,
  Menu09Icon,
  GithubIcon,
  NewTwitterIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";

const navItems = [
  { label: "Home", href: "/", external: false },
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
  willChange: "transform",
}));

const Header = ({ toggleTheme, isDarkMode, docsTree, toc }) => {
  const theme = useTheme();
  const isLargeUp = useMediaQuery(theme.breakpoints.up("lg"));
  const router = useRouter();
  const { stars, loading } = useGitHub();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDocsPage = router.pathname.startsWith("/docs");
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeUrl, setActiveUrl] = useState(router.asPath);
  const [openCategories, setOpenCategories] = useState(() => new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveUrl(router.asPath);
  }, [router.asPath]);

  const handleToggle = () => setMenuOpen((prev) => !prev);
  const handleClose = () => setMenuOpen(false);

  useEffect(() => {
    handleClose();
  }, [router.asPath]);

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
      { rootMargin: "-20% 0px -60% 0px" },
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
    const grouped = new Map([
      ["Getting Started", []],
      ["Templates", []],
      ["Blocks", []],
      ["Components", []],
    ]);

    docsTree?.forEach((item) => {
      grouped.get(item.category)?.push(item);
    });

    grouped.get("Templates").push(
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
      },
    );

    return Object.fromEntries(grouped);
  }, []);

  const groupedDocsTree = useMemo(
    () => groupDocsTree(docsTree),
    [docsTree, groupDocsTree],
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
              <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
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
                            item.title,
                          ) && (
                            <Box
                              component="span"
                              sx={{
                                ml: 1,
                                px: "6px",
                                py: "1px",
                                background:
                                  "linear-gradient(135deg, #007B83, #00B5AD)",
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
                              New
                            </Box>
                          )}
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
    [openCategories, router.asPath, activeUrl],
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
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
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
            staticImage="/author-image.png"
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

              {isDocsPage && !isLargeUp && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleDrawer}
                  sx={{ p: 0.5 }}
                >
                  <HugeiconsIcon icon={LayoutRightIcon} size={22} />
                </IconButton>
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

        {isDocsPage && (
          <Drawer
            anchor="left"
            open={!isLargeUp && drawerOpen}
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

      {menuOpen && !isLargeUp && (
        <FullScreenMenu>
          <Box
            sx={{
              maxWidth: 600,
              mx: "auto",
              px: 3,
              py: 4,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
              {navItems.map((item) => (
                <Box
                  key={item.href}
                  component={item.external ? "a" : Link}
                  href={item.href}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  onClick={handleClose}
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    transition: "opacity 0.15s ease",
                    "&:hover": {
                      opacity: 0.6,
                    },
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
                </Box>
              ))}
            </Box>
          </Box>
        </FullScreenMenu>
      )}
    </Fragment>
  );
};

export default Header;
