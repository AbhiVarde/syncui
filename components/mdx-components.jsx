import React, { forwardRef, useState, useEffect } from "react";
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
  Tabs,
  Tab,
  IconButton,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { GoEye, GoTerminal } from "react-icons/go";
import { LuCheck, LuClipboard } from "react-icons/lu";

import CardVariants from "./ui/Cards";
import ButtonVariants from "./ui/Buttons";
import TextVariants from "./ui/Texts";
import LoaderVariants from "./ui/Loaders";
import SeparatorVariants from "./ui/Separators";
import BackgroundVariants from "./ui/Backgrounds";
import AvatarVariants from "./ui/Avatars";
import TabVariants from "./ui/Tabs";
import PaginationVariants from "./ui/Paginations";
import CarouselVariants from "./ui/Carousels";
import TableVariants from "./ui/Tables";
import DockVariants from "./ui/Docks";
import PointerVariants from "./ui/Pointers";
import GridVariants from "./ui/Grids";
import AccordionVariants from "./ui/Accordions";
import TextFieldVariants from "./ui/TextFields";
import DialogVariants from "./ui/Dialogs";
import FormVariants from "./ui/Forms";
import AutocompleteVariants from "./ui/Autocompletes";
import DatePickerVariants from "./ui/DatePickers";
import TimePickerVariants from "./ui/TimePickers";
import SkeletonVariants from "./ui/Skeletons";

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
        sx={{
          my: 1.5,
          letterSpacing: "-0.01em",
          ...headingSizes[variant],
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  });

const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const language = className?.replace(/language-/, "") || "jsx";
  const codeString =
    typeof children === "string" ? children.trim() : String(children).trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) return null;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        maxHeight: 300,
      }}
    >
      <IconButton
        onClick={handleCopy}
        size="small"
        disableRipple
        sx={{
          position: "absolute",
          top: isSmall ? 8 : 12,
          right: isSmall ? 8 : 12,
          width: 32,
          height: 32,
          borderRadius: 1.5,
          backgroundColor: "rgba(0,0,0,0.35)",
          color: "rgba(255,255,255,0.9)",
          transition: "background-color 0.15s ease",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.55)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {copied ? <LuCheck size={16} /> : <LuClipboard size={16} />}
        </Box>
      </IconButton>

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
            padding: isSmall ? 14 : 18,
            fontSize: 14,
            lineHeight: 1.6,
            borderRadius: 0,
            background: "#1d1f21",
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

const Preview = ({ children }) => <Box p={3}>{children}</Box>;

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 40,
  borderBottom: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
    height: 2,
    transition: "all 0.2s",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
  minHeight: 40,
  padding: "8px 16px",
  fontWeight: 500,
  fontSize: 13,
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  gap: 6,
  transition: "all 0.2s",
  "&.Mui-selected": {
    color: theme.palette.mode === "dark" ? "white" : "black",
  },
  "&:hover": {
    color: theme.palette.mode === "dark" ? "white" : "black",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.05)",
  },
}));

const CodePreview = ({ preview, code }) => {
  const [tab, setTab] = useState(0);

  return (
    <Paper
      variant="outlined"
      sx={{ mb: 4, overflow: "hidden", borderRadius: 2, boxShadow: 0.5 }}
    >
      <StyledTabs value={tab} onChange={(e, v) => setTab(v)}>
        <StyledTab
          icon={<GoEye size={18} />}
          label="Preview"
          iconPosition="start"
        />
        <StyledTab
          icon={<GoTerminal size={18} />}
          label="Code"
          iconPosition="start"
        />
      </StyledTabs>
      <Box sx={{ position: "relative", minHeight: "100%" }}>
        <Box
          sx={{
            opacity: tab === 0 ? 1 : 0,
            visibility: tab === 0 ? "visible" : "hidden",
            position: tab === 0 ? "relative" : "absolute",
            inset: 0,
            transition: "opacity 0.15s",
          }}
        >
          <Preview>{preview}</Preview>
        </Box>
        <Box
          sx={{
            opacity: tab === 1 ? 1 : 0,
            visibility: tab === 1 ? "visible" : "hidden",
            position: tab === 1 ? "relative" : "absolute",
            inset: 0,
            transition: "opacity 0.15s",
          }}
        >
          <Box>
            <DynamicCodeBlock className="language-jsx">{code}</DynamicCodeBlock>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const PackageManagerTabs = ({ npm, yarn, pnpm, bun }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const commands = [
    { label: "npm", value: npm },
    { label: "yarn", value: yarn },
    { label: "pnpm", value: pnpm },
    { label: "bun", value: bun },
  ].filter((cmd) => cmd.value);

  const currentCommand = commands[activeTab]?.value || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      variant="outlined"
      sx={{ mb: 4, overflow: "hidden", borderRadius: 2, boxShadow: 0.5 }}
    >
      <StyledTabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {commands.map((cmd, idx) => (
          <StyledTab key={idx} label={cmd.label} />
        ))}
      </StyledTabs>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={handleCopy}
          size="small"
          disableRipple
          sx={{
            position: "absolute",
            top: isSmall ? 8 : 12,
            right: isSmall ? 8 : 12,
            width: 32,
            height: 32,
            borderRadius: 1.5,
            backgroundColor: "rgba(0,0,0,0.35)",
            color: "rgba(255,255,255,0.9)",
            transition: "background-color 0.15s ease",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.55)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {copied ? <LuCheck size={16} /> : <LuClipboard size={16} />}
          </Box>
        </IconButton>

        <SyntaxHighlighter
          language="bash"
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: isSmall ? 14 : 18,
            fontSize: 14,
            lineHeight: 1.6,
            borderRadius: 0,
            background: "#1d1f21",
          }}
        >
          {currentCommand}
        </SyntaxHighlighter>
      </Box>
    </Paper>
  );
};

export const MDXComponents = {
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
  code: DynamicCodeBlock,
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
