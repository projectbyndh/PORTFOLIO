import { useState, useEffect } from 'react';
import { useContactInfo } from '../hooks/useContactInfo';
import toast from 'react-hot-toast';

const ContactInfoForm = ({ contactInfo, onClose, onSuccess }) => {
  const { createContactInfo, updateContactInfo } = useContactInfo();
  const [formData, setFormData] = useState({
    location: {
      address: '',
      latitude: '',
      longitude: '',
    },
    email: '',
    phone: '',
    workingHours: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        location: {
          address: contactInfo.location?.address || '',
          latitude: contactInfo.location?.latitude || '',
          longitude: contactInfo.location?.longitude || '',
        },
        email: contactInfo.email || '',
        phone: contactInfo.phone || '',
        workingHours: contactInfo.workingHours || '',
      });
    }
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: field === 'latitude' || field === 'longitude' ? parseFloat(value) || '' : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        location: {
          ...formData.location,
          latitude: parseFloat(formData.location.latitude),
          longitude: parseFloat(formData.location.longitude),
        },
      };

      if (contactInfo) {
        await updateContactInfo(contactInfo._id, dataToSend);
        toast.success('Contact info updated successfully');
      } else {
        await createContactInfo(dataToSend);
        toast.success('Contact info created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Error saving contact info');
      console.error('Error saving contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1A2A44]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-[#1A2A44]/20 w-full max-w-md max-h-[90vh] overflow-y-auto border border-[#4A8EBC]/10">
        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
          {contactInfo ? 'Edit Contact Info' : 'Add New Contact Info'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Address *</label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Latitude *</label>
            <input
              type="number"
              step="any"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Longitude *</label>
            <input
              type="number"
              step="any"
              name="location.longitude"
              value={formData.location.longitude}
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
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Working Hours *</label>
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              required
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
              {loading ? 'Saving...' : (contactInfo ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfoForm;