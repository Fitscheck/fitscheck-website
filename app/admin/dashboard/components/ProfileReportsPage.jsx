import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import NotificationModal from '../NotificationModal'
import './ReportsPage.css'

const ProfileReportsPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalReports, setTotalReports] = useState(0)
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'info' })

  // Fetch reports on mount and when filter/page changes
  useEffect(() => {
    fetchReports()
  }, [filter, page])

  const fetchReports = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await adminService.getProfileReports(filter, page, 50)
      console.log('Profile reports response:', response)
      
      // Backend returns { reports: [], pagination: {} }
      const reportsData = response.data?.reports || response.reports || []
      const pagination = response.data?.pagination || response.pagination || {}
      
      setReports(Array.isArray(reportsData) ? reportsData : [])
      setTotalReports(pagination.total || reportsData.length || 0)
    } catch (err) {
      console.error('Error fetching profile reports:', err)
      setError(err.message || 'Failed to load profile reports')
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
        <h1 className="page-title">Profile Reports</h1>
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
              // Backend returns flat fields: reported_username, reported_full_name, reporter_username, etc.
              const reportedFullName = report.reported_full_name || report.reportedFullName || 'Unknown'
              const reportedUsername = report.reported_username || report.reportedUsername
              const reportedProfilePicture = report.reported_profile_picture || report.reportedProfilePicture
              
              const reporterFullName = report.reporter_full_name || report.reporterFullName || 'Unknown'
              const reporterUsername = report.reporter_username || report.reporterUsername
              
              const reportDate = report.created_at || report.createdAt
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
                      <div className="report-label">Reported User</div>
                      <div className="user-info-small">
                        {reportedProfilePicture ? (
                          <img 
                            src={reportedProfilePicture} 
                            alt={reportedFullName}
                            className="user-avatar-small"
                            style={{ borderRadius: '50%', width: '36px', height: '36px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div 
                          className="user-avatar-small"
                          style={{ display: reportedProfilePicture ? 'none' : 'flex' }}
                        >
                          {reportedFullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="user-name-small">{reportedFullName}</div>
                          <div className="user-username-small">
                            {reportedUsername ? `@${reportedUsername}` : 'unknown'}
                          </div>
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
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ isOpen: false, message: '', type: 'info' })}
        message={notification.message}
        type={notification.type}
      />
    </div>
  )
}

export default ProfileReportsPage

