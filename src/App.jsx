import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Routing/Home";
import AboutUs from "./components/Aboutus";
import CaseStudies from "./components/Case";
import Contact from "./components/Contact";
import Careers from "../src/components/Carrers";
import EServicesEnhanced from "./components/EServices"; 
import Dashboard from "./admin/Dashboard";
import AdminBlogPanel from "./admin/Blogadmin";
import BlogsDetails from "./components/BlogsDetails";
function App() {
  return (
    <>
<BrowserRouter>
  <Routes>
    <Route path="/admin/*" element={<Dashboard />} />
    <Route path="/admin/add-blog" element={<AdminBlogPanel />} />
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/casestudy" element={<CaseStudies />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/Careers" element={<Careers />} />
    <Route path="/E-Services" element={<EServicesEnhanced />} />
    <Route path="/blog" element={<blogsection />} />
    <Route path="/blogdetails" element={<BlogsDetails />} />
  </Routes>
</BrowserRouter>
    </>
  );
}

export default App;
