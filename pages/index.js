import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TabsSection from "@/components/home/TabsSection";
import StargazersSection from "@/components/home/StargazersSection";
import { getAllDocsSlugs } from "@/lib/docs";

const Home = ({ docsTree }) => {
  return (
    <>
      <HeroSection />
      <StargazersSection />
      <TabsSection />
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
