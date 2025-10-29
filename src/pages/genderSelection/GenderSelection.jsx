import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { UserInfoContext } from "@/context";
import axios from "axios";
import { Loader } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { bodyBuilder, female, man } from "../../assets/index";

const GenderSelection = () => {
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("userInfo"));

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
            localStorage.setItem("userInfo", JSON.stringify(userData));
            navigate("/regulation");
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
                className={`bg-gray-400 hover:bg-gray-500 transition duration-300 rounded-full h-8 text-white font-semibold flex justify-center items-center w-full ${
                  gender === "female" ? "bg-red-600" : ""
                }`}
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
                className={`bg-gray-400 hover:bg-gray-500 transition duration-300 rounded-full h-8 text-white font-semibold flex justify-center items-center w-full ${
                  gender === "male" ? "bg-red-600" : ""
                }`}
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
             {loading ? <><Loader className="animate-spin h-6 w-6 flex items-center gap-2" /> <p>המשך לשלב הבא</p></> :  <p>המשך לשלב הבא</p>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
