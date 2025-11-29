// Get base URL with logging for debugging
const getBaseURL = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fitscheck-backend-5v13.onrender.com';
  
  // Log in development to help debug
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('API Routes Base URL:', baseURL);
    console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET - using default');
  }
  
  return baseURL;
};

export const BASE_URL = getBaseURL();

export const API_ROUTES = {
  // AUTH: {
  //   REQUEST_MAGIC_CODE: `${BASE_URL}/api/auth/request-code`,
  //   VERIFY_MAGIC_CODE: `${BASE_URL}/api/auth/verify-code`,
  //   LOGOUT: `${BASE_URL}/api/auth/logout`,
  // },
  // USERS: {
  //   GET_PROFILE: (userId: string) => `${BASE_URL}/api/users/${userId}`,
  //   UPDATE_PROFILE: `${BASE_URL}/api/users/profile`,
  //   FOLLOW: (userId: string) => `${BASE_URL}/api/users/${userId}/follow`,
  //   UNFOLLOW: (userId: string) => `${BASE_URL}/api/users/${userId}/follow`,
  // },
  // SUBSCRIPTIONS: {
  //   LIST: `${BASE_URL}/api/subscriptions`,
  //   CREATE: `${BASE_URL}/api/subscriptions`,
  //   UPDATE: (id: string) => `${BASE_URL}/api/subscriptions/${id}`,
  //   DELETE: (id: string) => `${BASE_URL}/api/subscriptions/${id}`,
  // },
  WAITLIST: {
    JOIN: `${BASE_URL}/api/waitlist`,
  },
  FOUNDING_CREATOR: {
    APPLY: `${BASE_URL}/api/founding-creator`,
  },
}
// 