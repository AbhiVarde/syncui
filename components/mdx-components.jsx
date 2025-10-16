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
import MarqueeVariants from "./ui/Marquees";
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

const createHeading = (variant) => {
  return forwardRef(({ children, ...props }, ref) => {
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
          ...(variant === "h1" && {
            fontSize: "32px !important",
            lineHeight: 1.2,
          }),
          ...(variant === "h2" && {
            fontSize: "26px !important",
            lineHeight: 1.3,
          }),
          ...(variant === "h3" && {
            fontSize: "22px !important",
            lineHeight: 1.4,
          }),
          ...(variant === "h4" && {
            fontSize: "18px !important",
            lineHeight: 1.5,
          }),
          ...(variant === "h5" && {
            fontSize: "16px !important",
            lineHeight: 1.6,
          }),
          ...(variant === "h6" && {
            fontSize: "14px !important",
            lineHeight: 1.6,
          }),
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  });
};

const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const language = className ? className.replace(/language-/, "") : "jsx";
  const codeString =
    typeof children === "string" ? children.trim() : String(children).trim();

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "0px !important",
        overflow: "hidden",
      }}
    >
      <Tooltip
        title={copied ? "Copied!" : "Copy"}
        placement="left"
        slotProps={{
          tooltip: {
            sx: (theme) => ({
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 30, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              fontSize: "12px",
              fontWeight: 500,
              px: 1.5,
              py: 0.75,
              borderRadius: "6px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 10px rgba(0,0,0,0.4)"
                  : "0 2px 10px rgba(0,0,0,0.08)",
              transition: "all 0.15s ease",
            }),
          },
        }}
      >
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: "absolute",
            top: isSmall ? 8 : 12,
            right: isSmall ? 8 : 12,
            color: copied ? "rgb(34,197,94)" : "rgba(255,255,255,0.8)",
            bgcolor: "rgba(0,0,0,0.35)",
            width: 32,
            height: 32,
            borderRadius: "6px",
            transition: "all 0.2s ease-in-out",
            backdropFilter: "blur(6px)",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.55)",
              color: copied ? "rgb(34,197,94)" : "#fff",
            },
            "&:active": {
              transform: "scale(0.96)",
            },
            zIndex: 2,
          }}
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "20px",
            background:
              "linear-gradient(to right, transparent, rgba(0,0,0,0.1))",
            zIndex: 1,
          },
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: isSmall ? "14px" : "18px",
            fontSize: "14px",
            lineHeight: 1.6,
            borderRadius: "8px",
            overflowX: "auto",
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

const CodePreview = ({ preview, code }) => {
  const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: "40px",
    borderBottom: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.12)"
    }`,
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
      height: "2px",
      transition: "all 0.2s ease",
    },
  }));

  const StyledTab = styled(Tab)(({ theme }) => ({
    color:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(0, 0, 0, 0.6)",
    "&.Mui-selected": {
      color: theme.palette.mode === "dark" ? "white" : "black",
    },
    "&:hover": {
      color: theme.palette.mode === "dark" ? "white" : "black",
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.05)",
    },
    minHeight: "40px",
    padding: "8px 16px",
    fontWeight: 500,
    fontSize: "13px",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
  }));

  const [tab, setTab] = useState(0);

  return (
    <Paper
      variant="outlined"
      sx={{
        mb: 4,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 0.5,
      }}
    >
      <StyledTabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
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
      <Box
        sx={{
          position: "relative",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            opacity: tab === 0 ? 1 : 0,
            visibility: tab === 0 ? "visible" : "hidden",
            position: tab === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            transition: "opacity 0.15s ease",
          }}
        >
          <Preview>{preview}</Preview>
        </Box>
        <Box
          sx={{
            opacity: tab === 1 ? 1 : 0,
            visibility: tab === 1 ? "visible" : "hidden",
            position: tab === 1 ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            transition: "opacity 0.15s ease",
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
  ButtonVariants: ButtonVariants,
  CardVariants: CardVariants,
  LoaderVariants: LoaderVariants,
  TextVariants: TextVariants,
  SeparatorVariants: SeparatorVariants,
  BackgroundVariants: BackgroundVariants,
  AvatarVariants: AvatarVariants,
  MarqueeVariants: MarqueeVariants,
  TabVariants: TabVariants,
  PaginationVariants: PaginationVariants,
  CarouselVariants: CarouselVariants,
  TableVariants: TableVariants,
  DockVariants: DockVariants,
  PointerVariants: PointerVariants,
  GridVariants: GridVariants,
  AccordionVariants: AccordionVariants,
  TextFieldVariants: TextFieldVariants,
  DialogVariants: DialogVariants,
  FormVariants: FormVariants,
  AutocompleteVariants: AutocompleteVariants,
  DatePickerVariants: DatePickerVariants,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  p: (props) => {
    if (
      typeof props.children === "object" &&
      props.children.type === DynamicCodeBlock
    ) {
      return props.children;
    }
    return (
      <Typography
        component="p"
        sx={{
          mb: 3,
          lineHeight: 1.6,
          fontSize: "0.95rem",
          color: "text.primary",
        }}
        {...props}
      />
    );
  },
  a: (props) => <MuiLink color="primary" {...props} />,
  code: DynamicCodeBlock,
  pre: (props) => <div {...props} />,
  img: (props) => (
    <Box component="figure" sx={{ my: 4 }}>
      <img {...props} style={{ maxWidth: "100%", borderRadius: "4px" }} />
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
    <Box sx={{ overflowX: "auto", marginBottom: 2, width: "100%" }}>
      <Table
        {...props}
        sx={{
          minWidth: { xs: "100%", sm: 650 },
          border: "1px solid rgba(224, 224, 224, 1)",
        }}
      />
    </Box>
  ),
  thead: (props) => (
    <TableHead {...props} sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }} />
  ),
  tbody: TableBody,
  tr: TableRow,
  td: (props) => (
    <TableCell
      {...props}
      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
    />
  ),
  th: (props) => (
    <TableCell
      {...props}
      sx={{
        fontWeight: "bold",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
      }}
    />
  ),
};
