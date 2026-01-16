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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{contactInfo ? 'Edit Contact Info' : 'Add New Contact Info'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address *</label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Latitude *</label>
            <input
              type="number"
              step="any"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Longitude *</label>
            <input
              type="number"
              step="any"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Working Hours *</label>
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
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