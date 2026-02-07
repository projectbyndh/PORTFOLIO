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
  CheckCircle,
  AlertCircle,
  UserCheck,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../admin/PageHeader';
import { StatsCard, DataCard, EmptyState, LoadingSpinner } from '../admin/ui';
import useBlogStore from '../../Store/useBlogStore';
import { useContacts } from '../../hooks/useContacts';
import useFAQs from '../../hooks/useFAQs';
import useTeams from '../../hooks/useTeams';
import { useCareers } from '../../hooks/useCareers';
import axios from '../../api/axios';

/**
 * DashboardOverview - Enhanced admin dashboard with comprehensive stats
 */
const DashboardOverview = () => {
  const { blogs, fetchBlogs, loading: blogsLoading } = useBlogStore();
  const { fetchContacts } = useContacts();
  const { faqs, loading: faqsLoading } = useFAQs();
  const { teams, loading: teamsLoading } = useTeams();
  const { careers, loading: careersLoading } = useCareers();

  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalFAQs: 0,
    totalTeams: 0,
    totalCareers: 0,
    totalApplications: 0,
    totalProjects: 0,
    pendingApplications: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all data
        await fetchBlogs();

        const contactsResponse = await fetchContacts();
        setContacts(contactsResponse.data || []);
        setContactsLoading(false);

        // Fetch career applications
        try {
          const appsResponse = await axios.get('/api/career-applications');
          if (appsResponse.data.success) {
            setApplications(appsResponse.data.data || []);
          }
        } catch (error) {
          console.error('Error loading applications:', error);
        }
        setApplicationsLoading(false);

        // Fetch projects
        try {
          const projectsResponse = await axios.get('/api/projects');
          if (projectsResponse.data.success) {
            setProjects(projectsResponse.data.data || []);
          }
        } catch (error) {
          console.error('Error loading projects:', error);
        }
        setProjectsLoading(false);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setContactsLoading(false);
        setApplicationsLoading(false);
        setProjectsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const pendingApps = applications.filter(app => app.status === 'pending').length;

    setStats({
      totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
      totalContacts: contacts.length,
      totalFAQs: faqs.length,
      totalTeams: teams.length,
      totalCareers: careers.length,
      totalApplications: applications.length,
      totalProjects: projects.length,
      pendingApplications: pendingApps,
    });
  }, [blogs, contacts, faqs, teams, careers, applications, projects]);

  // Quick action cards with NDH color theme
  const quickActions = [
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      icon: FileText,
      path: '/admin/blogs',
      color: 'from-[#4A8EBC] to-[#3B5488]',
      count: stats.totalBlogs,
      label: 'Posts',
    },
    {
      title: 'Team Members',
      description: 'Manage your team profiles',
      icon: Users,
      path: '/admin/teams',
      color: 'from-[#2DD4BF] to-[#4A8EBC]',
      count: stats.totalTeams,
      label: 'Members',
    },
    {
      title: 'Projects',
      description: 'Showcase your portfolio',
      icon: FolderKanban,
      path: '/admin/projects',
      color: 'from-[#8B5CF6] to-[#4A8EBC]',
      count: stats.totalProjects,
      label: 'Projects',
    },
    {
      title: 'Career Applications',
      description: 'Review job applications',
      icon: Briefcase,
      path: '/admin/career-applications',
      color: 'from-[#F59E0B] to-[#EF4444]',
      count: stats.pendingApplications,
      label: 'Pending',
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

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shortlisted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
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
          title="Job Applications"
          value={applicationsLoading ? '...' : stats.totalApplications}
          icon={UserCheck}
          trend={15}
          trendLabel="vs last month"
        />
        <StatsCard
          title="Active Projects"
          value={projectsLoading ? '...' : stats.totalProjects}
          icon={Layers}
          trend={5}
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

                {action.count !== undefined && (
                  <div className="relative flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-[#1A2A44]">{action.count}</span>
                    <span className="text-xs text-[#2B4066]/60">{action.label}</span>
                  </div>
                )}

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                <div key={blog.id || blog._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 border border-transparent hover:border-[#4A8EBC]/10">
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

        {/* Recent Applications */}
        <DataCard
          title="Recent Applications"
          actions={
            <Link to="/admin/career-applications" className="text-sm text-[#4A8EBC] hover:text-[#3B5488] font-semibold transition-colors">
              View All →
            </Link>
          }
        >
          {applicationsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : applications.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No applications yet"
              description="Job applications will appear here"
            />
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 border border-transparent hover:border-[#4A8EBC]/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#F59E0B]/20">
                    {app.fullName?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-[#1A2A44]">{app.fullName}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A8EBC] mb-1">{app.careerTitle}</p>
                    <p className="text-xs text-[#2B4066]/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(app.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DataCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div key={contact.id || contact._id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 border border-transparent hover:border-[#4A8EBC]/10">
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

        {/* Recent Projects */}
        <DataCard
          title="Recent Projects"
          actions={
            <Link to="/admin/projects" className="text-sm text-[#4A8EBC] hover:text-[#3B5488] font-semibold transition-colors">
              View All →
            </Link>
          }
        >
          {projectsLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : projects.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Start showcasing your work"
            />
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 border border-transparent hover:border-[#4A8EBC]/10">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-12 h-12 rounded-xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6]/10 to-[#4A8EBC]/10 flex items-center justify-center border border-[#8B5CF6]/10">
                      <FolderKanban className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#1A2A44] truncate">{project.title}</h4>
                    <p className="text-xs text-[#4A8EBC]">{project.category}</p>
                    <p className="text-xs text-[#2B4066]/60 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(project.createdAt)}
                    </p>
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
