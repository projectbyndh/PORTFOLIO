import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import BlogManagementOriginal from './BlogManagement';

// Wrapper to add AdminLayout to BlogManagement
export default function BlogManagementWrapped() {
    return <BlogManagementOriginal />;
}
