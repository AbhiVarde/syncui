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
      {!is404Page && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1300,
            display: { xs: "none", sm: "block" },
          }}
        >
          <a
            href="https://www.producthunt.com/products/sync-ui-blocks?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-sync-ui-blocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Sync UI Blocks - Build faster with ready-made UI blocks | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1058017&theme=light&t=1767588469016"
            />
          </a>
        </Box>
      )}
    </Box>
  );
};

export default Layout;
