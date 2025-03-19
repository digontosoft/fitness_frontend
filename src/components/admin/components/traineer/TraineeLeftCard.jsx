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
  const userType = JSON.parse(localStorage.getItem("userInfo"));
  console.log("tData", userId);
  useEffect(() => {
    const fetchMeasurement = async () => {
      axios.get(`${base_url}/measurement/${userId}`).then((res) => {
        if (res.status === 200) {
          setMesurementData(res.data.data);
          console.log("measurementData", res.data.data);
        }
      });
    };
    fetchMeasurement();
  }, [userId]);

  return (
    <div
      className="w-72 h-48 bg-[#0A0A0A] p-2 rounded-2xl "
      style={{ backgroundImage: `url(${pixelCartImg})` }}
      dir="rtl"
    >
      <div className="flex  flex-col justify-center items-start">
        {/* <Link to="/mesurement-update">
          <Button className="bg-black text-white  text-xs border border-white rounded-full px-3 py-1 font-bold">
            להזנת המדדים
          </Button>
        </Link> */}
      </div>
      <div className="w-full flex justify-center items-center" dir="ltr">
        <div className="flex justify-between gap-6 items-center flex-row-reverse">
          <div>
            <div className="flex items-center ">
              <p className="text-sm text-white" dir="rtl">
                זרוע:{measurementData?.arml}
              </p>
              <img src={icon} alt="" />
            </div>
            <div className="flex items-center ">
              <p className="text-sm text-white" dir="rtl">
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
              <p className="text-sm text-white" dir="rtl">
                מותניים:{measurementData?.armr}
              </p>
              <img src={iconTwo} alt="" />
            </div>
            <div className="flex items-center ">
              <p className="text-sm text-white" dir="rtl">
                יריכיים:{measurementData?.thighl}
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
