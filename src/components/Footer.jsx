"use client";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, ChevronRight, Send } from "lucide-react";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-linear-to-br from-[#1A2A44] via-[#2A4066] to-[#3B5488] pt-20 pb-8 px-4 sm:px-6 overflow-hidden font-sans">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-8 w-64 h-64 rounded-full bg-linear-to-br from-[#4A8EBC]/15 to-[#2DD4BF]/10 animate-float blur-2xl"></div>
        <div className="absolute bottom-20 right-8 w-80 h-80 rounded-full bg-linear-to-br from-[#3B5488]/15 to-[#8B5CF6]/10 animate-float blur-2xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-linear-to-br from-[#F59E0B]/10 to-[#EF4444]/8 animate-float blur-xl" style={{animationDelay: '4s'}}></div>

        {/* Animated Dots */}
        <div className="w-2 h-2 bg-[#4A8EBC] rounded-full absolute top-1/4 left-1/3 animate-bounce"></div>
        <div className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full absolute bottom-1/3 right-1/4 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="w-1 h-1 bg-[#8B5CF6] rounded-full absolute top-1/2 left-1/5 animate-bounce" style={{animationDelay: '2s'}}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-8 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      </div>

      {/* Top Gradient Border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#4A8EBC] via-[#2DD4BF] to-[#8B5CF6]"></div>

      <div className="container relative z-10 grid grid-cols-1 gap-12 mx-auto md:grid-cols-2 lg:grid-cols-4">
        {/* Enhanced Company Info */}
        <div className="space-y-6 animate-slide-in-left">
          <div className="flex items-center gap-4 group">
            <div className="p-2 rounded-2xl bg-linear-to-br from-[#4A8EBC]/20 to-[#2DD4BF]/20 group-hover:scale-110 transition-transform duration-300">
              <Logo className="w-auto h-12" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-linear-to-r from-[#4A8EBC] via-[#2DD4BF] to-white bg-clip-text">
                Nepal Digital Heights
              </h2>
              <p className="text-sm text-[#4A8EBC] font-medium">Technologies</p>
            </div>
          </div>

          <p className="max-w-xs text-gray-300 leading-relaxed">
            Innovating technology solutions for a sustainable future. We deliver cutting-edge digital experiences that drive your business forward.
          </p>

          <div className="space-y-4">
            {[
              { icon: MapPin, text: "Tilottama, Nepal", color: "from-[#4A8EBC] to-[#3B5488]" },
              { icon: Phone, text: "+977 9857089898", color: "from-[#2DD4BF] to-[#8B5CF6]" },
              { icon: Mail, text: "support@ndhtechnologies.com", color: "from-[#8B5CF6] to-[#F59E0B]" },
              { icon: Globe, text: "www.ndhtechnologies.com", href: "https://www.ndhtechnologies.com", color: "from-[#F59E0B] to-[#EF4444]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center group hover:scale-105 transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <item.icon size={16} className="text-white" />
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {item.href ? (
                    <a href={item.href} className="hover:underline">{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Links */}
        <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="relative inline-block mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Quick Links
            </h3>
            <div className="w-12 h-1 bg-linear-to-r from-[#4A8EBC] to-[#2DD4BF] rounded-full"></div>
          </div>
          <ul className="space-y-4">
            {[
              { name: "About Us", url: "/about-us" },
              { name: "E-Services", url: "/E-Services" },
              { name: "Case Studies", url: "/case-studies" },
              { name: "Careers", url: "/careers" },
              { name: "Contact", url: "/contact" },
              { name: "Our Teams", url: "/our-teams" },
            ].map((link, idx) => (
              <li key={link.name}>
                <Link
                  to={link.url}
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                  aria-label={`Navigate to ${link.name}`}
                >
                  <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#4A8EBC]/0 to-[#4A8EBC]/0 group-hover:from-[#4A8EBC]/20 group-hover:to-[#2DD4BF]/20 flex items-center justify-center mr-3 transition-all duration-300">
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Enhanced Newsletter & Social */}
        <div className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>
          <div className="relative inline-block mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Stay Connected
            </h3>
            <div className="w-12 h-1 bg-linear-to-r from-[#8B5CF6] to-[#F59E0B] rounded-full"></div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Subscribe for the latest updates, insights, and exclusive content from our team.
          </p>

          <form className="relative mb-8">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent transition-all duration-300 text-sm"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-linear-to-r from-[#4A8EBC] to-[#2DD4BF] hover:from-[#2DD4BF] hover:to-[#8B5CF6] text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Subscribe to newsletter"
              >
                <span className="hidden sm:inline mr-2 text-sm font-medium">Subscribe</span>
                <Send size={16} />
              </button>
            </div>
          </form>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, name: "Facebook", href: "http://Facebook.com/techbyndh", color: "from-[#1877F2] to-[#42A5F5]" },
                { icon: Instagram, name: "Instagram", href: "http://Instagram.com/techbyndh", color: "from-[#E4405F] to-[#F77737]" },
                { icon: Twitter, name: "Twitter", href: "https://twitter.com/techbyndh", color: "from-[#1DA1F2] to-[#42A5F5]" },
                { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com/company/techbyndh", color: "from-[#0077B5] to-[#42A5F5]" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group`}>
                
                  <social.icon size={20} className="text-white group-hover:animate-bounce" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Services Preview */}
        <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="relative inline-block mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Our Services
            </h3>
            <div className="w-12 h-1 bg-linear-to-r from-[#F59E0B] to-[#EF4444] rounded-full"></div>
          </div>

          <div className="space-y-4">
            {[
              "Web Development",
              "Mobile Apps",
              "Digital Marketing",
              "UI/UX Design",
              "Cloud Solutions",
              "IT Consulting"
            ].map((service, idx) => (
              <div key={service} className="flex items-center group">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-[#4A8EBC] to-[#2DD4BF] mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                  {service}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-xs text-gray-400 mb-2">Ready to get started?</p>
            <Link
              to="/contact"
              className="inline-block w-full px-4 py-2 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#1A2A44] text-white text-sm font-medium rounded-xl text-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <div className="container mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col gap-6 sm:flex-row justify-between items-center text-gray-300 text-sm relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span>© {currentYear} Nepal Digital Heights. All rights reserved.</span>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <span className="text-white/50">•</span>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            <span className="text-white/50">•</span>
            <Link to="/admin/login" className="hover:text-[#4A8EBC] transition-colors duration-300 flex items-center gap-1">
              <span>Admin</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>Made with ❤️ in Nepal</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-[#4A8EBC] rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-[#2DD4BF] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;