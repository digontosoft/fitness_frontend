// // import { mwatchData } from "@/constants/mwatchData";
// import { pixelCartImg } from "@/assets";
// import SmallCart from "./SmallCart";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { base_url } from "@/api/baseUrl";

// const SingleCart = ({ userId, setOpen, setId }) => {
//   const getButtonClass = (data) => {
//     if (data.green) {
//       return "bg-green-400 hover:bg-green-500 text-white text-xs font-bold";
//     } else if (data.blck) {
//       return "bg-gray-800 hover:bg-gray-600 text-white text-xs font-bold";
//     } else if (data.red) {
//       return "bg-red-800 hover:bg-red-600 text-white text-xs font-bold";
//     }
//     return "bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold";
//   };

//   const [data, setData] = useState([]);

//   console.log("userId", userId);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${base_url}/measurement/calculate/${userId}`
//         );

//         setData(response?.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   return (
//     <div
//       className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:pt-10 sm:p-4 sm:px-0 px-4"
//       dir="rtl"
//     >
//       {data.map((data) => (
//         <div
//           key={data._id}
//           dir="rtl"
//           className="border rounded-2xl shadow-lg p-4 flex flex-col space-y-4 "
//           style={{
//             backgroundImage: `url(${pixelCartImg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* Title and Icon */}
//           <div className="flex gap-2 items-center space-x-2 text-white">
//             {/* <img src={data.icon} alt="icon" className="w-6 h-6 text-white" /> */}
//             <h3 className="text-lg font-bold">{data.cartTitle}</h3>
//           </div>

//           <div className="flex justify-center items-start"></div>

//           <div className="flex justify-center items-center">
//             <SmallCart data={data} setOpen={setOpen} setId={setId} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SingleCart;

// import { mwatchData } from "@/constants/mwatchData";
import { pixelCartImg } from "@/assets";
import SmallCart from "./SmallCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import rightArm from "@/assets/image/right-arm.svg";
import leftArm from "@/assets/image/left-arm.svg";
import butt from "@/assets/image/butt.svg";
import menHips from "@/assets/image/men-hips.svg";
import chest from "@/assets/image/chest.svg";
import womenHips from "@/assets/image/women-hips.svg";
import womenWaist from "@/assets/image/thigh.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import rightLeg from "@/assets/image/right-thigh.svg";
const SingleCart = ({ userId, setOpen, setId }) => {
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

  const [data, setData] = useState([]);

  console.log("userId", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/measurement/calculate/${userId}`
        );

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  // const sortOrder = [
  //   "מותן",
  //   "חזה",
  //   "ירך ימין",
  //   "ירך שמאלה",
  //   "זרוע ימין",
  //   "זרוע שמאל",
  // ];

  // const sortedData = [...data].sort(
  //   (a, b) => sortOrder.indexOf(a.cartTitle) - sortOrder.indexOf(b.cartTitle)
  // );

  return (
    <div
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:pt-10 sm:p-4 sm:px-0 px-4"
      dir="rtl"
    >
      {data.map((data) => {
        let customImage = null;

        if (data.cartTitle === "זרוע ימין") {
          customImage = rightArm;
        } else if (data.cartTitle === "זרוע שמאל") {
          customImage = leftArm;
        } else if (data.cartTitle === "ירך ימין") {
          customImage = rightLeg;
        } else if (data.cartTitle === "ישבן") {
          customImage = butt;
        } else if (data.cartTitle === "מותן") {
          customImage = userId.gender === "male" ? menHips : womenHips;
        } else if (data.cartTitle === "ירך שמאל") {
          customImage = leftLeg;
        } else if (data.cartTitle === "חזה") {
          customImage = chest;
        }

        return (
          <div
            key={data._id}
            dir="rtl"
            className="rounded-2xl p-4 flex flex-col space-y-4 bg-[#EEEEEE]"
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
              <SmallCart data={data} setOpen={setOpen} setId={setId} />
            </div>
            <a href="" className="text-lg font-semibold text-center underline">
              הצגת מדדים קודמים
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SingleCart;
