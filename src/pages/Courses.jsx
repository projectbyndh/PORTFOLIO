import React, { useEffect } from 'react';
import { useCourses } from '../hooks/useCourses';
import CourseCard from '../components/courses/CourseCard';
import Loader from '../components/Loader';
import { Search, Filter, ArrowRight } from 'lucide-react';

export default function Courses() {
    const { courses, loading, error, fetchCourses } = useCourses();

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    if (loading && courses.length === 0) return <Loader />;

    if (error && courses.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="text-red-500 text-xl font-bold mb-2">Oops! Something went wrong.</div>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
                onClick={() => fetchCourses()}
                className="px-6 py-2 bg-[#26a8df] text-white rounded-lg hover:bg-[#1d8dbd] transition-colors"
            >
                Retry Loading
            </button>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative bg-[#0D1641] text-white pt-32 pb-56 lg:pt-40 lg:pb-64 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#26a8df] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
                <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#26a8df]/10 border border-[#26a8df]/20 text-[#26a8df] text-sm font-semibold mb-6 backdrop-blur-sm">
                        🚀 Launch Your Tech Career
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        Master In-Demand <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26a8df] to-blue-200">
                            Tech Skills
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        Join our expert-led courses designed to take you from beginner to job-ready professional. Learn by building real-world projects.
                    </p>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#26a8df] transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-14 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#26a8df] focus:bg-white/10 transition-all shadow-xl"
                            placeholder="What do you want to learn today?"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <button className="p-2 bg-[#26a8df] text-white rounded-xl hover:bg-[#2090c0] transition-colors shadow-lg shadow-[#26a8df]/25">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 relative z-20">
                {courses.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6 text-slate-300">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">No courses found</h3>
                        <p className="text-slate-500 text-lg">We are currently updating our catalog. Please check back soon!</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-2">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Explore Courses</h2>
                                <p className="text-blue-100">Find the perfect program for your career goals</p>
                            </div>

                            <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mt-4 md:mt-0">
                                Showing <span className="text-slate-900 font-bold">{courses.length}</span> results
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                            {courses.map(course => (
                                <div key={course.id} className="h-full">
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Call to Action */}
            <div className="max-w-5xl mx-auto mt-10 mb-20 px-4">
                <div className="bg-[#0D1641] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#26a8df] rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-20"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Not sure where to start?</h3>
                        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                            Our career counselors can help you choose the right path based on your background and goals.
                        </p>
                        <button className="px-8 py-4 bg-[#26a8df] text-white font-bold rounded-xl hover:bg-[#2090c0] hover:scale-105 transition-all shadow-xl shadow-[#26a8df]/30 flex items-center gap-2 mx-auto">
                            Get Free Counseling <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
