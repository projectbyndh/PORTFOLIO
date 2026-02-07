import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Checks if user is authenticated before allowing access to admin routes
 */
const ProtectedRoute = ({ children }) => {
    // Check if user has a valid token in localStorage
    const token = localStorage.getItem('token');

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/ndh-admin/login" replace />;
    }

    // If token exists, render the protected component
    return children;
};

export default ProtectedRoute;
