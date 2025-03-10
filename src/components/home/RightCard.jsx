import { useEffect, useState } from "react";
import {
  Ractanglebg,
  Ellipse,
  Running,
  vector2,
  vector3,
  female2,
  men2,
  Ellipse88,
} from "../../assets/index";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const RightCard = ({ user }) => {
  const [userSteps, setUserSteps] = useState({});
  const progress = userSteps?.step_average;
  const strokeWidth = 4;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (progress / userSteps?.step_target) * circumference;
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const gender = userDetails?.gender;
  useEffect(() => {
    const fetchUserSteps = async () => {
      try {
        await axios
          .get(`${base_url}/get-user-steps-vs-target/${user?._id}`)
          .then((response) => {
            if (response.status === 200) {
              const userData = response.data.data;
              setUserSteps(userData);
              console.log("info:", response.data.data);
            }
          });
      } catch (err) {
        // toast.error(err.response.data.message);
        console.log("error:", err);
      }
    };
    fetchUserSteps();
  }, [user?._id]);
  // const handleOpenModal = () => {
  //   console.log("hello this is open modal function");
  // };
  return (
    <div
      // onClick={handleOpenModal}
      className="w-72 h-48 bg-gradient-to-tr from-[#0A0A0A] via-[#343434] to-[#0A0A0A] p-2 rounded-2xl relative"
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${vector2})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-24 w-24 rounded-full top-3 left-3 absolute bg-[#7E7E7E] flex items-center justify-center">
          <div className="h-[74px] w-[74px] rounded-full bg-white flex items-center justify-center ">
            <div className="flex items-center justify-center">
              <svg
                className="w-20 h-16 transform -rotate-90"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="#CCFFC4"
                  strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="#47C659"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-sm font-semibold text-green-500">
                  {progress}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-44 left-10 w-full h-full"
        style={{
          backgroundImage: `url(${vector3})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute top-0 left-[143px] w-full h-full"
        style={{
          backgroundImage: `url(${Ellipse88})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute top-0 left-[170px] w-full h-full"
        style={{
          backgroundImage: `url(${Ellipse})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={gender === "male" ? men2 : female2}
          alt="female"
          className="h-[102px] w-8 relative left-[60px] top-4"
        />
      </div>
      <div className="flex flex-col items-end justify-end pr-4 absolute bottom-5 right-0">
        <div>
          <span className="text-white">
            {userSteps?.step_target} /{" "}
            <span className="text-2xl font-semibold">
              {userSteps?.step_average}
            </span>
            <h1 className="text-sm font-semibold text-right">צעדים</h1>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightCard;
