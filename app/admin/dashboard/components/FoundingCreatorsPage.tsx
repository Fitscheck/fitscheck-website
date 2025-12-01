'use client';

import React, { useState, useEffect } from 'react';
import { Mail, User, Instagram, Hash, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../../../services/adminService';

interface FoundingCreatorApplication {
    id: string;
    name?: string;
    email?: string;
    socialHandle?: string;
    niche?: string;
    createdAt?: string;
    appliedAt?: string;
}

const FoundingCreatorsPage: React.FC = () => {
    const [applications, setApplications] = useState<FoundingCreatorApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalApplications, setTotalApplications] = useState(0);

    useEffect(() => {
        fetchApplications();
    }, [page]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await adminService.getFoundingCreatorApplications(page, 10);
            // Backend returns: { status: 'success', data: { foundingCreators: [...], pagination: {...} } }
            const applicationsData = response.data?.foundingCreators || [];
            const pagination = response.data?.pagination || {};

            setApplications(Array.isArray(applicationsData) ? applicationsData : []);
            setTotalApplications(pagination.total || applicationsData.length || 0);
        } catch (err: any) {
            toast.error(err.message || 'Failed to load founding creator applications');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Founding Creator Applications
                </h1>
                <div className="text-sm text-gray-600">
                    Total: {totalApplications || applications.length}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#003366]"></div>
                    <p className="mt-4 text-gray-500">Loading applications...</p>
                </div>
            ) : applications.length === 0 ? (
                <div className="text-center py-12">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No applications found</p>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Name</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Email</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Social Handle</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Niche</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => {
                                    const displayName = application.name || 'Unknown';
                                    const appliedDate = application.createdAt || application.appliedAt 
                                        ? new Date(application.createdAt || application.appliedAt).toLocaleDateString() 
                                        : 'N/A';

                                    return (
                                        <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
                                                    {application.email || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">
                                                {application.socialHandle ? (
                                                    <div className="flex items-center gap-2">
                                                        <Instagram size={16} className="text-gray-400" />
                                                        <span>{application.socialHandle}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">Not provided</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200">
                                                {application.niche ? (
                                                    <div className="flex items-center gap-2">
                                                        <Hash size={16} className="text-gray-400" />
                                                        <span>{application.niche}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">Not provided</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{appliedDate}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {totalApplications > 10 && (
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
                                Page {page} of {Math.ceil(totalApplications / 10)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(totalApplications / 10)}
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

export default FoundingCreatorsPage;

