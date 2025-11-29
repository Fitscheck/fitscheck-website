// Base API URL configuration
const getBaseURL = () => {
  // Use Next.js environment variables
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fitscheck-backend-5v13.onrender.com';
  
  // Log in development to help debug
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('API Client Base URL:', baseURL);
    console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET - using default');
  }
  
  return baseURL;
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

  // Log request details in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('API Request:', { method: fetchOptions.method || 'GET', url, hasToken: !!token });
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
    // Enhanced error logging
    console.error('API Request Error:', {
      url,
      method: fetchOptions.method || 'GET',
      error: error.message,
      stack: error.stack,
    });
    
    // Provide more helpful error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection and ensure the API is accessible.');
    }
    
    throw error;
  }
};

