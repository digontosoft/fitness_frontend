import { loadCurrentUser } from "@/utils/authSession";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Landing page after Google login. The server has already set the HttpOnly
// session cookie; the user is loaded fresh from the server, never from the URL.
const GlobalLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    loadCurrentUser().then((user) => {
      if (cancelled) return;
      if (!user) {
        navigate("/login", { replace: true });
      } else if (user.userType === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else if (user.userType === "supperadmin") {
        navigate("/dashboard", { replace: true });
      } else if (user.userType === "trainee") {
        if (user.isNewUser || user.is_question_answered == false) {
          navigate("/gender", { replace: true });
        } else if (user.screen !== "unlock") {
          navigate("/lock-screen", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/recipe", { replace: true });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#7994CB] rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
