import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SESSION_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours
const CHECK_INTERVAL_MS = 30000; // 30 seconds

// Logs the user out automatically after 3 hours of being logged in, or as
// soon as an admin assigns them a new training (userModel.forceLogoutAt is
// bumped by createUserTraining and picked up here via polling).
export const useSessionGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const forceLogout = () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
      localStorage.removeItem("loginTime");
      navigate("/login", { replace: true });
    };

    let loginTime = Number(localStorage.getItem("loginTime"));
    if (!loginTime) {
      loginTime = Date.now();
      localStorage.setItem("loginTime", String(loginTime));
    }

    const remainingMs = loginTime + SESSION_DURATION_MS - Date.now();
    if (remainingMs <= 0) {
      forceLogout();
      return;
    }
    const timeoutId = setTimeout(forceLogout, remainingMs);

    const checkForcedLogout = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userId = userInfo?._id;
      if (!userId) return;
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        const forceLogoutAt = response?.data?.data?.forceLogoutAt;
        if (forceLogoutAt && new Date(forceLogoutAt).getTime() > loginTime) {
          forceLogout();
        }
      } catch (error) {
        console.error("Failed to check session status:", error);
      }
    };

    checkForcedLogout();
    const intervalId = setInterval(checkForcedLogout, CHECK_INTERVAL_MS);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
