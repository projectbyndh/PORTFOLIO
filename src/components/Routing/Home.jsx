import First from "../First";
import Testimonails from "../Testimonails";
import Services from "../Services";
import NepalMap from "../NepalMap";
import WWW from "../WWW";
import React from "react";
import Refer from "../Refer";
import AboutUs from "../Aboutus";
import Blogsection from "../Blogsection";
import CompaniesSection from "../CompaniesSection";
import PartnersSection from "../PartnersSection";


function Home() {
  return (
    <>
      <First />
      <Services />
      <PartnersSection />
      <NepalMap />
      <Refer />
      <Testimonails />

      <Blogsection />
    </>
  );
}

export default Home