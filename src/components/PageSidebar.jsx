import React from "react";
import { NavLink } from "react-router-dom";

export default function PageSidebar() {
  const menu = [
    { name: "About Us", path: "/about-us" },
    { name: "Case Studies", path: "/case-studies" },
  ];
  return (
    <aside className="w-64 bg-white/50 backdrop-blur-md shadow-md border-r border-[#26a8df]/20 min-h-screen flex flex-col">
      <div className="p-6">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#26a8df] to-[#26a8df] mb-8 text-center">
          Quick Pages
        </h2>
        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#26a8df]/50 focus:ring-offset-2 focus:ring-offset-white/50 ${
                    isActive
                      ? 'bg-linear-to-r from-[#26a8df] to-[#26a8df] text-white shadow-md'
                      : 'hover:bg-[#EAF5FF] text-[#26a8df]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
