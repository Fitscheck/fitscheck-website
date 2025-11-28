import axios from "axios";
import { useAuthStore } from "./store/useAuthStore";

// Get base URL with fallback
const getBaseURL = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://fitscheck-backend-5v13.onrender.com";
  
  // Log in development to help debug
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('API Base URL:', baseURL);
    console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
  }
  
  return baseURL;
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Error: No response received', {
        url: error.config?.url,
        message: error.message,
      });
    } else {
      // Error setting up the request
      console.error('API Error: Request setup failed', {
        message: error.message,
      });
    }
    
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export { api };
