import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Briefcase, 
  MessageSquare, 
  HelpCircle,
  FolderKanban,
  TrendingUp,
  ArrowRight,
  Clock,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../admin/PageHeader';
import { StatsCard, DataCard, EmptyState, LoadingSpinner } from '../admin/ui';
import useBlogStore from '../../Store/useBlogStore';
import { useContacts } from '../../hooks/useContacts';
import useFAQs from '../../hooks/useFAQs';

/**
 * DashboardOverview - Modern admin dashboard overview page
 */
const DashboardOverview = () => {
  const { blogs, fetchBlogs, loading: blogsLoading } = useBlogStore();
  const { fetchContacts } = useContacts();
  const { faqs, loading: faqsLoading } = useFAQs();
  
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalFAQs: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchBlogs();
        const contactsResponse = await fetchContacts();
        setContacts(contactsResponse.data || []);
        setContactsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setContactsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    setStats({
      totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
      totalContacts: contacts.length,
      totalFAQs: faqs.length,
    });
  }, [blogs, contacts, faqs]);

  // Quick action cards with NDH color theme
  const quickActions = [
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      icon: FileText,
      path: '/admin/blogs',
      color: 'from-[#4A8EBC] to-[#3B5488]',
      count: stats.totalBlogs,
    },
    {
      title: 'Team Members',
      description: 'Manage your team profiles',
      icon: Users,
      path: '/admin/teams',
      color: 'from-[#2DD4BF] to-[#4A8EBC]',
    },
    {
      title: 'Projects',
      description: 'Showcase your portfolio',
      icon: FolderKanban,
      path: '/admin/projects',
      color: 'from-[#8B5CF6] to-[#4A8EBC]',
    },
    {
      title: 'Careers',
      description: 'Post job openings',
      icon: Briefcase,
      path: '/admin/careers',
      color: 'from-[#F59E0B] to-[#EF4444]',
    },
  ];

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your website."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Blogs"
          value={blogsLoading ? '...' : stats.totalBlogs}
          icon={FileText}
          trend={12}
          trendLabel="vs last month"
        />
        <StatsCard
          title="Contact Messages"
          value={contactsLoading ? '...' : stats.totalContacts}
          icon={MessageSquare}
          trend={8}
          trendLabel="vs last month"
        />
        <StatsCard
          title="FAQs"
          value={faqsLoading ? '...' : stats.totalFAQs}
          icon={HelpCircle}
        />
        <StatsCard
          title="Page Views"
          value="2.4K"
          icon={Eye}
          trend={24}
          trendLabel="vs last month"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-[#4A8EBC]/10 hover:border-[#4A8EBC]/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#4A8EBC]/5 to-[#2DD4BF]/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="relative font-bold text-[#1A2A44] mb-1 group-hover:text-[#4A8EBC] transition-colors">
                  {action.title}
                </h3>
                <p className="relative text-sm text-[#2B4066]/60 mb-3">{action.description}</p>
                <div className="relative flex items-center text-sm text-[#4A8EBC] font-semibold">
                  <span>Manage</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <DataCard 
          title="Recent Blogs" 
          actions={
            <Link to="/admin/blogs" className="text-sm text-[#4A8EBC] hover:text-[#3B5488] font-semibold transition-colors">
              View All →
            </Link>
          }
        >
          {blogsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : blogs.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No blogs yet"
              description="Start creating content for your website"
            />
          ) : (
            <div className="space-y-3">
              {(Array.isArray(blogs) ? blogs.slice(0, 5) : []).map((blog) => (
                <div key={blog._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 border border-transparent hover:border-[#4A8EBC]/10">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-12 h-12 rounded-xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A8EBC]/10 to-[#2DD4BF]/10 flex items-center justify-center border border-[#4A8EBC]/10">
                      <FileText className="w-5 h-5 text-[#4A8EBC]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#1A2A44] truncate">{blog.title}</h4>
                    <p className="text-xs text-[#2B4066]/60 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(blog.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DataCard>

        {/* Recent Contacts */}
        <DataCard 
          title="Recent Messages" 
          actions={
            <Link to="/admin/contacts" className="text-sm text-[#4A8EBC] hover:text-[#3B5488] font-semibold transition-colors">
              View All →
            </Link>
          }
        >
          {contactsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : contacts.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No messages yet"
              description="Contact submissions will appear here"
            />
          ) : (
            <div className="space-y-3">
              {contacts.slice(0, 5).map((contact) => (
                <div key={contact._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 border border-transparent hover:border-[#4A8EBC]/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A8EBC] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#4A8EBC]/20">
                    {contact.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-[#1A2A44]">{contact.name}</h4>
                      <span className="text-xs text-[#2B4066]/50">{formatDate(contact.createdAt)}</span>
                    </div>
                    <p className="text-xs text-[#4A8EBC]">{contact.email}</p>
                    <p className="text-sm text-[#2B4066]/70 truncate mt-1">{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DataCard>
      </div>
    </div>
  );
};

export default DashboardOverview;
