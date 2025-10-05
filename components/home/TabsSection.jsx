import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  Button,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { RiCodeSSlashLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

// Import all component variants
import DockVariants from "../ui/Docks";
import ButtonVariants from "../ui/Buttons";
import CardVariants from "../ui/Cards";
import CarouselVariants from "../ui/Carousels";
import TableVariants from "../ui/Tables";
import TextVariants from "../ui/Texts";
import AvatarVariants from "../ui/Avatars";
import LoaderVariants from "../ui/Loaders";
import SeparatorVariants from "../ui/Separators";
import BackgroundVariants from "../ui/Backgrounds";
import MarqueeVariants from "../ui/Marquees";
import TabVariants from "../ui/Tabs";
import PaginationVariants from "../ui/Paginations";
import PointerVariants from "../ui/Pointers";
import GridVariants from "../ui/Grids";
import AccordionVariants from "../ui/Accordions";
import TextFieldVariants from "../ui/TextFields";
import DialogVariants from "../ui/Dialogs";
import FormVariants from "../ui/Forms";
import AutocompleteVariants from "../ui/Autocompletes";
import DatePickerVariants from "../ui/DatePickers";

const componentVariants = {
  datepickers: ["single", "range", "presets", "with-time"],
  autocompletes: ["basic", "multi-select", "async", "grouped", "custom-render"],
  accordions: ["brutalist", "dashed", "minimal", "modern"],
  cards: [
    "lens",
    "twitterCarousel",
    "meteorShower",
    "dynamicOverlay",
    "contentCard",
    "animatedBorder",
  ],
  grids: ["masonry", "bento", "glassmorphism", "organicShapes", "minimalCards"],
  docks: ["modern", "categorical", "dynamic", "glass"],
  pointers: [
    "glowingDot",
    "followingRing",
    "magneticArrow",
    "trailingDots",
    "emojiFollower",
    "gradientBlob",
  ],
  carousels: ["scale", "parallax", "fade", "cards"],
  marquees: ["horizontal", "vertical", "diagonal"],
  buttons: [
    "neubrutalism",
    "animatedBorder",
    "gradientShine",
    "underline",
    "sendIcon",
    "expand",
    "hoverArrow",
    "glitch",
    "outlineFill",
    "elasticSlide",
  ],
  loaders: [
    "pulsatingDots",
    "morphingCube",
    "pulsatingRing",
    "circularSweep",
    "fadingSquares",
    "orbitalSpin",
    "triadicOrbit",
    "barWave",
  ],
  backgrounds: [
    "geminiWave",
    "gradientMesh",
    "movingShapes",
    "flickeringGrid",
    "interactiveGrid",
    "grid",
    "magneticConnections",
    "dots",
  ],
  avatars: [
    "modernShowcase",
    "floatingCards",
    "minimalGrid",
    "overlappingCircles",
  ],
  tabs: [
    "slidingUnderline",
    "floatingBackground",
    "elevatedCards",
    "growingBackground",
  ],
  tables: ["modern", "minimal", "expandable"],
  paginations: [
    "simple",
    "numbered",
    "compact",
    "with-dropdown",
    "rows-per-page",
    "fading",
    "sliding",
    "expanding",
  ],
  separators: [
    { variant: "dashed", label: "Dashed" },
    { variant: "icon", label: "Icon" },
    { variant: "zigzag", label: "Zigzag" },
    { variant: "gradient", label: "Gradient" },
    { variant: "shimmer", label: "Shimmer" },
    { variant: "dotted", label: "Dotted" },
    { variant: "starry", label: "Starry" },
  ],
  texts: [
    "videoText",
    "blurIn",
    "splitReveal",
    "staggeredScale",
    "lettersPullUp",
    "waveEffect",
    "neonGlow",
    "wordsPullUp",
    "typewriter",
    "rotateWords",
    "morphingText",
  ],
  textfields: [
    "otp",
    "endIcon",
    "startInline",
    "endInline",
    "currency",
    "aiPrompt",
  ],
  dialogs: [
    "default",
    "slideUp",
    "blur",
    "form",
    "info",
    "fullscreen",
    "sidebar",
    "notification",
  ],
  forms: ["multi-step", "login", "register", "contact"],
};

const sectionConfig = {
  datepickers: { title: "Date Pickers", layout: "tabs" },
  autocompletes: { title: "Smart Autocomplete", layout: "tabs" },
  forms: { title: "Adaptive Forms", layout: "tabs" },
  dialogs: { title: "Overlay Dialogs", layout: "flex-wrap" },
  buttons: { title: "Interactive Buttons", layout: "flex-wrap" },
  cards: { title: "Dynamic Cards", layout: "flex-wrap" },
  pointers: { title: "Magnetic Pointers", layout: "grid" },
  docks: { title: "Navigation Docks", layout: "flex-wrap" },
  loaders: { title: "Loading Animations", layout: "flex-wrap" },
  textfields: { title: "Echo Inputs", layout: "column" },
  marquees: { title: "Scrolling Marquees", layout: "column" },
  tabs: { title: "Tabbed Navigation", layout: "column" },
  grids: { title: "Responsive Grids", layout: "column" },
  avatars: { title: "Profile Avatars", layout: "column" },
  accordions: { title: "Collapsible Panels", layout: "flex-wrap" },
  texts: { title: "Animated Typography", layout: "column" },
  separators: { title: "Visual Dividers", layout: "column" },
  tables: { title: "Data Tables", layout: "column" },
  carousels: { title: "Content Carousels", layout: "column" },
  paginations: { title: "Page Navigation", layout: "column" },
  backgrounds: { title: "Animated Backgrounds", layout: "column" },
};

const formatVariantName = (variant) => {
  if (typeof variant === "string") {
    return variant
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }
  return variant.label;
};

const DatePickerTabContent = ({ variants, ComponentVariant }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabLabels = {
    single: "Single Date",
    range: "Date Range",
    inline: "Inline Calendar",
    presets: "With Presets",
    "with-time": "Date & Time",
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "16px" },
              minWidth: { xs: "auto", sm: "120px" },
              px: { xs: 2, sm: 3 },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.text.primary,
              height: 2,
            },
            "& .Mui-selected": {
              color: `${theme.palette.text.primary} !important`,
            },
          }}
        >
          {variants.map((variant, index) => (
            <Tab
              key={variant}
              label={tabLabels[variant] || formatVariantName(variant)}
              id={`datepicker-tab-${index}`}
              aria-controls={`datepicker-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Box
            role="tabpanel"
            id={`datepicker-tabpanel-${activeTab}`}
            aria-labelledby={`datepicker-tab-${activeTab}`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ComponentVariant variant={variants[activeTab]} />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

const AutocompleteTabContent = ({ variants, ComponentVariant }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabLabels = {
    basic: "Basic Search",
    "multi-select": "Multi Select",
    async: "Async Loading",
    grouped: "Grouped Options",
    "custom-render": "Custom Render",
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "16px" },
              minWidth: { xs: "auto", sm: "120px" },
              px: { xs: 2, sm: 3 },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.text.primary,
              height: 2,
            },
            "& .Mui-selected": {
              color: `${theme.palette.text.primary} !important`,
            },
          }}
        >
          {variants.map((variant, index) => (
            <Tab
              key={variant}
              label={tabLabels[variant] || formatVariantName(variant)}
              id={`autocomplete-tab-${index}`}
              aria-controls={`autocomplete-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Box
            role="tabpanel"
            id={`autocomplete-tabpanel-${activeTab}`}
            aria-labelledby={`autocomplete-tab-${activeTab}`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ComponentVariant variant={variants[activeTab]} />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

const FormsTabContent = ({ variants, ComponentVariant }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabLabels = {
    "multi-step": "Multi Step",
    login: "Login",
    register: "Register",
    contact: "Contact",
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "16px" },
              minWidth: { xs: "auto", sm: "120px" },
              px: { xs: 2, sm: 3 },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.text.primary,
              height: 2,
            },
            "& .Mui-selected": {
              color: `${theme.palette.text.primary} !important`,
            },
          }}
        >
          {variants.map((variant, index) => (
            <Tab
              key={variant}
              label={tabLabels[variant] || formatVariantName(variant)}
              id={`form-tab-${index}`}
              aria-controls={`form-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Box
            role="tabpanel"
            id={`form-tabpanel-${activeTab}`}
            aria-labelledby={`form-tab-${activeTab}`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { xs: "500px", sm: "600px" },
              width: "100%",
            }}
          >
            <ComponentVariant variant={variants[activeTab]} />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

const SectionContent = ({ title, children, url }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleGetCode = () => {
    // Check if we're on main domain or docs subdomain
    const isMainDomain =
      typeof window !== "undefined" &&
      window.location.hostname === "syncui.design";

    if (isMainDomain) {
      // Redirect to docs subdomain
      window.location.href = `https://docs.syncui.design${url}`;
    } else {
      // Already on docs subdomain, navigate directly
      router.push(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: {
            xs: "20px !important",
            sm: "24px !important",
          },
          fontWeight: 500,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "visible",
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 0.5,
        }}
      >
        <Box sx={{ p: 2 }}>{children}</Box>
        <Divider />
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="text"
            startIcon={<RiCodeSSlashLine />}
            onClick={handleGetCode}
            sx={{
              color: theme.palette.mode === "light" ? "black" : "white",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Get Code
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

const renderComponentLayout = (sectionKey, variants, ComponentVariant) => {
  const config = sectionConfig[sectionKey];

  const baseStyles = {
    "flex-wrap": {
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      justifyContent: "center",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 4,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      },
      gap: 4,
      justifyItems: "center",
    },
  };
  const containerStyle = baseStyles[config.layout];

  if (sectionKey === "datepickers" && config.layout === "tabs") {
    return (
      <DatePickerTabContent
        variants={variants}
        ComponentVariant={ComponentVariant}
      />
    );
  }

  if (sectionKey === "autocompletes" && config.layout === "tabs") {
    return (
      <AutocompleteTabContent
        variants={variants}
        ComponentVariant={ComponentVariant}
      />
    );
  }

  if (sectionKey === "forms" && config.layout === "tabs") {
    return (
      <FormsTabContent
        variants={variants}
        ComponentVariant={ComponentVariant}
      />
    );
  }

  if (
    sectionKey === "textfields" ||
    sectionKey === "accordions" ||
    sectionKey === "docks"
  ) {
    return (
      <Box sx={containerStyle}>
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                mt:
                  sectionKey === "textfields"
                    ? 0.5
                    : sectionKey === "accordions"
                      ? 1.5
                      : 1,
                mb: sectionKey === "docks" ? 0 : "auto",
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              {formatVariantName(variant)} Style
            </Typography>
            <ComponentVariant
              variant={typeof variant === "string" ? variant : variant.variant}
            />
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "pointers") {
    return (
      <Box sx={containerStyle}>
        {variants.map((variant) => (
          <Box key={variant} sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mb: 2, textTransform: "capitalize", fontWeight: 500 }}
            >
              {formatVariantName(variant)}
            </Typography>
            <Box
              sx={{
                height: 250,
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <ComponentVariant variant={variant} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "backgrounds" || sectionKey === "grids") {
    return (
      <Box sx={containerStyle}>
        {variants.map((variant, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              height: sectionKey === "backgrounds" ? "200px" : "auto",
              overflow: "hidden",
              borderRadius: 2,
              position: "relative",
              m: sectionKey === "grids" ? 1 : 0,
            }}
          >
            <ComponentVariant variant={variant} />
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "tables" || sectionKey === "carousels") {
    return (
      <AnimatePresence mode="wait">
        <Box sx={containerStyle}>
          {variants.map((variant) => (
            <Box
              key={variant}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              sx={{
                width: "100%",
                minHeight: "400px",
                position: "relative",
              }}
            >
              {sectionKey === "tables" && (
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{ mb: 2, textTransform: "capitalize", fontWeight: 500 }}
                >
                  {variant === "modern" &&
                    "Modern Table - Full-Featured Data Grid"}
                  {variant === "minimal" &&
                    "Minimal Table - Streamlined Design"}
                  {variant === "expandable" &&
                    "Expandable Table - Collapsible Details"}
                </Typography>
              )}
              <ComponentVariant variant={variant} />
            </Box>
          ))}
        </Box>
      </AnimatePresence>
    );
  }

  if (
    sectionKey === "tabs" ||
    sectionKey === "paginations" ||
    sectionKey === "marquees"
  ) {
    return (
      <Box sx={containerStyle}>
        {variants.map((variant) => (
          <Box
            key={variant}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                mt: 1,
                mb: sectionKey === "marquees" ? 0 : "auto",
                my: sectionKey === "marquees" ? 2 : "auto",
                textTransform: "capitalize",
                fontWeight: sectionKey === "tabs" ? 400 : 500,
              }}
            >
              {formatVariantName(variant)}
              {sectionKey === "paginations"
                ? " Pagination"
                : sectionKey === "marquees"
                  ? " Marquee"
                  : ""}
            </Typography>
            {sectionKey === "marquees" ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <ComponentVariant variant={variant} />
              </Box>
            ) : sectionKey === "paginations" ? (
              <ComponentVariant
                variant={variant}
                currentPage={3}
                totalPages={10}
              />
            ) : (
              <ComponentVariant variant={variant} />
            )}
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "avatars") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {variants.map((variant) => (
          <Box key={variant}>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mt: 2, textTransform: "capitalize", fontWeight: 500 }}
            >
              {formatVariantName(variant)}
            </Typography>
            <ComponentVariant variant={variant} />
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "texts") {
    return (
      <Box sx={containerStyle}>
        {variants.map((variant) => (
          <Box
            key={variant}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <ComponentVariant variant={variant} />
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "separators") {
    return (
      <Box sx={containerStyle}>
        {variants.map((separatorProps, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ textTransform: "capitalize", fontWeight: 500 }}
            >
              {formatVariantName(separatorProps)}
            </Typography>
            <ComponentVariant {...separatorProps} width="80%" />
          </Box>
        ))}
      </Box>
    );
  }

  // Default layout for dialogs, buttons, cards, loaders
  return (
    <Box sx={containerStyle}>
      {variants.map((variant) => (
        <Box key={variant} sx={{ m: 1 }}>
          <ComponentVariant variant={variant} />
        </Box>
      ))}
    </Box>
  );
};

const componentMap = {
  datepickers: DatePickerVariants,
  autocompletes: AutocompleteVariants,
  forms: FormVariants,
  dialogs: DialogVariants,
  textfields: TextFieldVariants,
  buttons: ButtonVariants,
  cards: CardVariants,
  pointers: PointerVariants,
  docks: DockVariants,
  backgrounds: BackgroundVariants,
  loaders: LoaderVariants,
  grids: GridVariants,
  accordions: AccordionVariants,
  tabs: TabVariants,
  tables: TableVariants,
  carousels: CarouselVariants,
  paginations: PaginationVariants,
  avatars: AvatarVariants,
  texts: TextVariants,
  marquees: MarqueeVariants,
  separators: SeparatorVariants,
};

const TabsSection = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: "background.default" }}>
      <Container
        maxWidth="md"
        sx={{ paddingX: { md: "0px !important", xs: "16px !important" } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: 500, mb: 1.5 }}
            >
              Modern UI Components
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              A handcrafted collection of responsive, customizable components
              designed to elevate your next web project.
            </Typography>
          </Box>

          {Object.entries(sectionConfig).map(([sectionKey, config]) => (
            <SectionContent
              key={sectionKey}
              title={config.title}
              url={`/docs/${sectionKey}`}
            >
              {renderComponentLayout(
                sectionKey,
                componentVariants[sectionKey],
                componentMap[sectionKey]
              )}
            </SectionContent>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TabsSection;
