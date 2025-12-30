import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Services", path: "/E-Services" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg shadow-lg border-b border-[#4A8EBC]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
          NDH Tech
        </Link>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-lg font-semibold text-[#1A2A44] hover:text-[#4A8EBC] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/40"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
