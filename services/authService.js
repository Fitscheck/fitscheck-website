import { apiRequest, setToken, setUserData, removeToken, getToken, getUserData } from './apiClient';

export const authService = {
  // Login user (admin only)
  login: async (email, password) => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Check if user is admin
    const user = response.data?.user || response.user;
    if (!user) {
      throw new Error('User data not found in response');
    }

    // Check for admin role
    const userRole = user.role || user.userRole;
    if (userRole !== 'admin') {
      throw new Error('Access denied. Admin privileges required.');
    }

    // Store token and user data
    if (response.data?.token || response.token) {
      const token = response.data?.token || response.token;
      setToken(token);
      setUserData(user);
    }

    return response;
  },

  // Logout
  logout: async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      removeToken();
    }
  },

  // Check if user is authenticated and is admin
  checkAuth: () => {
    const token = getToken();
    const userData = getUserData();
    
    if (!token || !userData) {
      return false;
    }

    const userRole = userData.role || userData.userRole;
    return userRole === 'admin';
  },
};

