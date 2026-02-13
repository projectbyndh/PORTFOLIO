import React, { useState, useEffect, useMemo } from 'react';
import { MessageSquare, Mail, Phone, Building2, Calendar, Eye } from 'lucide-react';
import { useContacts } from '../../hooks/useContacts';
import PageHeader from '../admin/PageHeader';
import {
  DataCard,
  EmptyState,
  PageLoader,
  ErrorState,
  Button,
  StatusBadge,
  DataTable,
  TableFilters,
  TableRowActions,
  Pagination,
  Modal,
  ConfirmModal,
  FormGroup,
  Input,
  Textarea,
  Select,
  FormModal,
} from '../admin/ui';
import toast from 'react-hot-toast';

/**
 * ContactManagement - Refactored contact management page with DataTable
 */
const ContactManagement = () => {
  const { fetchContacts, createContact, updateContact, deleteContact } = useContacts();
  
  // Data state
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  
  // Modal states
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    serviceInterested: '',
    message: '',
  });

  const itemsPerPage = 10;

  // Load contacts
  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchContacts();
      setContacts(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Filter and sort data
  const filteredContacts = useMemo(() => {
    let result = [...contacts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(query) ||
          contact.email?.toLowerCase().includes(query) ||
          contact.companyName?.toLowerCase().includes(query) ||
          contact.serviceInterested?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        const comparison = aVal.toString().localeCompare(bVal.toString());
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [contacts, searchQuery, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Table columns
  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
            {row.name?.charAt(0) || '?'}
          </div>
          <div>
            <p className="font-medium text-[#0D1641]">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phoneNumber',
      header: 'Phone',
      render: (value) => (
        <div className="flex items-center gap-1.5 text-slate-600">
          <Phone className="w-3.5 h-3.5" />
          {value || 'N/A'}
        </div>
      ),
    },
    {
      key: 'companyName',
      header: 'Company',
      render: (value) => (
        <div className="flex items-center gap-1.5 text-slate-600">
          <Building2 className="w-3.5 h-3.5" />
          {value || '—'}
        </div>
      ),
    },
    {
      key: 'serviceInterested',
      header: 'Service',
      render: (value) => (
        <StatusBadge status={value || 'General'} />
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (value) => (
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <Calendar className="w-3.5 h-3.5" />
          {value ? new Date(value).toLocaleDateString() : 'N/A'}
        </div>
      ),
    },
  ];

  // Handlers
  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsViewOpen(true);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setFormData({
      name: contact.name || '',
      email: contact.email || '',
      phoneNumber: contact.phoneNumber || '',
      companyName: contact.companyName || '',
      serviceInterested: contact.serviceInterested || '',
      message: contact.message || '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteOpen(true);
  };

  const handleCreate = () => {
    setSelectedContact(null);
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      serviceInterested: '',
      message: '',
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (selectedContact) {
        await updateContact(selectedContact._id, formData);
        toast.success('Contact updated successfully');
      } else {
        await createContact(formData);
        toast.success('Contact created successfully');
      }
      setIsFormOpen(false);
      loadContacts();
    } catch (err) {
      toast.error(err.message || 'Failed to save contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedContact) return;
    setIsDeleting(true);
    try {
      await deleteContact(selectedContact._id);
      toast.success('Contact deleted successfully');
      setIsDeleteOpen(false);
      loadContacts();
    } catch (err) {
      toast.error(err.message || 'Failed to delete contact');
    } finally {
      setIsDeleting(false);
    }
  };

  // Loading state
  if (loading && contacts.length === 0) {
    return <PageLoader />;
  }

  // Error state
  if (error && contacts.length === 0) {
    return <ErrorState message={error} onRetry={loadContacts} />;
  }

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Contact Management"
        description="View and manage contact form submissions"
        badge={`${contacts.length} Contacts`}
        onRefresh={loadContacts}
        isRefreshing={loading}
        primaryAction={{
          label: 'Add Contact',
          onClick: handleCreate,
        }}
      />

      {/* Filters and Table */}
      <DataCard noPadding>
        <div className="p-4 border-b border-slate-100">
          <TableFilters
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search contacts..."
          />
        </div>

        <DataTable
          columns={columns}
          data={paginatedContacts}
          loading={loading}
          sortable
          currentSort={sortConfig}
          onSort={setSortConfig}
          emptyState={
            <EmptyState
              icon={MessageSquare}
              title="No contacts found"
              description={searchQuery ? 'Try adjusting your search' : 'No contact submissions yet'}
            />
          }
          rowActions={(row) => (
            <TableRowActions
              onView={() => handleView(row)}
              onEdit={() => handleEdit(row)}
              onDelete={() => handleDelete(row)}
            />
          )}
        />

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredContacts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </DataCard>

      {/* View Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Contact Details"
        size="md"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                {selectedContact.name?.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0D1641]">{selectedContact.name}</h3>
                <p className="text-slate-500">{selectedContact.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Phone</label>
                <p className="text-[#0D1641]">{selectedContact.phoneNumber || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Company</label>
                <p className="text-[#0D1641]">{selectedContact.companyName || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-slate-500 uppercase">Service Interested</label>
                <p className="text-[#0D1641]">{selectedContact.serviceInterested || 'General'}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 uppercase">Message</label>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-lg mt-1">
                {selectedContact.message || 'No message'}
              </p>
            </div>

            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              Submitted on {new Date(selectedContact.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedContact ? 'Edit Contact' : 'Add Contact'}
        submitLabel={selectedContact ? 'Update' : 'Create'}
        loading={isSubmitting}
      >
        <FormGroup>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>
          <Input
            label="Service Interested"
            name="serviceInterested"
            value={formData.serviceInterested}
            onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
            required
          />
          <Textarea
            label="Message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            required
          />
        </FormGroup>
      </FormModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete the contact from ${selectedContact?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default ContactManagement;
