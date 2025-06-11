import Sidebar from '../admin/Sidebar';
import React, { useEffect, useState } from 'react';

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
    <div className="flex min-h-screen bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 min-h-[80vh]">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-8">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Total Users" value={dashboardData.totalUsers} />
            <DashboardCard title="Today's Visits" value={dashboardData.todaysVisits} />
            <DashboardCard title="Total Blogs" value={dashboardData.totalBlogs} />
            <DashboardCard title="Total Jobs" value={dashboardData.totalJobs} />
            <DashboardCard title="Your Dashboard Visits" value={dashboardData.dashboardVisits} />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-[#4A8EBC]/20 shadow-md p-6 rounded-xl text-center">
      <h2 className="text-lg font-semibold text-[#1A2A44]/80 mb-2">{title}</h2>
      <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
        {value}
      </p>
    </div>
  );
}
