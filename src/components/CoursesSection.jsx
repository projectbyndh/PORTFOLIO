import React, { useEffect, useState } from "react";

export default function CoursesSection() {
  const [displayCourses, setDisplayCourses] = useState([]);

  useEffect(() => {
    const dummyCourses = [
      {
        id: 1,
        title: "React Development",
        duration: "3 months",
        level: "Beginner",
        short_description: "Learn React from scratch",
        price: 99,
        image_url: "https://via.placeholder.com/150?text=React"
      },
      {
        id: 2,
        title: "Node.js Backend",
        duration: "2 months",
        level: "Intermediate",
        short_description: "Build server-side applications",
        price: 149,
        image_url: "https://via.placeholder.com/150?text=Node"
      },
      {
        id: 3,
        title: "UI/UX Design",
        duration: "4 months",
        level: "All Levels",
        short_description: "Design beautiful interfaces",
        price: 199,
        image_url: "https://via.placeholder.com/150?text=UI/UX"
      }
    ];
    setDisplayCourses(dummyCourses);
  }, []);

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-linear-to-b from-[#F5FAFF] to-[#EAF5FF] relative overflow-hidden">
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
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1A2A44] to-[#4A8EBC]">
              Our Courses
            </h2>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#2B4066]/80 max-w-2xl mx-auto px-3">
            Explore our expertly crafted courses designed to boost your skills and career.
          </p>
        </div>
        ) : displayCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No courses available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {displayCourses.map((course) => (
              <div key={course.id} className="flex flex-col items-center bg-white/80 backdrop-blur-md border border-[#4A8EBC]/20 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="h-32 w-32 object-contain mb-4 rounded-xl border border-[#4A8EBC]/20 bg-white shadow"
                  />
                )}
                <div className="font-extrabold text-xl text-[#1A2A44] mb-1 text-center">{course.title}</div>
                <div className="text-sm text-[#3B5488] mb-1">Duration: <span className="font-semibold">{course.duration}</span></div>
                <div className="text-sm text-[#3B5488] mb-1">Level: <span className="font-semibold">{course.level}</span></div>
                <div className="text-sm text-[#2B4066]/80 mb-1 text-center">{course.short_description}</div>
                <div className="text-lg font-bold text-[#4A8EBC] mb-2">Price: ${course.price}</div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
