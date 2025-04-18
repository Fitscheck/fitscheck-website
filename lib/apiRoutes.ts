export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://fitscheck-backend.onrender.com";

export const API_ROUTES = {
  AUTH: {
    REQUEST_MAGIC_CODE: `${BASE_URL}/api/auth/request-code`,
    VERIFY_MAGIC_CODE: `${BASE_URL}/api/auth/verify-code`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
  },
}