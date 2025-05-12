import { base_url } from "@/api/baseUrl";
import SmallCart from "@/components/measurements/measurementWatch/SmallCart";
import Title from "@/components/measurements/Tilte";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import rightArm from "@/assets/image/right-arm.svg";
import leftArm from "@/assets/image/left-arm.svg";
import butt from "@/assets/image/butt.svg";
import chest from "@/assets/image/chest.svg";

const MeasurementTracking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/measurement/calculate/${userId?._id}`
        );
        if (response.status === 200) {
          setData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId?._id]);

  const sortOrder = [
    "מותן",
    "חזה",
    "ירך ימין",
    "ירך שמאלה",
    "זרוע ימין",
    "זרוע שמאל",
  ];

  const sortedData = [...data].sort(
    (a, b) => sortOrder.indexOf(a.cartTitle) - sortOrder.indexOf(b.cartTitle)
  );

  return (
    <div>
      <Title title={"מעקב מדדים"} />
      {loading ? (
        <Loading />
      ) : (
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 sm:pt-10 p-4"
          dir="rtl"
        >
          {sortedData.map((data) => {
            let customImage = null;

            if (data.cartTitle === "זרוע ימין") {
              customImage = rightArm;
            } else if (data.cartTitle === "זרוע שמאל") {
              customImage = leftArm;
            } else if (data.cartTitle === "חזה") {
              customImage = chest;
            } else if (data.cartTitle === "ישבן") {
              customImage = butt;
            }

            return (
              <div
                key={data._id}
                dir="rtl"
                className="border rounded-2xl p-4 flex flex-col space-y-4 bg-[#EEEEEE]"
              >
                {/* Title and Icon */}
                <div className="relative z-50 flex gap-2 items-center space-x-2">
                  {customImage ? (
                    <img
                      src={customImage}
                      alt="custom-icon"
                      className="w-6 h-6"
                    />
                  ) : data.icon ? (
                    <img src={data.icon} alt="icon" className="w-6 h-6" />
                  ) : null}
                  <h3 className="text-lg font-bold">{data.cartTitle}</h3>
                </div>

                <div className="flex justify-center items-start"></div>
                <div className="flex justify-center items-center">
                  <SmallCart data={data} />
                </div>
                <a
                  href=""
                  className="text-lg font-semibold text-center underline"
                >
                  הצגת מדדים קודמים
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MeasurementTracking;
