import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import BotNewsletter from "../common/BotNewsletter";

const Layout = ({ children, toggleTheme, isDarkMode, docsTree, toc }) => {
  const router = useRouter();
  const isDocsPage = router.pathname.startsWith("/docs");
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
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          docsTree={docsTree}
          isDocsPage={isDocsPage}
          toc={toc}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: !is404Page ? "60px" : 0,
          ...(isDocsPage && {
            display: "flex",
          }),
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
      {!isDocsPage && !is404Page && <Footer />}
      {/* {!is404Page && <BotNewsletter isDarkMode={isDarkMode} />} */}
    </Box>
  );
};

export default Layout;
