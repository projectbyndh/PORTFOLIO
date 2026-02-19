import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'https://apit.ndhtechnologies.com/api',
  timeout: 30000,
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

    // If sending FormData, remove Content-Type header to let axios set it automatically
    // This is crucial for multipart/form-data to work with the correct boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
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

      // Auto logout on 401 Unauthorized (invalid or expired token)
      if (error.response.status === 401) {
        console.warn('🔑 Authentication failed - clearing token and redirecting to login');
        localStorage.removeItem('token');
        // We avoid hard redirect to allow app state to handle it, 
        // but removing the token will cause ProtectedRoute to trigge redirect on next render
        // To be safe, we can force a reload if we are in an admin path
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login';
        }
      }
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
