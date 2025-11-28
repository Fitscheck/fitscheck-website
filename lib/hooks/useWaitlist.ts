// hooks/useWaitlist.ts
import { useState } from 'react';
import { api } from '../api';
import { API_ROUTES } from '../apiRoutes';

export const useWaitlist = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const joinWaitlist = async (fullName: string, email: string) => {
    try {
      setLoading(true);
      setErr(null);
      setIsSuccess(false); 
      
      const response = await api.post(API_ROUTES.WAITLIST.JOIN, { fullName, email });
      setIsSuccess(true);
      return response.data;
    } catch (err: any) {
      // Handle different error scenarios
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || 'Please check your information and try again.';
        } else if (status === 409 || status === 422) {
          errorMessage = data?.message || 'You are already on the waitlist!';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = data?.message || data?.error || errorMessage;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to the server. Please check your connection.';
      }
      
      setErr(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  return { joinWaitlist, loading, err, isSuccess};
};