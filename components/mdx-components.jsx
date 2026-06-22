import React, { forwardRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Typography,
  Link as MuiLink,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  ButtonBase,
  useTheme,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { LuCopy, LuCheck } from "react-icons/lu";
import PackageManagerTabs from "./docs/PackageManagerTabs";
import { FrameworkGrid } from "./docs/FrameworkGrid";

import CardVariants from "./ui/components/Cards";
import ButtonVariants from "./ui/components/Buttons";
import TextVariants from "./ui/components/Texts";
import LoaderVariants from "./ui/components/Loaders";
import SeparatorVariants from "./ui/components/Separators";
import BackgroundVariants from "./ui/components/Backgrounds";
import AvatarVariants from "./ui/components/Avatars";
import TabVariants from "./ui/components/Tabs";
import PaginationVariants from "./ui/components/Paginations";
import CarouselVariants from "./ui/components/Carousels";
import TableVariants from "./ui/components/Tables";
import DockVariants from "./ui/components/Docks";
import PointerVariants from "./ui/components/Pointers";
import GridVariants from "./ui/components/Grids";
import AccordionVariants from "./ui/components/Accordions";
import TextFieldVariants from "./ui/components/TextFields";
import DialogVariants from "./ui/components/Dialogs";
import FormVariants from "./ui/components/Forms";
import AutocompleteVariants from "./ui/components/Autocompletes";
import DatePickerVariants from "./ui/components/DatePickers";
import TimePickerVariants from "./ui/components/TimePickers";
import SkeletonVariants from "./ui/components/Skeletons";
import HeroVariants from "./ui/blocks/Hero/Hero";
import CTAVariants from "./ui/blocks/CTA/Cta";
import PricingVariants from "./ui/blocks/Pricing/Pricing";
import StatsVariants from "./ui/blocks/Stats/Stats";

const headingSizes = {
  h1: { fontSize: "32px", lineHeight: 1.2, fontWeight: 600 },
  h2: { fontSize: "26px", lineHeight: 1.3, fontWeight: 600 },
  h3: { fontSize: "22px", lineHeight: 1.4, fontWeight: 500 },
  h4: { fontSize: "18px", lineHeight: 1.5, fontWeight: 500 },
  h5: { fontSize: "16px", lineHeight: 1.6, fontWeight: 500 },
  h6: { fontSize: "14px", lineHeight: 1.6, fontWeight: 400 },
};

const createHeading = (variant) =>
  forwardRef(({ children, ...props }, ref) => {
    const id =
      typeof children === "string"
        ? children.toLowerCase().replace(/[^\w]+/g, "-")
        : undefined;
    return (
      <Typography
        variant={variant}
        gutterBottom
        ref={ref}
        id={id}
        sx={{ my: 1.5, letterSpacing: "-0.01em", ...headingSizes[variant] }}
        {...props}
      >
        {children}
      </Typography>
    );
  });

const CopyButton = ({ onClick, copied, sx }) => (
  <ButtonBase
    onClick={onClick}
    disableRipple
    aria-label={copied ? "Copied" : "Copy code"}
    sx={{
      width: 26,
      height: 26,
      borderRadius: 1,
      flexShrink: 0,
      color: "rgba(255,255,255,0.5)",
      transition: "color 0.15s ease",
      "&:hover": { color: "rgba(255,255,255,0.9)" },
      ...sx,
    }}
  >
    {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
  </ButtonBase>
);

const CodeBlock = ({
  className,
  children,
  rounded = true,
  showCopyButton = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const language = className?.replace(/language-/, "") || "jsx";
  const codeString = String(children).trim();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [codeString]);

  if (!isMounted) return null;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        maxHeight: 300,
        borderRadius: rounded ? 2 : 0,
        bgcolor: "#0a0a0a",
      }}
    >
      {showCopyButton && (
        <CopyButton
          onClick={handleCopy}
          copied={copied}
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
        />
      )}
      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          overflowX: "auto",
          "&::-webkit-scrollbar": { width: 6, height: 6 },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.05)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.25)",
            borderRadius: 1,
          },
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: 14,
            lineHeight: 1.6,
            borderRadius: 0,
            background: "#0a0a0a",
          }}
          wrapLines={false}
          wrapLongLines={false}
        >
          {codeString}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

const DynamicCodeBlock = dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
});

const InlineCode = (props) => (
  <Typography
    component="code"
    sx={{
      fontFamily: "monospace",
      fontSize: "0.85em",
      bgcolor: "rgba(255,255,255,0.08)",
      color: "#e8e8e8",
      px: 0.75,
      py: 0.25,
      mx: "1px",
      borderRadius: 1,
      border: "1px solid rgba(255,255,255,0.08)",
      whiteSpace: "nowrap",
    }}
    {...props}
  />
);

const CodeRenderer = (props) =>
  props.className ? <DynamicCodeBlock {...props} /> : <InlineCode {...props} />;

