import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useBatches } from '../hooks/useBatches';
import Loader from '../components/Loader';
import EnrollmentForm from '../components/courses/EnrollmentForm';
import SyllabusAccordion from '../components/courses/SyllabusAccordion';
import { Clock, Calendar, CheckCircle, Award, Target, Users, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

export default function CourseDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { currentCourse: course, loading, error, fetchCourseBySlug } = useCourses();
    const { batches, fetchBatches } = useBatches();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (slug) {
            fetchCourseBySlug(slug).then(data => {
                if (data && data.id) {
                    fetchBatches(data.id);
                }
            });
        }
    }, [slug, fetchCourseBySlug, fetchBatches]);

    if (loading) return <Loader />;
    if (error || !course) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="text-red-500 text-xl font-bold mb-4">Course not found</div>
            <button
                onClick={() => navigate('/courses')}
                className="px-6 py-2 bg-[#0D1641] text-white rounded-lg hover:bg-[#080E2B] transition-colors"
            >
                Browse All Courses
            </button>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#0D1641] to-[#1E3A8A] text-white pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse-slow"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                        <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20 shadow-sm animate-fade-in-up">
                            {course.tagline || 'Limited Seats Available'}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in-up delay-100">
                            {course.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl animate-fade-in-up delay-200">
                            {course.description ? course.description.substring(0, 150) + '...' : ''}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up delay-300">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <Clock size={20} className="text-[#26a8df]" />
                                <span className="font-medium">{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <Users size={20} className="text-[#26a8df]" />
                                <span className="font-medium">{course.level || 'Beginner to Advanced'}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <Award size={20} className="text-[#26a8df]" />
                                <span className="font-medium">Certificate Included</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 animate-fade-in-right">
                        {/* Use existing EnrollmentCard instead of image if desired, or keep image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img
                                src={getImageUrl(course.image, 'course')}
                                alt={course.title}
                                className="w-full h-auto object-cover aspect-video"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course+Preview'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            {course.isPopular && (
                                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content (Left) */}
                    <div className="lg:col-span-8 space-y-12 pr-0 lg:pr-12 lg:border-r lg:border-gray-200">

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-8 sticky top-0 bg-gray-50 z-10 pt-4 overflow-x-auto scrollbar-hide">
                            {['overview', 'curriculum', 'instructor'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 font-semibold text-sm uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                        ? 'border-[#26a8df] text-[#26a8df]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Overview */}
                        {activeTab === 'overview' && (
                            <div className="animate-fade-in space-y-8">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-[#26a8df] pl-4">About This Course</h2>
                                    <div className="prose max-w-none text-gray-600 leading-relaxed">
                                        {course.description}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#26a8df] pl-4">What You Will Learn</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {course.whatYouWillLearn && course.whatYouWillLearn.map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle size={20} className="text-[#26a8df] mt-1 shrink-0" />
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#26a8df]/5 to-blue-50/50 rounded-2xl p-8 border border-[#26a8df]/10">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#26a8df] pl-4">Is This Course Right for You?</h2>
                                    <p className="text-gray-600 mb-4">
                                        {typeof course.targetAudience === 'string' ? course.targetAudience : 'Anyone look to upskill.'}
                                    </p>
                                    {Array.isArray(course.targetAudience) && (
                                        <ul className="space-y-2">
                                            {course.targetAudience.map((audi, i) => (
                                                <li key={i} className="flex items-center gap-2 text-gray-700">
                                                    <Target size={18} className="text-[#26a8df]" /> {audi}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Curriculum */}
                        {activeTab === 'curriculum' && (
                            <div className="animate-fade-in">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-[#26a8df] pl-4">Course Curriculum</h2>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            {course.syllabus ? course.syllabus.length : 0} Modules
                                        </span>
                                    </div>
                                    <SyllabusAccordion syllabus={course.syllabus} />
                                </div>
                            </div>
                        )}

                        {/* Instructor */}
                        {activeTab === 'instructor' && (
                            <div className="animate-fade-in">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#26a8df]/20 shadow-lg shrink-0">
                                        <img
                                            src={getImageUrl(course.instructorImage, 'team')}
                                            alt={course.instructorName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=Instructor'; }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{course.instructorName || 'Expert Mentor'}</h3>
                                        <div className="text-[#26a8df] font-medium mb-4">Senior Instructor @ Nepal Digital Heights</div>
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {course.instructorBio || 'An experienced professional with years of industry expertise.'}
                                        </p>

                                        {/* Social Links could go here */}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-4 sticky top-6 h-fit">
                        <EnrollmentForm course={course} batches={batches} />

                        {/* Quick Batch Info if not enrolling immediately */}
                        {batches.length > 0 && (
                            <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Calendar size={18} className="text-[#26a8df]" /> Upcoming Batches
                                </h4>
                                <div className="space-y-3">
                                    {batches.slice(0, 3).map(batch => (
                                        <div key={batch.id} className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm text-sm flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-gray-800">{new Date(batch.startDate).toLocaleDateString()}</div>
                                                <div className="text-xs text-gray-500">{batch.timings}</div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${batch.bookedSeats >= batch.totalSeats ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {batch.bookedSeats >= batch.totalSeats ? 'FULL' : 'OPEN'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
