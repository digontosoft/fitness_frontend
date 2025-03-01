import { Navigate } from "react-router-dom";

const UserRoleProtectedRoutes = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userType;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!userType || !allowedRoles.includes(userType)) {
    return <Navigate to="/login" />; // Redirect unauthorized users
  }

  return children;
};

export default UserRoleProtectedRoutes;
