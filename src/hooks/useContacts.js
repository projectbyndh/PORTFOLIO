import axios from '../api/axios';

export const useContacts = () => {
  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };

  const createContact = async (contactData) => {
    try {
      const response = await axios.post('/api/contacts', contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const response = await axios.put(`/api/contacts/${id}`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(`/api/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  return {
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };
};