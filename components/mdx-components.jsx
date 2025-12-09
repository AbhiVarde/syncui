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
  Tooltip,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { GoEye, GoTerminal } from "react-icons/go";
import { LuCheck, LuCopy } from "react-icons/lu";

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
  h1: { fontSize: "32px", lineHeight: 1.2 },
  h2: { fontSize: "26px", lineHeight: 1.3 },
  h3: { fontSize: "22px", lineHeight: 1.4 },
  h4: { fontSize: "18px", lineHeight: 1.5 },
  h5: { fontSize: "16px", lineHeight: 1.6 },
  h6: { fontSize: "14px", lineHeight: 1.6 },
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
          fontWeight: 500,
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
        borderRadius: 2,
        overflow: "hidden",
        maxHeight: 300,
      }}
    >
      <Tooltip
        title={copied ? "Copied!" : "Copy"}
        placement="left"
        disableInteractive
      >
        <IconButton
          onClick={handleCopy}
          size="small"
          disableRipple
          sx={{
            position: "absolute",
            top: isSmall ? 8 : 12,
            right: isSmall ? 8 : 12,
            color: copied ? "rgb(34,197,94)" : "rgba(255,255,255,0.8)",
            bgcolor: "rgba(0,0,0,0.35)",
            width: 32,
            height: 32,
            borderRadius: 1.5,
            backdropFilter: "blur(6px)",
            transition:
              "background-color 0.15s ease, color 0.15s ease, transform 0.1s ease",
            zIndex: 2,
            willChange: "transform",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.55)",
              color: copied ? "rgb(34,197,94)" : "#fff",
            },
            "&:active": { transform: "scale(0.95)" },
          }}
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          overflowX: "auto",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          willChange: "scroll-position",
          "&::-webkit-scrollbar": { width: 8, height: 8 },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0,0,0,0.1)",
            borderRadius: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: 1,
            transition: "background 0.15s ease",
            "&:hover": { background: "rgba(255,255,255,0.4)" },
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
            borderRadius: 8,
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
      sx={{ mb: 4, overflow: "visible", borderRadius: 2, boxShadow: 0.5 }}
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
          <Box p={1}>
            <DynamicCodeBlock className="language-jsx">{code}</DynamicCodeBlock>
          </Box>
        </Box>
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
  code: DynamicCodeBlock,
  pre: (props) => <div {...props} />,
  img: (props) => (
    <Box component="figure" sx={{ my: 4 }}>
      <img {...props} style={{ maxWidth: "100%", borderRadius: 4 }} />
    </Box>
  ),
  strong: (props) => (
    <Typography component="strong" sx={{ fontWeight: 500 }} {...props} />
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
  CodePreview,
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
  td: (props) => (
    <TableCell
      {...props}
      sx={{ borderBottom: "1px solid rgba(224,224,224,1)" }}
    />
  ),
  th: (props) => (
    <TableCell
      {...props}
      sx={{ fontWeight: "bold", borderBottom: "1px solid rgba(224,224,224,1)" }}
    />
  ),
};
