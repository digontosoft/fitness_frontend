import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GlobalLoading = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userDetails?.userType === "admin") {
      navigate("/dashboard");
    } else if (userDetails?.userType === "trainee") {
      navigate("/");
    }
  }, [userDetails, navigate]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
