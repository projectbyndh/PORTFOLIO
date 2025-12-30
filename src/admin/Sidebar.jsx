import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import useAdminStore from '../Store/AdminStore';
import { FiLogOut } from 'react-icons/fi';
import { FiHome, FiEdit, FiBriefcase } from 'react-icons/fi';

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = useAdminStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menu = [
    { name: 'Add Blog', path: '/admin/add-blog', icon: <FiEdit /> },
    { name: 'See Messages', path: '/admin/messages', icon: <FiBriefcase /> },
    { name: 'Manage Companies', path: '/admin/companies', icon: <FiHome /> },
    { name: 'Manage Courses', path: '/admin/courses', icon: <FiBriefcase /> },
    { name: 'Manage Careers', path: '/admin/careers', icon: <FiBriefcase /> },
    { name: 'Manage Team', path: '/admin/team', icon: <FiHome /> },
  ];

  return (
    <aside className="w-64 bg-white/50 backdrop-blur-md shadow-md border-r border-[#4A8EBC]/20 min-h-screen flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-10 text-center">
          Admin Panel
        </h2>

        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-md'
                      : 'hover:bg-[#EAF5FF] text-[#1A2A44]'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border-t border-[#4A8EBC]/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white py-3 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
}
