import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/Routing/Home";
import AboutUs from "./components/Aboutus";
import CaseStudies from "./components/Case";
import Contact from "./components/Contact";
import Careers from "./components/Carrers";
import EServicesEnhanced from "./components/EServices";
import Dashboard from "./admin/Dashboard";
import AdminBlogPanel from "./admin/Blogadmin";
import BlogsDetails from "./components/BlogsDetails";
import BlogSection from "./components/Blogsection";
import ProtectedRoute from "./admin/ProtectedRoute";
import Login from "./admin/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-blog" element={<AdminBlogPanel />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/casestudy" element={<CaseStudies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/E-Services" element={<EServicesEnhanced />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/blogdetails" element={<BlogsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;