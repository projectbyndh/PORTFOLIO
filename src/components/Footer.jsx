"use client";
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, ChevronRight, Send } from "lucide-react";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1A2A44] via-[#2A4066] to-[#3B5488] pt-16 pb-8 px-4 sm:px-6 overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:30px_30px]"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 w-48 h-48 rounded-full bg-[#4A8EBC]/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-8 w-72 h-72 rounded-full bg-[#3B5488]/10 animate-pulse"></div>
        <div className="w-1.5 h-1.5 bg-[#4A8EBC] rounded-full absolute top-1/4 left-1/3 animate-float"></div>
        <div className="w-2 h-2 bg-[#3B6D9C] rounded-full absolute bottom-1/3 right-1/4 animate-float delay-1000"></div>
        <div className="w-1 h-1 bg-[#2A4B7C] rounded-full absolute top-1/2 left-1/5 animate-float delay-2000"></div>
      </div>

      {/* Top Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4A8EBC] to-[#2A4B7C]"></div>

      <div className="container mx-auto relative grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 z-10">
        {/* Company Info */}
        <div className="space-y-5">
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-[#4A8EBC] to-white bg-clip-text">
              Nepal Digital Heights
            </h2>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
            Innovating technology solutions for a sustainable future. We deliver cutting-edge digital experiences.
          </p>
          <div className="space-y-3 text-gray-200 text-sm">
            {[
              { icon: MapPin, text: "Butwal, Nepal" },
              { icon: Phone, text: "+977 9857089898" },
              { icon: Mail, text: "support@ndhtechnologies.com" },
              { icon: Globe, text: "www.ndhtechnologies.com", href: "https://www.ndhtechnologies.com" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center group hover:text-[#4A8EBC] transition-colors duration-200">
                <div className="w-7 h-7 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-2 group-hover:bg-[#4A8EBC]/20 transition-all duration-200">
                  <item.icon size={14} className="group-hover:scale-105 transition-transform duration-200" />
                </div>
                {item.href ? (
                  <a href={item.href} className="hover:underline">{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="relative inline-block mb-5">
            <h3 className="text-lg font-semibold text-white">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#4A8EBC]"></span>
            </h3>
          </div>
          <ul className="space-y-3">
            {[
              { name: "About Us", url: "/about" },
              { name: "E-Services", url: "/E-Services" },
              { name: "Case Studies", url: "/casestudy" },
              { name: "Careers", url: "/Careers" },
              { name: "Contact", url: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  className="text-gray-200 hover:text-white flex items-center group transition-all duration-200"
                  aria-label={`Navigate to ${link.name}`}
                >
                  <div className="w-5 h-5 rounded-full bg-transparent group-hover:bg-[#4A8EBC]/10 flex items-center justify-center mr-2 transition-all duration-200">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </div>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-5">
          <div className="relative inline-block mb-5">
            <h3 className="text-lg font-semibold text-white">
              Stay Connected
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#4A8EBC]"></span>
            </h3>
          </div>
          <p className="text-gray-200 text-sm">Subscribe for the latest updates and insights.</p>
          <form className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-[#2A4066]/50 border border-[#4A8EBC]/20 rounded-full px-4 py-2.5 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all text-sm"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 bg-gradient-to-r from-[#3B5488] to-[#4A8EBC] hover:from-[#4A8EBC] hover:to-[#3B5488] text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Subscribe to newsletter"
            >
              <span className="mr-1 text-xs hidden sm:inline">Subscribe</span>
              <Send size={14} />
            </button>
          </form>
          <div className="pt-4">
            <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>
            <div className="flex space-x-2">
              {[
                { icon: Facebook, name: "Facebook", href: "http://Facebook.com/techbyndh" },
                { icon: Instagram, name: "Instagram", href: "http://Instagram.com/techbyndh" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className="w-8 h-8 rounded-full bg-[#2A4066]/50 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#3B5488] hover:to-[#4A8EBC] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <social.icon size={16} className="text-white hover:scale-105 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-12 pt-5 border-t border-[#4A8EBC]/20 flex flex-col sm:flex-row justify-between items-center text-gray-200 text-sm relative z-10">
        <div>© {currentYear} Nepal Digital Heights. All rights reserved.</div>
        <div className="mt-3 sm:mt-0 flex space-x-4">
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-200 hover:text-[#4A8EBC] transition-colors duration-200"
              aria-label={link}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-15px); opacity: 0.4; }
        }
        .animate-float {
          animation: float 5s infinite ease-in-out;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .font-sans {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>
    </footer>
  );
};

export default Footer;