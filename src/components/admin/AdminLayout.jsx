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
  BookOpen,
  Star,
  UserCheck,
  Layers
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
    { icon: Layers, label: 'Categories', path: '/admin/categories' },
    { icon: Wrench, label: 'Services', path: '/admin/services' },
    { icon: Briefcase, label: 'Careers', path: '/admin/careers' },
    { icon: UserCheck, label: 'Applications', path: '/admin/career-applications' },
    { icon: HelpCircle, label: 'FAQs', path: '/admin/faqs' },
    { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: MessageSquare, label: 'Contacts', path: '/admin/contacts' },
    { icon: BookOpen, label: 'API Docs', path: 'http://127.0.0.1:5000/api-docs', external: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] via-white to-[#F0F7FF] flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-xl border-r border-[#26a8df]/20 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#26a8df]/20">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  navigate('/admin/dashboard');
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 group transition-all hover:scale-105"
              >
                <img
                  src="/src/assets/NDH technologies_logo@4x-100.jpg"
                  alt="NDH Technologies"
                  className="h-12 w-auto object-contain"
                />
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#26a8df]/10"
              >
                <X className="w-5 h-5 text-[#26a8df]" />
              </button>
            </div>
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
                      ? 'bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white shadow-lg shadow-[#26a8df]/25'
                      : 'text-[#26a8df] hover:bg-[#26a8df]/10 hover:text-[#26a8df]'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-[#26a8df] group-hover:scale-110'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-[#26a8df]/20">
            <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-[#26a8df]/5 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#26a8df] to-[#26a8df] flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#26a8df] truncate">{user?.username || 'Admin'}</p>
                <p className="text-xs text-[#26a8df]/60">Administrator</p>
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
        <header className="lg:hidden bg-white/70 backdrop-blur-sm border-b border-[#26a8df]/20 sticky top-0 z-40 shadow-lg">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#26a8df]/10"
            >
              <Menu className="w-6 h-6 text-[#26a8df]" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
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
          className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md z-40 lg:hidden"
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
              primary: '#26a8df',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}
