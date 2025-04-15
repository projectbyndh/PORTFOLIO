import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Routing/Home";
import AboutUs from "./components/Aboutus";
import CaseStudies from "./components/Case";
import Contact from "./components/Contact";
import EServices from "../src/components/EServices";
import Carrers from "../src/components/Carrers";
function App() {
  return (
    <>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/casestudy" element={<CaseStudies />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/carrers" element={<Carrers />} />
    <Route path="/eservices" element={<EServices />} />
  </Routes>
</BrowserRouter>
    </>
  );
}

export default App;
