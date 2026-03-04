import { base_url } from "@/api/baseUrl";
import { termfile } from "@/assets";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Container = () => {
  const [loading, setLoading] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  const handleNextStep = async () => {
    setLoading(true);
    const updateUserInfo = {
      user_id: userDetails?._id,
      termsAndConditions: false,
      isNewUser: false,
    };

    try {
      const [updateResponse, foodDairyResponse] = await Promise.all([
        axios.post(`${base_url}/updateUserInfo`, updateUserInfo),
        axios.post(`${base_url}/food-dairy`, { user_id: userDetails?._id }),
      ]);

      if (updateResponse.status === 200 && foodDairyResponse.status === 201) {
        navigate("/measurement-women");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white px-2 sm:px-4 md:px-8 py-2 sm:py-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        {/* Terms and Conditions Image - Full Width with Button Overlay */}
        <div className="w-full relative">
          <img
            src={termfile}
            alt="Terms and Conditions"
            className="w-full h-auto rounded-lg shadow-lg object-contain block"
          />
          
          {/* Button - Overlay at bottom of image */}
          <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <button
              type="submit"
              className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 bg-[#7994CB] text-white font-bold text-xs sm:text-sm md:text-base rounded-full transition duration-300 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg whitespace-nowrap"
              onClick={() => handleNextStep()}
              disabled={loading}
            >
              {loading ? "טוען..." : "אישור תקנון והמשך"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
