import React from "react";
import { getAllDocsSlugs } from "@/lib/docs";
import HeroSection from "@/components/home/HeroSection";
import StargazersSection from "@/components/home/StargazersSection";
import FeaturesSection from "@/components/home/FeaturesSection";

const Home = ({ docsTree }) => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StargazersSection />
    </>
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
