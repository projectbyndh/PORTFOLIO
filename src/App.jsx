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
import PremiumLoadingBar from "./components/PremiumLoadingBar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";

// Admin Components
import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardNew from "./components/admin/AdminDashboardNew";
import AdminPartners from "./components/admin/AdminPartners";
import AdminTeam from "./components/admin/AdminTeam";
import AdminProjects from "./components/admin/AdminProjects";
import AdminServices from "./components/admin/AdminServices";
import BlogEditor from "./components/BlogEditor";
import BlogManagement from "./pages/BlogManagement";
import CareerManagement from "./pages/CareerManagement";
import FAQManagement from "./pages/FAQManagement";
import ContactManagement from "./pages/ContactManagement";
import ContactInfoManagement from "./pages/ContactInfoManagement";
import Partners from "./components/Partners";
import TestimonialManagement from "./pages/TestimonialManagement";

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
      <PremiumLoadingBar />
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
          {/* Admin Routes - No layout wrapper needed, each component has AdminLayout */}
          <Route path="/admin/dashboard" element={<AdminDashboardNew />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/careers" element={<CareerManagement />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/faqs" element={<FAQManagement />} />
          <Route path="/admin/contacts" element={<ContactManagement />} />
          <Route path="/admin/contact-info" element={<ContactInfoManagement />} />
          <Route path="/admin/testimonials" element={<TestimonialManagement />} />
          <Route path="/admin/blog/create" element={<BlogEditor />} />
          <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />

          {/* Catch-all to home for unknown routes in static hosting */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;