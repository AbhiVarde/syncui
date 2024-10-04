import React from "react";
import Giscus from "@giscus/react";
import { Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const GiscusComponent = () => {
  const { isDarkMode } = useTheme();

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Box mt={2}>
      <Giscus
        repo="AbhiVarde/syncui"
        repoId="R_kgDOMq_-tA"
        category="General"
        categoryId="DIC_kwDOMq_-tM4Cirpt"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={isDarkMode ? "dark" : "light"}
        lang="en"
        crossorigin="anonymous"
      />
    </Box>
  );
};

export default GiscusComponent;
