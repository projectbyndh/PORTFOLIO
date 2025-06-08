import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Render the nested route here */}
      </main>
    </div>
  );
}