import { api } from "./api"; // Your Axios instance
import { API_ROUTES } from "./apiRoutes";

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    username: string;
    inviteCode: string;
    isPremium: boolean;
    stylePoints: number;
    role: string;
  };
  message: string;
}

export async function requestMagicCode(email: string): Promise<{ message: string }> {
  const res = await api.post(API_ROUTES.AUTH.REQUEST_MAGIC_CODE, { email });
  return res.data;
}

export async function verifyMagicCode(
  email: string,
  code: string,
  inviteCode?: string
): Promise<AuthResponse> {
  const res = await api.post(API_ROUTES.AUTH.VERIFY_MAGIC_CODE, {
    email,
    code,
    inviteCode,
  });
  return res.data;
}

export async function logout(): Promise<{ message: string }> {
  const res = await api.post(API_ROUTES.AUTH.LOGOUT);
  return res.data;
}
