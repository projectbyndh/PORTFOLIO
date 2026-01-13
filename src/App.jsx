import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./components/Routing/Home";
import AboutUs from "./components/Aboutus";
import CaseStudies from "./components/CaseStudies";
import OurTeams from "./components/OurTeams";
import TeamMembers from "./components/TeamMembers";
import Contact from "./components/Contact";
import Careers from "./components/Carrers";
import EServicesEnhanced from "./components/EServices";
import CoursesSection from "./components/CoursesSection";

import BlogsDetails from "./components/BlogsDetails";
import BlogSection from "./components/Blogsection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";

// Admin Components
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import BlogEditor from "./components/BlogEditor";
import BlogManagement from "./pages/BlogManagement";
 
function App() {
 function ScrollToTop() {
 const { pathname } = useLocation();
 useEffect(() => {
 window.scrollTo(0, 0);
 }, [pathname]);
 return null;
 }

  // Component to conditionally render Navbar/Footer
  function LayoutWrapper({ children, showLayout = true }) {
    return (
      <>
        {showLayout && <Navbar />}
        {children}
        {showLayout && <Footer />}
      </>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader />}> 
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
        <Route path="/about-us" element={<LayoutWrapper><AboutUs /></LayoutWrapper>} />
        <Route path="/casestudy" element={<LayoutWrapper><CaseStudies /></LayoutWrapper>} />
        <Route path="/case-studies" element={<LayoutWrapper><CaseStudies /></LayoutWrapper>} />
        <Route path="/project-adda" element={<LayoutWrapper><CaseStudies /></LayoutWrapper>} />
        <Route path="/contact" element={<LayoutWrapper><Contact /></LayoutWrapper>} />
        
        {/* Normalize route casings for hosting and SEO */}
        <Route path="/careers" element={<LayoutWrapper><Careers /></LayoutWrapper>} />
        <Route path="/Careers" element={<Navigate to="/careers" replace />} />
        <Route path="/e-services" element={<LayoutWrapper><EServicesEnhanced /></LayoutWrapper>} />
        <Route path="/E-Services" element={<Navigate to="/e-services" replace />} />
        <Route path="/blog" element={<LayoutWrapper><BlogSection /></LayoutWrapper>} />
        <Route path="/blogdetails" element={<LayoutWrapper><BlogsDetails /></LayoutWrapper>} />
        <Route path="/courses" element={<LayoutWrapper><CoursesSection /></LayoutWrapper>} />
        <Route path="/privacy-policy" element={<LayoutWrapper><PrivacyPolicy /></LayoutWrapper>} />
        <Route path="/terms" element={<LayoutWrapper><Terms /></LayoutWrapper>} />
        <Route path="/team" element={<LayoutWrapper><TeamMembers /></LayoutWrapper>} />
        <Route path="/our-teams" element={<LayoutWrapper><OurTeams /></LayoutWrapper>} />
        
        {/* Admin Routes without Layout */}
        <Route path="/admin/login" element={<LayoutWrapper showLayout={false}><AdminLogin /></LayoutWrapper>} />
        <Route path="/admin/dashboard" element={<LayoutWrapper showLayout={false}><AdminDashboard /></LayoutWrapper>} />
        <Route path="/admin/blogs" element={<LayoutWrapper showLayout={false}><BlogManagement /></LayoutWrapper>} />
        <Route path="/admin/blog/create" element={<LayoutWrapper showLayout={false}><BlogEditor /></LayoutWrapper>} />
        <Route path="/admin/blog/edit/:id" element={<LayoutWrapper showLayout={false}><BlogEditor /></LayoutWrapper>} />
        
        {/* Catch-all to home for unknown routes in static hosting */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;