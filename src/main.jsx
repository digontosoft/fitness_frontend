import "./utils/preventTranslateCrash";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import {
  PUBLIC_PATHS,
  clearLegacyStorage,
  loadCurrentUser,
  setCurrentUser,
} from "./utils/authSession";

// Every API call sends the HttpOnly session cookie
axios.defaults.withCredentials = true;

// A missing, expired or replaced session (e.g. signed in on another device)
// sends the user back to the login page.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error?.config?.url || "";
    const isSessionCheck = url.includes("/auth/me") || url.includes("/auth/logout");
    if (error?.response?.status === 401 && !isSessionCheck) {
      setCurrentUser(null);
      if (!PUBLIC_PATHS.includes(window.location.pathname)) {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

clearLegacyStorage();

// Render once the signed-in user (if any) is loaded from the server, so no
// page ever shows default or cached profile data while it loads.
loadCurrentUser().finally(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Toaster position="top-right" />
      <App />
    </StrictMode>
  );
});
