// Get base URL - use relative path in browser to go through Next.js API proxy
const getBaseURL = () => {
  // In browser, use relative path to Next.js API routes
  // This avoids CORS issues since requests go through same origin
  if (typeof window !== 'undefined') {
    return '/api';
  }
  
  // On server side, use the backend URL directly
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fitscheck-backend-5v13.onrender.com';
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
}
// 