import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, BookOpen, User, ArrowRight, Award } from 'lucide-react';
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-[#26a8df] rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg"></div>

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
                </div>

                <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md text-[#26a8df] text-xs font-bold rounded-lg shadow-sm">
                        {course.tagline || 'Trending'}
                    </span>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col relative bg-white z-20">
                <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium uppercase tracking-wide">
                    <div className="flex items-center gap-1">
                        <User size={14} className="text-[#26a8df]" />
                        {course.instructorName || 'Expert Team'}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-[#26a8df] transition-colors">
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

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                    <div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-medium">Course Fee</span>
                            <span className="text-xl font-extrabold text-slate-800">
                                {nextBatch && nextBatch.fee ? `Rs.${nextBatch.fee}` : <span className="text-[#26a8df]">View details</span>}
                            </span>
                        </div>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-[#26a8df]/5 group-hover:bg-[#26a8df] flex items-center justify-center text-[#26a8df] group-hover:text-white transition-all duration-300">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
