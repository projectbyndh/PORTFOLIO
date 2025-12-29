import React, { useEffect, useState } from 'react';
import AdminLayout from './Layout';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 125,      // mock data
    todaysVisits: 15,     // mock data
    totalBlogs: 12,
    totalJobs: 8,
    dashboardVisits: 0,   // track locally
  });

  useEffect(() => {
    // Simulate tracking visits locally via localStorage
    let visits = localStorage.getItem('dashboardVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('dashboardVisits', visits);

    setDashboardData(prevData => ({
      ...prevData,
      dashboardVisits: visits
    }));
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 min-h-[80vh] border border-[#4A8EBC]/20">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-10 text-center tracking-tight">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard title="Total Users" value={dashboardData.totalUsers} />
            <DashboardCard title="Today's Visits" value={dashboardData.todaysVisits} />
            <DashboardCard title="Total Blogs" value={dashboardData.totalBlogs} />
            <DashboardCard title="Total Jobs" value={dashboardData.totalJobs} />
            <DashboardCard title="Your Dashboard Visits" value={dashboardData.dashboardVisits} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#D8EBFF] border border-[#4A8EBC]/30 shadow-xl p-8 rounded-2xl text-center flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#4A8EBC]/10 blur-2xl opacity-60 pointer-events-none z-0"></div>
      <h2 className="text-lg font-bold text-[#1A2A44] mb-2 z-10">{title}</h2>
      <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] z-10">
        {value}
      </p>
    </div>
  );
}
