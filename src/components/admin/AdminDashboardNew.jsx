import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Users,
    Briefcase,
    PlusCircle,
    TrendingUp,
    Handshake,
    FolderKanban,
    Wrench,
    HelpCircle,
    Star
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import usePartners from '../../hooks/usePartners';
import useTeams from '../../hooks/useTeams';
import useProjects from '../../hooks/useProjects';
import useServices from '../../hooks/useServices';
import useBlogStore from '../../Store/useBlogStore';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { partners } = usePartners();
    const { teams } = useTeams();
    const { projects } = useProjects();
    const { services } = useServices();
    const { blogs } = useBlogStore();

    const stats = [
        { icon: FileText, label: 'Blogs', count: blogs?.length || 0, color: 'from-blue-400 to-blue-600', path: '/admin/blogs' },
        { icon: Handshake, label: 'Partners', count: partners?.length || 0, color: 'from-purple-400 to-purple-600', path: '/admin/partners' },
        { icon: Users, label: 'Team Members', count: teams?.length || 0, color: 'from-green-400 to-green-600', path: '/admin/team' },
        { icon: FolderKanban, label: 'Projects', count: projects?.length || 0, color: 'from-orange-400 to-orange-600', path: '/admin/projects' },
        { icon: Wrench, label: 'Services', count: services?.length || 0, color: 'from-pink-400 to-pink-600', path: '/admin/services' },
    ];

    const quickActions = [
        { icon: FileText, label: 'Create Blog', path: '/admin/blogs', color: 'from-[#4A8EBC] to-[#3B5488]' },
        { icon: Handshake, label: 'Add Partner', path: '/admin/partners', color: 'from-purple-500 to-purple-700' },
        { icon: Users, label: 'Add Team Member', path: '/admin/team', color: 'from-green-500 to-green-700' },
        { icon: FolderKanban, label: 'Add Project', path: '/admin/projects', color: 'from-orange-500 to-orange-700' },
        { icon: Wrench, label: 'Add Service', path: '/admin/services', color: 'from-pink-500 to-pink-700' },
        { icon: HelpCircle, label: 'Add FAQ', path: '/admin/faqs', color: 'from-indigo-500 to-indigo-700' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div>
                    <h1 className="text-4xl font-black text-neutral-900 mb-2">Dashboard</h1>
                    <p className="text-neutral-500">Welcome back! Here's what's happening with your website.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {stats.map((stat) => (
                        <button
                            key={stat.label}
                            onClick={() => navigate(stat.path)}
                            className="bg-white rounded-2xl border border-[#4A8EBC]/10 p-6 hover:shadow-xl hover:shadow-[#4A8EBC]/10 transition-all duration-300 group text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon className={`w-24 h-24 text-${stat.color.split('-')[1]}-500`} />
                            </div>

                            <div className="relative z-10 flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg shadow-${stat.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="bg-green-50 px-2 py-1 rounded-lg border border-green-100 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-green-600" />
                                    <span className="text-xs font-semibold text-green-700">+12%</span>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <p className="text-3xl font-black text-[#1A2A44] mb-1">{stat.count}</p>
                                <p className="text-sm font-medium text-[#2B4066]/60">{stat.label}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => navigate(action.path)}
                                className={`flex items-center gap-3 p-4 bg-gradient-to-r ${action.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-1`}
                            >
                                <action.icon className="w-5 h-5" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {blogs?.slice(0, 5).map((blog) => (
                            <div key={blog._id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-neutral-900">{blog.title}</p>
                                    <p className="text-sm text-neutral-500">Blog post created</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/admin/blogs`)}
                                    className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all text-sm font-medium"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                        {(!blogs || blogs.length === 0) && (
                            <p className="text-center text-neutral-500 py-8">No recent activity</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
