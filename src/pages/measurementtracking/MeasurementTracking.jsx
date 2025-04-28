import { base_url } from "@/api/baseUrl";
import SmallCart from "@/components/measurements/measurementWatch/SmallCart";
import Title from "@/components/measurements/Tilte";
import axios from "axios";
import { useEffect, useState } from "react";
import { pixelCartImg } from "@/assets";
import Loading from "@/components/common/Loading";

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
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
          {sortedData.map((data) => (
            <div
              key={data._id}
              dir="rtl"
              className="border rounded-2xl shadow-lg p-4 flex flex-col space-y-4 "
              style={{
                backgroundImage: `url(${pixelCartImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Title and Icon */}
              <div className="flex gap-2 items-center space-x-2 text-white">
                {/* <img src={data.icon} alt="icon" className="w-6 h-6 text-white" /> */}
                <h3 className="text-lg font-bold">{data.cartTitle}</h3>
              </div>

              <div className="flex justify-center items-start">
                {" "}
                {/* <button
              className={`py-2 md:w-[70%] w-[90%] rounded-full text-center ${getButtonClass(
                data
              )}`}
            >
              {data.button}
            </button> */}
              </div>
              {/* Items */}

              <div className="flex justify-center items-center">
                <SmallCart data={data} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeasurementTracking;
