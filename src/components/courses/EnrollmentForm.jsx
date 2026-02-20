import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEnrollments } from '../../hooks/useEnrollments';
import { Send, CheckCircle, Smartphone, User, Mail, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EnrollmentForm({ course, batches = [] }) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const { createEnrollment } = useEnrollments();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        try {
            await createEnrollment({
                ...data,
                courseId: course.id,
                // If batch is selected as string 'none' or empty, make it null
                batchId: data.batchId && data.batchId !== 'none' ? parseInt(data.batchId) : null
            });
            setSuccess(true);
            reset();
        } catch (error) {
            // Error handled by hook toast
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-200 shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h3>
                <p className="text-green-700 mb-6">
                    Thank you for showing interest in <strong>{course.title}</strong>. Our team will contact you shortly with further details.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                    Register Another
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-24">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Enroll Now</h3>
                <p className="text-gray-500 text-sm mt-1">Limited seats available for upcoming batches</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <User size={14} className="text-[#26a8df]" /> Full Name
                    </label>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all placeholder:text-gray-400"
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <Mail size={14} className="text-[#26a8df]" /> Email Address
                    </label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all placeholder:text-gray-400"
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <Smartphone size={14} className="text-[#26a8df]" /> Phone Number
                    </label>
                    <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all placeholder:text-gray-400"
                        placeholder="+977 9800000000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>

                {/* Batch Selection */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <Briefcase size={14} className="text-[#26a8df]" /> Preferred Batch
                    </label>
                    <select
                        {...register('batchId')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all bg-white"
                    >
                        <option value="none">I'm flexible / Decide later</option>
                        {batches && batches.map(batch => (
                            <option key={batch.id} value={batch.id}>
                                {batch.name} - {new Date(batch.startDate).toLocaleDateString()} ({batch.mode})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Qualification */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Qualification</label>
                        <select
                            {...register('qualification')}
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all bg-white text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="PhD">PhD</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Profession</label>
                        <select
                            {...register('profession')}
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all bg-white text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="Student">Student</option>
                            <option value="Working">Working</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Job Seeker">Job Seeker</option>
                        </select>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Questions? (Optional)</label>
                    <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26a8df] focus:ring-2 focus:ring-[#26a8df]/20 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Any specific requirements?"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#0D1641] text-white rounded-xl font-bold text-lg shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <>
                            Submit Application <Send size={18} />
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                    By submitting, you agree to our Terms & Privacy Policy.
                </p>
            </form>
        </div>
    );
}
