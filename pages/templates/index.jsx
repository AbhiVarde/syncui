import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "motion/react";
import { LuExternalLink, LuCheck } from "react-icons/lu";
import { RxCube } from "react-icons/rx";
import { getAllDocsSlugs } from "@/lib/docs";
import Head from "next/head";
import { NextSeo } from "next-seo";

const templatesData = [
  {
    id: "startup-template",
    title: "Startup Template",
    src: "/videos/Startup-Template.mov",
    price: 29,
    isNew: true,
    description:
      "All-in-one startup landing page with essential sections. Get a solid head start without building from scratch.",
    features: [
      "Hero, About, Process, Pricing, FAQ, CTA",
      "Top bar for announcements or offers",
      "Legal pages: Terms & Privacy included",
      "Multilingual support via Lingo.dev (en, es, fr, ru, de)",
      "Polished, production-ready components with smooth flow",
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
    description:
      "Launch your SaaS faster with a polished layout and smart sections built for conversion. Save 24+ hours of work.",
    features: [
      "Conversion-first layout with smooth transitions",
      "Ready-to-use sections: Features, Pricing, Contact",
      "Full policy pages included",
      "Scalable structure for product growth",
      "Clean, modular code built for easy edits",
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
    description:
      "Showcase your work with a sleek, animated portfolio. Designed to impress and ready to deploy, no setup hassle.",
    features: [
      "Home, Work, and Contact pages",
      "Dark/light toggle with fluid UX",
      "Project display with interactive cards",
      "Custom cursor and subtle effects",
      "Responsive layout with easy updates",
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
                  <RxCube size={18} style={{ color: "#fff" }} />
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
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 6 },
                alignItems: "center",
                my: { md: 5, sm: 3, xs: 2 },
              }}
            >
              <Box
                sx={{
                  flex: { md: "1 1 50%" },
                  width: { xs: "100%", md: "50%" },
                  order: {
                    xs: 2,
                    md: index % 2 === 0 ? 1 : 2,
                  },
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {template.title}
                    </Typography>

                    {template.isNew && (
                      <Box
                        component={motion.span}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                        sx={{
                          ml: 1,
                          px: 1,
                          py: 0.3,
                          bgcolor: "#008080",
                          color: "#ffffff",
                          borderRadius: "12px",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                          lineHeight: 1.25,
                          letterSpacing: "0.02em",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
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
                    transition={{ duration: 0.35, delay: 0.25 }}
                    variant="body1"
                    sx={{ color: alpha(theme.palette.text.primary, 0.8) }}
                  >
                    {template.description}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                    {template.features.map((feature, i) => (
                      <Box
                        component={motion.div}
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: 0.3 + i * 0.08,
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ mt: 0.5, flexShrink: 0, mr: 1 }}>
                          <LuCheck size={18} style={{ color: "teal" }} />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: alpha(theme.palette.text.primary, 0.8),
                          }}
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
                  flex: { md: "1 1 50%" },
                  width: { xs: "100%", md: "50%" },
                  order: {
                    xs: 1,
                    md: index % 2 === 0 ? 2 : 1,
                  },
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                  }}
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    width: "100%",
                    aspectRatio: "16/9",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: "24px",
                      background: "transparent",
                      overflow: "hidden",
                      zIndex: 0,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        height: "200%",
                        width: "200%",
                        background:
                          "conic-gradient(from 0deg, transparent 0 340deg, #00B5AD 360deg)",
                        animation: "rotate 5s linear infinite",
                      },
                      "@keyframes rotate": {
                        from: { transform: "rotate(0deg)" },
                        to: { transform: "rotate(360deg)" },
                      },
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: 2,
                      left: 2,
                      right: 2,
                      bottom: 2,
                      borderRadius: "20px",
                      bgcolor: isDarkMode ? "#111" : "#f8f9fa",
                      zIndex: 1,
                    }}
                  />

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                      padding: "4px",
                      boxSizing: "border-box",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: "18px",
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
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.25,
                  }}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    component="a"
                    href={template.accessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      padding: "6px 20px",
                      borderRadius: "12px",
                      background: (theme) =>
                        theme.palette.mode !== "light"
                          ? "linear-gradient(110deg, #fff 45%, #e4e4e7 55%, #fff)"
                          : "linear-gradient(110deg, #000 45%, #333 55%, #000)",
                      backgroundSize: "200% 100%",
                      animation: "shine 3s linear infinite",
                      color: (theme) =>
                        theme.palette.mode !== "light" ? "#000" : "#fff",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    Get Access ${template.price}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<LuExternalLink />}
                    component="a"
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      padding: "6px 20px",
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.primary",
                    }}
                  >
                    Live Preview
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
