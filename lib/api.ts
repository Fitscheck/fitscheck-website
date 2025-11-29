import axios from "axios";
import { useAuthStore } from "./store/useAuthStore";

// Use relative URL to go through Next.js API proxy (avoids CORS)
// The Next.js API routes will proxy to the backend
const getBaseURL = () => {
  // In browser, use relative path to Next.js API routes
  // This avoids CORS issues since requests go through same origin
  if (typeof window !== 'undefined') {
    return '/api';
  }
  
  // On server side, use the backend URL directly
  return process.env.NEXT_PUBLIC_API_BASE_URL || "https://fitscheck-backend-5v13.onrender.com";
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
