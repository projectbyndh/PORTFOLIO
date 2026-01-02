"use client";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, ChevronRight, Send } from "lucide-react";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-linear-to-br from-[#1A2A44] via-[#2A4066] to-[#3B5488] pt-16 pb-8 px-4 sm:px-6 overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-size-[30px_30px]"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 w-48 h-48 rounded-full bg-[#4A8EBC]/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-8 w-72 h-72 rounded-full bg-[#3B5488]/10 animate-pulse"></div>
        <div className="w-1.5 h-1.5 bg-[#4A8EBC] rounded-full absolute top-1/4 left-1/3 animate-float"></div>
        <div className="w-2 h-2 bg-[#3B6D9C] rounded-full absolute bottom-1/3 right-1/4 animate-float delay-1000"></div>
        <div className="w-1 h-1 bg-[#2A4B7C] rounded-full absolute top-1/2 left-1/5 animate-float delay-2000"></div>
      </div>

      {/* Top Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#4A8EBC] to-[#2A4B7C]"></div>

      <div className="container relative z-10 grid grid-cols-1 gap-10 mx-auto sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Team Members in Footer */}
              {/* <div className="mt-12 col-span-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Our Team</h3>
                  <Link to="/our-teams" className="text-[#4A8EBC] text-sm font-semibold hover:underline">Meet Our Teams</Link>
                </div>
                <div id="footer-team-members" className="flex flex-wrap justify-center gap-4">
                  {(() => {
                    let members = [];
                    try {
                      const stored = typeof window !== 'undefined' ? localStorage.getItem("teamMembers") : null;
                      if (stored) {
                        const parsed = JSON.parse(stored);
                        if (Array.isArray(parsed)) members = parsed;
                      }
                    } catch {}
                    if (members.length === 0) {
                      return <span className="text-sm text-gray-300">No team members yet.</span>;
                    }
                    return members.slice(0, 6).map((member, idx) => (
                      <div key={member.name + idx} className="flex flex-col items-center w-20">
                        <img
                          src={member.image || "/placeholder.svg?height=60&width=60"}
                          alt={member.name}
                          className="object-cover w-12 h-12 mb-1 border rounded-full"
                          onError={e => { e.target.src = "/placeholder.svg?height=60&width=60"; }}
                        />
                        <span className="w-full text-xs text-center text-white truncate">{member.name}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
        {/* Company Info */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Logo className="w-auto h-10" />
          </div>
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-linear-to-r from-[#4A8EBC] to-white bg-clip-text">
              Nepal Digital Heights
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-gray-200">
            Innovating technology solutions for a sustainable future. We deliver cutting-edge digital experiences.
          </p>
          <div className="space-y-3 text-sm text-gray-200">
            {[
              { icon: MapPin, text: "Tilottama, Nepal" },
              { icon: Phone, text: "+977 9857089898" },
              { icon: Mail, text: "support@ndhtechnologies.com" },
              { icon: Globe, text: "www.ndhtechnologies.com", href: "https://www.ndhtechnologies.com" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center group hover:text-[#4A8EBC] transition-colors duration-200">
                <div className="w-7 h-7 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-2 group-hover:bg-[#4A8EBC]/20 transition-all duration-200">
                  <item.icon size={14} className="transition-transform duration-200 group-hover:scale-105" />
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
              { name: "About Us", url: "/about-us" },
              { name: "E-Services", url: "/E-Services" },
              { name: "Case Studies", url: "/case-studies" },
              { name: "Careers", url: "/Careers" },
              { name: "Contact", url: "/contact" },
              { name: "Meet Our Teams", url: "/our-teams" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.url}
                  className="flex items-center text-gray-200 transition-all duration-200 hover:text-white group"
                  aria-label={`Navigate to ${link.name}`}
                >
                  <div className="w-5 h-5 rounded-full bg-transparent group-hover:bg-[#4A8EBC]/10 flex items-center justify-center mr-2 transition-all duration-200">
                    <ChevronRight size={12} className="transition-all duration-200 opacity-0 group-hover:opacity-100" />
                  </div>
                  {link.name}
                </Link>
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
          <p className="text-sm text-gray-200">Subscribe for the latest updates and insights.</p>
          <form className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-[#2A4066]/50 border border-[#4A8EBC]/20 rounded-full px-4 py-2.5 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all text-sm"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 bg-linear-to-r from-[#3B5488] to-[#4A8EBC] hover:from-[#4A8EBC] hover:to-[#3B5488] text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Subscribe to newsletter"
            >
              <span className="hidden mr-1 text-xs sm:inline">Subscribe</span>
              <Send size={14} />
            </button>
          </form>
          <div className="pt-4">
            <h4 className="mb-3 text-sm font-medium text-white">Follow Us</h4>
            <div className="flex space-x-2">
              {[
                { icon: Facebook, name: "Facebook", href: "http://Facebook.com/techbyndh" },
                { icon: Instagram, name: "Instagram", href: "http://Instagram.com/techbyndh" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className="w-8 h-8 rounded-full bg-[#2A4066]/50 flex items-center justify-center hover:bg-linear-to-r hover:from-[#3B5488] hover:to-[#4A8EBC] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <social.icon size={16} className="text-white transition-transform duration-200 hover:scale-105" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-12 pt-5 border-t border-[#4A8EBC]/20 flex flex-col gap-4 sm:flex-row justify-between items-center text-gray-200 text-sm relative z-10">
        <div className="w-full text-center sm:text-left">© {currentYear} Nepal Digital Heights. All rights reserved.</div>

      </div>

      {/* Custom styles removed. If you need these, add them to your global CSS file. */}
    </footer>
  );
};

export default Footer;