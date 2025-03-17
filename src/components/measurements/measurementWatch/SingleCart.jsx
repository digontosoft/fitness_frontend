import { mwatchData } from "@/constants/mwatchData";
import { pixelCartImg } from "@/assets";
import SmallCart from "./SmallCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const SingleCart = () => {
  const getButtonClass = (data) => {
    if (data.green) {
      return "bg-green-400 hover:bg-green-500 text-white text-xs font-bold";
    } else if (data.blck) {
      return "bg-gray-800 hover:bg-gray-600 text-white text-xs font-bold";
    } else if (data.red) {
      return "bg-red-800 hover:bg-red-600 text-white text-xs font-bold";
    }
    return "bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold";
  };

  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/measurement/calculate/67d6f2fe2899b65e6f5951bf`);
        //const data = await response.json();
        console.log("data",response);
        
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()

  }, []);
  console.log("data",data);
  

  return (
    <div
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 pt-10 p-4"
      dir="rtl"
    >
      {data.map((data) => (
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

          {/* Button */}
        </div>
      ))}
    </div>
  );
};

export default SingleCart;
