import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

import rightArmIcon from "@/assets/image/right-arm.svg";
import leftArmIcon from "@/assets/image/left-arm.svg";
import rightLeg from "@/assets/image/right-leg.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import thigh from "@/assets/image/thigh.svg";
import butt from "@/assets/image/butt.svg";
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
    <div className="sm:w-[400px] w-full h-[245px] flex items-center justify-center rounded-md bg-[#EEEEEE]">
      <div className="w-full flex justify-center items-center py-4 px-2">
        <div className="grid grid-cols-2 gap-6 justify-items-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center  gap-2 w-full">
              <img src={rightArmIcon} alt="" className="object-cover h-8 w-8" />
              <p className="text-lg">זרוע ימין: {avg}</p>
            </div>

            <div className="flex items-center  gap-2 w-full">
              <img src={leftArmIcon} alt="" className="object-cover h-8 w-8" />
              <p className="text-lg">זרוע שמאל: {measurementData?.waist}</p>
            </div>
            <div className="flex items-center  gap-2 w-full">
              <img src={butt} alt="" className="object-cover h-8 w-8" />
              <p className="text-lg">ישבן: {avgThigh}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center  gap-2 w-full">
              <img src={rightLeg} alt="" className="object-cover h-8 w-8" />
              <p className="text-lg">
                ירך ימין:
                {user.gender === "male"
                  ? measurementData?.chest
                  : measurementData?.butt}
              </p>
            </div>
            <div className="flex items-center  gap-2 w-full">
              <img src={leftLeg} alt="" className="object-cover h-8 w-8" />
              <p className="text-lg">ירך שמאל: {avgThigh}</p>
            </div>
            <div className="flex items-center  gap-2 w-full">
              <img src={thigh} alt="" className="object-cover h-8 w-8" />
              <p className="text-lg">היקף מותניים: {avgThigh}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeLeftCard;
