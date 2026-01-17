
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Partners", path: "/partners" },
  { name: "Services", path: "/E-Services" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
      scrolled
        ? 'bg-gradient-to-b from-white/95 via-white/90 to-white/85 backdrop-blur-2xl shadow-2xl border-b border-white/30 border-t border-white/50 py-3'
        : 'bg-gradient-to-b from-white/70 via-white/60 to-white/50 backdrop-blur-xl shadow-xl border-b border-white/20 border-t border-white/40 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative z-10"
            aria-label="NDH Technologies Homepage"
          >
            <div className="relative">
              <Logo className="h-11 w-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 gpu-accelerated" />
              <div className="absolute inset-0 bg-linear-to-r from-[#4A8EBC] to-[#8B5CF6] opacity-0 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>
            <div className="hidden sm:block">

            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 group overflow-hidden ${
                  isActive(link.path)
                    ? 'text-white shadow-lg'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                {/* Background gradient for active state */}
                {isActive(link.path) && (
                  <span className="absolute inset-0 bg-linear-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C] animate-gradient"></span>
                )}
                {/* Hover background */}
                {!isActive(link.path) && (
                  <span className="absolute inset-0 bg-neutral-100 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                )}
                <span className="relative z-10">{link.name}</span>
                {/* Active indicator */}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-glow"></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="group relative px-7 py-3 bg-linear-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C] text-white font-bold text-sm rounded-xl shadow-primary transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-linear-to-r from-[#2D5F8C] via-[#234972] to-[#1A3555] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl bg-neutral-100/80 hover:bg-neutral-200/80 transition-all duration-300 focus-ring active:scale-95"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 text-neutral-800 absolute transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`w-6 h-6 text-neutral-800 absolute transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <div className="glass-effect rounded-2xl shadow-floating border border-white/60 p-5 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white bg-linear-to-r from-[#4A8EBC] to-[#2D5F8C] shadow-lg scale-100'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-white/80 active:scale-95'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="flex items-center justify-between">
                    {link.name}
                    {isActive(link.path) && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    )}
                  </span>
                </Link>
              ))}
              <div className="border-t border-neutral-200/50 mt-2 pt-4">
                <Link
                  to="/contact"
                  className="w-full px-5 py-4 bg-linear-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C] text-white font-bold rounded-xl shadow-primary transition-all duration-300 active:scale-95 text-center block"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-neutral-900/30 backdrop-blur-sm -z-10 transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </nav>
  );
}
