import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TabsSection from "@/components/home/TabsSection";
import StargazersSection from "@/components/home/StargazersSection";
import { motion } from "framer-motion";
import { getAllDocsSlugs } from "@/lib/docs";

const Home = ({ docsTree }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StargazersSection />
      <TabsSection />
    </motion.div>
  );
};

export default Home;

export async function getStaticProps() {
  const docsTree = await getAllDocsSlugs();

  return {
    props: {
      docsTree,
    },
  };
}
