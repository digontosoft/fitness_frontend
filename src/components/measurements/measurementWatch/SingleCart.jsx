import { base_url } from "@/api/baseUrl";
import butt from "@/assets/image/butt.svg";
import chest from "@/assets/image/chest.svg";
import leftArm from "@/assets/image/left-arm.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import maleChest from "@/assets/image/male-chest.svg";
import manWaist from "@/assets/image/man-waist.svg";
import rightArm from "@/assets/image/right-arm.svg";
import rightLeg from "@/assets/image/right-thigh.svg";
import womenHips from "@/assets/image/women-hips.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import SmallCart from "./SmallCart";
const SingleCart = ({ userId, setOpen, setId }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [measurementReport, setMeasurementReport] = useState(null);

  console.log("user", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/measurement/calculate/${userId}`
        );

        const measurementResponse = await axios.get(
          `${base_url}/report/measurement/${userId}`
        );

        if (measurementResponse.status === 200) {
          setMeasurementReport(measurementResponse?.data.data.report_link);
        }

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        setUser(response.data.data);
        localStorage.setItem(
          "selectedUserId",
          JSON.stringify(response.data.data._id)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  const sortOrder = [
    "ירך ימין",
    "ירך שמאלה",
    "מותן",
    "חזה",
    "זרוע ימין",
    "זרוע שמאל",
  ];

  const sortedData = [...data].sort(
    (a, b) => sortOrder.indexOf(a.cartTitle) - sortOrder.indexOf(b.cartTitle)
  );

  return (
    <div
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:pt-10 sm:p-4 sm:px-0 px-4 sm:mb-0 mb-10"
      dir="rtl"
    >
      {data.map((data, index) => {
        let customImage = null;
        const items = Array.isArray(data?.item) ? data.item : [];

        if (data.cartTitle === "זרוע ימין") {
          customImage = rightArm;
        } else if (data.cartTitle === "זרוע שמאל") {
          customImage = leftArm;
        } else if (data.cartTitle === "ירך ימין") {
          customImage = rightLeg;
        } else if (data.cartTitle === "ישבן") {
          customImage = butt;
        } else if (data.cartTitle === "מותן") {
          customImage = user?.gender === "male" ? manWaist : womenHips;
        } else if (data.cartTitle === "ירך שמאל") {
          customImage = leftLeg;
        } else if (data.cartTitle === "חזה") {
          customImage = user?.gender === "male" ? maleChest : chest;
        }

        return (
          <div
            key={data._id ?? `${data.cartTitle}-${index}`}
            dir="rtl"
            className="rounded-2xl p-4 flex flex-col space-y-4 bg-[#F1F0EB]"
          >
            {/* Title and Icon */}
            <div className="relative z-50 flex gap-2 items-center space-x-2 text-black">
              {customImage ? (
                <img src={customImage} alt="custom-icon" className="w-6 h-6" />
              ) : data.icon ? (
                <img src={data.icon} alt="icon" className="w-6 h-6" />
              ) : null}
              <h3 className="text-lg font-bold">{data.cartTitle}</h3>
            </div>

            <div className="flex justify-center items-start"></div>

            <div className="flex justify-center items-center">
              <SmallCart
                data={{
                  ...data,
                  item: [...items].reverse(),
                }}
                setOpen={setOpen}
                setId={setId}
              />
            </div>
            <a
              href={measurementReport}
              download
              className="text-lg font-semibold text-center underline cursor-pointer"
            >
              הצגת מדדים קודמים
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SingleCart;
