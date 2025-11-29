import React, { useState, useEffect } from 'react'
import { adminService } from '../../../../services/adminService'
import ConfirmationModal from '../../components/ConfirmationModal'
import NotificationModal from '../../components/NotificationModal'
import './UsersPage.css'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showPointsModal, setShowPointsModal] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState('')
  const [isAddingPoints, setIsAddingPoints] = useState(false)
  const [page, setPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [updatingUserStatus, setUpdatingUserStatus] = useState(null) // Track which user's status is being updated
  const [statusModal, setStatusModal] = useState({ isOpen: false, action: null, userId: null }) // 'activate' or 'deactivate'
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'info' })
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState('')
  const [isAssigningBadge, setIsAssigningBadge] = useState(false)

  // Fetch users on mount and when page changes
  useEffect(() => {
    fetchUsers()
  }, [page])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await adminService.getUsers(page, 50)
      console.log('Users response:', response)
      
      // Backend returns { users: [], pagination: { page, limit, total } }
      const usersData = response.data?.users || response.users || []
      const pagination = response.data?.pagination || response.pagination || {}
      
      setUsers(Array.isArray(usersData) ? usersData : [])
      setTotalUsers(pagination.total || usersData.length || 0)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleAddPoints = async () => {
    if (!pointsToAdd || isNaN(pointsToAdd) || parseInt(pointsToAdd) === 0) {
      setNotification({ isOpen: true, message: 'Please enter a valid non-zero number of points', type: 'error' })
      return
    }

    setIsAddingPoints(true)
    try {
      const points = parseInt(pointsToAdd)
      await adminService.addStylePoints(selectedUser.id, points)
      
      // Refresh users list to get updated points
      await fetchUsers()
      
      // Update selected user with new points (optimistic update)
      setSelectedUser({
        ...selectedUser,
        stylePoints: selectedUser.stylePoints + points
      })
      
      setPointsToAdd('')
      setShowPointsModal(false)
      
      // Show success message
      setNotification({ 
        isOpen: true, 
        message: points > 0 
          ? `Successfully awarded ${points} style points`
          : `Successfully deducted ${Math.abs(points)} style points`,
        type: 'success' 
      })
    } catch (err) {
      console.error('Error adding points:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to add style points', type: 'error' })
    } finally {
      setIsAddingPoints(false)
    }
  }

  const handleActivateUser = (userId) => {
    setStatusModal({ isOpen: true, action: 'activate', userId })
  }

  const handleDeactivateUser = (userId) => {
    setStatusModal({ isOpen: true, action: 'deactivate', userId })
  }

  const confirmStatusChange = async () => {
    const { action, userId } = statusModal
    setStatusModal({ isOpen: false, action: null, userId: null })
    setUpdatingUserStatus(userId)
    
    // Optimistically update the user status immediately
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isActive: action === 'activate', active: action === 'activate' }
          : user
      )
    )

    try {
      if (action === 'activate') {
        await adminService.activateUser(userId)
        setNotification({ isOpen: true, message: 'User activated successfully', type: 'success' })
      } else {
        await adminService.deactivateUser(userId)
        setNotification({ isOpen: true, message: 'User deactivated successfully', type: 'success' })
      }
      // Refresh users list to get any other updates from backend
      await fetchUsers()
    } catch (err) {
      console.error(`Error ${action === 'activate' ? 'activating' : 'deactivating'} user:`, err)
      // Revert optimistic update on error
      await fetchUsers()
      setNotification({ 
        isOpen: true, 
        message: err.message || `Failed to ${action === 'activate' ? 'activate' : 'deactivate'} user`, 
        type: 'error' 
      })
    } finally {
      setUpdatingUserStatus(null)
    }
  }

  const handleAssignBadge = async () => {
    if (!selectedUser) return

    setIsAssigningBadge(true)
    try {
      const badgeValue = selectedBadge === 'none' ? null : selectedBadge
      await adminService.assignBadge(selectedUser.id, badgeValue)
      
      // Refresh users list to get updated badge
      await fetchUsers()
      
      // Update selected user with new badge (optimistic update)
      setSelectedUser({
        ...selectedUser,
        badge: badgeValue
      })
      
      setSelectedBadge('')
      setShowBadgeModal(false)
      
      // Show success message
      const badgeText = badgeValue || 'removed'
      setNotification({ 
        isOpen: true, 
        message: `Successfully assigned badge "${badgeText}"`,
        type: 'success' 
      })
    } catch (err) {
      console.error('Error assigning badge:', err)
      setNotification({ 
        isOpen: true, 
        message: err.message || 'Failed to assign badge', 
        type: 'error' 
      })
    } finally {
      setIsAssigningBadge(false)
    }
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <div className="page-stats">
          <span className="stat-item">Total Users: {totalUsers || users.length}</span>
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
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No users found
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Style Points</th>
                <th>Badge</th>
                <th>Posts</th>
                <th>Followers</th>
                <th>Following</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                // Map backend fields to display
                const displayName = user.fullName || user.name || 'Unknown'
                const username = user.username ? `@${user.username}` : user.username || 'unknown'
                const joinedDate = user.joined 
                  ? new Date(user.joined).toLocaleDateString()
                  : 'N/A'
                
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        {user.profilePictureUrl ? (
                          <img 
                            src={user.profilePictureUrl} 
                            alt={displayName}
                            className="user-avatar"
                            style={{ borderRadius: '50%', width: '40px', height: '40px', objectFit: 'cover' }}
                            onError={(e) => {
                              // Fallback to initial if image fails
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div 
                          className="user-avatar" 
                          style={{ display: user.profilePictureUrl ? 'none' : 'flex' }}
                        >
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="user-name">{displayName}</div>
                          <div className="user-username">{username}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email || 'N/A'}</td>
                    <td>
                      <span className="style-points">{user.stylePoints || 0}</span>
                    </td>
                    <td>
                      {user.badge ? (
                        <span 
                          className="badge-display"
                          style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: '#003366',
                            color: 'white',
                            display: 'inline-block'
                          }}
                        >
                          {user.badge}
                        </span>
                      ) : (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>None</span>
                      )}
                    </td>
                    <td>{user.posts || 0}</td>
                    <td>{user.followers || 0}</td>
                    <td>{user.following || user.stats?.following || 0}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          backgroundColor: (user.isActive !== false && user.active !== false) ? '#4caf50' : '#f44336',
                          color: 'white'
                        }}
                      >
                        {(user.isActive !== false && user.active !== false) ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{joinedDate}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          className="btn-points"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowPointsModal(true)
                          }}
                          style={{ margin: 0 }}
                        >
                          Add Points
                        </button>
                        <button
                          className="btn-badge"
                          onClick={() => {
                            setSelectedUser(user)
                            setSelectedBadge(user.badge || 'none')
                            setShowBadgeModal(true)
                          }}
                          style={{
                            background: '#9c27b0',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            margin: 0
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = '#7b1fa2'
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = '#9c27b0'
                          }}
                        >
                          Assign Badge
                        </button>
                        {(user.isActive !== false && user.active !== false) ? (
                          <button
                            className="btn-deactivate"
                            onClick={() => handleDeactivateUser(user.id)}
                            disabled={updatingUserStatus === user.id}
                            style={{
                              background: '#f44336',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: updatingUserStatus === user.id ? 'not-allowed' : 'pointer',
                              opacity: updatingUserStatus === user.id ? 0.6 : 1,
                              transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => {
                              if (updatingUserStatus !== user.id) {
                                e.target.style.background = '#d32f2f'
                              }
                            }}
                            onMouseOut={(e) => {
                              if (updatingUserStatus !== user.id) {
                                e.target.style.background = '#f44336'
                              }
                            }}
                          >
                            {updatingUserStatus === user.id ? 'Deactivating...' : 'Deactivate'}
                          </button>
                        ) : (
                          <button
                            className="btn-activate"
                            onClick={() => handleActivateUser(user.id)}
                            disabled={updatingUserStatus === user.id}
                            style={{
                              background: '#4caf50',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: updatingUserStatus === user.id ? 'not-allowed' : 'pointer',
                              opacity: updatingUserStatus === user.id ? 0.6 : 1,
                              transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => {
                              if (updatingUserStatus !== user.id) {
                                e.target.style.background = '#45a049'
                              }
                            }}
                            onMouseOut={(e) => {
                              if (updatingUserStatus !== user.id) {
                                e.target.style.background = '#4caf50'
                              }
                            }}
                          >
                            {updatingUserStatus === user.id ? 'Activating...' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalUsers > 50 && (
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
          <span>Page {page} of {Math.ceil(totalUsers / 50)}</span>
          <button
            className="btn-secondary"
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(totalUsers / 50)}
          >
            Next
          </button>
        </div>
      )}

      {/* Add Points Modal */}
      {showPointsModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowPointsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Style Points</h2>
              <button className="modal-close" onClick={() => setShowPointsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-info-modal">
                {selectedUser.profilePictureUrl ? (
                  <img 
                    src={selectedUser.profilePictureUrl} 
                    alt={selectedUser.fullName || selectedUser.name}
                    className="user-avatar large"
                    style={{ borderRadius: '50%', width: '64px', height: '64px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div 
                  className="user-avatar large" 
                  style={{ display: selectedUser.profilePictureUrl ? 'none' : 'flex' }}
                >
                  {(selectedUser.fullName || selectedUser.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="user-name">{selectedUser.fullName || selectedUser.name || 'Unknown'}</div>
                  <div className="user-username">
                    {selectedUser.username ? `@${selectedUser.username}` : 'unknown'}
                  </div>
                  <div className="current-points">
                    Current Points: {selectedUser.stylePoints || 0}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Points to Add (use negative number to deduct)</label>
                <input
                  type="number"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(e.target.value)}
                  placeholder="Enter points (e.g., 100 or -50)"
                  disabled={isAddingPoints}
                />
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  Enter a positive number to add points, or a negative number to deduct points
                </small>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowPointsModal(false)
                    setPointsToAdd('')
                    setSelectedUser(null)
                  }}
                  disabled={isAddingPoints}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAddPoints}
                  disabled={isAddingPoints || !pointsToAdd}
                >
                  {isAddingPoints ? 'Adding...' : 'Add Points'}
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
      {/* Assign Badge Modal */}
      {showBadgeModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowBadgeModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Assign Badge</h2>
              <button className="modal-close" onClick={() => setShowBadgeModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-info-modal">
                {selectedUser.profilePictureUrl ? (
                  <img 
                    src={selectedUser.profilePictureUrl} 
                    alt={selectedUser.fullName || selectedUser.name}
                    className="user-avatar large"
                    style={{ borderRadius: '50%', width: '64px', height: '64px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div 
                  className="user-avatar large" 
                  style={{ display: selectedUser.profilePictureUrl ? 'none' : 'flex' }}
                >
                  {(selectedUser.fullName || selectedUser.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="user-name">{selectedUser.fullName || selectedUser.name || 'Unknown'}</div>
                  <div className="user-username">
                    {selectedUser.username ? `@${selectedUser.username}` : 'unknown'}
                  </div>
                  <div className="current-points">
                    Current Badge: {selectedUser.badge || 'None'}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Select Badge</label>
                <select
                  value={selectedBadge}
                  onChange={(e) => setSelectedBadge(e.target.value)}
                  disabled={isAssigningBadge}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                    backgroundColor: 'white',
                    cursor: isAssigningBadge ? 'not-allowed' : 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#003366'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0'
                  }}
                >
                  <option value="none">None (Remove Badge)</option>
                  <option value="Founding Creator">Founding Creator</option>
                  <option value="Early Creator">Early Creator</option>
                  <option value="Verified Creator">Verified Creator</option>
                </select>
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  Select a badge to assign to this user, or "None" to remove the current badge
                </small>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowBadgeModal(false)
                    setSelectedBadge('')
                    setSelectedUser(null)
                  }}
                  disabled={isAssigningBadge}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAssignBadge}
                  disabled={isAssigningBadge}
                >
                  {isAssigningBadge ? 'Assigning...' : 'Assign Badge'}
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default UsersPage


