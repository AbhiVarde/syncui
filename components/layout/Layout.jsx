import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Header from "./Header";
import { GitHubProvider } from "@/context/GithubContext";

const HEADER_HEIGHT = 56;

const Layout = ({ children, toggleTheme, isDarkMode, docsTree, toc }) => {
  const router = useRouter();
  const isDocsPage = router.pathname.startsWith("/docs");
  const is404Page = router.pathname === "/404";

  if (is404Page) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {children}
      </Box>
    );
  }

  return (
    <GitHubProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          docsTree={docsTree}
          toc={toc}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: `${HEADER_HEIGHT}px`,
            ...(isDocsPage && { display: "flex" }),
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>{children}</Box>
        </Box>
      </Box>
    </GitHubProvider>
  );
};

export default Layout;
