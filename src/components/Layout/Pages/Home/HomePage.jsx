import React from "react";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import NewArrivals from "./New-Arrivals/NewArrivals";
import FooterBanner from "./FooterBanner/FooterBanner";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Explore from "./Explore/Explore";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Features />
      <NewArrivals />
      <FeaturedProducts />
      <Explore />
      <FooterBanner />
    </>
  );
};

export default HomePage;
