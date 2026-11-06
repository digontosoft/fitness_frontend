import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/utils/authSession";

// UI routing only: the API enforces the same roles on every request.
const UserRoleProtectedRoutes = ({ children, allowedRoles }) => {
  const userData = getCurrentUser();
  const userType = userData?.userType;

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (!userType || !allowedRoles.includes(userType)) {
    return <Navigate to="/login" />; // Redirect unauthorized users
  }

  return children;
};

export default UserRoleProtectedRoutes;
