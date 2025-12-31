import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  Stack,
} from "@mui/material";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  UserMultipleIcon,
  Rocket02Icon,
  Building02Icon,
  StarIcon,
  ShieldEnergyIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const PricingVariants = ({ variant = "threeTier" }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const baseWrapper = {
    backgroundColor: isDark ? "#000" : "#FFF",
    color: isDark ? "#FFF" : "#000",
    py: { xs: 8, md: 12 },
  };

  const renderPricing = () => {
    switch (variant) {
      case "threeTier": {
        const plans = [
          {
            name: "Starter",
            price: "Free",
            description: "For individuals getting started",
            features: [
              "Core platform access",
              "Custom domain",
              "Web editor",
              "API playground",
            ],
            icon: UserMultipleIcon,
            cta: "Get started",
            primary: false,
          },
          {
            name: "Pro",
            price: "$29",
            suffix: "/month",
            description: "For small teams shipping products",
            features: [
              "Everything in Starter",
              "Team collaboration",
              "Preview deployments",
              "Access control",
            ],
            icon: Rocket02Icon,
            cta: "Start free trial",
            primary: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For larger teams with advanced needs",
            features: [
              "Everything in Pro",
              "SSO & permissions",
              "Uptime SLA",
              "Priority support",
            ],
            icon: Building02Icon,
            cta: "Contact sales",
            primary: false,
          },
        ];

        return (
          <Box sx={baseWrapper}>
            <Container maxWidth="lg">
              <Header />

              <PricingGrid plans={plans} cardRadius={3} buttonRadius="999px" />
            </Container>
          </Box>
        );
      }

      case "twoTier": {
        const plans = [
          {
            name: "Basic",
            price: "$9",
            suffix: "/month",
            description: "Best for solo builders",
            features: [
              "Core platform access",
              "Custom domain",
              "Email support",
              "Basic analytics dashboard",
              "Community access",
            ],
            icon: StarIcon,
            cta: "Get started",
            primary: false,
          },
          {
            name: "Advanced",
            price: "$49",
            suffix: "/month",
            description: "For growing teams",
            features: [
              "Everything in Basic",
              "Team collaboration (up to 10 members)",
              "Advanced security & SSO",
              "Priority email & chat support",
              "Custom branding & white-labeling",
            ],
            icon: ShieldEnergyIcon,
            cta: "Start free trial",
            primary: true,
          },
        ];

        return (
          <Box sx={baseWrapper}>
            <Container maxWidth="md">
              <Header />

              <PricingGrid plans={plans} cardRadius={2} buttonRadius={1} />
            </Container>
          </Box>
        );
      }
      case "row": {
        const plans = [
          {
            name: "Starter",
            price: "Free",
            description: "For individuals getting started",
            features: [
              "Core platform access",
              "Custom domain",
              "Web editor",
              "API playground",
            ],
            icon: UserMultipleIcon,
            cta: "Get started",
            primary: false,
          },
          {
            name: "Pro",
            price: "$29",
            suffix: "/month",
            description: "For small teams shipping products",
            features: [
              "Everything in Starter",
              "Team collaboration",
              "Preview deployments",
              "Access control",
            ],
            icon: Rocket02Icon,
            cta: "Start free trial",
            primary: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For larger teams with advanced needs",
            features: [
              "Everything in Pro",
              "SSO & permissions",
              "Uptime SLA",
              "Priority support",
            ],
            icon: Building02Icon,
            cta: "Contact sales",
            primary: false,
          },
        ];

        return (
          <Box sx={baseWrapper}>
            <Container maxWidth="lg">
              <Header />
              <PricingRow plans={plans} />
            </Container>
          </Box>
        );
      }

      default:
        return null;
    }
  };

  return <Box sx={{ width: "100%" }}>{renderPricing()}</Box>;
};

export default PricingVariants;

