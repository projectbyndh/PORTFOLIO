import { useState, useEffect } from 'react';
import { useContactInfo } from '../hooks/useContactInfo';
import ContactInfoForm from '../components/ContactInfoForm';
import toast from 'react-hot-toast';
import { Edit, Trash2, Plus, MapPin, Mail, Phone, Clock } from 'lucide-react';

const ContactInfoManagement = () => {
  const { fetchContactInfo, deleteContactInfo } = useContactInfo();
  const [contactInfos, setContactInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContactInfo, setEditingContactInfo] = useState(null);

  const loadContactInfos = async () => {
    try {
      const data = await fetchContactInfo();
      setContactInfos(data.data || []);
    } catch (error) {
      toast.error('Error loading contact info');
      console.error('Error loading contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContactInfos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact info?')) {
      try {
        await deleteContactInfo(id);
        toast.success('Contact info deleted successfully');
        loadContactInfos();
      } catch (error) {
        toast.error('Error deleting contact info');
        console.error('Error deleting contact info:', error);
      }
    }
  };

  const handleEdit = (contactInfo) => {
    setEditingContactInfo(contactInfo);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingContactInfo(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    loadContactInfos();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingContactInfo(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Info Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact Info
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contactInfos.map((info) => (
          <div key={info._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-gray-600">{info.location?.address}</p>
                  <p className="text-xs text-gray-500">
                    Lat: {info.location?.latitude}, Lng: {info.location?.longitude}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">{info.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{info.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Working Hours</p>
                  <p className="text-sm text-gray-600">{info.workingHours}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Created: {new Date(info.createdAt).toLocaleDateString()}
            </p>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(info)}
                className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(info._id)}
                className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {contactInfos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No contact info found.</p>
        </div>
      )}

      {showForm && (
        <ContactInfoForm
          contactInfo={editingContactInfo}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default ContactInfoManagement;