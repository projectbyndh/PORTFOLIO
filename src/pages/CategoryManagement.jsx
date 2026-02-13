import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, RefreshCw, Layers, Search, X } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import useCategories from '../hooks/useCategories';
import toast from 'react-hot-toast';

export default function CategoryManagement() {
    const { categories, loading, fetchCategories, createCategory, deleteCategory } = useCategories();
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        setSubmitting(true);
        try {
            if (editingCategory) {
                // We'll just implement create for now as proxy for update if needed, 
                // but let's stick to the hook's capabilities.
                // If the hook doesn't have update, we can add it later or just re-create.
                toast.error('Update not implemented in hook yet');
            } else {
                await createCategory({ name: categoryName });
            }
            handleCloseForm();
            fetchCategories();
        } catch (error) {
            // Error handled in hook
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setCategoryName(category.name);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure? This might affect projects using this category if they rely on exact name matching.')) return;
        try {
            await deleteCategory(id);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingCategory(null);
        setCategoryName('');
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-[#26a8df]">Project Categories</h1>
                        <p className="text-[#26a8df]/60 mt-1">Manage filters for the portfolio</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/20 w-full sm:w-64"
                            />
                        </div>
                        <button
                            onClick={() => fetchCategories()}
                            disabled={loading}
                            className="px-4 py-2 bg-white border border-[#26a8df]/20 text-[#26a8df] rounded-xl hover:bg-[#26a8df]/10 transition-all font-semibold"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-2 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add Category
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                    {loading && categories.length === 0 ? (
                        <div className="flex justify-center items-center h-full py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26a8df]"></div>
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="text-center py-20">
                            <Layers className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No categories found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                            {filteredCategories.map((cat) => (
                                <div key={cat.id || cat._id} className="group p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#26a8df]/30 hover:bg-white hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <Layers className="w-4 h-4 text-[#26a8df]" />
                                        </div>
                                        <span className="font-bold text-[#26a8df]">{cat.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {/* <button onClick={() => handleEdit(cat)} className="p-2 text-gray-400 hover:text-[#26a8df] transition-colors"><Edit className="w-4 h-4" /></button> */}
                                        <button onClick={() => handleDelete(cat.id || cat._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-black text-[#26a8df]">
                                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                                </h2>
                                <button onClick={handleCloseForm} className="text-gray-400 hover:text-gray-600"><X /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#26a8df] mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-[#26a8df]/10 rounded-xl focus:outline-none focus:border-[#26a8df]/50"
                                        placeholder="e.g. Web Applications"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting || !categoryName.trim()}
                                    className="w-full py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-bold shadow-lg hover:shadow-[#26a8df]/30 transition-all disabled:opacity-50"
                                >
                                    {submitting ? 'Processing...' : editingCategory ? 'Update Category' : 'Create Category'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

