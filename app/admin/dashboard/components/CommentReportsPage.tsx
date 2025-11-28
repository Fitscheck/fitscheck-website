import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import ConfirmationModal from '../ConfirmationModal'
import NotificationModal from '../NotificationModal'
import './ReportsPage.css'

const CommentReportsPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalReports, setTotalReports] = useState(0)
  const [deletingCommentId, setDeletingCommentId] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, commentId: null, reportId: null })
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'info' })

  // Fetch reports on mount and when filter/page changes
  useEffect(() => {
    fetchReports()
  }, [filter, page])

  const fetchReports = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await adminService.getCommentReports(filter, page, 50)
      console.log('Comment reports response:', response)
      
      // Backend returns { reports: [], pagination: {} }
      const reportsData = response.data?.reports || response.reports || []
      const pagination = response.data?.pagination || response.pagination || {}
      
      setReports(Array.isArray(reportsData) ? reportsData : [])
      setTotalReports(pagination.total || reportsData.length || 0)
    } catch (err) {
      console.error('Error fetching comment reports:', err)
      setError(err.message || 'Failed to load comment reports')
    } finally {
      setLoading(false)
    }
  }

  const reviewReport = async (reportId) => {
    try {
      await adminService.reviewReport(reportId)
      // Refresh reports after status update
      await fetchReports()
    } catch (err) {
      console.error('Error reviewing report:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to review report', type: 'error' })
    }
  }

  const resolveReport = async (reportId) => {
    try {
      await adminService.resolveReport(reportId)
      // Refresh reports after status update
      await fetchReports()
    } catch (err) {
      console.error('Error resolving report:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to resolve report', type: 'error' })
    }
  }

  const handleDeleteComment = (commentId, reportId) => {
    if (!commentId || commentId === 'N/A') {
      setNotification({ isOpen: true, message: 'Comment ID not available', type: 'error' })
      return
    }
    setDeleteModal({ isOpen: true, commentId, reportId })
  }

  const confirmDeleteComment = async () => {
    const { commentId } = deleteModal
    setDeleteModal({ isOpen: false, commentId: null, reportId: null })
    setDeletingCommentId(commentId)
    try {
      await adminService.deleteComment(commentId)
      // Refresh reports after deletion
      await fetchReports()
      setNotification({ isOpen: true, message: 'Comment deleted successfully', type: 'success' })
    } catch (err) {
      console.error('Error deleting comment:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to delete comment', type: 'error' })
    } finally {
      setDeletingCommentId(null)
    }
  }

  const filteredReports = reports // Already filtered by backend

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ff9800'
      case 'reviewed':
        return '#2196f3'
      case 'resolved':
        return '#4caf50'
      default:
        return '#999'
    }
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1 className="page-title">Comment Reports</h1>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setFilter('all')
              setPage(1)
            }}
          >
            All ({totalReports || reports.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setFilter('pending')
              setPage(1)
            }}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'reviewed' ? 'active' : ''}`}
            onClick={() => {
              setFilter('reviewed')
              setPage(1)
            }}
          >
            Reviewed
          </button>
          <button
            className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
            onClick={() => {
              setFilter('resolved')
              setPage(1)
            }}
          >
            Resolved
          </button>
        </div>
      </div>

      {error && (
        <div style={{ 
          padding: '16px', 
          background: '#ffebee', 
          color: '#c62828', 
          borderRadius: '8px', 
          marginBottom: '24px' 
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading reports...
        </div>
      ) : filteredReports.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No reports found
        </div>
      ) : (
        <>
          <div className="reports-grid">
            {filteredReports.map((report) => {
              // Backend may return nested comment object or flat fields
              const comment = report.comment || {}
              
              // Try to get comment ID from nested object first, then flat fields
              const reportedCommentId = comment.id 
                || report.reported_comment_id 
                || report.reportedCommentId 
                || report.comment_id 
                || comment.commentId
                || 'N/A'
              
              // Get comment content from nested object or flat fields
              const commentContent = comment.content 
                || report.comment_content 
                || report.commentContent 
                || 'No content'
              
              // Get comment author info
              const commentAuthor = comment.author || comment.user || {}
              const commentAuthorFullName = commentAuthor.fullName 
                || report.comment_author_full_name 
                || report.commentAuthorFullName 
                || 'Unknown'
              const commentAuthorUsername = commentAuthor.username || report.comment_author_username || report.commentAuthorUsername
              
              const postId = comment.postId || report.post_id || report.postId || 'N/A'
              
              const reporterFullName = report.reporter_full_name || report.reporterFullName || 'Unknown'
              const reporterUsername = report.reporter_username || report.reporterUsername
              
              const reportDate = report.created_at || report.createdAt
              const reason = report.reason || 'other'
              
              // Normalize reason for display
              const reasonDisplay = reason
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

              return (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <div className="report-status">
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(report.status) }}
                      >
                        {report.status || 'pending'}
                      </span>
                    </div>
                    <div className="report-date">
                      {reportDate ? new Date(reportDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>

                  <div className="report-content">
                    <div className="report-section">
                      <div className="report-label">Reported Comment</div>
                      <div className="comment-preview">
                        <div className="comment-author">
                          <div className="user-avatar-small">
                            {commentAuthorFullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="user-name-small">{commentAuthorFullName}</div>
                            <div className="user-username-small">
                              {commentAuthorUsername ? `@${commentAuthorUsername}` : 'unknown'}
                            </div>
                          </div>
                        </div>
                        <div className="comment-content-preview">{commentContent}</div>
                        <div className="comment-meta">
                          Comment ID: {reportedCommentId} | Post ID: {postId}
                        </div>
                      </div>
                    </div>

                    <div className="report-section">
                      <div className="report-label">Reported By</div>
                      <div className="reporter-info">
                        {reporterFullName} {reporterUsername ? `@${reporterUsername}` : ''}
                      </div>
                    </div>

                    <div className="report-section">
                      <div className="report-label">Reason</div>
                      <div className="reason-badge">{reasonDisplay}</div>
                    </div>

                    <div className="report-section">
                      <div className="report-label">Description</div>
                      <div className="report-description">
                        {report.description || 'No description provided'}
                      </div>
                    </div>
                  </div>

                  <div className="report-actions">
                    <button
                      className="btn-action delete"
                      onClick={() => handleDeleteComment(reportedCommentId, report.id)}
                      disabled={deletingCommentId === reportedCommentId || reportedCommentId === 'N/A'}
                    >
                      {deletingCommentId === reportedCommentId ? 'Deleting...' : 'Delete Comment'}
                    </button>
                    {(report.status === 'pending' || !report.status) && (
                      <>
                        <button
                          className="btn-action review"
                          onClick={() => reviewReport(report.id)}
                        >
                          Mark as Reviewed
                        </button>
                        <button
                          className="btn-action resolve"
                          onClick={() => resolveReport(report.id)}
                        >
                          Resolve
                        </button>
                      </>
                    )}
                    {report.status === 'reviewed' && (
                      <button
                        className="btn-action resolve"
                        onClick={() => resolveReport(report.id)}
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalReports > 50 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '16px',
              marginTop: '24px'
            }}>
              <button
                className="btn-secondary"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {page} of {Math.ceil(totalReports / 50)}</span>
              <button
                className="btn-secondary"
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(totalReports / 50)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, commentId: null, reportId: null })}
        onConfirm={confirmDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ isOpen: false, message: '', type: 'info' })}
        message={notification.message}
        type={notification.type}
      />
    </div>
  )
}

export default CommentReportsPage

