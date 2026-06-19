import { apiRequest } from "./client";

export type AuthUser = {
  _id: string;
  name?: string;
  email: string;
  role: string;
  image?: string;
  phone?: string;
  permissions?: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
};

export type ResetPasswordPayload = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<{ user: AuthUser; token: string }>("/user/login", {
      method: "POST",
      body: payload,
    }),

  register: (payload: RegisterPayload) =>
    apiRequest<{ token: string }>("/user/register", {
      method: "POST",
      body: { ...payload, role: payload.role ?? "company" },
    }),

  verifyRegistrationOtp: (otp: string, token: string) =>
    apiRequest<{ _id: string; email: string }>("/user/verify-otp", {
      method: "POST",
      body: { otp },
      token,
    }),

  resendOtp: (token: string) =>
    apiRequest<{ token: string }>("/user/resend", {
      method: "POST",
      body: {},
      token,
    }),

  forgotPassword: (email: string) =>
    apiRequest<{ token: string }>("/user/forgot-password", {
      method: "POST",
      body: { email },
    }),

  verifyForgotOtp: (otp: string, token: string) =>
    apiRequest<{ token: string }>("/user/verify-forgot-otp", {
      method: "POST",
      body: { otp },
      token,
    }),

  resetPassword: (payload: ResetPasswordPayload, token: string) =>
    apiRequest<null>("/user/reset-password", {
      method: "POST",
      body: payload,
      token,
    }),

  changePassword: (payload: ChangePasswordPayload, token: string) =>
    apiRequest<null>("/user/change-password", {
      method: "POST",
      body: payload,
      token,
    }),

  myProfile: (token: string) =>
    apiRequest<AuthUser>("/user/my-profile", { token }),
};
