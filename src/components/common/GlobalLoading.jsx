import { verifyToken } from "@/constants/verifyToken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GlobalLoading = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const { id } = verifyToken(token);

  localStorage.setItem("userInfo", JSON.stringify(id));
  localStorage.setItem("authToken", JSON.stringify(token));

  useEffect(() => {
    if (id?.userType === "admin") {
      navigate("/dashboard");
    } else if (id?.userType === "trainee") {
      id?.isNewUser ? navigate("/gender") : navigate("/");
    } else {
      navigate("/recipe");
    }
  }, [id, navigate]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
