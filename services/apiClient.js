// Base API URL configuration
const getBaseURL = () => {
  if (import.meta?.env?.DEV) {
    // Development - can use localhost or local IP
    const USE_LOCAL_IP = false; // Set to true when testing on local network
    const LOCAL_IP = '192.168.1.243'; // Your computer's local IP address
    
    if (USE_LOCAL_IP) {
      return `http://${LOCAL_IP}:3000`;
    }
    return 'http://localhost:3000';
  }
  // Production URL
  return import.meta?.env?.VITE_API_URL || 'https://api.fitscheck.com';
};

export const API_BASE_URL = getBaseURL();

// Token storage keys
const TOKEN_KEY = 'fitscheck_admin_token';
const USER_KEY = 'fitscheck_admin_user';

/**
 * Get stored authentication token
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

/**
 * Store authentication token
 */
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

/**
 * Remove authentication token (logout)
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

/**
 * Get stored user data
 */
export const getUserData = () => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Store user data
 */
export const setUserData = (userData) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

/**
 * Make API request with authentication
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  // Don't set Content-Type for FormData - browser will set it with boundary
  const isFormData = options.isFormData || (options.body instanceof FormData);
  
  const headers = {};
  
  // Only set Content-Type for non-FormData requests
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  // Merge any additional headers from options
  Object.assign(headers, options.headers);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No authentication token found for request to:', endpoint);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  // Remove isFormData and headers from options before passing to fetch
  // We'll merge headers separately to ensure Authorization is included
  const { isFormData: _isFormData, headers: _optionsHeaders, ...fetchOptions } = options;

  // Debug logging for FormData requests
  if (isFormData) {
    console.log('Sending FormData request to:', url);
    console.log('Headers:', { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : 'Not set' });
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers, // Our headers (with Authorization) take precedence
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse JSON response:', jsonError);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      // Handle nested error structure: data.data.message or data.message
      const errorMessage = data.data?.message || data.message || data.error || 'Request failed';
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      
      // Create error object with additional context
      const error = new Error(errorMessage);
      error.status = response.status;
      error.responseData = data;
      throw error;
    }

    // Check if the response has an error status even if HTTP status is OK
    if (data.status === 'error' || data.data?.status === 'error') {
      // Handle nested error structure: data.data.message or data.message
      const errorMessage = data.data?.message || data.message || data.error || 'Request failed';
      console.error('API Error Status:', data);
      
      // Create error object with additional context
      const error = new Error(errorMessage);
      error.status = 200; // HTTP status was OK but response indicates error
      error.responseData = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

