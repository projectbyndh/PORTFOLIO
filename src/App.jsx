import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Routing/Home";
import AboutUs from "./components/Aboutus";
import CaseStudies from "./components/Case";
import Contact from "./components/Contact";
import Careers from "../src/components/Carrers";
import EServicesEnhanced from "./components/EServices";
function App() {
  return (
    <>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/casestudy" element={<CaseStudies />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/Careers" element={<Careers />} />
    <Route path="/E-Services" element={<EServicesEnhanced />} />
  </Routes>
</BrowserRouter>
    </>
  );
}

export default App;
