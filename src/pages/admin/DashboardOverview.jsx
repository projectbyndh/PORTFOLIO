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

  // Quick action cards
  const quickActions = [
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      icon: FileText,
      path: '/admin/blogs',
      color: 'from-blue-500 to-blue-600',
      count: stats.totalBlogs,
    },
    {
      title: 'Team Members',
      description: 'Manage your team profiles',
      icon: Users,
      path: '/admin/teams',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Projects',
      description: 'Showcase your portfolio',
      icon: FolderKanban,
      path: '/admin/projects',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Careers',
      description: 'Post job openings',
      icon: Briefcase,
      path: '/admin/careers',
      color: 'from-amber-500 to-amber-600',
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
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{action.description}</p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <span>Manage</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/admin/blogs" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
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
            <div className="space-y-4">
              {(Array.isArray(blogs) ? blogs.slice(0, 5) : []).map((blog) => (
                <div key={blog._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 truncate">{blog.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
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
            <Link to="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
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
            <div className="space-y-4">
              {contacts.slice(0, 5).map((contact) => (
                <div key={contact._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                    {contact.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-slate-900">{contact.name}</h4>
                      <span className="text-xs text-slate-400">{formatDate(contact.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-500">{contact.email}</p>
                    <p className="text-sm text-slate-600 truncate mt-1">{contact.message}</p>
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
