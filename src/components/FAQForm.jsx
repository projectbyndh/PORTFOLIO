import React, { useState, useEffect } from 'react';
import useFAQs from '../hooks/useFAQs';

const FAQForm = ({ faq, onClose, onSuccess }) => {
  const { createFAQ, updateFAQ } = useFAQs();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }
    if (!formData.answer.trim()) {
      newErrors.answer = 'Answer is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const faqData = {
        question: formData.question,
        answer: formData.answer
      };

      if (faq) {
        await updateFAQ(faq.id, faqData);
      } else {
        await createFAQ(faqData);
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      // Error handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A8EBC] mx-auto mb-2"></div>
            <p className="text-sm text-[#4A8EBC]">Saving...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Question
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter the FAQ question"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">{errors.question}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Answer
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter the FAQ answer"
          />
          {errors.answer && (
            <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#4A8EBC]/10">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-2.5 text-sm font-semibold text-[#4A8EBC] bg-[#4A8EBC]/10 hover:bg-[#4A8EBC]/20 rounded-xl transition-all duration-200 border border-[#4A8EBC]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg shadow-[#4A8EBC]/25"
          >
            {submitting ? 'Saving...' : (faq ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FAQForm;