'use client';

import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, Star, Award, UserCheck, UserX, ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../../../services/adminService';
import ConfirmationModal from '../../components/ConfirmationModal';
import FilterTabs from './reports/FilterTabs';

interface User {
    id: string;
    fullName?: string;
    name?: string;
    username?: string;
    email?: string;
    profilePictureUrl?: string;
    stylePoints?: number;
    badge?: string;
    posts?: number;
    followers?: number;
    following?: number;
    stats?: { following?: number };
    isActive?: boolean;
    active?: boolean;
    joined?: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showPointsModal, setShowPointsModal] = useState(false);
    const [pointsToAdd, setPointsToAdd] = useState('');
    const [isAddingPoints, setIsAddingPoints] = useState(false);
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [updatingUserStatus, setUpdatingUserStatus] = useState<string | null>(null);
    const [statusModal, setStatusModal] = useState<{ isOpen: boolean; action: 'activate' | 'deactivate' | null; userId: string | null }>({
        isOpen: false,
        action: null,
        userId: null
    });
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState('');
    const [isAssigningBadge, setIsAssigningBadge] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [page, filter]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await adminService.getUsers(page, 10);
            const usersData = response.data?.users || response.users || [];
            const pagination = response.data?.pagination || response.pagination || {};

            setUsers(Array.isArray(usersData) ? usersData : []);
            setTotalUsers(pagination.total || usersData.length || 0);
        } catch (err: any) {
            toast.error(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPoints = async () => {
        if (!pointsToAdd || isNaN(Number(pointsToAdd)) || parseInt(pointsToAdd) === 0) {
            toast.error('Please enter a valid non-zero number of points');
            return;
        }

        setIsAddingPoints(true);
        try {
            const points = parseInt(pointsToAdd);
            await adminService.addStylePoints(selectedUser!.id, points);
            await fetchUsers();

            setSelectedUser({
                ...selectedUser!,
                stylePoints: (selectedUser!.stylePoints || 0) + points
            });

            setPointsToAdd('');
            setShowPointsModal(false);

            toast.success(
                points > 0
                    ? `Successfully awarded ${points} style points`
                    : `Successfully deducted ${Math.abs(points)} style points`
            );
        } catch (err: any) {
            toast.error(err.message || 'Failed to add style points');
        } finally {
            setIsAddingPoints(false);
        }
    };

    const handleActivateUser = (userId: string) => {
        setStatusModal({ isOpen: true, action: 'activate', userId });
    };

    const handleDeactivateUser = (userId: string) => {
        setStatusModal({ isOpen: true, action: 'deactivate', userId });
    };

    const confirmStatusChange = async () => {
        const { action, userId } = statusModal;
        setStatusModal({ isOpen: false, action: null, userId: null });
        if (!userId || !action) return;

        setUpdatingUserStatus(userId);

        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, isActive: action === 'activate', active: action === 'activate' }
                    : user
            )
        );

        try {
            if (action === 'activate') {
                await adminService.activateUser(userId);
                toast.success('User activated successfully');
            } else {
                await adminService.deactivateUser(userId);
                toast.success('User deactivated successfully');
            }
            await fetchUsers();
        } catch (err: any) {
            await fetchUsers();
            toast.error(err.message || `Failed to ${action === 'activate' ? 'activate' : 'deactivate'} user`);
        } finally {
            setUpdatingUserStatus(null);
        }
    };

    const handleAssignBadge = async () => {
        if (!selectedUser) return;

        setIsAssigningBadge(true);
        try {
            const badgeValue = selectedBadge === 'none' ? null : selectedBadge;
            await adminService.assignBadge(selectedUser.id, badgeValue);
            await fetchUsers();

            setSelectedUser({
                ...selectedUser,
                badge: badgeValue || undefined
            });

            setSelectedBadge('');
            setShowBadgeModal(false);

            const badgeText = badgeValue || 'removed';
            toast.success(`Successfully assigned badge "${badgeText}"`);
        } catch (err: any) {
            toast.error(err.message || 'Failed to assign badge');
        } finally {
            setIsAssigningBadge(false);
        }
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setPage(1);
    };

    const filteredUsers = filter === 'all'
        ? users
        : users.filter(user => {
            const isActive = user.isActive !== false && user.active !== false;
            return filter === 'active' ? isActive : !isActive;
        });

    const activeCount = users.filter(u => u.isActive !== false && u.active !== false).length;
    const inactiveCount = users.length - activeCount;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Users
                </h1>
                <FilterTabs
                    activeFilter={filter}
                    onFilterChange={handleFilterChange}
                    counts={{
                        all: totalUsers || users.length,
                        active: activeCount,
                        inactive: inactiveCount
                    }}
                />
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#003366]"></div>
                    <p className="mt-4 text-gray-500">Loading users...</p>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No users found</p>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                        <table className="w-full min-w-[1350px]">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">User</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Email</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Style Points</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200 w-40">Badge</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Posts</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Followers</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Following</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Status</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Joined</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => {
                                    const displayName = user.fullName || user.name || 'Unknown';
                                    const username = user.username ? `@${user.username}` : 'unknown';
                                    const joinedDate = user.joined ? new Date(user.joined).toLocaleDateString() : 'N/A';
                                    const isActive = user.isActive !== false && user.active !== false;

                                    return (
                                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    {user.profilePictureUrl ? (
                                                        <img
                                                            src={user.profilePictureUrl}
                                                            alt={displayName}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                                if (fallback) fallback.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-semibold"
                                                        style={{ display: user.profilePictureUrl ? 'none' : 'flex' }}
                                                    >
                                                        {displayName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{displayName}</p>
                                                        <p className="text-sm text-gray-500">{username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">{user.email || 'N/A'}</td>
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <span className="font-semibold text-[#003366]">{user.stylePoints || 0}</span>
                                            </td>
                                            <td className="px-4 py-4 border-r border-gray-200 w-40">
                                                {user.badge ? (
                                                    <span className="inline-block px-3 py-1 bg-[#003366] text-white rounded-full text-xs font-semibold whitespace-nowrap">
                                                        {user.badge}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 italic text-sm">None</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">{user.posts || 0}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">{user.followers || 0}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">{user.following || user.stats?.following || 0}</td>
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                                    }`}>
                                                    {isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">{joinedDate}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowPointsModal(true);
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium whitespace-nowrap"
                                                    >
                                                        <Star size={14} />
                                                        <span>Points</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setSelectedBadge(user.badge || 'none');
                                                            setShowBadgeModal(true);
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium whitespace-nowrap"
                                                    >
                                                        <Award size={14} />
                                                        <span>Badge</span>
                                                    </button>
                                                    {isActive ? (
                                                        <button
                                                            onClick={() => handleDeactivateUser(user.id)}
                                                            disabled={updatingUserStatus === user.id}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium whitespace-nowrap"
                                                        >
                                                            <UserX size={14} />
                                                            <span>{updatingUserStatus === user.id ? 'Deactivating...' : 'Deactivate'}</span>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleActivateUser(user.id)}
                                                            disabled={updatingUserStatus === user.id}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium whitespace-nowrap"
                                                        >
                                                            <UserCheck size={14} />
                                                            <span>{updatingUserStatus === user.id ? 'Activating...' : 'Activate'}</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {totalUsers > 10 && (
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={16} />
                                <span>Previous</span>
                            </button>
                            <span className="text-gray-600">
                                Page {page} of {Math.ceil(totalUsers / 10)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(totalUsers / 10)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <span>Next</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Add Points Modal */}
            {showPointsModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowPointsModal(false)}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Add Style Points</h2>
                            <button onClick={() => setShowPointsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                                {selectedUser.profilePictureUrl ? (
                                    <img
                                        src={selectedUser.profilePictureUrl}
                                        alt={selectedUser.fullName || selectedUser.name || 'User'}
                                        className="w-16 h-16 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className="w-16 h-16 rounded-full bg-[#003366] text-white flex items-center justify-center font-semibold text-2xl"
                                    style={{ display: selectedUser.profilePictureUrl ? 'none' : 'flex' }}
                                >
                                    {(selectedUser.fullName || selectedUser.name || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{selectedUser.fullName || selectedUser.name || 'Unknown'}</p>
                                    <p className="text-sm text-gray-500">{selectedUser.username ? `@${selectedUser.username}` : 'unknown'}</p>
                                    <p className="text-sm text-gray-600 mt-1">Current Points: {selectedUser.stylePoints || 0}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Points to Add (use negative number to deduct)
                                </label>
                                <input
                                    type="number"
                                    value={pointsToAdd}
                                    onChange={(e) => setPointsToAdd(e.target.value)}
                                    placeholder="Enter points (e.g., 100 or -50)"
                                    disabled={isAddingPoints}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#003366] transition-colors"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Enter a positive number to add points, or a negative number to deduct points
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowPointsModal(false);
                                        setPointsToAdd('');
                                        setSelectedUser(null);
                                    }}
                                    disabled={isAddingPoints}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddPoints}
                                    disabled={isAddingPoints || !pointsToAdd}
                                    className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isAddingPoints ? 'Adding...' : 'Add Points'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Badge Modal */}
            {showBadgeModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowBadgeModal(false)}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Assign Badge</h2>
                            <button onClick={() => setShowBadgeModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                                {selectedUser.profilePictureUrl ? (
                                    <img
                                        src={selectedUser.profilePictureUrl}
                                        alt={selectedUser.fullName || selectedUser.name || 'User'}
                                        className="w-16 h-16 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className="w-16 h-16 rounded-full bg-[#003366] text-white flex items-center justify-center font-semibold text-2xl"
                                    style={{ display: selectedUser.profilePictureUrl ? 'none' : 'flex' }}
                                >
                                    {(selectedUser.fullName || selectedUser.name || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{selectedUser.fullName || selectedUser.name || 'Unknown'}</p>
                                    <p className="text-sm text-gray-500">{selectedUser.username ? `@${selectedUser.username}` : 'unknown'}</p>
                                    <p className="text-sm text-gray-600 mt-1">Current Badge: {selectedUser.badge || 'None'}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Badge</label>
                                <select
                                    value={selectedBadge}
                                    onChange={(e) => setSelectedBadge(e.target.value)}
                                    disabled={isAssigningBadge}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#003366] transition-colors bg-white"
                                >
                                    <option value="none">None (Remove Badge)</option>
                                    <option value="Founding Creator">Founding Creator</option>
                                    <option value="Early Creator">Early Creator</option>
                                    <option value="Verified Creator">Verified Creator</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-2">
                                    Select a badge to assign to this user, or "None" to remove the current badge
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowBadgeModal(false);
                                        setSelectedBadge('');
                                        setSelectedUser(null);
                                    }}
                                    disabled={isAssigningBadge}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignBadge}
                                    disabled={isAssigningBadge}
                                    className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isAssigningBadge ? 'Assigning...' : 'Assign Badge'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={statusModal.isOpen}
                onClose={() => setStatusModal({ isOpen: false, action: null, userId: null })}
                onConfirm={confirmStatusChange}
                title={statusModal.action === 'activate' ? 'Activate User' : 'Deactivate User'}
                message={
                    statusModal.action === 'activate'
                        ? 'Are you sure you want to activate this user?'
                        : 'Are you sure you want to deactivate this user? The user will not be able to access their account.'
                }
                confirmText={statusModal.action === 'activate' ? 'Activate' : 'Deactivate'}
                cancelText="Cancel"
                type={statusModal.action === 'deactivate' ? 'danger' : 'default'}
            />
        </div>
    );
};

export default UsersPage;
