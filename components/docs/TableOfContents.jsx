import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { RxTextAlignLeft, RxStar } from "react-icons/rx";
import { GITHUB_URL } from "../../utils/constants";

export const TableOfContents = ({ toc }) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "0.8rem",
          fontWeight: 500,
        }}
      >
        <RxTextAlignLeft size={20} /> On this page
      </Typography>
      <List
        dense
        sx={{
          pl: 0.5,
          "& .MuiListItem-root": {
            p: "0px !important",
          },
        }}
      >
        {toc.map((item) => (
          <ListItem
            key={item.id}
            component="a"
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            sx={{
              borderLeft: 1,
              borderColor: activeId === item.id ? "" : "divider",
              pl: item.level > 1 ? (item.level - 1) * 0.5 : 0.5,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Typography
              variant="caption"
              fontWeight={activeId === item.id ? 500 : 400}
              color={activeId === item.id ? "" : "text.secondary"}
              sx={{
                transition: "all 0.3s ease-in-out",
                pl: 1,
                my: 0.5,
              }}
            >
              {item.text}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          mx: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "8px 16px",
          borderRadius: "8px",
          borderColor: "inherit",
          color: "inherit",
          textTransform: "none",
        }}
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RxStar size={18} style={{ marginRight: "4px" }} />
        <Typography variant="caption" fontWeight={500}>
          Star on GitHub
        </Typography>
      </Button>
    </Box>
  );
};
