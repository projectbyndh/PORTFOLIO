import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  FileText,
  Users,
  Briefcase,
  Settings,
  Menu,
  X,
  Home,
  Handshake,
  FolderKanban,
  Wrench,
  HelpCircle,
  MessageSquare,
  Phone,
  BookOpen,
  Star,
  UserCheck
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import useAuthStore from '../../Store/useAuthStore';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/ndh-admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
    { icon: Handshake, label: 'Partners', path: '/admin/partners' },
    { icon: Users, label: 'Team', path: '/admin/team' },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
    { icon: Wrench, label: 'Services', path: '/admin/services' },
    { icon: Briefcase, label: 'Careers', path: '/admin/careers' },
    { icon: UserCheck, label: 'Applications', path: '/admin/career-applications' },
    { icon: HelpCircle, label: 'FAQs', path: '/admin/faqs' },
    { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: MessageSquare, label: 'Contacts', path: '/admin/contacts' },
    { icon: Phone, label: 'Contact Info', path: '/admin/contact-info' },
    { icon: BookOpen, label: 'API Docs', path: 'http://localhost:5000/api-docs', external: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] via-white to-[#F0F7FF] flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-xl border-r border-[#4A8EBC]/20 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#4A8EBC]/20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
                NDH Admin
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#4A8EBC]/10"
              >
                <X className="w-5 h-5 text-[#4A8EBC]" />
              </button>
            </div>
            <p className="text-xs text-[#2B4066]/60 mt-1">Content Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto space-y-1">
            {menuItems.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    if (item.external) {
                      window.open(item.path, '_blank');
                    } else {
                      navigate(item.path);
                    }
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg shadow-[#4A8EBC]/25'
                      : 'text-[#2B4066] hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-[#4A8EBC] group-hover:scale-110'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-[#4A8EBC]/20">
            <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-[#4A8EBC]/5 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A2A44] truncate">{user?.username || 'Admin'}</p>
                <p className="text-xs text-[#2B4066]/60">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white/70 backdrop-blur-sm border-b border-[#4A8EBC]/20 sticky top-0 z-40 shadow-lg">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#4A8EBC]/10"
            >
              <Menu className="w-6 h-6 text-[#4A8EBC]" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
              NDH Admin
            </h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#1A2A44]/40 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4A8EBC',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}
