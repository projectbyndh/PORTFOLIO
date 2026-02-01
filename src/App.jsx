import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
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
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import BlogEditor from "./components/BlogEditor";
import BlogManagement from "./pages/BlogManagement";
import CareerManagement from "./pages/CareerManagement";
import PartnerManagement from "./pages/PartnerManagement";
import TeamManagement from "./pages/TeamManagement";
import ProjectManagement from "./pages/ProjectManagement";
import ServiceManagement from "./pages/ServiceManagement";
import FAQManagement from "./pages/FAQManagement";
import ContactManagement from "./pages/ContactManagement";
import ContactInfoManagement from "./pages/ContactInfoManagement";
import Partners from "./components/Partners";

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
          <Route path="/partners" element={<LayoutWrapper><Partners /></LayoutWrapper>} />
          <Route path="/Partners" element={<Navigate to="/partners" replace />} />
          <Route path="/e-services" element={<LayoutWrapper><EServicesEnhanced /></LayoutWrapper>} />
          <Route path="/E-Services" element={<Navigate to="/e-services" replace />} />
          <Route path="/blog" element={<LayoutWrapper><BlogSection /></LayoutWrapper>} />
          <Route path="/blogdetails" element={<LayoutWrapper><BlogsDetails /></LayoutWrapper>} />
          <Route path="/courses" element={<LayoutWrapper><CoursesSection /></LayoutWrapper>} />
          <Route path="/privacy-policy" element={<LayoutWrapper><PrivacyPolicy /></LayoutWrapper>} />
          <Route path="/terms" element={<LayoutWrapper><Terms /></LayoutWrapper>} />
          <Route path="/team" element={<LayoutWrapper><TeamMembers /></LayoutWrapper>} />
          <Route path="/our-teams" element={<LayoutWrapper><OurTeams /></LayoutWrapper>} />

          {/* Admin Routes - Login without layout */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes with shared AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="careers" element={<CareerManagement />} />
            <Route path="partners" element={<PartnerManagement />} />
            <Route path="teams" element={<TeamManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="faqs" element={<FAQManagement />} />
            <Route path="contacts" element={<ContactManagement />} />
            <Route path="contact-info" element={<ContactInfoManagement />} />
            <Route path="blog/create" element={<BlogEditor />} />
            <Route path="blog/edit/:id" element={<BlogEditor />} />
          </Route>

          {/* Catch-all to home for unknown routes in static hosting */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;