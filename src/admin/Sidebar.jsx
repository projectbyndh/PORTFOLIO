// components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Sidebar() {
  const menu = [
    { name: 'Add Blog', path: '/admin/add-blog' },
    { name: 'Add Job', path: '/admin/add-job' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 font-semibold' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
