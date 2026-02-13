"use client";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, Code2,
  Linkedin, Globe, Terminal, ArrowUpRight, Minus
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050810] pt-10 sm:pt-14 md:pt-20 lg:pt-24 pb-5 sm:pb-7 md:pb-8 px-3 sm:px-5 md:px-6 overflow-hidden border-t border-white/5 font-sans">

      {/* --- LAYER 0: THE GRID ENGINE --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Spatial Depth Orbs */}
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-[#4A8EBC]/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-[#8B5CF6]/5 blur-[100px] rounded-full mix-blend-screen"></div>

        {/* Engineering Mesh Background */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- LAYER 1: BRAND HUB --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-10 md:gap-16 mb-8 sm:mb-12 md:mb-16 lg:mb-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12 border-b border-white/5">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6 group w-fit">
              {/* White Lined Logo Container */}
              <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-white/5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 ring-1 ring-white/5 group-hover:border-[#4A8EBC]/50 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                <Logo className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto" />
              </div>
            </Link>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-medium leading-relaxed">
              We are a collective of digital architects engineering <span className="text-white">autonomous ecosystems</span> for the global frontier.
            </p>
          </div>
        </div>

        {/* --- LAYER 2: BENTO GRID NODE DISTRIBUTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {/* Services */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h5 className="text-white/40 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">Services</h5>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <li>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium cursor-default">
                  <Minus size={8} className="text-white/20 sm:w-2.5 sm:h-2.5" />
                  All Services
                </div>
              </li>
              <li>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium cursor-default">
                  <Minus size={8} className="text-white/20 sm:w-2.5 sm:h-2.5" />
                  Web Development
                </div>
              </li>
              <li>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium cursor-default">
                  <Minus size={8} className="text-white/20 sm:w-2.5 sm:h-2.5" />
                  Mobile Apps
                </div>
              </li>
              <li>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium cursor-default">
                  <Minus size={8} className="text-white/20 sm:w-2.5 sm:h-2.5" />
                  Digital Marketing
                </div>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h5 className="text-white/40 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">Company</h5>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <li>
                <Link to="/about-us" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-teams" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h5 className="text-white/40 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">Resources</h5>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-white transition-colors text-[10px] sm:text-xs md:text-sm font-medium">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Nodes */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4 md:space-y-5">
            <h5 className="text-white/40 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">Base Coordinates</h5>
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <div className="group bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl transition-colors">
                <p className="text-white font-bold mb-1 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <MapPin size={12} className="text-[#4A8EBC] sm:w-3.5 sm:h-3.5" /> Tilottama, Manigram-5
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed pl-5 sm:pl-6">
                  Rupandehi, Nepal<br />
                  <span className="text-white/20 font-mono tracking-tighter italic">27.64° N | 83.47° E</span>
                </p>
              </div>

              <div className="group bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl transition-colors">
                <p className="text-white font-bold mb-1 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <Mail size={12} className="text-[#4A8EBC] sm:w-3.5 sm:h-3.5" /> Transmission
                </p>
                <a href="mailto:info@ndhtechnologies.com" className="text-gray-500 text-[10px] sm:text-xs pl-5 sm:pl-6 hover:text-[#4A8EBC] transition-colors block break-all">
                  info@ndhtechnologies.com
                </a>
                <a href="tel:+9779815408990" className="text-gray-500 text-[10px] sm:text-xs pl-5 sm:pl-6 hover:text-[#4A8EBC] transition-colors block mt-1">
                  +977 9815408990
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- LAYER 3: TELEMETRY & SYSTEM STATUS --- */}
        <div className="pt-5 sm:pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-6">

          <div className="flex items-center gap-3 sm:gap-4 order-2 md:order-1 w-full md:w-auto justify-center md:justify-start">
            <p className="text-white/20 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-center leading-tight">
              © {currentYear} Nepal Digital Heights.<br className="sm:hidden" /> All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 order-1 md:order-2">
            {[Linkedin, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:scale-105 transition-all active:scale-95">
                <Icon size={12} className="sm:w-3.5 sm:h-3.5" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest px-2.5 md:px-3 py-1 rounded-full border border-white/5 order-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span>Systems Normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;