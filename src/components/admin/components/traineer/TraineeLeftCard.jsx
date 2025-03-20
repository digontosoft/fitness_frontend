import { Button } from "@/components/ui/button";
import {
  icon,
  iconOne,
  iconThree,
  iconTwo,
  pixelCartImg,
} from "@/assets/index";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const TraineeLeftCard = ({ userId }) => {
  const [measurementData, setMesurementData] = useState(null);
  const [loading, setLoading] = useState(false);

  const userType = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userId) return;

    const fetchMeasurement = async () => {
      // setLoading(true);
      try {
        const res = axios.get(`${base_url}/measurement/${userId}`);
        if (res.status === 200) {
          setMesurementData(res.data.data);
          console.log("measurementData", res.data.data);
        }
      } catch (error) {
        console.error("measurement data not Fatched");
      } finally {
        // setLoading(false);
      }
    };
    fetchMeasurement();
  }, [userId]);

  return (
    <div
      className="w-80 h-56 bg-[#0A0A0A] p-2 rounded-2xl "
      style={{ backgroundImage: `url(${pixelCartImg})` }}
      dir="rtl"
    >
      <div className="w-full h-full flex justify-center items-center" dir="ltr">
        <div className="flex justify-between gap-6 items-center flex-row-reverse">
          <div>
            <div className="flex items-center ">
              <p className="text-lg text-white" dir="rtl">
                זרוע: {measurementData?.arml}
              </p>
              <img src={icon} alt="" />
            </div>
            <div className="flex items-center ">
              <p className="text-lg text-white" dir="rtl">
                חזה:
                {userType.gender === "male"
                  ? measurementData?.chest
                  : measurementData?.butt}
              </p>
              <img src={iconOne} alt="" />
            </div>
          </div>
          <div>
            <div className="flex items-center ">
              <p className="text-lg text-white" dir="rtl">
                מותניים: {measurementData?.armr}
              </p>
              <img src={iconTwo} alt="" />
            </div>
            <div className="flex items-center ">
              <p className="text-lg text-white" dir="rtl">
                יריכיים: {measurementData?.thighl}
              </p>
              <img src={iconThree} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeLeftCard;
