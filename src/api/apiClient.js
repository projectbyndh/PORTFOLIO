import { ofetch } from 'ofetch';

const apiClient = ofetch.create({
    baseURL: '/api',
    retry: 1,
    onRequest({ options }) {
        const token = localStorage.getItem('token');
        if (token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            };
        }
    },
    onResponseError({ response }) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
            console.warn('🔑 Authentication failed - clearing token and redirecting to login');
            localStorage.removeItem('token');

            // Auto redirect to login if in admin area
            if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/ndh-admin')) {
                // We use a small delay to avoid redirect loops if the login page itself triggers a 401
                if (!window.location.pathname.includes('login')) {
                    window.location.href = '/ndh-admin/login';
                }
            }
        }

        // Log other errors
        if (response.status !== 304) {
            console.error(`Status: ${response.status}`, response._data);
        }
    },
});

export default apiClient;
