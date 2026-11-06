import { base_url } from "@/api/baseUrl";
import {
  getCurrentUser,
  getSessionExpiresAt,
  getSessionStartedAt,
  logout,
  setCurrentUser,
} from "@/utils/authSession";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CHECK_INTERVAL_MS = 30000; // 30 seconds

// Logs the user out when the server session expires (3 hours after login), or
// as soon as an admin assigns them a new training (userModel.forceLogoutAt is
// bumped by createUserTraining and picked up here via polling). The server
// also rejects expired sessions on its own, so this only keeps the UI in step.
export const useSessionGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCurrentUser()) return;

    const forceLogout = async () => {
      await logout();
      navigate("/login", { replace: true });
    };

    const sessionStartedAt = getSessionStartedAt()?.getTime() || Date.now();
    const expiresAt = getSessionExpiresAt()?.getTime();
    let timeoutId = null;
    if (expiresAt) {
      const remainingMs = expiresAt - Date.now();
      if (remainingMs <= 0) {
        forceLogout();
        return;
      }
      timeoutId = setTimeout(forceLogout, remainingMs);
    }

    const checkForcedLogout = async () => {
      const userInfo = getCurrentUser() || {};
      const userId = userInfo?._id;
      if (!userId) return;
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        const serverUser = response?.data?.data;
        const forceLogoutAt = serverUser?.forceLogoutAt;
        if (forceLogoutAt && new Date(forceLogoutAt).getTime() > sessionStartedAt) {
          forceLogout();
          return;
        }
        // An admin locked this trainee again: the routes read the in-memory
        // user, so update it and send them back to the lock screen.
        if (
          serverUser?.userType === "trainee" &&
          serverUser?.is_question_answered === true &&
          serverUser?.screen !== "unlock" &&
          userInfo?.screen === "unlock"
        ) {
          setCurrentUser({ ...userInfo, screen: serverUser.screen || "lock" });
          navigate("/lock-screen", { replace: true });
        }
      } catch (error) {
        console.error("Failed to check session status:", error);
      }
    };

    checkForcedLogout();
    const intervalId = setInterval(checkForcedLogout, CHECK_INTERVAL_MS);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
