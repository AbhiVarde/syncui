import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children, toggleTheme, isDarkMode, docsTree, toc }) => {
  const router = useRouter();
  const isDocsPage = router.pathname.startsWith("/docs");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        docsTree={docsTree}
        isDocsPage={isDocsPage}
        toc={toc}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "60px",
          ...(isDocsPage && {
            display: "flex",
          }),
        }}
      >
        {children}
      </Box>
      {!isDocsPage && <Footer />}
    </Box>
  );
};

export default Layout;
