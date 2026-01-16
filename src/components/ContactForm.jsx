import { useState, useEffect } from 'react';
import { useContacts } from '../hooks/useContacts';
import toast from 'react-hot-toast';

const ContactForm = ({ contact, onClose, onSuccess }) => {
  const { createContact, updateContact } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    serviceInterested: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phoneNumber: contact.phoneNumber || '',
        companyName: contact.companyName || '',
        serviceInterested: contact.serviceInterested || '',
        message: contact.message || '',
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contact) {
        await updateContact(contact._id, formData);
        toast.success('Contact updated successfully');
      } else {
        await createContact(formData);
        toast.success('Contact created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Error saving contact');
      console.error('Error saving contact:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1A2A44]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-[#1A2A44]/20 w-full max-w-md max-h-[90vh] overflow-y-auto border border-[#4A8EBC]/10">
        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
          {contact ? 'Edit Contact' : 'Add New Contact'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Phone Number *</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Service Interested *</label>
            <input
              type="text"
              name="serviceInterested"
              value={formData.serviceInterested}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-[#4A8EBC]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-[#4A8EBC] bg-[#4A8EBC]/10 hover:bg-[#4A8EBC]/20 rounded-xl transition-all duration-200 border border-[#4A8EBC]/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] disabled:opacity-50 rounded-xl transition-all duration-200 shadow-lg shadow-[#4A8EBC]/25"
            >
              {loading ? 'Saving...' : (contact ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;