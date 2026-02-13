import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import LoadingBar from "react-top-loading-bar";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Services", path: "/services" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const loadingBarRef = useRef(null);

  // Trigger loading bar on route change
  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const timer = setTimeout(() => loadingBarRef.current?.complete(), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Left-to-Right Loading Bar */}
      <LoadingBar
        color="linear-gradient(to right, #4A8EBC, #3B7AA8, #93c5fd)"
        ref={loadingBarRef}
        height={4}
        shadow={true}
      />

      <header className="fixed top-0 left-0 w-full z-[9999] transition-all duration-500 px-3 sm:px-4 md:px-6 lg:px-10 py-2.5 sm:py-3 md:py-4">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`max-w-7xl mx-auto rounded-2xl sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] border flex items-center justify-between transition-all duration-500 overflow-hidden
            ${scrolled
              ? "bg-white/80 backdrop-blur-2xl border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6"
              : "bg-white/50 backdrop-blur-lg border-white/30 py-3 sm:py-3.5 md:py-4 lg:py-5 px-5 sm:px-6 md:px-7 lg:px-8 shadow-sm"
            }`}
        >
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group relative z-[100]">
            <div className="bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-md border border-neutral-100 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
              <Logo className="h-6 sm:h-7 md:h-8 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/60 p-1.5 rounded-2xl border border-white/60 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 lg:px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300
                    ${isActive ? "text-white" : "text-neutral-700 hover:text-neutral-900 hover:bg-white/60"}
                  `}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] rounded-xl shadow-[0_4px_20px_rgba(74,142,188,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-sm font-bold rounded-xl lg:rounded-2xl hover:from-neutral-800 hover:to-neutral-700 transition-all active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="hidden lg:inline">Start Project</span>
              <span className="lg:hidden">Project</span>
              <ArrowRight size={16} className="lg:w-4 lg:h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 sm:p-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 shadow-md hover:shadow-lg transition-all"
            >
              {menuOpen ? <X size={20} className="sm:w-5 sm:h-5" /> : <Menu size={20} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* --- Advanced Mobile Drawer --- */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[100%] left-3 right-3 sm:left-4 sm:right-4 mt-3 bg-white/95 backdrop-blur-3xl rounded-2xl sm:rounded-[24px] border border-white/60 shadow-2xl overflow-hidden lg:hidden"
            >
              <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-2 sm:gap-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`text-base sm:text-lg md:text-xl font-bold flex items-center justify-between py-2 ${location.pathname === link.path ? "text-[#4A8EBC]" : "text-neutral-800 hover:text-[#4A8EBC]"
                        } transition-colors`}
                    >
                      {link.name}
                      {location.pathname === link.path && <Sparkles size={18} className="sm:w-5 sm:h-5" />}
                    </Link>
                  </motion.div>
                ))}
                <hr className="my-2 sm:my-3 border-neutral-200" />
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl sm:rounded-2xl text-center font-bold text-base sm:text-lg hover:from-neutral-800 hover:to-neutral-700 transition-all shadow-lg"
                >
                  Let's Talk
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}