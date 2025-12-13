// forms.jsx - Optimized with motion/react
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoArrowBack,
  IoCheckmark,
  IoSend,
  IoLogoGithub,
} from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

const FormVariants = ({ variant = "register" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const outerTheme = useTheme();

  const minimalTheme = createTheme({
    ...outerTheme,
    components: {
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: "40px",
              "& fieldset": {
                borderColor: theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.text.primary,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.text.primary,
                borderWidth: "2px",
              },
              "&.MuiInputBase-multiline": {
                height: "auto",
              },
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
              "&.Mui-focused": {
                color: theme.palette.text.primary,
              },
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 24px",
            height: "40px",
            minHeight: "40px",
          }),
          contained: ({ theme }) => ({
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.paper,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: theme.palette.text.secondary,
              boxShadow: "none",
            },
          }),
          outlined: ({ theme }) => ({
            borderColor: theme.palette.mode === "dark" ? "#666" : "#e0e0e0",
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.text.primary,
              backgroundColor: "transparent",
            },
          }),
          text: ({ theme }) => ({
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 1px 5px rgba(0,0,0,0.5)"
                : "0 1px 3px rgba(0,0,0,0.1)",
            border: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
            }`,
            backgroundColor: theme.palette.background.paper,
            width: "100%",
            minWidth: { xs: "auto", sm: 400 },
            maxWidth: 420,
            padding: theme.spacing(4),
            margin: { xs: theme.spacing(1), sm: 0 },
            [theme.breakpoints.down("sm")]: {
              padding: theme.spacing(2),
              minWidth: "auto",
              margin: theme.spacing(1),
            },
          }),
        },
      },
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderMultiStepForm = () => {
    const steps = ["Personal", "Contact", "Preferences"];

    const stepContent = [
      <MotionBox
        key="step1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            size="small"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            size="small"
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
          />
        </Box>
        <TextField
          fullWidth
          label="Email address"
          type="email"
          variant="outlined"
          size="small"
          onChange={(e) => handleInputChange("email", e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "16px",
            },
          }}
        />
        <TextField
          fullWidth
          label="Create password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleInputChange("password", e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "16px",
            },
          }}
        />
      </MotionBox>,

      <MotionBox
        key="step2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          size="small"
          onChange={(e) => handleInputChange("phone", e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "16px",
            },
          }}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          size="small"
          multiline
          rows={2}
          onChange={(e) => handleInputChange("address", e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "16px",
            },
          }}
        />
        <FormControl fullWidth size="small">
          <InputLabel
            sx={{
              fontSize: "16px !important",
            }}
          >
            Country
          </InputLabel>
          <Select
            value={formData.country || ""}
            label="Country"
            onChange={(e) => handleInputChange("country", e.target.value)}
            IconComponent={LuChevronDown}
            sx={{
              "& .MuiSelect-select": {
                fontSize: "16px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  padding: "0px !important",
                  width: "auto",
                  minWidth: 200,
                  "& .MuiMenuItem-root": {
                    fontSize: "16px",
                  },
                },
              },
            }}
          >
            <MenuItem value="us">United States</MenuItem>
            <MenuItem value="uk">United Kingdom</MenuItem>
            <MenuItem value="ca">Canada</MenuItem>
            <MenuItem value="au">Australia</MenuItem>
          </Select>
        </FormControl>
      </MotionBox>,

      <MotionBox
        key="step3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={(e) =>
                  handleInputChange("emailNotifications", e.target.checked)
                }
                sx={{
                  color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                  "&.Mui-checked": {
                    color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
              />
            }
            label="Email notifications"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "16px",
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={(e) =>
                  handleInputChange("smsNotifications", e.target.checked)
                }
                sx={{
                  color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                  "&.Mui-checked": {
                    color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
              />
            }
            label="SMS notifications"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "16px",
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={(e) =>
                  handleInputChange("newsletter", e.target.checked)
                }
                sx={{
                  color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                  "&.Mui-checked": {
                    color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
              />
            }
            label="Newsletter subscription"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "16px",
              },
            }}
          />
        </Box>
        <TextField
          fullWidth
          label="Additional comments"
          multiline
          rows={3}
          variant="outlined"
          size="small"
          placeholder="Tell us how we can help you..."
          onChange={(e) => handleInputChange("comments", e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "16px",
            },
          }}
        />
      </MotionBox>,
    ];

    return (
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            mb: 1,
            textAlign: "center",
          }}
        >
          Create Account
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          Complete all steps to create your account
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Step {activeStep + 1} / {steps.length}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {steps[activeStep]}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / steps.length) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor:
                outerTheme.palette.mode === "dark" ? "grey.800" : "divider",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                backgroundColor:
                  outerTheme.palette.mode === "dark" ? "#fff" : "#000",
              },
            }}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {stepContent[activeStep]}
          </AnimatePresence>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <MotionButton
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<IoArrowBack />}
              variant="outlined"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              sx={{ order: { xs: 2, sm: 1 } }}
            >
              Back
            </MotionButton>

            <MotionButton
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              endIcon={
                activeStep === steps.length - 1 ? (
                  <IoCheckmark />
                ) : (
                  <IoArrowForward />
                )
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              sx={{ order: { xs: 1, sm: 2 } }}
            >
              {activeStep === steps.length - 1 ? "Complete" : "Continue"}
            </MotionButton>
          </Box>
        </form>
      </MotionPaper>
    );
  };

  const renderLoginForm = () => (
    <MotionPaper
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          mb: 1,
        }}
      >
        Welcome back
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        Sign in to your account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="Email address"
            type="email"
            variant="outlined"
            size="small"
            onChange={(e) => handleInputChange("email", e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleInputChange("password", e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                    "&.Mui-checked": {
                      color:
                        outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{
                color: outerTheme.palette.mode === "dark" ? "#fff" : "#000",
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />

            <Button
              variant="text"
              size="small"
              sx={{
                fontSize: "14px",
                minWidth: "auto",
                p: 0,
              }}
            >
              Forgot password?
            </Button>
          </Box>

          <MotionButton
            type="submit"
            variant="contained"
            fullWidth
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{ mt: 1 }}
          >
            Sign In
          </MotionButton>
        </Box>
      </form>

      <Typography
        variant="body2"
        textAlign="center"
        color="text.secondary"
        sx={{ mt: 3 }}
      >
        Don't have an account?{" "}
        <Button
          variant="text"
          size="small"
          sx={{
            fontSize: "14px",
            minWidth: "auto",
            p: 0,
          }}
        >
          Sign up
        </Button>
      </Typography>
    </MotionPaper>
  );

  const renderRegisterForm = () => (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            mb: 1,
          }}
        >
          Create an account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email below to create your account
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            placeholder="name@example.com"
            variant="outlined"
            size="medium"
            onChange={(e) => handleInputChange("email", e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "16px",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "16px",
              },
            }}
          />

          <MotionButton
            type="submit"
            variant="contained"
            fullWidth
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{
              fontSize: "15px !important",
            }}
          >
            Sign In with Email
          </MotionButton>

          <Box sx={{ position: "relative", my: 1 }}>
            <Divider
              sx={(theme) => ({
                "&::before, &::after": {
                  borderColor: theme.palette.divider,
                },
              })}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  px: 0.5,
                  fontWeight: 500,
                }}
              >
                OR CONTINUE WITH
              </Typography>
            </Divider>
          </Box>

          <MotionButton
            variant="outlined"
            fullWidth
            startIcon={<IoLogoGithub />}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{
              fontSize: "15px !important",
            }}
          >
            GitHub
          </MotionButton>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 1, lineHeight: 1.6 }}
          >
            By clicking continue, you agree to our{" "}
            <Typography
              component="a"
              variant="body2"
              sx={{
                textDecoration: "underline",
                color: "text.primary",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Terms of Service
            </Typography>{" "}
            and{" "}
            <Typography
              component="a"
              variant="body2"
              sx={{
                textDecoration: "underline",
                color: "text.primary",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Typography>
            .
          </Typography>
        </Box>
      </form>
    </MotionPaper>
  );

  const renderContactForm = () => (
    <MotionPaper
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          mb: 1,
          textAlign: "center",
        }}
      >
        Get in touch
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        Send us a message and we'll reply shortly.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              size="small"
              onChange={(e) => handleInputChange("name", e.target.value)}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "16px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              onChange={(e) => handleInputChange("email", e.target.value)}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "16px",
                },
              }}
            />
          </Box>

          <FormControl fullWidth size="small">
            <InputLabel
              sx={{
                fontSize: "16px !important",
              }}
            >
              Subject
            </InputLabel>
            <Select
              value={formData.subject || ""}
              label="Subject"
              onChange={(e) => handleInputChange("subject", e.target.value)}
              IconComponent={LuChevronDown}
              sx={{
                "& .MuiSelect-select": {
                  fontSize: "16px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    padding: "0px !important",
                    width: "auto",
                    minWidth: 200,
                    "& .MuiMenuItem-root": {
                      fontSize: "16px",
                    },
                  },
                },
              }}
            >
              <MenuItem value="general">General Inquiry</MenuItem>
              <MenuItem value="support">Support</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="feedback">Feedback</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            size="small"
            onChange={(e) => handleInputChange("message", e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
          />

          <MotionButton
            type="submit"
            variant="contained"
            fullWidth
            endIcon={<IoSend />}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{ mt: 1 }}
          >
            Send Message
          </MotionButton>
        </Box>
      </form>
    </MotionPaper>
  );

  const renderForm = () => {
    switch (variant) {
      case "multi-step":
        return renderMultiStepForm();
      case "login":
        return renderLoginForm();
      case "register":
        return renderRegisterForm();
      case "contact":
        return renderContactForm();
      default:
        return renderRegisterForm();
    }
  };

  return (
    <ThemeProvider theme={minimalTheme}>
      <AnimatePresence>
        {isLoaded && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {renderForm()}
          </MotionBox>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default FormVariants;
