import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import { GitHubProvider } from "@/context/GithubContext";

const HEADER_HEIGHT = 56;

const Layout = ({ children, toggleTheme, isDarkMode, docsTree, toc }) => {
  const router = useRouter();
  const is404Page = router.pathname === "/404";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {!is404Page && (
        <GitHubProvider>
          <Header
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            docsTree={docsTree}
            toc={toc}
          />
        </GitHubProvider>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: is404Page ? 0 : `${HEADER_HEIGHT}px`,
          ...(router.pathname.startsWith("/docs") && { display: "flex" }),
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
