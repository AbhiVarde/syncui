import React, { useState, useEffect, Fragment, forwardRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  Chip,
  Slide,
} from "@mui/material";
import { GITHUB_URL, TWITTER_URL } from "../../utils/constants";
import {
  RxSun,
  RxMoon,
  RxArrowRight,
  RxTextAlignLeft,
  RxChevronRight,
  RxCross2,
} from "react-icons/rx";
import { RiGithubFill, RiTwitterXLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoSidebarCollapse } from "react-icons/go";
import { FaCode, FaPalette, FaRocket, FaCheck } from "react-icons/fa";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = ({ toggleTheme, isDarkMode, docsTree, toc }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDocsPage = router.pathname.startsWith("/docs");
  const [activeId, setActiveId] = useState("");
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const plans = [
    {
      title: "Essential Frontend",
      price: 1999,
      features: [
        "Up to 5 custom React components per month",
        "React + Next.js implementation",
        "Single-page website development",
        "Responsive design implementation",
        "Basic animations and transitions",
        "Cross-browser compatibility",
        "Code review and optimization",
        "72-hour support response time",
        "2 rounds of revisions",
      ],
      icon: <FaCode size={24} color={theme.palette.primary.main} />,
    },
    {
      title: "Advanced UI/UX",
      price: 3999,
      features: [
        "Up to 10 custom React components per month",
        "React + Next.js with SEO optimization",
        "Multi-page website with dynamic routing",
        "Advanced UI/UX implementations",
        "Complex animations with Framer Motion",
        "Performance optimization",
        "Accessibility (WCAG) compliance",
        "State management setup (Redux, MobX, etc.)",
        "48-hour support response time",
        "3 rounds of revisions",
      ],
      icon: <FaPalette size={24} color={theme.palette.secondary.main} />,
      popular: true,
    },
    {
      title: "Enterprise Frontend",
      price: 7999,
      features: [
        "Unlimited custom React components",
        "Advanced React + Next.js with custom server",
        "Complex multi-page application with SEO and SSR optimizations",
        "Full frontend architecture design",
        "Micro-frontend implementation",
        "Server-side rendering optimization",
        "Progressive Web App (PWA) development",
        "Custom design system creation",
        "24/7 priority support",
        "Unlimited revisions",
      ],
      icon: <FaRocket size={24} color={theme.palette.warning.main} />,
    },
  ];

  const openSubscriptionDialog = () => {
    setSubscriptionDialogOpen(true);
  };

  const closeSubscriptionDialog = () => {
    setSubscriptionDialogOpen(false);
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

    docsTree.forEach((item) => {
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
      if (a.title === "Setup") return -1;
      if (b.title === "Setup") return 1;
      return 0;
    });

    return grouped;
  };

  const renderDocsTree = () => (
    <Box sx={{ width: 320, py: 4, px: 2, position: "relative" }}>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          color: "text.secondary",
        }}
      >
        <RxCross2 size={22} color="inherit" />
      </IconButton>
      <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
        Sync UI Docs
      </Typography>
      <Box>
        {Object?.entries(groupDocsTree(docsTree)).map(([category, items]) => (
          <Box key={category} sx={{ my: 2 }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                color: "text.secondary",
                textTransform: "uppercase",
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
                return (
                  <ListItem
                    key={item.url}
                    button
                    component={Link}
                    href={item.url}
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
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderBreadcrumbs = () => {
    const activeTocItem = toc.find((item) => item.id === activeId);
    const activeText = activeTocItem ? activeTocItem.text : "";

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

  const SubscriptionPlan = ({ title, price, features, icon, popular }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", height: "100%", cursor: "pointer" }}
    >
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 3,
          height: "100% !important",
          minHeight: "650px",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-10px)",
          },
        }}
      >
        {popular && (
          <Chip
            label="Most Popular"
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              top: -10,
              right: 20,
              fontWeight: "bold",
            }}
          />
        )}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          ${price}
          <Typography variant="caption" sx={{ ml: 0.5, fontSize: "1rem" }}>
            / month
          </Typography>
        </Typography>
        <List sx={{ flexGrow: 1 }}>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
              <FaCheck
                color={theme.palette.success.main}
                size={14}
                style={{ marginRight: "8px", width: "24px" }}
              />
              <ListItemText
                primary={feature}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: "bold",
            py: 1.5,
          }}
        >
          Get Started
        </Button>
      </Box>
    </motion.div>
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
          <AnimatePresence mode="wait">
            {isScrolled ? (
              <motion.div
                key="scrolled"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={openSubscriptionDialog}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.primary,
                    transition: "color 0.1s ease",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Check pro templates
                  <motion.div
                    initial={false}
                    animate={{
                      transform: isHovered
                        ? "translateX(3px)"
                        : "translateX(0)",
                    }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    style={{
                      marginLeft: "6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RxArrowRight size={18} style={{ fontWeight: 500 }} />
                  </motion.div>
                </Typography>
              </motion.div>
            ) : (
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
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    component="div"
                    sx={{
                      opacity: 1,
                      transition: "opacity 0.3s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/")}
                  >
                    Sync UI
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <IconButton
                    href={GITHUB_URL}
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label="GitHub"
                  >
                    <RiGithubFill size={22} />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label="Twitter"
                  >
                    <RiTwitterXLine size={17} />
                  </IconButton>
                  <IconButton onClick={toggleTheme} aria-label="Toggle theme">
                    {isDarkMode ? (
                      <RxMoon size={19} color="inherit" />
                    ) : (
                      <RxSun size={19} color="inherit" />
                    )}
                  </IconButton>
                </Box>
              </motion.div>
            )}
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

      <Dialog
        TransitionComponent={Transition}
        open={subscriptionDialogOpen}
        onClose={closeSubscriptionDialog}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: "background.paper", pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Supercharge Your Frontend Game
            </Typography>
            <IconButton
              onClick={closeSubscriptionDialog}
              sx={{
                borderRadius: "12px !important",
                color: "text.primary",
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "background.paper",
                },
                transition: "background-color 0.3s",
              }}
            >
              <RxCross2 />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Choose the plan that best fits your frontend development needs and
            scale as you grow.
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "background.paper", pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
              overflowX: "auto",
              gap: 4,
              pb: 2,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              "& > *": {
                flex: { xs: "0 0 80%", sm: "0 0 45%", md: "1 1 0" },
                minWidth: { xs: "320px", md: "0" },
              },
            }}
          >
            {plans.map((plan, index) => (
              <Box key={index} sx={{ height: "800px", mt: 4 }}>
                <SubscriptionPlan {...plan} />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Header;
