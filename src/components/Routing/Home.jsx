import First from "../First";
import Testimonails from "../Testimonails";
import Services from "../Services";
import NepalMap from "../NepalMap";
import WWW from "../WWW";
import React from "react";
import Footer from "../Footer";
import Refer from "../Refer";
import AboutUs from "../Aboutus";
import Blogsection from "../Blogsection";
import CompaniesSection from "../CompaniesSection";


function Home() {
  return (
    <>
      <First />
      <Services />
      <CompaniesSection />
      <NepalMap />
      <Refer />
            <Testimonails />

      <Blogsection />
      <Footer />
    </>
  );
}

export default Home