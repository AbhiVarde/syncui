import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { getAllDocsSlugs } from "@/lib/docs";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { motion } from "motion/react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowRight01Icon,
  PackageIcon,
} from "@hugeicons/core-free-icons";

const templatesData = [
  {
    id: "startup-template",
    title: "Startup Template",
    src: "/videos/Startup-Template.mov",
    price: 29,
    isNew: true,
    description:
      "Complete startup landing page with all essential sections, ready to launch.",
    features: [
      "Hero, About, Process, Pricing, FAQ, CTA",
      "Announcement top bar",
      "Terms & Privacy pages included",
      "Multilingual support (Lingo.dev)",
      "Production-ready, polished UI",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/startup-template-syncui",
    demoUrl: "https://startup-syncui.vercel.app/",
  },
  {
    id: "saas-template",
    title: "SaaS Template",
    src: "/videos/SaaS-Template.mp4",
    price: 29,
    isNew: false,
    description: "Conversion-focused SaaS layout designed to ship faster.",
    features: [
      "Conversion-first structure",
      "Features, Pricing, Contact sections",
      "Policy pages included",
      "Scalable for product growth",
      "Clean, modular codebase",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/saas-template-syncui",
    demoUrl: "https://saas-syncui.vercel.app/",
  },
  {
    id: "portfolio-template",
    title: "Portfolio Template",
    src: "/videos/Portfolio-Template.mov",
    price: 29,
    isNew: false,
    description: "Modern animated portfolio built to showcase your work.",
    features: [
      "Home, Work, Contact pages",
      "Dark / light mode",
      "Interactive project cards",
      "Subtle motion & effects",
      "Fully responsive layout",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
    demoUrl: "https://portfolio-syncui.vercel.app/",
  },
];

const Templates = ({ docsTree }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <NextSeo
        title="Templates // Sync UI"
        description="Professional UI templates built with MUI & Motion (motion/react). Get startup, SaaS, and portfolio templates for your next project."
        canonical="https://www.syncui.design/templates"
        openGraph={{
          url: "https://www.syncui.design/templates",
          title: "Templates // Sync UI",
          description:
            "Professional UI templates built with MUI & Motion (motion/react). Get startup, SaaS, and portfolio templates for your next project.",
          images: [
            {
              url: "https://www.syncui.design/default-og-image.png",
              width: 1200,
              height: 630,
              alt: "Sync UI Templates",
            },
          ],
          siteName: "Sync UI",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@syncuidesign",
          creator: "@abhivarde",
        }}
      />
      <Head>
        <title>Templates // Sync UI</title>
      </Head>
      <Container maxWidth="xl" sx={{ px: "0px !important" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundImage: "radial-gradient(#9ca3af 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            py: 8,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: isDarkMode
                ? "rgba(0, 0, 0, 0.4)"
                : "transparent",
            }}
          />

          <Container
            maxWidth="md"
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: { md: 2, xs: 0 },
              }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: 14,
                    fontWeight: 500,
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(120deg, rgba(255,255,255,0.9) 30%, rgba(245,245,245,0.9) 100%)"
                        : "linear-gradient(120deg, rgba(30,30,30,0.9) 30%, rgba(50,50,50,0.9) 100%)",
                    border: "1px solid",
                    borderColor: "divider",
                    backdropFilter: "blur(4px)",
                    textTransform: "none",
                    color:
                      theme.palette.mode === "light" ? "#008080" : "#00B5AD",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    pointerEvents: "none",
                  }}
                >
                  Sync UI Templates
                </Button>
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{ fontWeight: 600, mt: 1 }}
                >
                  Premium UI templates for web applications
                </Typography>
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    maxWidth: "700px",
                    mt: 2,
                    lineHeight: 1.6,
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    Professionally designed, fully responsive UI templates built
                    with MUI and Framer Motion. Customize easily and enhance
                    your project instantly.
                  </Box>

                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    Responsive UI templates built with MUI & Framer Motion.
                    Customize and enhance your project instantly.
                  </Box>
                </Typography>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  window.open(
                    "https://abhivarde.gumroad.com/l/syncui-templates-bundle",
                    "_blank"
                  )
                }
                style={{
                  marginTop: "16px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #007B83, #00B5AD)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 14px rgba(0, 181, 173, 0.4)",
                    },
                  }}
                >
                  <HugeiconsIcon icon={PackageIcon} size={18} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    Bundle Offer: All 3 Templates for $79 (Save $8)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ display: { xs: "block", sm: "none" } }}
                  >
                    Bundle Offer: $79 (Save $8)
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="md" sx={{ px: { lg: 0 } }}>
          {templatesData.map((template, index) => (
            <Box
              key={template.id}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 6 },
                alignItems: "center",
                my: { xs: 3, md: 4 },
                p: { xs: 3, md: 4 },
              }}
            >
              <Box
                sx={{
                  flex: "1 1 50%",
                  width: { xs: "100%", md: "50%" },
                  order: { xs: 2, md: index % 2 === 0 ? 1 : 2 },
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h4" fontWeight={600}>
                      {template.title}
                    </Typography>

                    {template.isNew && (
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          px: 1,
                          py: 0.25,
                          borderRadius: 1.5,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          border: "1px solid",
                          borderColor: "divider",
                          color: "teal",
                          backgroundColor: "rgba(0,128,128,0.08)",
                        }}
                      >
                        New
                      </Box>
                    )}
                  </Box>

                  <Typography
                    component={motion.p}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    variant="body1"
                    sx={{ color: alpha(theme.palette.text.primary, 0.8) }}
                  >
                    {template.description}
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    {template.features.map((feature, i) => (
                      <Box
                        component={motion.div}
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1.5,
                        }}
                      >
                        <Box sx={{ mt: 0.5, mr: 1 }}>
                          <HugeiconsIcon
                            icon={Tick02Icon}
                            size={18}
                            style={{ color: "teal" }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: alpha(theme.palette.text.primary, 0.8) }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  flex: "1 1 50%",
                  width: { xs: "100%", md: "50%" },
                  order: { xs: 1, md: index % 2 === 0 ? 2 : 1 },
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    aspectRatio: "16/9",
                    backgroundColor: "background.default",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={template.src}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Button
                    variant="contained"
                    component="a"
                    href={template.accessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      flex: 1,
                      py: 0.5,
                      fontWeight: 500,
                      borderRadius: 1.5,
                      textTransform: "none",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    Get access · ${template.price}
                  </Button>

                  <Button
                    variant="text"
                    component="a"
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      flex: 1,
                      py: 0.5,
                      fontWeight: 500,
                      borderRadius: 1.5,
                      backgroundColor: "transparent",
                      textTransform: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "text.primary",
                      "&:hover .chevron": {
                        transform: "translateX(3px)",
                      },
                    }}
                  >
                    Live preview
                    <Box
                      className="chevron"
                      sx={{
                        display: "inline-flex",
                        transition: "transform 0.18s ease-out",
                      }}
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Container>
      </Container>
    </>
  );
};

export default Templates;

export async function getStaticProps() {
  const docsTree = await getAllDocsSlugs();

  return {
    props: {
      docsTree,
    },
  };
}
