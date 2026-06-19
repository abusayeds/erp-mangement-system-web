import { AUTH_FLOW_KEY, TEMP_TOKEN_KEY, type AuthFlow } from "./constants";

export function setTempToken(token: string, flow: AuthFlow) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(TEMP_TOKEN_KEY, token);
  sessionStorage.setItem(AUTH_FLOW_KEY, flow);
}

export function getTempToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(TEMP_TOKEN_KEY);
}

export function getAuthFlow(): AuthFlow | null {
  if (typeof sessionStorage === "undefined") return null;
  const flow = sessionStorage.getItem(AUTH_FLOW_KEY);
  return flow === "register" || flow === "forgot" ? flow : null;
}

export function setResetToken(token: string) {
  setTempToken(token, "forgot");
}

export function clearTempAuth() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(TEMP_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_FLOW_KEY);
}
