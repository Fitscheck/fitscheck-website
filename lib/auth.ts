import { api } from "./api"; 
import { API_ROUTES } from "./apiRoutes";
import { useAuthStore } from "./store/useAuthStore";
import { AxiosError } from "axios";

interface AuthResponse {
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

export type AuthError = {
  message: string;
  status: number;
};

export async function requestMagicCode(
  email: string
): Promise<{ message: string }> {
  const res = await api.post(API_ROUTES.AUTH.REQUEST_MAGIC_CODE, { email });
  return res.data;
}

// Add try-catch blocks
export async function verifyMagicCode(
  email: string,
  code: string,
  inviteCode?: string
): Promise<AuthResponse> {
  try {
    const res = await api.post(API_ROUTES.AUTH.VERIFY_MAGIC_CODE, {
      email,
      code,
      inviteCode,
    });

    if (res.data.user) {
      useAuthStore.getState().setUser(res.data.user);
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        message: error.response?.data?.message || "Authentication failed",
        status: error.response?.status || 500,
      } as AuthError;
    }
    throw error;
  }
}

export async function logout(): Promise<{ message: string }> {
  try {
    const res = await api.post(API_ROUTES.AUTH.LOGOUT);
    useAuthStore.getState().logout();
    return res.data;
  } catch (err) {
    useAuthStore.getState().logout();
    throw err;
  }
}
