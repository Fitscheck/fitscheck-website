import { apiRequest } from './apiClient';

export const adminService = {
  // Challenges
  getChallenges: async (status = 'all', page = 1, limit = 50) => {
    // When status is 'all', backend query only needs LIMIT and OFFSET (2 params)
    // When status is 'active'/'ended'/'upcoming', it needs status + LIMIT + OFFSET (3 params)
    // The backend should handle this, but to avoid issues, call with proper params
    let endpoint = '/api/challenges'
    const params = []
    
    // Only include status if it's not 'all'
    if (status && status !== 'all') {
      params.push(`status=${encodeURIComponent(status)}`)
    }
    
    // Always include page and limit - backend should handle parameter binding correctly
    params.push(`page=${page}`)
    params.push(`limit=${limit}`)
    
    if (params.length > 0) {
      endpoint += `?${params.join('&')}`
    }
    
    console.log('Fetching challenges from:', endpoint)
    return apiRequest(endpoint, { method: 'GET' });
  },

  getChallenge: async (challengeId) => {
    return apiRequest(`/api/challenges/${challengeId}`, {
      method: 'GET',
    });
  },

  createChallenge: async (challengeData) => {
    // If challengeData is FormData, send it directly; otherwise stringify JSON
    const body = challengeData instanceof FormData 
      ? challengeData 
      : JSON.stringify(challengeData);
    
    return apiRequest('/api/challenges', {
      method: 'POST',
      body: body,
      isFormData: challengeData instanceof FormData,
    });
  },

  updateChallenge: async (challengeId, challengeData) => {
    // If challengeData is FormData, send it directly; otherwise stringify JSON
    const body = challengeData instanceof FormData 
      ? challengeData 
      : JSON.stringify(challengeData);
    
    return apiRequest(`/api/challenges/${challengeId}`, {
      method: 'PATCH',
      body: body,
      isFormData: challengeData instanceof FormData,
    });
  },

  deleteChallenge: async (challengeId) => {
    return apiRequest(`/api/challenges/${challengeId}`, {
      method: 'DELETE',
    });
  },

  getChallengeParticipants: async (challengeId, page = 1, limit = 50) => {
    // Using entries endpoint - this returns all participants with their posts
    return apiRequest(`/api/challenges/${challengeId}/entries?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  selectChallengeWinner: async (challengeId, winnerId) => {
    return apiRequest(`/api/challenges/${challengeId}/winner`, {
      method: 'POST',
      body: JSON.stringify({ winnerId }), // Backend expects winnerId
    });
  },

  // End challenge by updating endDate to current date/time
  endChallenge: async (challengeId) => {
    const now = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return apiRequest(`/api/challenges/${challengeId}`, {
      method: 'PATCH',
      body: JSON.stringify({ endDate: now }),
    });
  },

  // Users
  getUsers: async (page = 1, limit = 50) => {
    return apiRequest(`/api/admin/users?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  addStylePoints: async (userId, points) => {
    // Backend expects { userId, points } at /api/admin/award-points
    return apiRequest('/api/admin/award-points', {
      method: 'POST',
      body: JSON.stringify({ userId, points }),
    });
  },

  activateUser: async (userId) => {
    return apiRequest(`/api/admin/users/${userId}/activate`, {
      method: 'POST',
    });
  },

  deactivateUser: async (userId) => {
    return apiRequest(`/api/admin/users/${userId}/deactivate`, {
      method: 'POST',
    });
  },

  assignBadge: async (userId, badge) => {
    return apiRequest(`/api/admin/users/${userId}/badge`, {
      method: 'POST',
      body: JSON.stringify({ badge }),
    });
  },

  // Reports - routes are at /api/reports (singular: profile, post, comment)
  getProfileReports: async (status = 'all', page = 1, limit = 50, userId = null) => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (status !== 'all') {
      params.append('status', status)
    }
    if (userId) {
      params.append('userId', userId)
    }
    return apiRequest(`/api/reports/profile?${params.toString()}`, {
      method: 'GET',
    });
  },

  getPostReports: async (status = 'all', page = 1, limit = 50, postId = null) => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (status !== 'all') {
      params.append('status', status)
    }
    if (postId) {
      params.append('postId', postId)
    }
    return apiRequest(`/api/reports/post?${params.toString()}`, {
      method: 'GET',
    });
  },

  getCommentReports: async (status = 'all', page = 1, limit = 50, commentId = null) => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (status !== 'all') {
      params.append('status', status)
    }
    if (commentId) {
      params.append('commentId', commentId)
    }
    return apiRequest(`/api/reports/comment?${params.toString()}`, {
      method: 'GET',
    });
  },

  updateReportStatus: async (reportId, reportType, status) => {
    // reportType: 'profile', 'post', or 'comment'
    return apiRequest(`/api/reports/${reportType}/${reportId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Review a report
  reviewReport: async (reportId) => {
    return apiRequest(`/api/reports/${reportId}/review`, {
      method: 'PATCH',
    });
  },

  // Resolve a report
  resolveReport: async (reportId) => {
    return apiRequest(`/api/reports/${reportId}/resolve`, {
      method: 'PATCH',
    });
  },

  // Delete a post (admin action)
  deletePost: async (postId) => {
    return apiRequest(`/api/admin/posts/${postId}`, {
      method: 'DELETE',
    });
  },

  // Delete a comment (admin action)
  deleteComment: async (commentId) => {
    return apiRequest(`/api/admin/comments/${commentId}`, {
      method: 'DELETE',
    });
  },

  // Waitlist
  getWaitlistMembers: async (page = 1, limit = 50) => {
    return apiRequest(`/api/admin/waitlist?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  // Founding Creators
  getFoundingCreatorApplications: async (page = 1, limit = 50) => {
    return apiRequest(`/api/admin/founding-creators?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  // Send Email
  sendEmail: async (to, from, subject, htmlBody) => {
    return apiRequest('/api/admin/send-email', {
      method: 'POST',
      body: JSON.stringify({ to, from, subject, htmlBody }),
    });
  },
};

