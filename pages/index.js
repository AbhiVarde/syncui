import React from "react";
import HeroSection from "../components/home/HeroSection";
import TabsSection from "@/components/home/TabsSection";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <TabsSection />
    </motion.div>
  );
};

export default Home;
