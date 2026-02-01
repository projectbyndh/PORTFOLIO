import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Linkedin, Github, Sparkles, Award } from "lucide-react";
import axios from "axios";

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/team');
        if (response.data.success) {
          setTeamMembers(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch team members:', err);
        // Fallback to localStorage if API fails
        const stored = localStorage.getItem("teamMembers");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setTeamMembers(parsed);
            }
          } catch (e) {
            setError('Failed to load team members');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();

    // Listen for updates
    const updateTeam = () => fetchTeamMembers();
    window.addEventListener("storage", updateTeam);
    window.addEventListener("teamMembersUpdated", updateTeam);

    return () => {
      window.removeEventListener("storage", updateTeam);
      window.removeEventListener("teamMembersUpdated", updateTeam);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden pt-32 pb-24">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#4A8EBC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3B7AA8]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full mb-6 shadow-sm">
            <Users size={14} className="text-[#4A8EBC]" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">Our Team</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8]">Innovators</span>
          </h1>

          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Talented professionals dedicated to delivering exceptional digital solutions and driving innovation forward.
          </p>
        </motion.div>

        {/* Team Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
          </div>
        ) : teamMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-16 border border-white/60 shadow-lg text-center"
          >
            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-neutral-900 mb-4">No Team Members Yet</h3>
            <p className="text-neutral-600">Team members will appear here once added.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id || member.name + index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A8EBC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                <div className="relative z-10 p-6">
                  {/* Avatar */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC]/20 to-[#3B7AA8]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={member.image || "/placeholder.svg?height=128&width=128"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=128&width=128";
                          }}
                        />
                      </div>
                      {member.featured && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] rounded-full flex items-center justify-center shadow-lg">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-black text-neutral-900 mb-1 group-hover:text-[#4A8EBC] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold text-[#4A8EBC] mb-3">
                      {member.position}
                    </p>
                    <p className="text-sm text-neutral-600 line-clamp-3 mb-4">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    {(member.email || member.linkedin || member.github) && (
                      <div className="flex items-center justify-center gap-2 pt-4 border-t border-neutral-200">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#4A8EBC] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300"
                          >
                            <Mail size={14} />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#4A8EBC] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300"
                          >
                            <Linkedin size={14} />
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#4A8EBC] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300"
                          >
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {teamMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-12 border border-white/60 shadow-lg">
              <Sparkles className="w-12 h-12 text-[#4A8EBC] mx-auto mb-4" />
              <h3 className="text-3xl font-black text-neutral-900 mb-4">
                Want to Join Our Team?
              </h3>
              <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our growing team. Check out our open positions!
              </p>
              <a
                href="/careers"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white font-bold py-4 px-8 rounded-2xl shadow-[0_0_30px_rgba(74,142,188,0.4)] hover:scale-105 transition-all duration-300"
              >
                View Open Positions
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
