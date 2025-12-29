import React from "react";
import useCourseStore from "../Store/CourseStore";

export default function CoursesSection() {
  const courses = useCourseStore((state) => state.courses);

  return (
    <section className="py-16 bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              Our Courses
            </h2>
          </div>
          <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
            Explore our expertly crafted courses designed to boost your skills and career.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col items-center bg-white/80 backdrop-blur-md border border-[#4A8EBC]/20 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              <img
                src={course.image}
                alt={course.title}
                className="h-32 w-32 object-contain mb-4 rounded-xl border border-[#4A8EBC]/20 bg-white shadow"
              />
              <div className="font-extrabold text-xl text-[#1A2A44] mb-1 text-center">{course.title}</div>
              <div className="text-sm text-[#3B5488] mb-1">Duration: <span className="font-semibold">{course.duration}</span></div>
              <div className="text-sm text-[#3B5488] mb-1">Period: <span className="font-semibold">{course.period}</span></div>
              <div className="text-sm text-[#2B4066]/80 mb-1 text-center">Outcome: {course.outcome}</div>
              <div className="text-lg font-bold text-[#4A8EBC] mb-2">Price: {course.price}</div>
              {/* Add a button or link for more details or enrollment here if needed */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
