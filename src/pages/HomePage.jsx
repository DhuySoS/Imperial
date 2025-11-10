import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import React from "react";
import PopularCard from "@/components/card/PopularCard";
import FeaturedApartments from "@/components/home/FeaturedApartments";

function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <div className="h-40"></div>
      <PopularCard />
      <FeaturedApartments />
    </div>
  );
}

export default HomePage;
