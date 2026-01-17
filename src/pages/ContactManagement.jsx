import { useState, useEffect } from 'react';
import { useContacts } from '../hooks/useContacts';
import ContactForm from '../components/ContactForm';
import toast from 'react-hot-toast';
import { Edit, Trash2, Plus } from 'lucide-react';
import React from 'react';
const ContactManagement = () => {
  const { fetchContacts, deleteContact } = useContacts();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const loadContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data.data || []);
    } catch (error) {
      toast.error('Error loading contacts');
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        toast.success('Contact deleted successfully');
        loadContacts();
      } catch (error) {
        toast.error('Error deleting contact');
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    loadContacts();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{contact.name}</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {contact.email}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> {contact.phoneNumber}</p>
            {contact.companyName && (
              <p className="text-sm text-gray-600 mb-1"><strong>Company:</strong> {contact.companyName}</p>
            )}
            <p className="text-sm text-gray-600 mb-1"><strong>Service:</strong> {contact.serviceInterested}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Message:</strong> {contact.message}</p>
            <p className="text-xs text-gray-500">Created: {new Date(contact.createdAt).toLocaleDateString()}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(contact)}
                className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No contacts found.</p>
        </div>
      )}

      {showForm && (
        <ContactForm
          contact={editingContact}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default ContactManagement;