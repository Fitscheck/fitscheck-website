'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, FileText, User, AlertCircle, Eye, CheckCircle, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../../../../services/adminService';
import { PostReport } from './types';
import FilterTabs from './FilterTabs';
import StatusBadge from './StatusBadge';
import PostDetailModal from './PostDetailModal';
import ConfirmationModal from '../../../components/ConfirmationModal';

const PostReportsPage: React.FC = () => {
    const [reports, setReports] = useState<PostReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalReports, setTotalReports] = useState(0);
    const [selectedPost, setSelectedPost] = useState<{ report: any; post: any } | null>(null);
    const [showPostModal, setShowPostModal] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; postId: string | null; reportId: string | null }>({
        isOpen: false,
        postId: null,
        reportId: null
    });

    useEffect(() => {
        fetchReports();
    }, [filter, page]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await adminService.getPostReports(filter, page, 50);
            const reportsData = response.data?.reports || response.reports || [];
            const pagination = response.data?.pagination || response.pagination || {};

            setReports(Array.isArray(reportsData) ? reportsData : []);
            setTotalReports(pagination.total || reportsData.length || 0);
        } catch (err: any) {
            console.error('Error fetching post reports:', err);
            toast.error(err.message || 'Failed to load post reports');
        } finally {
            setLoading(false);
        }
    };

    const reviewReport = async (reportId: string) => {
        try {
            await adminService.reviewReport(reportId);
            toast.success('Report marked as reviewed');
            await fetchReports();
        } catch (err: any) {
            console.error('Error reviewing report:', err);
            toast.error(err.message || 'Failed to review report');
        }
    };

    const resolveReport = async (reportId: string) => {
        try {
            await adminService.resolveReport(reportId);
            toast.success('Report resolved successfully');
            await fetchReports();
        } catch (err: any) {
            console.error('Error resolving report:', err);
            toast.error(err.message || 'Failed to resolve report');
        }
    };

    const handleViewPost = (report: any) => {
        const post = report.post || report;
        setSelectedPost({ report, post });
        setShowPostModal(true);
    };

    const handleDeletePost = (postId: string, reportId: string) => {
        setDeleteModal({ isOpen: true, postId, reportId });
    };

    const confirmDeletePost = async () => {
        const { postId } = deleteModal;
        setDeleteModal({ isOpen: false, postId: null, reportId: null });
        if (!postId) return;

        setDeletingPostId(postId);
        try {
            await adminService.deletePost(postId);
            toast.success('Post deleted successfully');
            await fetchReports();
            if (selectedPost && selectedPost.post.id === postId) {
                setShowPostModal(false);
                setSelectedPost(null);
            }
        } catch (err: any) {
            console.error('Error deleting post:', err);
            toast.error(err.message || 'Failed to delete post');
        } finally {
            setDeletingPostId(null);
        }
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setPage(1);
    };

    const formatReason = (reason: string) => {
        return reason
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Post Reports
                </h1>
                <FilterTabs
                    activeFilter={filter}
                    onFilterChange={handleFilterChange}
                    counts={{ all: totalReports }}
                />
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#003366]"></div>
                    <p className="mt-4 text-gray-500">Loading reports...</p>
                </div>
            ) : reports.length === 0 ? (
                <div className="text-center py-12">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No reports found</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reports.map((report) => {
                            const post = (report as any).post || {};
                            const postContent = post.content || 'No content';
                            const postTitle = post.title || null;
                            const postAuthor = post.user || {};
                            const postAuthorFullName = postAuthor.fullName || 'Unknown';
                            const postAuthorUsername = postAuthor.username || '';
                            const postId = post.id || report.post_id || report.postId || 'N/A';
                            const reporter = (report as any).reporter || {};
                            const reporterFullName = reporter.fullName || report.reporter_full_name || report.reporterFullName || 'Unknown';
                            const reporterUsername = reporter.username || report.reporter_username || report.reporterUsername || '';
                            const reportDate = report.created_at || report.createdAt;

                            return (
                                <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                        <StatusBadge status={report.status || 'pending'} />
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar size={14} />
                                            <span>{reportDate ? new Date(reportDate).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reported Post</p>
                                            <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#003366]">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {postAuthor.profilePictureUrl ? (
                                                        <img
                                                            src={postAuthor.profilePictureUrl}
                                                            alt={postAuthorFullName}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-semibold text-sm">
                                                            {postAuthorFullName.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-900">{postAuthorFullName}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {postAuthorUsername ? `@${postAuthorUsername}` : 'unknown'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {postTitle && (
                                                    <p className="font-semibold text-sm text-gray-900 mb-2">{postTitle}</p>
                                                )}
                                                <p className="text-sm text-gray-700 mb-2">
                                                    {postContent.length > 150 ? `${postContent.substring(0, 150)}...` : postContent}
                                                </p>
                                                <p className="text-xs text-gray-500">Post ID: {postId}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reported By</p>
                                            <p className="text-sm text-gray-900">
                                                {reporterFullName} {reporterUsername ? `@${reporterUsername}` : ''}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reason</p>
                                            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-sm font-semibold">
                                                {formatReason(report.reason || 'other')}
                                            </span>
                                        </div>

                                        {report.description && (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</p>
                                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                    {report.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => handleViewPost(report)}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors text-sm font-medium"
                                        >
                                            <Eye size={16} />
                                            <span>View Post</span>
                                        </button>
                                        <div className="flex gap-2">
                                            {(report.status === 'pending' || !report.status) && (
                                                <>
                                                    <button
                                                        onClick={() => reviewReport(report.id)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        <Eye size={16} />
                                                        <span>Review</span>
                                                    </button>
                                                    <button
                                                        onClick={() => resolveReport(report.id)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                    >
                                                        <CheckCircle size={16} />
                                                        <span>Resolve</span>
                                                    </button>
                                                </>
                                            )}
                                            {report.status === 'reviewed' && (
                                                <button
                                                    onClick={() => resolveReport(report.id)}
                                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    <CheckCircle size={16} />
                                                    <span>Resolve</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalReports > 50 && (
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
                                Page {page} of {Math.ceil(totalReports / 50)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(totalReports / 50)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <span>Next</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </>
            )}

            <PostDetailModal
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                post={selectedPost?.post}
                report={selectedPost?.report}
                onDeletePost={handleDeletePost}
                deletingPostId={deletingPostId}
            />

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, postId: null, reportId: null })}
                onConfirm={confirmDeletePost}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
};

export default PostReportsPage;
