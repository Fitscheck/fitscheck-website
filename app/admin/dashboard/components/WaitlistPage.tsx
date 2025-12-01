'use client';

import React, { useState, useEffect } from 'react';
import { Mail, User, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../../../services/adminService';

interface WaitlistMember {
    id: string;
    fullName?: string;
    email?: string;
    createdAt?: string;
    joinedAt?: string;
}

const WaitlistPage: React.FC = () => {
    const [members, setMembers] = useState<WaitlistMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalMembers, setTotalMembers] = useState(0);

    useEffect(() => {
        fetchWaitlistMembers();
    }, [page]);

    const fetchWaitlistMembers = async () => {
        setLoading(true);
        try {
            const response = await adminService.getWaitlistMembers(page, 10);
            // Backend returns: { status: 'success', data: { waitlist: [...], pagination: {...} } }
            const membersData = response.data?.waitlist || [];
            const pagination = response.data?.pagination || {};

            setMembers(Array.isArray(membersData) ? membersData : []);
            setTotalMembers(pagination.total || membersData.length || 0);
        } catch (err: any) {
            toast.error(err.message || 'Failed to load waitlist members');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Waitlist Members
                </h1>
                <div className="text-sm text-gray-600">
                    Total: {totalMembers || members.length}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#003366]"></div>
                    <p className="mt-4 text-gray-500">Loading waitlist members...</p>
                </div>
            ) : members.length === 0 ? (
                <div className="text-center py-12">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No waitlist members found</p>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Name</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Email</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => {
                                    const displayName = member.fullName || 'Unknown';
                                    const joinedDate = member.createdAt || member.joinedAt 
                                        ? new Date(member.createdAt || member.joinedAt).toLocaleDateString() 
                                        : 'N/A';

                                    return (
                                        <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-semibold">
                                                        {displayName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{displayName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-gray-400" />
                                                    {member.email || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{joinedDate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {totalMembers > 10 && (
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
                                Page {page} of {Math.ceil(totalMembers / 10)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(totalMembers / 10)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <span>Next</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WaitlistPage;

