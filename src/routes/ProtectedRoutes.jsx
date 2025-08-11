import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userType;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect admin to "/dashboard" only if they're trying to access the root "/"
  if (userType === "admin" && location.pathname === "/") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoutes;
