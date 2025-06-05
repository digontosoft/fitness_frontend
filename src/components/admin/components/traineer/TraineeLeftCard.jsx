import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

import rightArmIcon from "@/assets/image/right-arm.svg";
import leftArmIcon from "@/assets/image/left-arm.svg";
import rightLeg from "@/assets/image/right-leg.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import thigh from "@/assets/image/thigh.svg";
import butt from "@/assets/image/butt.svg";
import cardBg from "@/assets/image/image.svg";
const TraineeLeftCard = ({ userId }) => {
  const [measurementData, setMesurementData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!userId) return;

    const fetchMeasurement = async () => {
      try {
        const res = await axios.get(`${base_url}/measurement/${userId}`);
        if (res.status === 200) {
          setMesurementData(res.data.data);
        }
      } catch (error) {
        console.error("measurement data not Fatched", error);
      }
    };
    fetchMeasurement();
  }, [userId]);

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
    <div className="relative sm:w-[500px] w-full h-[245px] rounded-2xl bg-[#EEEEEE]">
      <div className="absolute top-0 right-0">
        <img src={cardBg} alt="" className="sm:w-[250px] h-full" />
      </div>
      <h1 className="text-2xl text-black font-bold text-right py-4 px-10 relative z-50">
        מדדים
      </h1>
      <div className="relative grid grid-cols-2 gap-6 justify-items-center items-center">
        <div className="flex flex-col gap-4">
          <div className="flex items-center  gap-2 w-full">
            <img
              src={rightArmIcon}
              alt=""
              className="object-cover h-4 w-4 sm:h-5 sm:w-5"
            />
            <p className="sm:text-lg text-xs font-bold text-black">
              זרוע ימין:{" "}
              <span className="font-normal">{measurementData?.armr}</span>
            </p>
          </div>

          <div className="flex items-center  gap-2 w-full">
            <img
              src={leftArmIcon}
              alt=""
              className="object-cover h-4 w-4 sm:h-5 sm:w-5"
            />
            <p className="sm:text-lg text-xs font-bold text-black">
              זרוע שמאל:{" "}
              <span className="font-normal">{measurementData?.arml}</span>
            </p>
          </div>
          <div className="flex items-center  gap-2 w-full">
            <img
              src={butt}
              alt=""
              className="object-cover h-4 w-4 sm:h-5 sm:w-5"
            />
            <p className="sm:text-lg text-xs font-bold text-black">
              ישבן: <span className="font-normal">{avgThigh}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center  gap-2 w-full">
            <img
              src={rightLeg}
              alt=""
              className="object-cover h-4 w-4 sm:h-5 sm:w-5"
            />
            <p className="sm:text-lg text-xs font-bold text-black">
              ירך ימין:{" "}
              <span className="font-normal">{measurementData?.thighr}</span>
            </p>
          </div>
          <div className="flex items-center  gap-2 w-full">
            <img
              src={leftLeg}
              alt=""
              className="object-cover h-4 w-4 sm:h-5 sm:w-5"
            />
            <p className="sm:text-lg text-xs font-bold text-black">
              ירך שמאל:{" "}
              <span className="font-normal">{measurementData?.thighl}</span>
            </p>
          </div>
          <div className="flex items-center  gap-2 w-full">
            <img
              src={thigh}
              alt=""
              className="object-cover h-4 w-4 sm:h-5 sm:w-5"
            />
            <p className="sm:text-lg text-xs font-bold text-black">
              היקף מותניים:{" "}
              <span className="font-normal">{measurementData?.waist}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeLeftCard;
