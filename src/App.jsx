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
import Messages from "./admin/Messages";
import AdminCompanies from "./admin/AdminCompanies";
import AdminCourses from "./admin/AdminCourses";
import CoursesSection from "./components/CoursesSection";

import BlogsDetails from "./components/BlogsDetails";
import BlogSection from "./components/Blogsection";
import ProtectedRoute from "./admin/ProtectedRoute";
import Login from "./admin/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import Sitemap from "./components/Sitemap";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-blog" element={<AdminBlogPanel />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/casestudy" element={<CaseStudies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/E-Services" element={<EServicesEnhanced />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/blogdetails" element={<BlogsDetails />} />
        <Route path="/courses" element={<CoursesSection />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;