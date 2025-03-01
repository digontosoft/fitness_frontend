import { verifyToken } from "@/constants/verifyToken";
import { female, man, bodyBuilder } from "../../assets/index";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import { UserInfoContext } from "@/context";

const GenderSelection = () => {
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const { id } = verifyToken(token);
  // console.log("userId:", id._id);

  const handleGenderSelection = (value) => {
    setGender(value);
  };

  const handleNextStep = () => {
    setLoading(true);
    const updateUserInfo = {
      user_id: id?._id,
      gender,
    };
    try {
      axios
        .post(`${base_url}/updateUserInfo`, updateUserInfo)
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data.data;
            setUserInfo(userData);
            localStorage.setItem("authToken", token);
            localStorage.setItem("userInfo", JSON.stringify(userData));
            if (
              userData?.userType === "admin" &&
              userData?.isNewUser === false
            ) {
              navigate("/dashboard");
            } else if (
              userData?.userType === "trainee" &&
              userData?.isNewUser === false
            ) {
              navigate("/");
            } else {
              navigate("/regulation");
            }
          }
        });
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("error:", err);
    } finally {
      setLoading(false);
    }
    if (loading) {
      return <Loading />;
    }
  };

  return (
    <div className="md:flex w-full min-h-screen bg-gradient-to-tr from-[#0A0A0A] via-[#343434] to-[#0A0A0A] ">
      <div className="flex-1 hidden md:flex">
        <img
          src={bodyBuilder}
          alt="body builder"
          className="w-full md:w-[90%] h-[100vh]  object-cover md:object-fill"
        />
      </div>
      <div className="flex-1 md:bg-[#FFFFFF] bg-transparent flex justify-center items-center pt-52 md:pt-0 py-4">
        <div className="flex flex-col justify-center gap-12 items-center ">
          <div className="flex justify-center items-center">
            <p className="text-xl  md:text-[#000000] text-white">
              בחר/י כיצד תרצה/י שנפנה אלייך:
            </p>
          </div>
          <div className="flex  gap-3 justify-start items-center my-8">
            <div className="flex flex-col gap-4">
              <img src={female} alt="" />
              <Button
                variant="ai"
                size="lg"
                className="bg-[#FF6757] hover:bg-red-600 transition duration-300 rounded-full h-8 text-white font-semibold flex justify-center items-center w-full"
                onClick={() => handleGenderSelection("female")}
              >
                <p>נקבה</p>
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <img src={man} alt="" />
              <Button
                variant="ai"
                size="lg"
                className="bg-[#141414] hover:bg-gray-700 transition duration-300 h-8 rounded-full text-white font-semibold flex justify-center items-center w-full"
                onClick={() => handleGenderSelection("male")}
              >
                <p>זכר</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8 w-full">
            <Button
              type="submit"
              variant="ai"
              size="lg"
              className=" bg-[#141414] hover:bg-gray-700 transition duration-300 rounded-full text-white px-6  flex justify-center items-center border-[2px] border-slate-50 md:border-none"
              onClick={handleNextStep}
            >
              <p>המשך לשלב הבא</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
