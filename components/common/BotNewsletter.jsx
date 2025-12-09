import React, { useState, useCallback } from "react";
import {
  Fab,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { LuX, LuMail } from "react-icons/lu";
import { toast } from "sonner";

const BotNewsletter = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("loading");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEWSLETTER_API}/newsletter`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          toast.success("Thanks for subscribing! Check your email.", {
            description: "Welcome to the newsletter!",
            duration: 4000,
          });
          setEmail("");
          // Close modal after successful subscription
          setTimeout(() => {
            setIsOpen(false);
            setStatus("idle");
          }, 1500);
        } else {
          setStatus("error");
          toast.error(data.message || "Something went wrong", {
            description: "Please try again later.",
            duration: 4000,
          });
        }
      } catch (error) {
        setStatus("error");
        toast.error("Failed to subscribe", {
          description: "Please check your connection and try again.",
          duration: 4000,
        });
      }
    },
    [email]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setStatus("idle");
    setEmail("");
  }, []);

  // Toggle function for mail icon click
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setStatus("idle");
      setEmail("");
    }
  }, [isOpen]);

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);

  const fabStyles = {
    width: 48,
    height: 48,
    backgroundColor: isDarkMode ? "#ffffff" : "#000000",
    color: isDarkMode ? "#000000" : "#ffffff",
    "&:hover": {
      backgroundColor: isDarkMode ? "#f5f5f5" : "#333333",
    },
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  };

  const paperStyles = {
    width: 320,
    border: `1px solid ${isDarkMode ? "#333333" : "#e0e0e0"}`,
    backgroundImage: "none",
    borderRadius: 2,
    overflow: "hidden",
  };

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
      "& fieldset": {
        borderColor: isDarkMode ? "#333333" : "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: isDarkMode ? "#555555" : "#cccccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: isDarkMode ? "#ffffff" : "#000000",
      },
    },
    "& .MuiInputBase-input": {
      color: isDarkMode ? "#ffffff" : "#000000",
      fontSize: "0.875rem",
    },
    "& .MuiInputBase-input::placeholder": {
      color: isDarkMode ? "#ffffff" : "#000000",
      opacity: 0.5,
    },
  };

  const buttonStyles = {
    backgroundColor: isDarkMode ? "#ffffff" : "#000000",
    color: isDarkMode ? "#000000" : "#ffffff",
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "none",
    height: 40,
    "&:hover": {
      backgroundColor: isDarkMode ? "#ffffff" : "#000000",
      opacity: 0.8,
    },
    "&:disabled": {
      backgroundColor: isDarkMode ? "#ffffff" : "#000000",
      color: isDarkMode ? "#000000" : "#ffffff",
      opacity: 0.5,
    },
  };

  return (
    <>
      <motion.div
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Changed to handleToggle for open/close functionality */}
        <Fab onClick={handleToggle} sx={fabStyles}>
          <LuMail size={20} />
        </Fab>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{ position: "fixed", bottom: 96, right: 24, zIndex: 1001 }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Paper elevation={8} sx={paperStyles}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  pb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }}
                >
                  Stay in the loop
                </Typography>
                <IconButton
                  onClick={handleClose}
                  size="small"
                  sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                >
                  <LuX />
                </IconButton>
              </Box>

              <Box sx={{ px: 2, pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? "#ffffff" : "#000000",
                    mb: 2,
                    fontSize: "0.875rem",
                    opacity: 0.7,
                  }}
                >
                  Get notified when new components and templates drop.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    size="small"
                    sx={textFieldStyles}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={status === "loading"}
                    sx={buttonStyles}
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>

                {/* Powered by Resend footer */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                    pt: 1.5,
                    borderTop: `1px solid ${isDarkMode ? "#333333" : "#e0e0e0"}`,
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: isDarkMode ? "#ffffff" : "#000000",
                      fontSize: "0.75rem",
                    }}
                  >
                    Powered by
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {/* Appwrite */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open("https://appwrite.io", "_blank")
                      }
                    >
                      <Box
                        component="img"
                        src="https://appwrite.io/images/logos/logo.svg"
                        alt="Appwrite"
                        sx={{ width: 16, height: 16 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 500,
                          color: isDarkMode ? "#ffffff" : "#000000",
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "2px",
                          },
                        }}
                      >
                        Appwrite
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 500,
                        color: isDarkMode ? "#ffffff" : "#000000",
                        mx: 0.5,
                      }}
                    >
                      &
                    </Typography>
                    {/* Resend */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open("https://resend.com", "_blank")
                      }
                    >
                      <Box
                        component="img"
                        src="https://resend.com/static/favicons/favicon.ico"
                        alt="Resend"
                        sx={{ width: 16, height: 16 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 500,
                          color: isDarkMode ? "#ffffff" : "#000000",
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "2px",
                          },
                        }}
                      >
                        Resend
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BotNewsletter;
