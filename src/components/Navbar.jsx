import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Partners", path: "/partners" },
  { name: "Services", path: "/E-Services" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-[9999] px-4 sm:px-10 py-6 pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`max-w-7xl mx-auto rounded-[28px] border transition-all duration-500 pointer-events-auto relative overflow-hidden ${scrolled
            ? "bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(74,142,188,0.12)] border-white/20 py-3 px-8"
            : "bg-white/40 backdrop-blur-xl border-white/30 py-5 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            }`}
        >
          {/* Glassmorphism shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            {/* Logo Group */}
            <Link to="/" className="flex items-center gap-4 group z-[110]">
              <div className="p-2.5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <Logo className="h-8 w-auto" />
              </div>
              <span className="font-black text-xl tracking-tighter text-neutral-900">
              </span>
            </Link>

            {/* Desktop Center Menu - Enhanced Glassmorphism */}
            <div className="hidden lg:flex items-center gap-2 bg-white/30 backdrop-blur-md p-2 rounded-[20px] border border-white/40 shadow-inner">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-6 py-3 text-sm font-bold tracking-tight transition-all duration-300 rounded-[16px] ${isActive ? "text-white" : "text-neutral-700 hover:text-neutral-900 hover:bg-white/40"
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] rounded-[16px] shadow-[0_0_20px_rgba(74,142,188,0.4),0_4px_12px_rgba(74,142,188,0.3)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action - Glowing Cyan Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className="relative px-8 py-3.5 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white rounded-2xl font-bold text-sm overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(74,142,188,0.3),0_4px_12px_rgba(74,142,188,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Talk to us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A9ECC] to-[#4B84A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Trigger - Enhanced */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xl active:scale-90 transition-all duration-200 border border-white/10"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Modern Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-2xl z-[90] lg:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-10 gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease: "circOut" }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-end gap-4"
                  >
                    <span className="text-neutral-300 text-lg font-mono mb-2">0{i + 1}</span>
                    <span className={`text-5xl font-black tracking-tighter ${location.pathname === link.path ? "text-[#4A8EBC]" : "text-neutral-900"
                      }`}>
                      {link.name}
                    </span>
                    <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity mb-4 text-[#4A8EBC]" size={24} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section (The requested 40px gap) */}
            <div className="p-10 mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full h-20 flex items-center justify-center bg-neutral-900 text-white rounded-[32px] text-2xl font-black shadow-2xl shadow-neutral-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}