const CodePreview = ({
  preview,
  code,
  cli,
  noPadding = false,
  overflowVisible = false,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const tabs = cli ? ["Preview", "Code", "CLI"] : ["Preview", "Code"];
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const cliCommand = cli ? `npx @abhivarde/syncui@latest add ${cli}` : "";
  const isCopyableTab = tab > 0;

  const handleCopy = useCallback(() => {
    const textToCopy = tab === 2 ? cliCommand : String(code ?? "").trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [code, tab, cliCommand]);

  const colors = {
    paperBg: isDark ? "#0a0a0a" : "#ffffff",
    headerBg: isDark ? "#161616" : "#f4f4f5",
    panelBg: isDark ? "#0a0a0a" : "#fafafa",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    activeBorder: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)",
    activeText: isDark ? "#fff" : "#18181b",
    inactiveText: isDark ? "#a1a1a1" : "#71717a",
    inactiveHoverText: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)",
    cliText: isDark ? "#e8e8e8" : "#27272a",
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        mb: 4,
        overflow: overflowVisible ? "visible" : "hidden",
        borderRadius: 2,
        bgcolor: colors.paperBg,
        borderColor: colors.border,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.75, sm: 1 },
          px: { xs: 1, sm: 1.5 },
          py: 0.75,
          bgcolor: colors.headerBg,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.75, sm: 1 },
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {tabs.map((label, idx) => {
            const isActive = tab === idx;
            return (
              <ButtonBase
                key={label}
                onClick={() => setTab(idx)}
                disableRipple
                sx={{
                  height: 28,
                  flexShrink: 0,
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 400,
                  color: isActive ? colors.activeText : colors.inactiveText,
                  textShadow: isActive ? "0 0 0.4px currentColor" : "none",
                  px: 1.25,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: isActive ? colors.activeBorder : "transparent",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                  "&:hover": {
                    color: isActive
                      ? colors.activeText
                      : colors.inactiveHoverText,
                  },
                }}
              >
                {label}
              </ButtonBase>
            );
          })}
        </Box>

        {isCopyableTab && (
          <CopyButton
            onClick={handleCopy}
            copied={copied}
            sx={{ ml: "auto" }}
          />
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          minHeight: "100%",
          bgcolor: tab === 0 ? "background.paper" : colors.panelBg,
          p: tab === 0 && !noPadding ? { xs: 2, sm: 3 } : 0,
        }}
      >
        {tabs.map((label, index) => (
          <Box
            key={label}
            sx={{
              opacity: tab === index ? 1 : 0,
              visibility: tab === index ? "visible" : "hidden",
              position: tab === index ? "relative" : "absolute",
              inset: 0,
              transition: "opacity 0.15s",
            }}
          >
            {index === 0 && <Box>{preview}</Box>}
            {index === 1 && (
              <DynamicCodeBlock
                rounded={false}
                className="language-jsx"
                showCopyButton={false}
              >
                {code}
              </DynamicCodeBlock>
            )}
            {index === 2 && (
              <Box
                sx={{
                  p: 2,
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: colors.cliText,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {cliCommand}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export const MDXComponents = {
  FrameworkGrid,
  ButtonVariants,
  CardVariants,
  LoaderVariants,
  TextVariants,
  SeparatorVariants,
  BackgroundVariants,
  AvatarVariants,
  TabVariants,
  PaginationVariants,
  CarouselVariants,
  TableVariants,
  DockVariants,
  PointerVariants,
  GridVariants,
  AccordionVariants,
  TextFieldVariants,
  DialogVariants,
  FormVariants,
  AutocompleteVariants,
  DatePickerVariants,
  TimePickerVariants,
  SkeletonVariants,
  HeroVariants,
  CTAVariants,
  PricingVariants,
  StatsVariants,
  CodePreview,
  PackageManagerTabs,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  p: (props) =>
    typeof props.children === "object" &&
    props.children.type === DynamicCodeBlock ? (
      props.children
    ) : (
      <Typography
        component="p"
        sx={{ mb: 3, lineHeight: 1.6, fontSize: "0.95rem" }}
        {...props}
      />
    ),
  a: (props) => <MuiLink color="primary" {...props} />,
  strong: (props) => (
    <Typography component="strong" sx={{ fontWeight: 500 }} {...props} />
  ),
  code: CodeRenderer,
  pre: (props) => <div {...props} />,
  img: (props) => (
    <Box component="figure" sx={{ my: 4 }}>
      <img {...props} style={{ maxWidth: "100%", borderRadius: 4 }} />
    </Box>
  ),
  blockquote: (props) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        pl: 3,
        py: 1,
        my: 4,
        bgcolor: "grey.50",
        fontStyle: "italic",
        color: "text.secondary",
      }}
      {...props}
    />
  ),
  table: (props) => (
    <Box sx={{ overflowX: "auto", mb: 2, width: "100%" }}>
      <Table
        {...props}
        sx={{
          minWidth: { xs: "100%", sm: 650 },
          border: "1px solid rgba(224,224,224,1)",
        }}
      />
    </Box>
  ),
  thead: (props) => (
    <TableHead {...props} sx={{ bgcolor: "rgba(0,0,0,0.04)" }} />
  ),
  tbody: TableBody,
  tr: TableRow,
  th: (props) => (
    <TableCell
      {...props}
      sx={{ fontWeight: "bold", borderBottom: "1px solid rgba(224,224,224,1)" }}
    />
  ),
  td: (props) => (
    <TableCell
      {...props}
      sx={{ borderBottom: "1px solid rgba(224,224,224,1)" }}
    />
  ),
};