const Header = () => (
  <Box textAlign="center" mb={7}>
    <Typography variant="h3" fontWeight={600} mb={1}>
      Simple pricing
    </Typography>
    <Typography
      variant="body1"
      sx={{ maxWidth: 520, mx: "auto", opacity: 0.65 }}
    >
      Clear plans designed to scale with your workflow.
    </Typography>
  </Box>
);

const PricingGrid = ({ plans, cardRadius, buttonRadius }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: `repeat(${plans.length}, 1fr)`,
        },
        gap: 3,
      }}
    >
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
        >
          <Box
            sx={{
              height: "100%",
              p: 4,
              borderRadius: cardRadius,
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s ease",
              "&:hover": {
                borderColor: isDark
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
              },
            }}
          >
            <Stack spacing={3} flex={1}>
              <Box textAlign="center">
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 1.25,
                    borderRadius: 2,
                    mb: 2,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  }}
                >
                  <HugeiconsIcon icon={plan.icon} size={24} />
                </Box>

                <Typography variant="h6" fontWeight={600}>
                  {plan.name}
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="h4" fontWeight={600}>
                  {plan.price}
                  {plan.suffix && (
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ ml: 0.5 }}
                    >
                      {plan.suffix}
                    </Typography>
                  )}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1, opacity: 0.65 }}>
                  {plan.description}
                </Typography>
              </Box>

              <Stack spacing={1.25}>
                {plan.features.map((feature) => (
                  <Stack
                    key={feature}
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                  >
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                    <Typography variant="body2">{feature}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Box mt="auto" pt={3}>
                <Button
                  fullWidth
                  variant={plan.primary ? "contained" : "text"}
                  sx={{
                    py: 0.6,
                    borderRadius: buttonRadius,
                    fontWeight: 500,
                    textTransform: "none",
                    backgroundColor: plan.primary
                      ? isDark
                        ? "#FFF"
                        : "#000"
                      : "transparent",
                    color: plan.primary
                      ? isDark
                        ? "#000"
                        : "#FFF"
                      : "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover .arrow": {
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {plan.cta}
                  <Box
                    className="arrow"
                    sx={{
                      display: "inline-flex",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </Box>
                </Button>
              </Box>
            </Stack>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

const PricingRow = ({ plans }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Stack spacing={2}>
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 3fr 1.5fr",
              },
              gap: 3,
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.12)",
              alignItems: "center",
            }}
          >
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <HugeiconsIcon icon={plan.icon} size={22} />
                <Typography fontWeight={600}>{plan.name}</Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.65, mt: 0.5 }}>
                {plan.description}
              </Typography>
            </Box>

            <Stack spacing={0.75}>
              {plan.features.slice(0, 3).map((feature) => (
                <Stack
                  key={feature}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                  <Typography variant="body2">{feature}</Typography>
                </Stack>
              ))}
            </Stack>

            <Box
              textAlign={{ xs: "center", md: "right" }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "column" },
                alignItems: { xs: "center", md: "flex-end" },
              }}
            >
              <Typography fontWeight={600}>
                {plan.price}
                {plan.suffix && (
                  <Typography component="span" variant="body2">
                    {plan.suffix}
                  </Typography>
                )}
              </Typography>

              <Button
                variant={plan.primary ? "contained" : "text"}
                sx={{
                  mt: 1,
                  py: 0.9,
                  px: 1.8,
                  borderRadius: "999px",
                  fontWeight: 500,
                  textTransform: "none",
                  minHeight: 36,
                  lineHeight: 1.2,
                  fontSize: "15px !important",

                  backgroundColor: plan.primary
                    ? isDark
                      ? "#FFF"
                      : "#000"
                    : "transparent",
                  color: plan.primary ? (isDark ? "#000" : "#FFF") : "inherit",

                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,

                  "&:hover .arrow": {
                    transform: "translateX(4px)",
                  },
                }}
                endIcon={
                  <Box
                    className="arrow"
                    sx={{
                      display: "inline-flex",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </Box>
                }
              >
                {plan.cta}
              </Button>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Stack>
  );
};
