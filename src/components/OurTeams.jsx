import React, { useEffect, useState } from "react";

export default function OurTeams() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const updateTeam = () => {
      const stored = localStorage.getItem("teamMembers");
      let members = [];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            members = parsed;
          }
        } catch {}
      }
      setTeamMembers(members);
    };
    updateTeam();
    window.addEventListener("storage", updateTeam);
    window.addEventListener("teamMembersUpdated", updateTeam);
    return () => {
      window.removeEventListener("storage", updateTeam);
      window.removeEventListener("teamMembersUpdated", updateTeam);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5FAFF] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">Our Teams</h1>
        {teamMembers.length === 0 ? (
          <div className="text-center text-gray-500 py-12 text-lg">No team members found. Please add team members from the admin panel.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={member.name + idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                <img
                  src={member.image || "/placeholder.svg?height=120&width=120"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border"
                  onError={e => { e.target.src = "/placeholder.svg?height=120&width=120"; }}
                />
                <div className="font-bold text-lg text-[#1A2A44] mb-1">{member.name}</div>
                <div className="text-[#4A8EBC] font-medium mb-1">{member.position}</div>
                <div className="text-gray-700 text-sm text-center">{member.bio}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
