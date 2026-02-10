import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Linkedin, Github, Sparkles } from "lucide-react";
import axiosInstance from "../api/axios";
import { getImageUrl } from "../utils/getImageUrl";


export default function TeamMembers() {
  const [layers, setLayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStructure = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/team-structure/structure/public');
        if (response.data.success) {
          setLayers(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch team structure:', err);
        setError('Failed to load team structure');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamStructure();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#4A8EBC] hover:bg-[#3B7AA8] text-white font-bold py-2 px-6 rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // The public endpoint returns layers with flattened members (already filtered for isPublic + isActive)
  const hasMembers = layers.some(layer => layer.members && layer.members.length > 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden pt-32 pb-24">
      {/* Texture & blobs */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#4A8EBC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3B7AA8]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
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

        {!hasMembers ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60"
          >
            <Users className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-neutral-900 mb-2">Team Coming Soon</h3>
            <p className="text-neutral-500">We are currently updating our team directory.</p>
          </motion.div>
        ) : (
          <div className="space-y-24">
            {layers.map((layer) => {
              if (!layer.members || layer.members.length === 0) return null;

              return (
                <section key={layer.id || layer.key} className="relative">
                  {/* Layer Title */}
                  <div className="text-center mb-12">
                    {layer.image && (
                      <img
                        src={getImageUrl(layer.image, 'default')}
                        alt=""
                        className="h-10 w-10 object-contain mx-auto mb-3"
                      />
                    )}
                    <h2 className="text-3xl font-bold text-neutral-900 relative inline-block">
                      {layer.title}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#4A8EBC] rounded-full"></div>
                    </h2>
                    {layer.description && (
                      <p className="text-neutral-500 mt-6 max-w-2xl mx-auto">{layer.description}</p>
                    )}
                  </div>

                  <div className={`grid gap-8 ${
                    layer.members.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                    layer.members.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {layer.members.map((member, mIndex) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        index={mIndex}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-12 border border-white/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4A8EBC]/10 to-transparent rounded-bl-full pointer-events-none" />

            <Sparkles className="w-12 h-12 text-[#4A8EBC] mx-auto mb-4 relative z-10" />
            <h3 className="text-3xl font-black text-neutral-900 mb-4 relative z-10">
              Want to Join Our Team?
            </h3>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto relative z-10">
              We&apos;re always looking for talented individuals to join our growing team. Check out our open positions!
            </p>
            <a
              href="/careers"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white font-bold py-4 px-8 rounded-2xl shadow-[0_0_30px_rgba(74,142,188,0.4)] hover:scale-105 transition-all duration-300 relative z-10"
            >
              View Open Positions
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function MemberCard({ member, index }) {
  const roleTitle = member.roleTitle || 'Team Member';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A8EBC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-8 flex flex-col items-center text-center relative z-10">
        {/* Avatar */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-[#4A8EBC] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform scale-110" />
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500 relative bg-neutral-100">
            <img
              src={getImageUrl(member.image, 'team')}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getImageUrl(null, 'team');
              }}
            />
          </div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-[#4A8EBC] transition-colors">
          {member.name}
        </h3>

        <div className="inline-block px-3 py-1 rounded-full bg-[#4A8EBC]/10 text-[#4A8EBC] text-xs font-bold uppercase tracking-wide mb-4">
          {roleTitle}
        </div>

        {member.bio && (
          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-6">
            {member.bio}
          </p>
        )}

        {/* Socials */}
        <div className="mt-auto flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
          {member.socialLinks?.linkedin && (
            <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-neutral-100 hover:bg-[#0077B5] hover:text-white transition-all duration-300 text-neutral-500">
              <Linkedin size={18} />
            </a>
          )}
          {member.socialLinks?.github && (
            <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-neutral-100 hover:bg-[#333] hover:text-white transition-all duration-300 text-neutral-500">
              <Github size={18} />
            </a>
          )}
          {member.socialLinks?.email && (
            <a href={`mailto:${member.socialLinks.email}`} className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-800 hover:text-white transition-all duration-300 text-neutral-500">
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
