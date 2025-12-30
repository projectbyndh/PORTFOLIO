import React, { useState, useEffect } from "react";

export default function AdminCareerApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("careerApplications");
    setApplications(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 mt-10 border border-[#4A8EBC]/20 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#1A2A44]">Career Applications</h2>
      {applications.length === 0 ? (
        <div className="text-gray-500">No applications received yet.</div>
      ) : (
        <ul className="space-y-6">
          {applications.map(app => (
            <li key={app.id} className="border p-4 rounded-xl bg-white/90 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-semibold text-lg text-[#1A2A44]">{app.name}</div>
                <div className="text-sm text-[#4A8EBC]">{app.email}</div>
                <div className="text-gray-700 mt-2">{app.message}</div>
              </div>
              <div>
                {app.resumeName && (
                  <span className="inline-block bg-[#4A8EBC]/10 text-[#1A2A44] px-3 py-1 rounded-full text-xs font-semibold mr-2">{app.resumeName}</span>
                )}
                {/* Note: File is not actually uploaded, just name shown */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
