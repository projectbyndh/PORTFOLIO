import React, { useState } from "react";
import { Upload, Send, Loader2, CheckCircle, FileText, Mail, User, Phone, MessageSquare } from "lucide-react";
import axios from "../api/axios";
import toast from "react-hot-toast";

export default function CareerApplicationForm({ career, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setCvFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error('Please upload your CV');
      return;
    }

    try {
      setSubmitting(true);

      // Create FormData for file upload
      const data = new FormData();
      data.append('careerId', career.id);
      data.append('careerTitle', career.title);
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('coverLetter', formData.coverLetter);
      data.append('cv', cvFile);

      const response = await axios.post('/career-applications', data);

      if (response.data.success) {
        setSuccess(true);
        toast.success('Application submitted successfully!');

        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            coverLetter: "",
          });
          setCvFile(null);
          setSuccess(false);
          if (onClose) onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-[#26a8df] mb-2">Application Submitted!</h3>
        <p className="text-[#26a8df]/70">We'll review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#26a8df] mb-2">Apply for {career.title}</h2>
        <p className="text-[#26a8df]/70">Fill in your details and upload your CV to apply</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
            placeholder="your.email@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            <Phone className="inline w-4 h-4 mr-1" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
            placeholder="+977 98XXXXXXXX"
            required
          />
        </div>

        {/* CV Upload */}
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            <FileText className="inline w-4 h-4 mr-1" />
            Upload CV/Resume *
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="cv-upload"
              required
            />
            <label
              htmlFor="cv-upload"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-[#26a8df]/30 rounded-xl cursor-pointer hover:border-[#26a8df] hover:bg-[#26a8df]/5 transition-all"
            >
              <Upload size={20} className="text-[#26a8df]" />
              <span className="text-[#26a8df]">
                {cvFile ? cvFile.name : 'Click to upload CV (PDF, DOC, DOCX - Max 5MB)'}
              </span>
            </label>
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Cover Letter (Optional)
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all resize-none"
            placeholder="Tell us why you're a great fit for this position..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-[#26a8df] bg-[#26a8df]/10 hover:bg-[#26a8df]/20 rounded-xl font-semibold transition-all"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
