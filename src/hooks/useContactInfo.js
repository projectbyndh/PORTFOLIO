import axios from '../api/axios';

export const useContactInfo = () => {
  const fetchContactInfo = async () => {
    try {
      const response = await axios.get('/contact-info');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      throw error;
    }
  };

  const createContactInfo = async (contactInfoData) => {
    try {
      const response = await axios.post('/contact-info', contactInfoData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact info:', error);
      throw error;
    }
  };

  const updateContactInfo = async (id, contactInfoData) => {
    try {
      const response = await axios.put(`/contact-info/${id}`, contactInfoData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  };

  const deleteContactInfo = async (id) => {
    try {
      const response = await axios.delete(`/contact-info/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact info:', error);
      throw error;
    }
  };

  return {
    fetchContactInfo,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo,
  };
};