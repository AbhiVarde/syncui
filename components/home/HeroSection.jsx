import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Tooltip,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { RxArrowRight } from "react-icons/rx";
import { RiGithubFill } from "react-icons/ri";
import Link from "next/link";
import {
  SiReact,
  SiNextdotjs,
  SiFramer,
  SiJavascript,
  SiMui,
} from "react-icons/si";
import { GITHUB_URL } from "../../utils/constants";

const AnimatedButton = ({ children, icon, variant }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant={variant}
      sx={{ minWidth: "80px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {children}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-flex", overflow: "hidden" }}
            >
              {icon}
            </motion.span>
          )}
        </AnimatePresence>
      </Box>
    </Button>
  );
};

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 20 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.05em",
              mb: "0px !important",
            }}
          >
            Beautifully designed components
            <br />
            built with MUI and Framer Motion
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            mt
            variant="body1"
            sx={{ fontWeight: 400, color: "text.secondary" }}
          >
            Accessible and customizable components that you can copy and paste
            into your apps. Built with MUI and Framer Motion for seamless
            integration and stunning animations. Free. Open Source. Ready for
            your next project.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 3,
              alignItems: "center",
            }}
          >
            {[
              { Icon: SiMui, title: "MUI", color: "#007FFF" },
              { Icon: SiJavascript, title: "JavaScript", color: "#F7DF1E" },
              { Icon: SiReact, title: "React", color: "#61DAFB" },
              {
                Icon: SiNextdotjs,
                title: "Next.js",
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
              },
              { Icon: SiFramer, title: "Framer Motion", color: "#FF0050" },
            ].map(({ Icon, title, color }) => (
              <Tooltip arrow key={title} title={title} placement="top">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    color, // Apply the color here
                  }}
                >
                  <Icon size={32} />
                </Box>
              </Tooltip>
            ))}
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Link href="/docs" passHref>
              <AnimatedButton
                variant="contained"
                icon={<RxArrowRight size={18} />}
              >
                Docs
              </AnimatedButton>
            </Link>
            <Link href={GITHUB_URL} passHref>
              <AnimatedButton
                variant="outlined"
                icon={<RiGithubFill size={20} />}
              >
                Star on GitHub
              </AnimatedButton>
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default HeroSection;
