// hooks/useWaitlist.ts
import { useState } from 'react';
import { api } from '../api';
import { API_ROUTES } from '../apiRoutes';

export const useWaitlist = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const joinWaitlist = async (email: string) => {
    try {
      setLoading(true);
      setErr(null);
      setIsSuccess(false); 
      
      const response = await api.post(API_ROUTES.WAITLIST.JOIN, { email });
      setIsSuccess(true);
      return response.data;
    } catch (err) {
        
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorMessage = (err as any).response?.data?.message || 'Something went wrong';
      setErr(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  return { joinWaitlist, loading, err, isSuccess};
};