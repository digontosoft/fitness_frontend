import { getCurrentUser } from "@/utils/authSession";
import { base_url } from "@/api/baseUrl";
import TermsContent from "@/components/regulation/TermsContent";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Container = () => {
  const [loading, setLoading] = useState(false);

  const userDetails = getCurrentUser();

  const navigate = useNavigate();

  const handleNextStep = async () => {
    setLoading(true);
    const updateUserInfo = {
      user_id: userDetails?._id,
      termsAndConditions: false,
      isNewUser: false,
    };

    try {
      const [updateResponse] = await Promise.all([
        axios.post(`${base_url}/updateUserInfo`, updateUserInfo),
        axios.post(`${base_url}/food-dairy`, { user_id: userDetails?._id }),
      ]);

      if (updateResponse.status === 200) {
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
      <div className="max-w-3xl mx-auto">
        <div className="w-full rounded-lg shadow-lg bg-white px-4 sm:px-8 md:px-12 py-6 sm:py-10">
          <TermsContent />

          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="px-6 sm:px-8 py-2 sm:py-2.5 bg-[#7994CB] text-white font-bold text-sm md:text-base rounded-full transition duration-300 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg whitespace-nowrap"
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
