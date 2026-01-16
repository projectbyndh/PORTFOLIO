import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  // baseURL is omitted to use relative paths, handled by Vite proxy
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

// Request interceptor for adding auth tokens or logging
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle 304 Not Modified responses
    if (response.status === 304) {
      console.log('📡 Resource not modified (304) - using cached version');
    }
    return response;
  },
  (error) => {
    // Handle image upload errors silently - they're expected when backend isn't set up
    if (error.config?.url?.includes('/api/upload/image')) {
      return Promise.reject(error);
    }

    // Handle 304 responses in error case
    if (error.response?.status === 304) {
      console.log('📡 Resource not modified (304) - this is normal caching behavior');
      // Return a resolved promise with empty data for 304 responses
      return Promise.resolve({ data: null, status: 304 });
    }

    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
