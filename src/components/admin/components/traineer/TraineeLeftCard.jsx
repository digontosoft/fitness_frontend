import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";

import butt from "@/assets/image/butt.svg";
import cardBg from "@/assets/image/image.svg";
import leftArmIcon from "@/assets/image/left-arm.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import rightArmIcon from "@/assets/image/right-arm.svg";
import rightLeg from "@/assets/image/right-leg.svg";
import thigh from "@/assets/image/thigh.svg";
// import AddStepAverageForUser from "./AddStepAverageForUser";
const TraineeLeftCard = ({ userId, user, setUser }) => {
  const [measurementData, setMesurementData] = useState([]);
  // const [user, setUser] = useState({});

  useEffect(() => {
    if (!userId) return;
    const fetchMeasurement = async () => {
      try {
        const res = await axios.get(`${base_url}/measurement/${userId}`);
        if (res.status === 200) {
          const allMeasurements = res.data.data;
          allMeasurements.sort((a, b) => new Date(b.date) - new Date(a.date));

          const latestData = allMeasurements[0];
          setMesurementData(latestData);
        }
      } catch (error) {
        console.error("measurement data not Fatched", error);
      }
    };
    fetchMeasurement();
  }, [userId]);

  console.log('measurement data:', measurementData);

  useEffect(() => {
    if (!userId) return;

    const fetchMeasurement = async () => {
      try {
        const res = await axios.get(`${base_url}/getUser/${userId}`);
        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("measurement data not Fatched", error);
      }
    };
    fetchMeasurement();
  }, [userId]);
  const leftArm = Number(measurementData?.arml) || 0;
  const rightArm = Number(measurementData?.armr) || 0;
  const total = leftArm + rightArm;
  const avg = Math.floor(total / 2);
  const leftThigh = Number(measurementData?.thighl) || 0;
  const rightThigh = Number(measurementData?.thighr) || 0;
  const totalThigh = leftThigh + rightThigh;
  const avgThigh = Math.floor(totalThigh / 2);

  return (
    <div className="relative sm:w-[500px] w-full h-[245px] rounded-2xl bg-[#F1F0EB]">
      <div className="absolute top-0 right-0">
        <img src={cardBg} alt="" className="sm:w-[250px] h-full" />
      </div>
      <div className="flex items-center justify-between px-6 py-8 relative  ">
        {/* <AddStepAverageForUser user={user} setUser={setUser} /> */}

        <h1 className="text-2xl text-black font-bold">
          מדדים
        </h1>
      </div>
      <div className="relative w-full flex justify-end items-center py-4 px-4" dir="ltr">
        <div className="grid grid-cols-2 gap-6 justify-items-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                ישבן: {avgThigh}
              </p>
              <img
                src={butt}
                alt=""
                className="object-cover sm:h-6 sm:w-6 h-5 w-5"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                זרוע שמאל: {measurementData?.arml}
              </p>
              <img
                src={leftArmIcon}
                alt=""
                className="object-cover sm:h-6 sm:w-5 h-5 w-4"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                ירך שמאל: {measurementData?.thighl}
              </p>
              <img
                src={leftLeg}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                היקף מותניים: {measurementData?.waist}
              </p>
              <img
                src={thigh}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                זרוע ימין: {measurementData?.armr}
              </p>
              <img
                src={rightArmIcon}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                ירך ימין: {measurementData?.thighr}
              </p>
              <img
                src={rightLeg}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeLeftCard;
