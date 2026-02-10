import React, { useState } from 'react';
import {
    Users, Layers, PlusCircle, Edit, Trash2, RefreshCw,
    ChevronRight, GripVertical, Save, X, Eye, EyeOff
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import TeamForm from '../TeamForm';
import LayerForm from './LayerForm';
import useTeamStructure from '../../hooks/useTeamStructure';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/getImageUrl';

export default function AdminTeam() {
    const {
        layers, roles, members, loading, fetchData,
        createLayer, updateLayer, deleteLayer,
        createRole, updateRole, deleteRole,
        createMember, updateMember, deleteMember
    } = useTeamStructure();

    const [activeTab, setActiveTab] = useState('members');
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [showLayerForm, setShowLayerForm] = useState(false);
    const [editingLayer, setEditingLayer] = useState(null);
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [roleFormLayerId, setRoleFormLayerId] = useState(null);

    console.log('👷 AdminTeam Structure:', { layers: layers.length, roles: roles.length, members: members.length });

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

    const openLayerForm = (layer = null) => {
        setEditingLayer(layer);
        setShowLayerForm(true);
    };

    const handleLayerSubmit = async (formData, id) => {
        if (id) {
            await updateLayer(id, formData);
        } else {
            await createLayer(formData);
        }
    };

    const openRoleForm = (role = null, layerId = null) => {
        setEditingRole(role);
        setRoleFormLayerId(layerId || role?.layerId || null);
        setShowRoleForm(true);
    };

    const handleRoleSubmit = async (roleData, id) => {
        if (id) {
            await updateRole(id, roleData);
        } else {
            await createRole(roleData);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#1A2A44]">Team Management</h1>
                        <p className="text-[#2B4066]/60 mt-1">Manage team members, roles, and hierarchy</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchData()}
                            disabled={loading}
                            className="p-3 bg-white border border-[#4A8EBC]/20 text-[#4A8EBC] rounded-xl hover:bg-[#4A8EBC]/5 transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-[#4A8EBC]/10">
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'members'
                            ? 'border-[#4A8EBC] text-[#4A8EBC]'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                    >
                        <Users size={18} />
                        Team Members
                    </button>
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'structure'
                            ? 'border-[#4A8EBC] text-[#4A8EBC]'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                    >
                        <Layers size={18} />
                        Structure (Layers & Roles)
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'members' ? (
                    <MembersView
                        members={members}
                        layers={layers}
                        roles={roles}
                        loading={loading}
                        onAdd={() => openMemberForm()}
                        onEdit={(m) => openMemberForm(m)}
                        onDelete={deleteMember}
                    />
                ) : (
                    <StructureView
                        layers={layers}
                        roles={roles}
                        members={members}
                        onAddLayer={() => openLayerForm()}
                        onEditLayer={(l) => openLayerForm(l)}
                        deleteLayer={deleteLayer}
                        onAddRole={(layerId) => openRoleForm(null, layerId)}
                        onEditRole={(role) => openRoleForm(role)}
                        deleteRole={deleteRole}
                    />
                )}

                {/* Layer Modal */}
                {showLayerForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-neutral-900">
                                    {editingLayer ? 'Edit Layer' : 'Create Layer'}
                                </h2>
                                <button onClick={() => setShowLayerForm(false)} className="text-neutral-400 hover:text-neutral-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <LayerForm
                                    layer={editingLayer}
                                    onClose={() => setShowLayerForm(false)}
                                    onSubmit={handleLayerSubmit}
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
                                <h2 className="text-2xl font-bold text-neutral-900">
                                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                                <button onClick={() => setShowMemberForm(false)} className="text-neutral-400 hover:text-neutral-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <TeamForm
                                    member={editingMember}
                                    layers={layers}
                                    roles={roles}
                                    onClose={() => setShowMemberForm(false)}
                                    onSubmit={handleMemberSubmit}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Role Form Modal */}
                {showRoleForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-neutral-900">
                                    {editingRole ? 'Edit Role' : 'Create Role'}
                                </h2>
                                <button onClick={() => setShowRoleForm(false)} className="text-neutral-400 hover:text-neutral-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <RoleFormInline
                                    role={editingRole}
                                    layerId={roleFormLayerId}
                                    layers={layers}
                                    existingRolesCount={roles.filter(r => String(r.layerId) === String(roleFormLayerId)).length}
                                    onClose={() => setShowRoleForm(false)}
                                    onSubmit={handleRoleSubmit}
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

function MembersView({ members, layers, roles, loading, onAdd, onEdit, onDelete }) {
    // Helper to get role name with type-safe comparison
    const getRoleName = (roleId) => {
        if (!roleId) return 'Unassigned';
        const role = roles.find(r => String(r.id) === String(roleId));
        return role ? role.title : 'Unassigned';
    };

    if (loading && members.length === 0) {
        return <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4A8EBC] mx-auto"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={onAdd}
                    className="px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <PlusCircle size={20} />
                    Add Member
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#4A8EBC]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5FAFF] border-b border-[#4A8EBC]/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44]">Member</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44]">Role</th>
                                <th className="px-4 py-4 text-center text-sm font-bold text-[#1A2A44]">Order</th>
                                <th className="px-4 py-4 text-center text-sm font-bold text-[#1A2A44]">Visible</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-[#1A2A44]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#4A8EBC]/5">
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-neutral-500">
                                        No team members found. Add one to get started.
                                    </td>
                                </tr>
                            ) : members.map(member => (
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
                                            <div>
                                                <div className="font-semibold text-[#1A2A44]">{member.name}</div>
                                                {member.designation && (
                                                    <div className="text-xs text-[#4A8EBC]">{member.designation}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {getRoleName(member.roleId)}
                                        </span>
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
                                                className="p-2 text-[#4A8EBC] hover:bg-[#4A8EBC]/10 rounded-lg transition-colors"
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
        </div>
    );
}

function StructureView({ layers, roles, members, onAddLayer, onEditLayer, deleteLayer, onAddRole, onEditRole, deleteRole }) {
    // Determine active layer for managing roles
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const activeLayerId = selectedLayerId || (layers.length > 0 ? layers[0].id : null);

    // Helper to count members in a layer
    const getMemberCountForLayer = (layerId) => {
        const layerRoleIds = new Set(roles.filter(r => String(r.layerId) === String(layerId)).map(r => String(r.id)));
        return members.filter(m => layerRoleIds.has(String(m.roleId))).length;
    };

    // Helper to count members in a role
    const getMemberCountForRole = (roleId) => {
        return members.filter(m => String(m.roleId) === String(roleId)).length;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Layers Column */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl border border-[#4A8EBC]/10 shadow-sm p-6">
                    <h3 className="font-bold text-[#1A2A44] mb-4 flex justify-between items-center">
                        Leadership Layers
                        <button
                            onClick={onAddLayer}
                            className="p-2 bg-[#4A8EBC]/10 text-[#4A8EBC] rounded-lg hover:bg-[#4A8EBC]/20"
                        >
                            <PlusCircle size={18} />
                        </button>
                    </h3>
                    <div className="space-y-3">
                        {layers.length === 0 && <p className="text-sm text-neutral-500 italic">No layers defined.</p>}
                        {layers.map(layer => (
                            <div
                                key={layer.id}
                                className={`p-4 rounded-xl border transition-all cursor-pointer group ${activeLayerId === layer.id
                                    ? 'border-[#4A8EBC] bg-[#F5FAFF] shadow-sm'
                                    : 'border-neutral-100 hover:border-[#4A8EBC]/30 bg-white'
                                    }`}
                                onClick={() => setSelectedLayerId(layer.id)}
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden border border-neutral-200">
                                        <img
                                            src={getImageUrl(layer.image, 'default')}
                                            alt=""
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = getImageUrl(null, 'default');
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#1A2A44] truncate">{layer.title}</span>
                                                {layer.isActive === false && (
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-neutral-200 text-neutral-500 rounded">INACTIVE</span>
                                                )}
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEditLayer(layer);
                                                    }}
                                                    className="p-1 text-[#4A8EBC] hover:bg-white rounded"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteLayer(layer.id);
                                                    }}
                                                    className="p-1 text-red-500 hover:bg-white rounded"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-neutral-500 flex justify-between">
                                    <span>Key: {layer.key}</span>
                                    <span>{getMemberCountForLayer(layer.id)} members · Order: {layer.order}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Roles Column */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-[#4A8EBC]/10 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#1A2A44]">
                            Roles in {layers.find(l => l.id === activeLayerId)?.title || 'Selected Layer'}
                        </h3>
                        {activeLayerId && (
                            <button
                                onClick={() => onAddRole(activeLayerId)}
                                className="px-4 py-2 bg-[#4A8EBC] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold"
                            >
                                <PlusCircle size={16} />
                                Add Role
                            </button>
                        )}
                    </div>

                    {!activeLayerId ? (
                        <div className="text-center py-12 text-neutral-400 bg-neutral-50 rounded-xl border border-neutral-100 border-dashed">
                            Select a Layer to manage its roles
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roles.filter(r => String(r.layerId) === String(activeLayerId)).length === 0 && (
                                <p className="col-span-2 text-center py-8 text-neutral-500 italic">No roles in this layer yet.</p>
                            )}
                            {roles.filter(r => String(r.layerId) === String(activeLayerId)).map(role => (
                                <div key={role.id} className="p-4 bg-[#FAFAFA] rounded-xl border border-neutral-100 hover:border-[#4A8EBC]/30 transition-colors group relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#1A2A44]">{role.title}</span>
                                                {role.isActive === false && (
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-neutral-200 text-neutral-500 rounded">INACTIVE</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-neutral-500 mt-1">Key: {role.key}</div>
                                            <div className="text-xs text-[#4A8EBC] mt-1">{getMemberCountForRole(role.id)} member(s)</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEditRole(role)}
                                                className="p-1.5 text-[#4A8EBC] bg-white border border-neutral-200 rounded-lg hover:border-[#4A8EBC]"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => deleteRole(role.id)}
                                                className="p-1.5 text-red-500 bg-white border border-neutral-200 rounded-lg hover:border-red-500"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Role Form (inline component, replaces prompt()) ---

function RoleFormInline({ role, layerId, layers, existingRolesCount, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: role?.title || '',
        key: role?.key || '',
        layerId: role?.layerId ? String(role.layerId) : (layerId ? String(layerId) : ''),
        order: role?.order || existingRolesCount + 1,
        isActive: role?.isActive !== undefined ? role.isActive : true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title' && (!role || !prev.key)) {
                newData.key = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.layerId) return;
        await onSubmit({
            title: formData.title,
            key: formData.key || formData.title.toLowerCase().replace(/\s+/g, '-'),
            layerId: Number(formData.layerId),
            order: Number(formData.order),
            isActive: formData.isActive,
        }, role?.id);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Role Title <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30"
                    placeholder="e.g., Senior Developer"
                    required
                    autoFocus
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Key</label>
                    <input
                        type="text"
                        name="key"
                        value={formData.key}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 bg-neutral-50"
                        placeholder="senior-developer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Order</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Layer <span className="text-red-500">*</span></label>
                <select
                    name="layerId"
                    value={formData.layerId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 bg-white"
                    required
                >
                    <option value="">-- Select Layer --</option>
                    {layers.map(l => (
                        <option key={l.id} value={String(l.id)}>{l.title}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-5 h-5 text-[#4A8EBC] rounded border-neutral-300 focus:ring-[#4A8EBC]"
                    />
                    <span className="text-sm font-medium text-[#1A2A44]">Active (visible on public site)</span>
                </label>
            </div>
            <div className="flex gap-3 pt-4">
                <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-semibold hover:bg-neutral-50 transition-all">
                    Cancel
                </button>
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Save size={20} />
                    {role ? 'Update Role' : 'Create Role'}
                </button>
            </div>
        </form>
    );
}
