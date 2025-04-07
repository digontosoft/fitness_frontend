// import { Button } from "@/components/ui/button";
// import {
//   icon,
//   iconOne,
//   iconThree,
//   iconTwo,
//   pixelCartImg,
// } from "@/assets/index";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { base_url } from "@/api/baseUrl";

// const TraineeLeftCard = ({ userId }) => {
//   const [measurementData, setMesurementData] = useState({});

//   const userType = JSON.parse(localStorage.getItem("userInfo"));

//   useEffect(() => {
//     if (!userId) return;

//     const fetchMeasurement = async () => {
//       try {
//         const res = axios.get(`${base_url}/measurement/${userId}`);
//         if (res.status === 200) {
//           setMesurementData(res.data);
//           console.log("measurement data Fatched:", res.data);
//         }
//       } catch (error) {
//         console.error("measurement data not Fatched");
//       }
//     };
//     fetchMeasurement();
//   }, [userId]);

//   return (
//     <div
//       className="w-80 h-56 bg-[#0A0A0A] p-2 rounded-2xl "
//       style={{ backgroundImage: `url(${pixelCartImg})` }}
//       dir="rtl"
//     >
//       <div className="w-full h-full flex justify-center items-center" dir="ltr">
//         <div className="flex justify-between gap-6 items-center flex-row-reverse">
//           <div>
//             <div className="flex items-center ">
//               <p className="text-lg text-white" dir="rtl">
//                 זרוע: {measurementData?.arml}
//               </p>
//               <img src={icon} alt="" />
//             </div>
//             <div className="flex items-center ">
//               <p className="text-lg text-white" dir="rtl">
//                 חזה:
//                 {userType.gender === "male"
//                   ? measurementData?.chest
//                   : measurementData?.butt}
//               </p>
//               <img src={iconOne} alt="" />
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center ">
//               <p className="text-lg text-white" dir="rtl">
//                 מותניים: {measurementData?.armr}
//               </p>
//               <img src={iconTwo} alt="" />
//             </div>
//             <div className="flex items-center ">
//               <p className="text-lg text-white" dir="rtl">
//                 יריכיים: {measurementData?.thighl}
//               </p>
//               <img src={iconThree} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TraineeLeftCard;

import { Button } from "@/components/ui/button";
import {
  icon,
  iconOne,
  iconThree,
  iconTwo,
  pixelCartImg,
} from "@/assets/index";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const TraineeLeftCard = ({ userId }) => {
  const [measurementData, setMesurementData] = useState({});

  const userType = JSON.parse(localStorage.getItem("userInfo"));
  console.log("userType", userType.gender);

  useEffect(() => {
    if (!userId) return;

    const fetchMeasurement = async () => {
      try {
        const res = await axios.get(`${base_url}/measurement/${userId}`);
        // console.log("measurement data Fatched:", res);
        if (res.status === 200) {
          setMesurementData(res.data.data);
          console.log("measurement data Fatched:", res.data.data);
        }
      } catch (error) {
        console.error("measurement data not Fatched");
      }
    };
    fetchMeasurement();
  }, [userId]);
  console.log("measurementData", measurementData);
  const leftArm = Number(measurementData?.arml) || 0;
  const rightArm = Number(measurementData?.armr) || 0;
  const total = leftArm + rightArm;
  const avg = Math.floor(total / 2);
  const leftThigh = Number(measurementData?.thighl) || 0;
  const rightThigh = Number(measurementData?.thighr) || 0;
  const totalThigh = leftThigh + rightThigh;
  const avgThigh = Math.floor(totalThigh / 2);
  console.log("userType", userType.gender);
  

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
                זרוע: {avg}
              </p>
              <img src={icon} alt="" />
            </div>
            <div className="flex items-center ">
              <p className="text-lg text-white" dir="rtl">
                
                <span>{userType.gender === "male" ? "חָזֶה":'ישבן' }</span>
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
                מותניים: {measurementData?.weight}
              </p>
              <img src={iconTwo} alt="" />
            </div>
            <div className="flex items-center ">
              <p className="text-lg text-white" dir="rtl">
                יריכיים: {avgThigh}
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
