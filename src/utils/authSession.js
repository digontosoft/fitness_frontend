import axios from "axios";
import { base_url } from "@/api/baseUrl";

// The login session is an HttpOnly cookie set by the API: the browser sends it
// with every request and page scripts can't read it. The signed-in user's
// profile is kept only in memory here and reloaded from the server
// (GET /auth/me) on every app start, so nothing about the session is stored in
// localStorage and the profile is never stale.

// Pages that work without a session (no redirect to /login from them)
export const PUBLIC_PATHS = ["/login", "/loading", "/thankyou"];

let currentUser = null;
let sessionStartedAt = null;
let sessionExpiresAt = null;

export const getCurrentUser = () => currentUser;
export const getSessionStartedAt = () => sessionStartedAt;
export const getSessionExpiresAt = () => sessionExpiresAt;

export const setCurrentUser = (user) => {
  currentUser = user || null;
};

// Loads the signed-in user from the server. Resolves to null when signed out.
export const loadCurrentUser = async () => {
  try {
    const { data } = await axios.get(`${base_url}/auth/me`);
    currentUser = data?.data || null;
    sessionStartedAt = data?.sessionStartedAt ? new Date(data.sessionStartedAt) : null;
    sessionExpiresAt = data?.sessionExpiresAt ? new Date(data.sessionExpiresAt) : null;
  } catch {
    currentUser = null;
    sessionStartedAt = null;
    sessionExpiresAt = null;
  }
  return currentUser;
};

// Ends the session on the server (cookie cleared, session id revoked).
export const logout = async () => {
  try {
    await axios.post(`${base_url}/auth/logout`);
  } catch {
    // Signed out locally either way
  }
  currentUser = null;
  sessionStartedAt = null;
  sessionExpiresAt = null;
};

// Older versions kept the token and profile in localStorage. Remove them so a
// leaked copy can't sit in the browser (those tokens no longer work anyway).
export const clearLegacyStorage = () => {
  try {
    ["authToken", "userInfo", "loginTime"].forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage may be unavailable (private mode)
  }
};
