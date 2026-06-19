import { ACCESS_TOKEN_COOKIE } from "./constants";

const MAX_AGE_REMEMBER = 60 * 60 * 24 * 30;
const MAX_AGE_SESSION = 60 * 60 * 24 * 7;

export function setAccessTokenCookie(token: string, remember = false) {
  if (typeof document === "undefined") return;

  const maxAge = remember ? MAX_AGE_REMEMBER : MAX_AGE_SESSION;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function clearAccessTokenCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function getAccessTokenFromDocument(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ACCESS_TOKEN_COOKIE}=`));

  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
}
