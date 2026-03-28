import React from "react";
import { Container, Typography, Box, Button, useTheme } from "@mui/material";
import { getAllDocsSlugs } from "@/lib/docs";
import Head from "next/head";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, PackageIcon } from "@hugeicons/core-free-icons";

const templatesData = [
  {
    id: "startup-template",
    title: "Startup Template",
    src: "/videos/templates/startup.mov",
    price: 29,
    description:
      "Complete landing page with all essential sections, ready to ship.",
    features: [
      "Hero · About · Pricing · FAQ · CTA",
      "Announcement bar included",
      "Terms & Privacy pages",
      "Multilingual via Lingo.dev",
      "Production-ready",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/startup-template-syncui",
    demoUrl: "https://startup-syncui.vercel.app/",
  },
  {
    id: "saas-template",
    title: "SaaS Template",
    src: "/videos/templates/saas.mp4",
    price: 29,
    description: "Conversion-focused layout built to ship your SaaS faster.",
    features: [
      "Features · Pricing · Contact",
      "Conversion-first structure",
      "Policy pages included",
      "Scalable & modular codebase",
      "Clean, minimal design",
    ],
    accessUrl: "https://abhivarde.gumroad.com/l/saas-template-syncui",
    demoUrl: "https://saas-syncui.vercel.app/",
  },
  {
    id: "portfolio-template",
    title: "Portfolio Template",
    src: "/videos/templates/portfolio.mov",
    price: 29,
    description: "Animated portfolio designed to make your work stand out.",
    features: [
      "Home · Work · Contact",
      "Dark & light mode",
      "Animated project cards",
      "Motion & scroll effects",
      "Fully responsive",
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
      <Head>
        <title>Templates // Sync UI</title>
        <meta
          name="description"
          content="Get premium React UI templates for $29 each. Includes Startup, SaaS, and Portfolio templates built with MUI and Motion (motion/react). Production-ready, fully customizable, and perfect for Next.js projects. Bundle offer: All 3 for $79."
        />
        <link rel="canonical" href="https://www.syncui.design/templates" />
        <meta
          name="keywords"
          content="React templates, premium templates, MUI templates, SaaS template, startup template, portfolio template, Next.js templates, Motion templates, paid UI templates"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.syncui.design/templates" />
        <meta property="og:site_name" content="Sync UI" />
        <meta
          property="og:title"
          content="Premium React Templates - Startup, SaaS & Portfolio | Sync UI"
        />
        <meta
          property="og:description"
          content="Production-ready React templates built with MUI & Motion. Startup, SaaS, and Portfolio templates starting at $29. Bundle: All 3 for $79."
        />
        <meta
          key="og-image"
          property="og:image"
          content="https://www.syncui.design/images/open-graph/template-image.png"
        />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content="Sync UI Premium React Templates"
        />
        <meta
          key="og-image-type"
          property="og:image:type"
          content="image/png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@syncuidesign" />
        <meta name="twitter:creator" content="@abhivarde" />
        <meta
          name="twitter:title"
          content="Premium React Templates - Startup, SaaS & Portfolio | Sync UI"
        />
        <meta
          name="twitter:description"
          content="Production-ready React templates built with MUI & Motion. Startup, SaaS, and Portfolio templates starting at $29."
        />
        <meta
          key="tw-image"
          name="twitter:image"
          content="https://www.syncui.design/images/open-graph/template-image.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Sync UI Premium Templates",
              description:
                "Production-ready React templates including Startup, SaaS, and Portfolio templates",
              brand: { "@type": "Brand", name: "Sync UI" },
              offers: [
                {
                  "@type": "Offer",
                  name: "Startup Template",
                  price: "29",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/startup-template-syncui",
                },
                {
                  "@type": "Offer",
                  name: "SaaS Template",
                  price: "29",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/saas-template-syncui",
                },
                {
                  "@type": "Offer",
                  name: "Portfolio Template",
                  price: "29",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
                },
                {
                  "@type": "Offer",
                  name: "Templates Bundle",
                  price: "79",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://abhivarde.gumroad.com/l/syncui-templates-bundle",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.syncui.design/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Templates",
                  item: "https://www.syncui.design/templates",
                },
              ],
            }),
          }}
        />
      </Head>

      <Container maxWidth="xl" sx={{ px: "0px !important" }}>
        <Box
          sx={{
            width: "100%",
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
              inset: 0,
              backgroundColor: isDarkMode ? "rgba(0,0,0,0.4)" : "transparent",
            }}
          />
          <Container
            maxWidth="md"
            sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
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
                    fontWeight: 500,
                    background: isDarkMode
                      ? "linear-gradient(120deg, rgba(30,30,30,0.9) 30%, rgba(50,50,50,0.9) 100%)"
                      : "linear-gradient(120deg, rgba(255,255,255,0.9) 30%, rgba(245,245,245,0.9) 100%)",
                    border: "1px solid",
                    borderColor: "divider",
                    backdropFilter: "blur(4px)",
                    textTransform: "none",
                    color: isDarkMode ? "#00B5AD" : "#008080",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
                  fontWeight={500}
                  sx={{ mt: 1 }}
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
                  fontWeight={400}
                  sx={{ maxWidth: "700px", mt: 2, lineHeight: 1.6 }}
                >
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    Professionally designed, fully responsive UI templates built
                    with MUI and Motion. Customize easily and enhance your
                    project instantly.
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    Responsive UI templates built with MUI & Motion. Customize
                    and ship instantly.
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
                    "_blank",
                  )
                }
                style={{ marginTop: "16px", cursor: "pointer" }}
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
                    "&:hover": { boxShadow: "0 4px 14px rgba(0,181,173,0.4)" },
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

        <Container maxWidth="md" sx={{ px: { lg: 0 }, pb: 10 }}>
          {templatesData.map((template, index) => (
            <Box
              key={template.id}
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                my: { xs: 2, md: 3 },
                borderRadius: "20px",
                backgroundColor: isDarkMode ? "#0a0a0a" : "#fff",
                border: "1px solid",
                borderColor: isDarkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" },
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  gap: { xs: 2.5, lg: 4 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2.5,
                    order: { xs: 2, lg: 1 },
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={500}
                        sx={{
                          color: isDarkMode ? "#fff" : "#0a0a0a",
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {template.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={400}
                        sx={{
                          color: isDarkMode
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.2)",
                        }}
                      >
                        {index + 1}/{templatesData.length}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      fontWeight={400}
                      sx={{
                        color: isDarkMode
                          ? "rgba(255,255,255,0.45)"
                          : "rgba(0,0,0,0.45)",
                        lineHeight: 1.65,
                      }}
                    >
                      {template.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.85,
                      }}
                    >
                      {template.features.map((feature, i) => (
                        <Box
                          key={i}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={400}
                            sx={{
                              color: isDarkMode
                                ? "rgba(255,255,255,0.2)"
                                : "rgba(0,0,0,0.2)",
                              lineHeight: 1,
                              flexShrink: 0,
                            }}
                          >
                            →
                          </Typography>
                          <Typography
                            variant="caption"
                            fontWeight={400}
                            sx={{
                              color: isDarkMode
                                ? "rgba(255,255,255,0.38)"
                                : "rgba(0,0,0,0.38)",
                              lineHeight: 1.5,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      component="a"
                      href={template.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: isDarkMode ? "#fff" : "#0a0a0a",
                        textDecoration: "none",
                        letterSpacing: "-0.01em",
                        transition: "opacity 0.15s ease",
                        "&:hover": { opacity: 0.45 },
                      }}
                    >
                      Access · ${template.price}
                      <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                    </Typography>

                    <Box
                      sx={{
                        width: "1px",
                        height: "11px",
                        flexShrink: 0,
                        backgroundColor: isDarkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      }}
                    />

                    <Typography
                      variant="body2"
                      fontWeight={400}
                      component="a"
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: isDarkMode
                          ? "rgba(255,255,255,0.28)"
                          : "rgba(0,0,0,0.28)",
                        textDecoration: "none",
                        transition: "opacity 0.15s ease",
                        "&:hover": { opacity: 0.65 },
                      }}
                    >
                      Preview
                      <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ order: { xs: 1, lg: 2 }, width: "100%" }}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    sx={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      aspectRatio: "16/9",
                      width: "100%",
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0",
                      border: "1px solid",
                      borderColor: isDarkMode
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.06)",
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
                        display: "block",
                      }}
                    />
                  </Box>
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
  return { props: { docsTree } };
}
