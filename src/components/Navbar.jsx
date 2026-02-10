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

      <header className="fixed top-0 left-0 w-full z-[9999] transition-all duration-500 px-4 md:px-10 py-4">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`max-w-7xl mx-auto rounded-[32px] border flex items-center justify-between transition-all duration-500 overflow-hidden
            ${scrolled
              ? "bg-white/70 backdrop-blur-2xl border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] py-3 px-6"
              : "bg-white/40 backdrop-blur-lg border-white/20 py-5 px-8 shadow-none"
            }`}
        >
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group relative z-[100]">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-neutral-100 group-hover:scale-105 transition-transform duration-300">
              <Logo className="h-7 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/40 p-1 rounded-2xl border border-white/50">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300
                    ${isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900 hover:bg-white/50"}
                  `}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] rounded-xl shadow-[0_4px_15px_rgba(74,142,188,0.3)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-bold rounded-2xl hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-neutral-200"
            >
              Start Project <ArrowRight size={16} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-white border border-neutral-100 text-neutral-900 shadow-sm"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="absolute top-[100%] left-4 right-4 mt-4 bg-white/90 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-2xl overflow-hidden lg:hidden"
            >
              <div className="p-8 flex flex-col gap-4">
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
                      className={`text-2xl font-bold flex items-center justify-between ${location.pathname === link.path ? "text-[#4A8EBC]" : "text-neutral-800"
                        }`}
                    >
                      {link.name}
                      {location.pathname === link.path && <Sparkles size={20} />}
                    </Link>
                  </motion.div>
                ))}
                <hr className="my-4 border-neutral-100" />
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-5 bg-neutral-900 text-white rounded-2xl text-center font-bold text-lg"
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