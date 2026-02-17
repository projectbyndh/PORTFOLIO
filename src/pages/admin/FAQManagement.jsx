import React, { useState } from 'react';
import { HelpCircle, Edit, Trash2, Plus, Calendar } from 'lucide-react';
import useFAQs from '../../hooks/useFAQs';
import PageHeader from '../admin/PageHeader';
import {
  DataCard,
  EmptyState,
  PageLoader,
  ErrorState,
  Button,
  IconButton,
  FormModal,
  Input,
  Textarea,
  FormGroup,
  ConfirmModal,
} from '../admin/ui';
import toast from 'react-hot-toast';

/**
 * FAQManagement - Refactored FAQ management page with consistent UI
 */
const FAQManagement = () => {
  const { faqs, loading, error, createFAQ, updateFAQ, deleteFAQ, fetchFAQs } = useFAQs();

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [deletingFAQ, setDeletingFAQ] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  // Open create modal
  const handleOpenCreate = () => {
    setEditingFAQ(null);
    setFormData({ question: '', answer: '' });
    setIsFormOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
    });
    setIsFormOpen(true);
  };

  // Open delete confirmation
  const handleOpenDelete = (faq) => {
    setDeletingFAQ(faq);
    setIsDeleteOpen(true);
  };

  // Close modals
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingFAQ(null);
    setFormData({ question: '', answer: '' });
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setDeletingFAQ(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingFAQ) {
        await updateFAQ(editingFAQ.id || editingFAQ._id, formData);
        toast.success('FAQ updated successfully');
      } else {
        await createFAQ(formData);
        toast.success('FAQ created successfully');
      }
      handleCloseForm();
    } catch (err) {
      toast.error(err.message || 'Failed to save FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deletingFAQ) return;

    setIsDeleting(true);
    try {
      await deleteFAQ(deletingFAQ.id || deletingFAQ._id);
      toast.success('FAQ deleted successfully');
      handleCloseDelete();
    } catch (err) {
      toast.error(err.message || 'Failed to delete FAQ');
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading && faqs.length === 0) {
    return <PageLoader />;
  }

  // Error state
  if (error && faqs.length === 0) {
    return <ErrorState message={error} onRetry={fetchFAQs} />;
  }

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="FAQ Management"
        description="Manage frequently asked questions for your website"
        badge={`${faqs.length} FAQs`}
        onRefresh={fetchFAQs}
        isRefreshing={loading}
        primaryAction={{
          label: 'Add FAQ',
          onClick: handleOpenCreate,
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* FAQ List */}
      {faqs.length === 0 ? (
        <DataCard>
          <EmptyState
            icon={HelpCircle}
            title="No FAQs yet"
            description="Create your first FAQ to help users find answers quickly."
            action={
              <Button onClick={handleOpenCreate} icon={<Plus className="w-4 h-4" />}>
                Add First FAQ
              </Button>
            }
          />
        </DataCard>
      ) : (
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <DataCard key={faq.id || faq._id}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Question */}
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded mb-2">
                      Question
                    </span>
                    <h3 className="text-lg font-semibold text-[#0D1641]">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Answer */}
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded mb-2">
                      Answer
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Created: {formatDate(faq.createdAt)}
                    </span>
                    {faq.updatedAt && faq.updatedAt !== faq.createdAt && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Updated: {formatDate(faq.updatedAt)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:flex-col">
                  <IconButton
                    icon={<Edit className="w-4 h-4" />}
                    onClick={() => handleOpenEdit(faq)}
                    tooltip="Edit FAQ"
                    variant="primary"
                  />
                  <IconButton
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleOpenDelete(faq)}
                    tooltip="Delete FAQ"
                    variant="danger"
                  />
                </div>
              </div>
            </DataCard>
          ))}
        </div>
      )}

      {/* Create/Edit Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        title={editingFAQ ? 'Edit FAQ' : 'Create New FAQ'}
        description={editingFAQ ? 'Update the question and answer' : 'Add a new frequently asked question'}
        submitLabel={editingFAQ ? 'Update FAQ' : 'Create FAQ'}
        loading={isSubmitting}
        size="lg"
      >
        <FormGroup>
          <Input
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Enter the frequently asked question..."
            required
          />
          <Textarea
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            placeholder="Provide a clear and helpful answer..."
            rows={5}
            required
          />
        </FormGroup>
      </FormModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message={`Are you sure you want to delete "${deletingFAQ?.question?.substring(0, 50)}..."? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default FAQManagement;
