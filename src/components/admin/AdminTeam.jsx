import React, { useState } from 'react';
import {
    Users, Layers, PlusCircle, Edit, Trash2, RefreshCw,
    Eye, EyeOff, X
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import TeamForm from '../TeamForm';
import LayerForm from './LayerForm';
import useTeamStructureSimplified from '../../hooks/useTeamStructureSimplified';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/getImageUrl';

export default function AdminTeam() {
    const {
        categories, members, loading, fetchData,
        createCategory, updateCategory, deleteCategory,
        createMember, updateMember, deleteMember
    } = useTeamStructureSimplified();

    const [activeTab, setActiveTab] = useState('members');
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    console.log('👷 AdminTeam Structure:', { categories: categories.length, members: members.length });

    // Helper to open member form
    const openMemberForm = (member = null) => {
        setEditingMember(member);
        setShowMemberForm(true);
    };

    const handleMemberSubmit = async (formData, id) => {
        if (id) {
            await updateMember(id, formData);
        } else {
            await createMember(formData);
        }
    };

    const openCategoryForm = (category = null) => {
        setEditingCategory(category);
        setShowCategoryForm(true);
    };

    const handleCategorySubmit = async (formData, id) => {
        if (id) {
            await updateCategory(id, formData);
        } else {
            await createCategory(formData);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#26a8df]">Team Management</h1>
                        <p className="text-[#26a8df]/60 mt-1">Manage team members and categories</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchData()}
                            disabled={loading}
                            className="px-4 py-2 bg-white border border-[#26a8df]/20 text-[#26a8df] rounded-xl hover:bg-[#26a8df]/10 transition-all font-semibold"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        {activeTab === 'members' ? (
                            <button
                                onClick={() => openMemberForm()}
                                className="px-6 py-2 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#26a8df]/30 transition-all flex items-center gap-2"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Add Member
                            </button>
                        ) : (
                            <button
                                onClick={() => openCategoryForm()}
                                className="px-6 py-2 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#26a8df]/30 transition-all flex items-center gap-2"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Add Category
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-[#26a8df]/10">
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'members'
                            ? 'border-[#26a8df] text-[#26a8df]'
                            : 'border-transparent text-neutral-500 hover:text-[#0D1641]'
                            }`}
                    >
                        <Users size={18} />
                        Team Members
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'categories'
                            ? 'border-[#26a8df] text-[#26a8df]'
                            : 'border-transparent text-neutral-500 hover:text-[#0D1641]'
                            }`}
                    >
                        <Layers size={18} />
                        Categories
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'members' ? (
                    <MembersView
                        members={members}
                        categories={categories}
                        loading={loading}
                        onAdd={() => openMemberForm()}
                        onEdit={(m) => openMemberForm(m)}
                        onDelete={deleteMember}
                    />
                ) : (
                    <CategoriesView
                        categories={categories}
                        members={members}
                        loading={loading}
                        onAdd={() => openCategoryForm()}
                        onEdit={(c) => openCategoryForm(c)}
                        onDelete={deleteCategory}
                    />
                )}

                {/* Category Modal */}
                {showCategoryForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-[#26a8df]">
                                    {editingCategory ? 'Edit Category' : 'Create Category'}
                                </h2>
                                <button onClick={() => setShowCategoryForm(false)} className="text-neutral-400 hover:text-neutral-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <LayerForm
                                    layer={editingCategory}
                                    onClose={() => setShowCategoryForm(false)}
                                    onSubmit={handleCategorySubmit}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Member Modal */}
                {showMemberForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-[#26a8df]">
                                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                                <button onClick={() => setShowMemberForm(false)} className="text-neutral-400 hover:text-neutral-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <TeamForm
                                    member={editingMember}
                                    categories={categories}
                                    onClose={() => setShowMemberForm(false)}
                                    onSubmit={handleMemberSubmit}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

// --- Sub-components ---

function MembersView({ members, categories, loading, onAdd, onEdit, onDelete }) {
    // Helper to get category name with type-safe comparison
    const getCategoryName = (layerId) => {
        if (!layerId) return 'Uncategorized';
        const category = categories.find(c => String(c.id) === String(layerId));
        return category ? category.title : 'Uncategorized';
    };

    if (loading && members.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                <div className="flex justify-center items-center h-full py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26a8df]"></div>
                </div>
            </div>
        );
    }

    if (members.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                        <Users className="w-10 h-10 text-[#26a8df]/40" />
                    </div>
                    <p className="text-[#26a8df] font-semibold text-lg mb-2">No team members found</p>
                    <p className="text-[#26a8df]/60 mb-6 max-w-sm">Add team members to showcase your talented team.</p>
                    <button
                        onClick={onAdd}
                        className="px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add First Member
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#F5FAFF] border-b border-[#26a8df]/10">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df]">Member</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df]">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df]">Job Title</th>
                            <th className="px-4 py-4 text-center text-sm font-bold text-[#26a8df]">Order</th>
                            <th className="px-4 py-4 text-center text-sm font-bold text-[#26a8df]">Visible</th>
                            <th className="px-6 py-4 text-right text-sm font-bold text-[#26a8df]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#26a8df]/5">
                        {members.map(member => (
                                <tr key={member.id} className="hover:bg-[#F5FAFF]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                                                <img
                                                    src={getImageUrl(member.image, 'team')}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = getImageUrl(null, 'team');
                                                    }}
                                                />
                                            </div>
                                            <div className="font-semibold text-[#26a8df]">{member.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {getCategoryName(member.layerId)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-[#26a8df] font-medium">{member.title || 'N/A'}</div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="text-sm text-neutral-600">{member.order || 0}</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {member.isPublic !== false ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                                                <Eye size={14} /> Public
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400">
                                                <EyeOff size={14} /> Hidden
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(member)}
                                                className="p-2 text-[#26a8df] hover:bg-[#26a8df]/10 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(member.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}

function CategoriesView({ categories, members, loading, onAdd, onEdit, onDelete }) {
    // Helper to count members in a category
    const getMemberCountForCategory = (layerId) => {
        return members.filter(m => String(m.layerId) === String(layerId)).length;
    };

    if (loading && categories.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                <div className="flex justify-center items-center h-full py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26a8df]"></div>
                </div>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                        <Layers className="w-10 h-10 text-[#26a8df]/40" />
                    </div>
                    <p className="text-[#26a8df] font-semibold text-lg mb-2">No categories found</p>
                    <p className="text-[#26a8df]/60 mb-6 max-w-sm">Create categories like CEO, Developer, Marketing to organize your team members.</p>
                    <button
                        onClick={onAdd}
                        className="px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add First Category
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
                    <div
                        key={category.id}
                        className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm p-6 hover:border-[#26a8df]/30 transition-all group"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden border border-neutral-200">
                                <img
                                    src={getImageUrl(category.image, 'default')}
                                    alt={category.title}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getImageUrl(null, 'default');
                                    }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-[#26a8df] text-lg truncate">{category.title}</h3>
                                    {category.isActive === false && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-neutral-200 text-neutral-500 rounded">INACTIVE</span>
                                    )}
                                </div>
                                {category.description && (
                                    <p className="text-xs text-neutral-500 line-clamp-2">{category.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                            <div className="text-sm text-neutral-600">
                                <span className="font-semibold text-[#26a8df]">{getMemberCountForCategory(category.id)}</span> member{getMemberCountForCategory(category.id) !== 1 ? 's' : ''}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(category)}
                                    className="p-2 text-[#26a8df] bg-[#26a8df]/5 hover:bg-[#26a8df]/10 rounded-lg transition-colors"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(category.id)}
                                    className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {category.key && (
                            <div className="mt-2 text-xs text-neutral-400">
                                Key: <code className="px-1 py-0.5 bg-neutral-100 rounded">{category.key}</code> · Order: {category.order || 0}
                            </div>
                        )}
                    </div>
                ))}
            </div>
    );
}
