export const ACCESS_TOKEN_COOKIE = "fl_access_token";
export const TEMP_TOKEN_KEY = "fl_temp_token";
export const AUTH_FLOW_KEY = "fl_auth_flow";

export type AuthFlow = "register" | "forgot";

export const AUTH_GUEST_ROUTES = ["/login", "/register"] as const;
export const AUTH_PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/confirm-password",
] as const;

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const SUPER_ADMIN_HOME = "/super-admin";
