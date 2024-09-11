import React from "react";
import { motion } from "framer-motion";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Head from "next/head";

const templateData = [
  {
    title: "Modern Portfolio",
    description: "Showcase your best work with our sleek, responsive design.",
    price: "$49",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Intuitive Dashboard",
    description:
      "Manage your data effortlessly with our user-friendly interface.",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Conversion Optimizer",
    description: "Boost your conversions with our high-impact landing page.",
    price: "$39",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "E-commerce Suite",
    description: "Launch your online store with our comprehensive solution.",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const TemplateCard = ({ title, description, price, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {price}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ borderRadius: 1, py: 1, mb: 1 }}
            >
              Live Preview
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 1, py: 1 }}
            >
              Get Started
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TemplatesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Head>
        <title>Templates</title>
      </Head>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant={isMobile ? "h3" : "h2"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Elevate Your Online Presence
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              color="text.secondary"
              sx={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Choose from our curated selection of professional templates and
              launch your project in minutes.
            </Typography>
          </motion.div>
        </Box>
        <Grid container spacing={3}>
          {templateData.map((template, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <TemplateCard {...template} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TemplatesPage;
