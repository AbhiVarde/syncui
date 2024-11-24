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
import { RxCheck, RxCopy } from "react-icons/rx";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
import { GoEye, GoTerminal } from "react-icons/go";

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
          mt: 3,
          mb: 2,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          ...(variant === "h1" && { fontSize: "1.75rem", lineHeight: 1.2 }),
          ...(variant === "h2" && { fontSize: "1.35rem", lineHeight: 1.3 }),
          ...(variant === "h3" && { fontSize: "1.15rem", lineHeight: 1.4 }),
          ...(variant === "h4" && { fontSize: "1rem", lineHeight: 1.5 }),
          ...(variant === "h5" && { fontSize: "0.95rem", lineHeight: 1.6 }),
          ...(variant === "h6" && { fontSize: "0.9rem", lineHeight: 1.6 }),
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Tooltip arrow title={copied ? "Copied!" : "Copy code"}>
        <IconButton
          onClick={handleCopy}
          className="copy-button"
          size="small"
          sx={{
            position: "absolute",
            top: isSmallScreen ? 4 : 8,
            right: isSmallScreen ? 4 : 8,
            color: "grey.300",
            bgcolor: "rgba(0, 0, 0, 0.3)",
            transition: "all 0.2s ease-in-out",
            opacity: 1,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.5)",
            },
            zIndex: 2,
          }}
        >
          {copied ? <RxCheck size={16} /> : <RxCopy size={16} />}
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
            padding: isSmallScreen ? "12px" : "16px",
            fontSize: isSmallScreen ? "10px" : "12px",
            lineHeight: 1.5,
          }}
          wrapLines={true}
          wrapLongLines={true}
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
    borderBottom: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)"
    }`,
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  }));

  const StyledTab = styled(Tab)(({ theme }) => ({
    color:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.7)"
        : "rgba(0, 0, 0, 0.7)",
    "&.Mui-selected": {
      color: theme.palette.mode === "dark" ? "white" : "black",
    },
    "&:hover": {
      color: theme.palette.mode === "dark" ? "white" : "black",
      opacity: 1,
    },
    minHeight: "36px",
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(14),
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  }));

  const [tab, setTab] = useState(0);

  return (
    <Paper
      variant="outlined"
      sx={{
        mb: 4,
        overflow: "hidden",
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <StyledTabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <StyledTab
          icon={<GoEye size={20} />}
          label="Preview"
          iconPosition="start"
        />
        <StyledTab
          icon={<GoTerminal size={20} />}
          label="Code"
          iconPosition="start"
        />
      </StyledTabs>
      <Box p={1} sx={{ borderRadius: "0px !important" }}>
        {tab === 0 ? (
          <Preview>{preview}</Preview>
        ) : (
          <DynamicCodeBlock className="language-jsx">{code}</DynamicCodeBlock>
        )}
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
          mb: 2,
          mt: 2,
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
