import React, { useState, useEffect } from "react";
import { generateApplicationPDF } from "../utils/pdf";

export default function AdminCareerApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("careerApplications");
    setApplications(stored ? JSON.parse(stored) : []);
  }, []);

  const openResume = (app) => {
    if (app.resumeData) {
      // Open the stored CV in a new tab
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${app.resumeName || 'Resume'}</title></head>
            <body style="margin:0;padding:0;">
              <iframe src="${app.resumeData}" style="width:100%;height:100vh;border:none;"></iframe>
            </body>
          </html>
        `);
      }
    } else {
      alert("Resume file not available. It may have been submitted before this feature was added.");
    }
  };

  const deleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const updated = applications.filter(app => app.id !== id);
      setApplications(updated);
      localStorage.setItem("careerApplications", JSON.stringify(updated));
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 mt-10 border border-[#4A8EBC]/20 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#1A2A44]">Career Applications</h2>
      {applications.length === 0 ? (
        <div className="text-gray-500">No applications received yet.</div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="border rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {app.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-[#1A2A44]">{app.name}</div>
                      <div className="text-sm text-indigo-600 font-medium">{app.position}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">📧</span>
                      <span className="text-gray-700">{app.email}</span>
                    </div>
                    {app.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">📞</span>
                        <span className="text-gray-700">{app.phone}</span>
                      </div>
                    )}
                    {app.resumeName && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">📄</span>
                        <span className="text-gray-700 truncate">{app.resumeName}</span>
                        {app.resumeData && (
                          <button
                            onClick={() => openResume(app)}
                            className="ml-2 text-xs text-[#4A8EBC] hover:underline font-medium"
                          >
                            View CV
                          </button>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🕐</span>
                      <span className="text-gray-500 text-xs">{new Date(app.id).toLocaleString()}</span>
                    </div>
                  </div>
                  {app.message && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-gray-600">
                      {app.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {app.resumeData && (
                    <button
                      onClick={() => openResume(app)}
                      className="px-4 py-2 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-lg text-sm font-semibold shadow hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Open CV
                    </button>
                  )}
                  <button
                    onClick={() => generateApplicationPDF(app)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Download Summary
                  </button>
                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold shadow hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
