import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  Bell,
  Search,
  FolderKanban,
  Wrench,
  Handshake,
  MapPin,
  Home,
  Sparkles,
  Crown,
  Zap,
} from 'lucide-react';
import useAuthStore from '../../Store/useAuthStore';

/**
 * AdminLayout - Premium admin panel with beautiful sidebar
 * Aligned with NDH Technologies brand design
 */

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
    description: 'Overview & Stats',
  },
  {
    label: 'Blogs',
    icon: FileText,
    path: '/admin/blogs',
    description: 'Manage blog posts',
  },
  {
    label: 'Teams',
    icon: Users,
    path: '/admin/teams',
    description: 'Team members',
  },
  {
    label: 'Careers',
    icon: Briefcase,
    path: '/admin/careers',
    description: 'Job openings',
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    path: '/admin/projects',
    description: 'Portfolio items',
  },
  {
    label: 'Services',
    icon: Wrench,
    path: '/admin/services',
    description: 'Service offerings',
  },
  {
    label: 'Partners',
    icon: Handshake,
    path: '/admin/partners',
    description: 'Partner companies',
  },
  {
    label: 'FAQs',
    icon: HelpCircle,
    path: '/admin/faqs',
    description: 'FAQ management',
  },
  {
    label: 'Contacts',
    icon: MessageSquare,
    path: '/admin/contacts',
    description: 'Contact messages',
  },
  {
    label: 'Contact Info',
    icon: MapPin,
    path: '/admin/contact-info',
    description: 'Contact details',
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#4A8EBC]/20 to-[#2DD4BF]/10 blur-3xl"></div>
        <div className="absolute bottom-40 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-[#F59E0B]/10 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#3B5488]/10 to-[#2DD4BF]/5 blur-xl"></div>
      </div>

      {/* Logo Section */}
      <div className={`relative flex items-center h-20 px-4 border-b border-[#4A8EBC]/10 ${sidebarOpen || isMobile ? 'justify-between' : 'justify-center'}`}>
        <Link to="/admin/dashboard" className="flex items-center gap-3 group">
          {/* Logo Icon */}
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-[#4A8EBC] via-[#3B5488] to-[#2DD4BF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4A8EBC]/30 group-hover:shadow-xl group-hover:shadow-[#4A8EBC]/40 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg tracking-tight">N</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#2DD4BF] to-[#8B5CF6] rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          {(sidebarOpen || isMobile) && (
            <div className="overflow-hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent whitespace-nowrap">
                NDH Admin
              </h1>
              <p className="text-[10px] text-[#2B4066]/60 font-medium tracking-wide">
                Control Center
              </p>
            </div>
          )}
        </Link>
        
        {/* Toggle Button - Desktop Only */}
        {!isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 rounded-xl hover:bg-[#4A8EBC]/10 text-[#4A8EBC] transition-all duration-300 group"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            ) : (
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
        )}

        {/* Close Button - Mobile Only */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl hover:bg-[#4A8EBC]/10 text-[#4A8EBC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Stats - Only when expanded */}
      {(sidebarOpen || isMobile) && (
        <div className="relative px-4 py-4 border-b border-[#4A8EBC]/10">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-[#4A8EBC]/10 to-[#2DD4BF]/5 rounded-xl p-3 border border-[#4A8EBC]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4A8EBC] to-[#3B5488] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1A2A44]">24</p>
                  <p className="text-[10px] text-[#2B4066]/60">Active</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#F59E0B]/5 rounded-xl p-3 border border-[#8B5CF6]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1A2A44]">Pro</p>
                  <p className="text-[10px] text-[#2B4066]/60">Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4A8EBC]/20 scrollbar-track-transparent">
        {(sidebarOpen || isMobile) && (
          <p className="px-3 text-[10px] font-semibold text-[#2B4066]/50 uppercase tracking-widest mb-3">
            Main Menu
          </p>
        )}
        
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          const isHovered = hoveredItem === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                relative flex items-center gap-3 px-3 py-3 rounded-2xl font-medium text-sm
                transition-all duration-300 group overflow-hidden
                ${sidebarOpen || isMobile ? '' : 'justify-center'}
                ${isActive
                  ? 'text-white shadow-lg'
                  : 'text-[#2B4066]/70 hover:text-[#1A2A44]'
                }
              `}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Active/Hover Background */}
              <div 
                className={`
                  absolute inset-0 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#4A8EBC] via-[#3B5488] to-[#2DD4BF] opacity-100' 
                    : 'bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 opacity-0 group-hover:opacity-100'
                  }
                `}
              />
              
              {/* Glow Effect for Active */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4A8EBC] to-[#2DD4BF] blur-xl opacity-40" />
              )}

              {/* Icon */}
              <div className={`
                relative z-10 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${isActive 
                  ? 'bg-white/20' 
                  : 'bg-gradient-to-br from-[#4A8EBC]/10 to-[#2DD4BF]/10 group-hover:from-[#4A8EBC]/20 group-hover:to-[#2DD4BF]/20'
                }
              `}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : 'text-[#4A8EBC]'}`} />
              </div>

              {/* Label & Description */}
              {(sidebarOpen || isMobile) && (
                <div className="relative z-10 flex-1 min-w-0">
                  <span className={`block font-semibold transition-colors ${isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                  <span className={`text-[10px] transition-colors ${isActive ? 'text-white/70' : 'text-[#2B4066]/50'}`}>
                    {item.description}
                  </span>
                </div>
              )}

              {/* Active Indicator */}
              {isActive && (sidebarOpen || isMobile) && (
                <div className="relative z-10 w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50" />
              )}

              {/* Tooltip for collapsed state */}
              {!sidebarOpen && !isMobile && (
                <div className={`
                  absolute left-full ml-4 px-3 py-2 bg-[#1A2A44] text-white text-sm rounded-xl
                  shadow-xl shadow-[#1A2A44]/20 whitespace-nowrap z-50
                  transition-all duration-200 pointer-events-none
                  ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                `}>
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-[10px] text-white/60">{item.description}</div>
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#1A2A44] rotate-45" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="relative border-t border-[#4A8EBC]/10 p-4">
        {/* User Profile */}
        <div className={`flex items-center gap-3 mb-3 ${sidebarOpen || isMobile ? '' : 'justify-center'}`}>
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A8EBC] via-[#8B5CF6] to-[#2DD4BF] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#4A8EBC]/20">
              {user?.name?.charAt(0) || user?.username?.charAt(0) || 'A'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          
          {(sidebarOpen || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1A2A44] truncate">
                {user?.name || user?.username || 'Administrator'}
              </p>
              <p className="text-xs text-[#2B4066]/60 truncate">
                {user?.email || 'admin@ndh.com'}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-2 ${sidebarOpen || isMobile ? '' : 'flex-col'}`}>
          <Link
            to="/admin/settings"
            className={`
              flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 text-[#4A8EBC]
              hover:from-[#4A8EBC]/20 hover:to-[#2DD4BF]/20 transition-all duration-300
              border border-[#4A8EBC]/10 hover:border-[#4A8EBC]/30
              ${sidebarOpen || isMobile ? 'flex-1' : ''}
            `}
          >
            <Settings className="w-4 h-4" />
            {(sidebarOpen || isMobile) && <span>Settings</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className={`
              flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600
              hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300
              border border-red-500/10 hover:border-red-500/30
              ${sidebarOpen || isMobile ? 'flex-1' : ''}
            `}
          >
            <LogOut className="w-4 h-4" />
            {(sidebarOpen || isMobile) && <span>Logout</span>}
          </button>
        </div>

        {/* Back to Website */}
        {(sidebarOpen || isMobile) && (
          <Link
            to="/"
            className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              bg-gradient-to-r from-[#1A2A44] to-[#3B5488] text-white
              hover:from-[#3B5488] hover:to-[#4A8EBC] transition-all duration-300
              shadow-lg shadow-[#1A2A44]/20 hover:shadow-xl hover:shadow-[#4A8EBC]/30
              border border-[#4A8EBC]/20"
          >
            <Home className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#F0F9FF] relative">
      {/* Decorative Background Elements for Main Area */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#4A8EBC]/5 to-[#2DD4BF]/3 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-[#8B5CF6]/5 to-[#F59E0B]/3 blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #4A8EBC 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#1A2A44]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl 
          transform transition-transform duration-300 ease-out lg:hidden
          border-r border-[#4A8EBC]/10
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent isMobile={true} />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:block fixed inset-y-0 left-0 z-30 
          bg-white/90 backdrop-blur-xl border-r border-[#4A8EBC]/10
          transition-all duration-300 ease-out
          ${sidebarOpen ? 'w-72' : 'w-24'}
        `}
        style={{
          boxShadow: '4px 0 30px -10px rgba(74, 142, 188, 0.15)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div
        className={`
          relative z-10 transition-all duration-300 ease-out
          ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}
        `}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-[#4A8EBC]/10">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 text-[#4A8EBC] hover:from-[#4A8EBC]/20 hover:to-[#2DD4BF]/20 transition-all duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg ml-4 lg:ml-0">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A8EBC]/60 group-focus-within:text-[#4A8EBC] transition-colors" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-11 pr-4 py-2.5 text-sm bg-gradient-to-r from-[#4A8EBC]/5 to-[#2DD4BF]/5 border border-[#4A8EBC]/10 rounded-xl
                    focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC]/30 focus:bg-white 
                    transition-all duration-300 placeholder:text-[#2B4066]/40"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Notification Button */}
              <button className="relative p-2.5 rounded-xl bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 text-[#4A8EBC] hover:from-[#4A8EBC]/20 hover:to-[#2DD4BF]/20 transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full border-2 border-white"></span>
              </button>
              
              {/* Settings Button - Mobile */}
              <Link
                to="/admin/settings"
                className="lg:hidden p-2.5 rounded-xl bg-gradient-to-r from-[#4A8EBC]/10 to-[#2DD4BF]/10 text-[#4A8EBC] hover:from-[#4A8EBC]/20 hover:to-[#2DD4BF]/20 transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </Link>

              {/* User Avatar - Desktop */}
              <div className="hidden lg:flex items-center gap-3 pl-3 ml-2 border-l border-[#4A8EBC]/10">
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1A2A44]">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-[#2B4066]/60">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#4A8EBC] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-[#4A8EBC]/20">
                  {user?.name?.charAt(0) || 'A'}
                </div>
              </div>
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
