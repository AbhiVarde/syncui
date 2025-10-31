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
import { motion, time } from "framer-motion";
import { RiCodeSSlashLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

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
import TimePickerVariants from "../ui/TimePickers";

const componentVariants = {
  timepickers: ["12hour", "24hour", "with-seconds", "presets"],
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
  timepickers: { title: "Time Pickers", layout: "tabs" },
  datepickers: { title: "Date Pickers", layout: "tabs" },
  autocompletes: { title: "Smart Autocomplete", layout: "tabs" },
  forms: { title: "Adaptive Forms", layout: "tabs" },
  textfields: { title: "Echo Inputs", layout: "tabs" },
  dialogs: { title: "Overlay Dialogs", layout: "flex-wrap" },
  buttons: { title: "Interactive Buttons", layout: "flex-wrap" },
  cards: { title: "Dynamic Cards", layout: "flex-wrap" },
  pointers: { title: "Magnetic Pointers", layout: "grid" },
  docks: { title: "Navigation Docks", layout: "tabs" },
  loaders: { title: "Loading Animations", layout: "flex-wrap" },
  grids: { title: "Responsive Grids", layout: "tabs" },
  marquees: { title: "Scrolling Marquees", layout: "tabs" },
  tables: { title: "Data Tables", layout: "tabs" },
  avatars: { title: "Profile Avatars", layout: "tabs" },
  accordions: { title: "Collapsible Panels", layout: "tabs" },
  carousels: { title: "Content Carousels", layout: "tabs" },
  tabs: { title: "Tabbed Navigation", layout: "column" },
  texts: { title: "Animated Typography", layout: "column" },
  separators: { title: "Visual Dividers", layout: "column" },
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

const TabContent = ({
  variants,
  ComponentVariant,
  tabLabels = {},
  sectionKey,
  minHeight,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const needsFullWidth = [
    "datepickers",
    "autocompletes",
    "forms",
    "tables",
    "accordions",
    "grids",
    "carousels",
    "docks",
    "textfields",
  ].includes(sectionKey);

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
              id={`${sectionKey}-tab-${index}`}
              aria-controls={`${sectionKey}-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      <Box
        role="tabpanel"
        id={`${sectionKey}-tabpanel-${activeTab}`}
        aria-labelledby={`${sectionKey}-tab-${activeTab}`}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: minHeight || "auto",
          width: "100%",
        }}
      >
        <Box sx={{ width: needsFullWidth ? "100%" : "auto" }}>
          <ComponentVariant variant={variants[activeTab]} />
        </Box>
      </Box>
    </Box>
  );
};

const SectionContent = ({ title, children, url }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleGetCode = () => {
    const isMainDomain =
      typeof window !== "undefined" &&
      window.location.hostname === "syncui.design";

    if (isMainDomain) {
      window.location.href = `https://docs.syncui.design${url}`;
    } else {
      router.push(url);
    }
  };

  return (
    <Box>
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
    </Box>
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

  // Tab layouts with specific labels
  const tabLayouts = {
    timepickers: {
      "12hour": "12 Hour",
      "24hour": "24 Hour",
      "with-seconds": "With Seconds",
      presets: "With Presets",
    },
    datepickers: {
      single: "Single Date",
      range: "Date Range",
      inline: "Inline Calendar",
      presets: "With Presets",
      "with-time": "Date & Time",
    },
    autocompletes: {
      basic: "Basic Search",
      "multi-select": "Multi Select",
      async: "Async Loading",
      grouped: "Grouped Options",
      "custom-render": "Custom Render",
    },
    forms: {
      "multi-step": "Multi Step",
      login: "Login",
      register: "Register",
      contact: "Contact",
    },
    tables: {
      modern: "Modern",
      minimal: "Minimal",
      expandable: "Expandable",
    },
    textfields: {
      otp: "OTP Input",
      endIcon: "End Icon",
      startInline: "Start Inline",
      endInline: "End Inline",
      currency: "Currency",
      aiPrompt: "AI Prompt",
    },
    docks: {
      modern: "Modern",
      categorical: "Categorical",
      dynamic: "Dynamic",
      glass: "Glass",
    },
  };

  if (config.layout === "tabs") {
    const minHeights = {
      tables: "400px",
      carousels: "400px",
    };

    return (
      <TabContent
        variants={variants}
        ComponentVariant={ComponentVariant}
        tabLabels={tabLayouts[sectionKey] || {}}
        sectionKey={sectionKey}
        minHeight={minHeights[sectionKey]}
      />
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

  if (sectionKey === "backgrounds") {
    return (
      <Box sx={containerStyle}>
        {variants.map((variant, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              height: "200px",
              overflow: "hidden",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <ComponentVariant variant={variant} />
          </Box>
        ))}
      </Box>
    );
  }

  if (sectionKey === "tabs" || sectionKey === "paginations") {
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
                mb: "auto",
                textTransform: "capitalize",
                fontWeight: sectionKey === "tabs" ? 400 : 500,
              }}
            >
              {formatVariantName(variant)}
              {sectionKey === "paginations" ? " Pagination" : ""}
            </Typography>
            {sectionKey === "paginations" ? (
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
  timepickers: TimePickerVariants,
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
