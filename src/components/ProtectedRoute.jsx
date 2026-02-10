import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../Store/useAuthStore';

/**
 * ProtectedRoute Component
 * Verifies authentication with backend before allowing access to admin routes
 */
const ProtectedRoute = ({ children }) => {
    const { verifyToken } = useAuthStore();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            setIsVerifying(true);
            const result = await verifyToken();
            setIsAuthenticated(result.success);
            setIsVerifying(false);
        };

        checkAuthentication();
    }, [verifyToken]);

    // Show loading state while verifying
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] via-white to-[#F0F7FF] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#4A8EBC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#2B4066] font-semibold">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/ndh-admin/login" replace />;
    }

    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
