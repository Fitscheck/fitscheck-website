import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import ConfirmationModal from '../ConfirmationModal'
import NotificationModal from '../NotificationModal'
import './ReportsPage.css'

// Component to handle image loading with error state
const PostImage = ({ image, index }) => {
  const [imageError, setImageError] = useState(false)
  
  // Extract image URL - match mobile app logic: img.url || img.imageUrl || img
  let imageUrl = null
  if (typeof image === 'string') {
    imageUrl = image
  } else if (image && typeof image === 'object') {
    imageUrl = image.url || image.imageUrl || image.uri
  }
  
  // Debug logging
  console.log('PostImage - image object:', image)
  console.log('PostImage - extracted URL:', imageUrl)

  if (!imageUrl) {
    return (
      <div className="image-placeholder" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        background: '#f5f5f5',
        borderRadius: '8px',
        color: '#999',
        fontSize: '14px',
        width: '100%',
        padding: '20px'
      }}>
        <div>Image URL not available</div>
        <div style={{ fontSize: '11px', marginTop: '8px', wordBreak: 'break-all', textAlign: 'center' }}>
          Image object: {JSON.stringify(image)}
        </div>
      </div>
    )
  }

  if (imageError) {
    return (
      <div className="image-error-placeholder" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        background: '#f5f5f5',
        borderRadius: '8px',
        color: '#999',
        fontSize: '14px',
        width: '100%',
        padding: '20px'
      }}>
        <div>Failed to load image</div>
        <div style={{ fontSize: '11px', marginTop: '8px', wordBreak: 'break-all', textAlign: 'center' }}>
          {imageUrl.substring(0, 80)}...
        </div>
      </div>
    )
  }

  return (
    <img 
      src={imageUrl} 
      alt={`Post image ${index + 1}`}
      className="post-image-large"
      onError={() => {
        console.error('Failed to load image:', imageUrl)
        setImageError(true)
      }}
      onLoad={() => {
        console.log('Image loaded successfully:', imageUrl)
      }}
      style={{
        maxWidth: '100%',
        width: '100%',
        height: 'auto',
        display: 'block'
      }}
    />
  )
}

const PostReportsPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalReports, setTotalReports] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showPostModal, setShowPostModal] = useState(false)
  const [deletingPostId, setDeletingPostId] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: null, reportId: null })
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'info' })

  // Fetch reports on mount and when filter/page changes
  useEffect(() => {
    fetchReports()
  }, [filter, page])

  const fetchReports = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await adminService.getPostReports(filter, page, 50)
      console.log('Post reports response:', response)
      
      // Backend returns { status: "success", data: { reports: [], pagination: {} } }
      const reportsData = response.data?.reports || response.reports || []
      const pagination = response.data?.pagination || response.pagination || {}
      
      setReports(Array.isArray(reportsData) ? reportsData : [])
      setTotalReports(pagination.total || reportsData.length || 0)
    } catch (err) {
      console.error('Error fetching post reports:', err)
      setError(err.message || 'Failed to load post reports')
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

  const handleViewPost = (report) => {
    // Backend returns nested post object
    const post = report.post || report
    setSelectedPost({ report, post })
    setShowPostModal(true)
  }

  const handleDeletePost = (postId, reportId) => {
    setDeleteModal({ isOpen: true, postId, reportId })
  }

  const confirmDeletePost = async () => {
    const { postId } = deleteModal
    setDeleteModal({ isOpen: false, postId: null, reportId: null })
    setDeletingPostId(postId)
    try {
      await adminService.deletePost(postId)
      // Refresh reports after deletion
      await fetchReports()
      // Close modal if the deleted post is currently being viewed
      if (selectedPost && selectedPost.post.id === postId) {
        setShowPostModal(false)
        setSelectedPost(null)
      }
      setNotification({ isOpen: true, message: 'Post deleted successfully', type: 'success' })
    } catch (err) {
      console.error('Error deleting post:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to delete post', type: 'error' })
    } finally {
      setDeletingPostId(null)
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
        <h1 className="page-title">Post Reports</h1>
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
              // Backend returns nested post object: report.post
              const post = report.post || {}
              const postContent = post.content || 'No content'
              const postTitle = post.title || null
              const postAuthor = post.user || {}
              const postAuthorFullName = postAuthor.fullName || 'Unknown'
              const postAuthorUsername = postAuthor.username || ''
              const postId = post.id || report.reported_post_id || report.reportedPostId || 'N/A'
              
              const reporter = report.reporter || {}
              const reporterFullName = reporter.fullName || report.reporter_full_name || 'Unknown'
              const reporterUsername = reporter.username || report.reporter_username || ''
              
              const reportDate = report.createdAt || report.created_at
              const reason = report.reason || 'other'
              
              // Normalize reason for display (inappropriate_content -> Inappropriate Content)
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
                      <div className="report-label">Reported Post</div>
                      <div className="post-preview">
                        <div className="post-author">
                          {postAuthor.profilePictureUrl ? (
                            <img 
                              src={postAuthor.profilePictureUrl} 
                              alt={postAuthorFullName}
                              className="user-avatar-small"
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="user-avatar-small">
                              {postAuthorFullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="user-name-small">{postAuthorFullName}</div>
                            <div className="user-username-small">
                              {postAuthorUsername ? `@${postAuthorUsername}` : 'unknown'}
                            </div>
                          </div>
                        </div>
                        {postTitle && (
                          <div className="post-title-preview" style={{ 
                            fontWeight: 600, 
                            marginBottom: '8px',
                            color: '#333'
                          }}>
                            {postTitle}
                          </div>
                        )}
                        <div className="post-content-preview">
                          {postContent.length > 150 ? `${postContent.substring(0, 150)}...` : postContent}
                        </div>
                        <div className="post-id">
                          Post ID: {postId}
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
                      className="btn-action view"
                      onClick={() => handleViewPost(report)}
                    >
                      View Post
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

      {/* View Post Modal */}
      {showPostModal && selectedPost && (
        <div className="modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="modal-content post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>View Post</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowPostModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="post-detail-container">
              {(() => {
                const post = selectedPost.post
                const author = post.user || {}
                // Handle different possible image structures
                let images = []
                if (Array.isArray(post.images)) {
                  images = post.images
                } else if (post.imageUrls && Array.isArray(post.imageUrls)) {
                  // Convert array of strings to array of objects
                  images = post.imageUrls.map(url => ({ url }))
                }
                
                // Debug: log post data
                console.log('Post data in modal:', post)
                console.log('Images array:', images)
                console.log('Post.images:', post.images)
                console.log('Post.imageUrls:', post.imageUrls)
                
                return (
                  <>
                    {/* Post Author */}
                    <div className="post-author-section">
                      {author.profilePictureUrl ? (
                        <img 
                          src={author.profilePictureUrl} 
                          alt={author.fullName || 'User'}
                          className="user-avatar-large"
                        />
                      ) : (
                        <div className="user-avatar-large">
                          {(author.fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="user-name-large">{author.fullName || 'Unknown'}</div>
                        <div className="user-username-large">
                          {author.username ? `@${author.username}` : ''}
                        </div>
                      </div>
                    </div>

                    {/* Post Title */}
                    {post.title && (
                      <div className="post-title-large">{post.title}</div>
                    )}

                    {/* Post Content */}
                    <div className="post-content-large">{post.content || 'No content'}</div>

                    {/* Post Images */}
                    {images.length > 0 ? (
                      <div className="post-images-container">
                        {images.map((image, index) => (
                          <div key={image.id || index} className="post-image-wrapper">
                            <PostImage image={image} index={index} />
                            {/* Shop Items */}
                            {image.shopItems && image.shopItems.length > 0 && (
                              <div className="shop-items-list">
                                <div className="shop-items-header">Shop Items:</div>
                                {image.shopItems.map((item, itemIndex) => (
                                  <div key={itemIndex} className="shop-item">
                                    <div className="shop-item-name">{item.itemName || item.name}</div>
                                    {item.brand && <div className="shop-item-brand">Brand: {item.brand}</div>}
                                    {item.price && (
                                      <div className="shop-item-price">
                                        {item.currency || '$'}{item.price}
                                      </div>
                                    )}
                                    {item.url && (
                                      <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="shop-item-link"
                                      >
                                        View Item
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-images-message" style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#999',
                        fontStyle: 'italic'
                      }}>
                        No images in this post
                      </div>
                    )}

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="post-hashtags">
                        {post.hashtags.map((tag, index) => (
                          <span key={index} className="hashtag">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Post Stats */}
                    <div className="post-stats">
                      <span>❤️ {post.likesCount || 0} likes</span>
                      <span>💬 {post.commentsCount || 0} comments</span>
                      {post.votes !== undefined && <span>👍 {post.votes || 0} votes</span>}
                    </div>

                    {/* Post Metadata */}
                    <div className="post-metadata">
                      <div>Post ID: {post.id}</div>
                      {post.createdAt && (
                        <div>Created: {new Date(post.createdAt).toLocaleString()}</div>
                      )}
                      {post.timeAgo && <div>{post.timeAgo}</div>}
                      {post.challengeId && <div>Challenge ID: {post.challengeId}</div>}
                    </div>
                  </>
                )
              })()}
            </div>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button
                className="btn-action delete"
                onClick={() => handleDeletePost(selectedPost.post.id, selectedPost.report.id)}
                disabled={deletingPostId === selectedPost.post.id}
              >
                {deletingPostId === selectedPost.post.id ? 'Deleting...' : 'Delete Post'}
              </button>
              <button
                className="btn-action secondary"
                onClick={() => setShowPostModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ isOpen: false, message: '', type: 'info' })}
        message={notification.message}
        type={notification.type}
      />
    </div>
  )
}

export default PostReportsPage

