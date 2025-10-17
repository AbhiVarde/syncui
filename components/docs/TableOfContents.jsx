import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { RxTextAlignLeft, RxStar, RxStarFilled } from "react-icons/rx";
import { GITHUB_URL, SPONSOR_URL } from "../../utils/constants";
import { useGitHub } from "@/context/GithubContext";
import { RiGithubFill, RiHeartFill, RiHeartLine } from "react-icons/ri";
import AnimatedCounter from "../AnimatedCounter";

const buttonStyles = {
  mt: 1,
  mx: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1.5,
  width: "100%",
  height: 40,
  borderRadius: "12px",
  color: "inherit",
  textDecoration: "none",
  bgcolor: (theme) => theme.palette.action.hover,
  border: "1px solid",
  borderColor: "divider",
  "&:hover": {
    bgcolor: (theme) => theme.palette.action.selected,
  },
};

export const TableOfContents = ({ toc }) => {
  const { stars, loading } = useGitHub();
  const [activeId, setActiveId] = useState("");
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isStarHovered, setIsStarHovered] = useState(false);

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
                pl: 1,
                my: 0.5,
              }}
            >
              {item.text.split("–")[0].trim()}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Box
        component="a"
        href={SPONSOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHeartHovered(true)}
        onMouseLeave={() => setIsHeartHovered(false)}
        sx={buttonStyles}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isHeartHovered ? (
            <RiHeartFill size={20} color="#e91e63" />
          ) : (
            <RiHeartLine size={20} />
          )}
        </Box>
        <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1 }}>
          Support Sync UI
        </Typography>
      </Box>

      <Box
        component="a"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsStarHovered(true)}
        onMouseLeave={() => setIsStarHovered(false)}
        sx={buttonStyles}
      >
        {!loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <RiGithubFill size={20} />
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{
                  borderRight: "1px solid",
                  borderColor: "divider",
                  pr: 1.2,
                  lineHeight: 1,
                }}
              >
                Star
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                lineHeight: 1,
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                <AnimatedCounter value={stars || 0} duration={2} />
              </Typography>

              {isStarHovered ? (
                <RxStarFilled size={20} color="#fbc02d" />
              ) : (
                <RxStar size={20} />
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <RiGithubFill size={24} />
            <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1 }}>
              Star
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
