import { Navigate, useLocation } from "react-router-dom";

// Routes accessible before the onboarding questionnaire is completed
const ONBOARDING_ROUTES = ["/gender", "/regulation", "/measurement-women"];

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userType;
  const isQuestionAnswered = userData?.is_question_answered;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Any authenticated user who has not completed the onboarding questionnaire
  // is restricted to the onboarding flow regardless of their role
  if (
    isQuestionAnswered === false &&
    !ONBOARDING_ROUTES.includes(location.pathname)
  ) {
    return <Navigate to="/gender" replace />;
  }

  // Once onboarding is complete, a trainee stays on the lock screen until
  // an admin/superadmin unlocks the account from their dashboard
  if (
    userType === "trainee" &&
    isQuestionAnswered === true &&
    userData?.screen !== "unlock" &&
    location.pathname !== "/lock-screen"
  ) {
    return <Navigate to="/lock-screen" replace />;
  }

  // Redirect admin to admin dashboard when they land on root
  if (userType === "admin" && location.pathname === "/") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoutes;
