import React from "react";
import dynamic from "next/dynamic";
import { getAllDocsSlugs } from "@/lib/docs";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";

const StargazersSection = dynamic(
  () => import("@/components/home/StargazersSection"),
  { ssr: false },
);

const Home = () => {
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
