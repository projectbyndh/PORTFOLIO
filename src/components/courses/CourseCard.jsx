import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, BookOpen, User, ArrowRight, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/getImageUrl';

export default function CourseCard({ course }) {
    const navigate = useNavigate();

    // Ensure batches is an array and filter only future batches
    const today = new Date();
    const futureBatches = course.batches && Array.isArray(course.batches)
        ? course.batches.filter(b => new Date(b.startDate) >= today)
        : [];

    // safe sort
    const nextBatch = futureBatches.length > 0
        ? futureBatches.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0]
        : null;

    return (
        <div
            onClick={() => navigate(`/courses/${course.slug}`)}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full cursor-pointer hover:-translate-y-2 relative"
        >
            {/* Gradient glow effect on hover */}
            <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-[#26a8df]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#26a8df]/5 blur-3xl rounded-full group-hover:bg-[#26a8df]/10 transition-colors duration-500" />

            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10"></div>
                <img
                    src={getImageUrl(course.image, 'course')}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'; }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {course.isPopular && (
                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider uppercase flex items-center gap-1">
                            <Award size={12} fill="white" /> Popular
                        </div>
                    )}
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#26a8df] border border-white shadow-sm flex items-center gap-1.5 w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#26a8df] animate-pulse" />
                        Verified Module
                    </span>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col relative bg-white z-20">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-1 px-2.5 bg-[#26a8df]/10 rounded-full border border-[#26a8df]/10">
                        <span className="text-[10px] font-black text-[#26a8df] uppercase tracking-widest group-hover:tracking-[0.15em] transition-all">
                            {course.tagline || 'Course Tagline'}
                        </span>
                    </div>
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-[#26a8df] transition-colors line-clamp-2 leading-tight">
                    {course.title}
                </h3>

                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {course.description || "Master this skill with our comprehensive curriculum and hands-on projects."}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                        <div className="p-1.5 bg-[#26a8df]/10 rounded-lg text-[#26a8df]">
                            <Clock size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Duration</span>
                            <span className="text-xs font-semibold text-slate-700">{course.duration || 'Flexible'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                        <div className="p-1.5 bg-[#26a8df]/10 rounded-lg text-[#26a8df]">
                            <Calendar size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Next Batch</span>
                            <span className="text-xs font-semibold text-slate-700">
                                {nextBatch ? new Date(nextBatch.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Flexible'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-[#26a8df]">
                                <User size={12} />
                            </div>
                        ))}
                    </div>
                    <motion.div
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-1.5 text-xs font-black text-[#26a8df] uppercase tracking-widest"
                    >
                        <span>View details</span>
                        <ArrowUpRight size={14} />
                    </motion.div>
                </div>

                <div className="mt-5">
                    <button className="w-full py-4 bg-[#0D1641] hover:bg-[#0D1641]/90 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-blue-500/10 group-active:scale-95 transition-all">
                        Join This Cohort
                    </button>
                </div>
            </div>
        </div>
    );
}
