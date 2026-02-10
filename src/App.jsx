import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
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
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import AdminLogin from "./components/AdminLogin";
import AdminDashboardNew from "./components/admin/AdminDashboardNew";
import AdminPartners from "./components/admin/AdminPartners";
import AdminTeam from "./components/admin/AdminTeam";
import AdminProjects from "./components/admin/AdminProjects";
import AdminServices from "./components/admin/AdminServices";
import BlogEditor from "./components/BlogEditor";
import BlogManagement from "./pages/BlogManagement";
import CareerManagement from "./pages/CareerManagement";
import CareerApplicationsManagement from "./pages/CareerApplicationsManagement";
import FAQManagement from "./pages/FAQManagement";
import ContactManagement from "./pages/ContactManagement";
import ContactInfoManagement from "./pages/ContactInfoManagement";
import Partners from "./components/Partners";
import TestimonialManagement from "./pages/TestimonialManagement";
import CategoryManagement from "./pages/CategoryManagement";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {


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
          <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/about-us" element={<LayoutWrapper><AboutUs /></LayoutWrapper>} />
          <Route path="/case-studies" element={<LayoutWrapper><CaseStudies /></LayoutWrapper>} />
          <Route path="/casestudy" element={<Navigate to="/case-studies" replace />} />
          <Route path="/project-adda" element={<Navigate to="/case-studies" replace />} />
          <Route path="/contact" element={<LayoutWrapper><Contact /></LayoutWrapper>} />
          <Route path="/careers" element={<LayoutWrapper><Careers /></LayoutWrapper>} />
          <Route path="/services" element={<LayoutWrapper><EServicesEnhanced /></LayoutWrapper>} />
          <Route path="/blog" element={<LayoutWrapper><BlogSection /></LayoutWrapper>} />
          <Route path="/blog-details" element={<LayoutWrapper><BlogsDetails /></LayoutWrapper>} />
          <Route path="/courses" element={<LayoutWrapper><CoursesSection /></LayoutWrapper>} />
          <Route path="/privacy-policy" element={<LayoutWrapper><PrivacyPolicy /></LayoutWrapper>} />
          <Route path="/terms" element={<LayoutWrapper><Terms /></LayoutWrapper>} />
          <Route path="/team" element={<LayoutWrapper><TeamMembers /></LayoutWrapper>} />
          <Route path="/our-teams" element={<LayoutWrapper><OurTeams /></LayoutWrapper>} />

          <Route path="/About-Us" element={<Navigate to="/about-us" replace />} />
          <Route path="/Careers" element={<Navigate to="/careers" replace />} />
          <Route path="/e-services" element={<Navigate to="/services" replace />} />
          <Route path="/E-Services" element={<Navigate to="/services" replace />} />
          <Route path="/Services" element={<Navigate to="/services" replace />} />
          <Route path="/partners" element={<LayoutWrapper><Partners /></LayoutWrapper>} />
          <Route path="/Partners" element={<Navigate to="/partners" replace />} />
          <Route path="/Blog" element={<Navigate to="/blog" replace />} />
          <Route path="/blogdetails" element={<Navigate to="/blog-details" replace />} />
          <Route path="/Team" element={<Navigate to="/team" replace />} />
          <Route path="/Our-Teams" element={<Navigate to="/our-teams" replace />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardNew /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><BlogManagement /></ProtectedRoute>} />
          <Route path="/admin/careers" element={<ProtectedRoute><CareerManagement /></ProtectedRoute>} />
          <Route path="/admin/career-applications" element={<ProtectedRoute><CareerApplicationsManagement /></ProtectedRoute>} />
          <Route path="/admin/partners" element={<ProtectedRoute><AdminPartners /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/faqs" element={<ProtectedRoute><FAQManagement /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><ContactManagement /></ProtectedRoute>} />
          <Route path="/admin/contact-info" element={<ProtectedRoute><ContactInfoManagement /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialManagement /></ProtectedRoute>} />
          <Route path="/admin/blog/create" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
