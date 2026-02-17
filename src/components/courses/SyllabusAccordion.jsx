import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileCode } from 'lucide-react';

export default function SyllabusAccordion({ syllabus = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    if (!syllabus || syllabus.length === 0) return null;

    return (
        <div className="space-y-4">
            {syllabus.map((module, index) => {
                const isOpen = openIndex === index;
                // Ensure lessons is an array
                const lessons = Array.isArray(module.lessons) ? module.lessons : [];

                return (
                    <div
                        key={index}
                        className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#26a8df] shadow-md bg-blue-50/30' : 'border-gray-200 hover:border-blue-200'}`}
                    >
                        <button
                            onClick={() => index === openIndex ? setOpenIndex(-1) : setOpenIndex(index)}
                            className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${isOpen ? 'bg-[#26a8df] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {index + 1}
                                </span>
                                <h4 className={`font-bold text-lg ${isOpen ? 'text-[#26a8df]' : 'text-gray-800'}`}>
                                    {module.title || module.moduleTitle || `Module ${index + 1}`}
                                </h4>
                            </div>
                            {isOpen ? <ChevronUp className="text-[#26a8df]" /> : <ChevronDown className="text-gray-400" />}
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-4 pt-0 border-t border-gray-100/50">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                    {lessons.length > 0 ? (
                                        lessons.map((lesson, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <FileCode size={16} className="text-[#26a8df] mt-0.5 shrink-0" />
                                                <span>{lesson}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-400 use-italic text-sm col-span-2">No detailed lessons listed.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
