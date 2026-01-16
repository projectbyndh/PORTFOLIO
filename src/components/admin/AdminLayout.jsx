import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  FolderKanban,
  Wrench,
  Handshake,
  Mail,
  MapPin,
} from 'lucide-react';
import useAuthStore from '../../Store/useAuthStore';

/**
 * AdminLayout - Shared layout wrapper for all admin pages
 * Features: Collapsible sidebar, responsive design, route-based active state
 */

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
  },
  {
    label: 'Blogs',
    icon: FileText,
    path: '/admin/blogs',
  },
  {
    label: 'Teams',
    icon: Users,
    path: '/admin/teams',
  },
  {
    label: 'Careers',
    icon: Briefcase,
    path: '/admin/careers',
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    path: '/admin/projects',
  },
  {
    label: 'Services',
    icon: Wrench,
    path: '/admin/services',
  },
  {
    label: 'Partners',
    icon: Handshake,
    path: '/admin/partners',
  },
  {
    label: 'FAQs',
    icon: HelpCircle,
    path: '/admin/faqs',
  },
  {
    label: 'Contacts',
    icon: MessageSquare,
    path: '/admin/contacts',
  },
  {
    label: 'Contact Info',
    icon: MapPin,
    path: '/admin/contact-info',
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-sm">NDH</span>
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-slate-800 text-lg tracking-tight">
              Admin Panel
            </span>
          )}
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <ChevronRight
            className={`w-5 h-5 transition-transform duration-300 ${
              sidebarOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-200 group relative
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                }`}
              />
              {sidebarOpen && <span>{item.label}</span>}
              {!sidebarOpen && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-200 p-4">
        <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || 'admin@ndh.com'}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`
            mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
            text-red-600 hover:bg-red-50 transition-colors
            ${sidebarOpen ? '' : 'justify-center'}
          `}
        >
          <LogOut className="w-4 h-4" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 lg:hidden
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:block fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200
          transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md ml-4 lg:ml-0">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link
                to="/admin/settings"
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
