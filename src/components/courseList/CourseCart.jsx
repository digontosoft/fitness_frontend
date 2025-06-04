// import cartBg from "../../assets/image/workoutList/Bg.png";
// import whiteLogo from "../../assets/image/whiteLogo.png";
// import icon from "../../assets/image/right-arm.svg";
// import HeroVideo from "../startTraining/HeroVideo";
// import ReactPlayer from "react-player";
// const CourseCart = ({ exercise, handleOpen }) => {
//   console.log("exercise:", exercise);
//   return (
//     <div
//       className="w-[310px] sm:w-56 shadow-xl rounded-2xl p-3 mt-8 cursor-pointer"
//       onClick={() => handleOpen(exercise._id)}
//     >
//       {/* <div
//         className="w-full h-40 rounded-2xl flex justify-center items-center "
//         style={{
//           backgroundImage: `url(${cartBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <img className="w-20 h-20" src={whiteLogo} alt="" />
//       </div> */}
//       {exercise?.video_url && (
//         <div className="overflow-hidden rounded-2xl">
//           <ReactPlayer
//             url={exercise?.video_url}
//             height="50%"
//             width="100%"
//             controls
//           />
//         </div>
//       )}
//       <div className="px-6 py-4">
//         <p className="text-[#0A2533]  text-sm font-bold text-end">
//           {exercise?.name}
//         </p>
//         <div className="flex gap-2  items-center flex-row-reverse">
//           <img src={icon} alt="" />
//           <p>{exercise.body_part}</p>
//         </div>
//         <div className="flex gap-2  items-center flex-row-reverse">
//           <img src={icon} alt="" />
//           <p>{exercise?.equipment}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCart;

import cartBg from "../../assets/image/workoutList/Bg.png";
import whiteLogo from "../../assets/image/whiteLogo.png";
import icon from "../../assets/image/right-arm.svg";
import back from "../../assets/image/back.svg";
import womenback from "../../assets/image/woman-back.svg";
import lowerBack from "../../assets/image/lower-back.svg";
import frontHand from "../../assets/image/front-hand.svg";
import backHand from "../../assets/image/back-hand.svg";
import shoulder from "../../assets/image/shoulder.svg";
import chest from "../../assets/image/chest.svg";
import butt from "../../assets/image/butt.svg";
import trx from "../../assets/image/trx.svg";
import machine from "../../assets/image/machine.svg";
import weights from "../../assets/image/weights.svg";
import pully from "../../assets/image/pully.svg";
import bands from "../../assets/image/bands.svg";
import dumbles from "../../assets/image/dumbles.svg";
import HeroVideo from "../startTraining/HeroVideo";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
const CourseCart = ({ exerciseId, handleOpen }) => {
  console.log("exerciseId:", exerciseId);
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!exerciseId) return;

    setLoading(true);
    axios
      .get(`${base_url}/exercise/${exerciseId}`)
      .then((response) => {
        if (response.status === 200) {
          setExerciseData(response.data.data);
          console.log("first", response.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [exerciseId]);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("user", user);

  let customIcon = null;
  if (exerciseData?.body_part === "גב") {
    customIcon = user?.gernder === "male" ? back : womenback;
  } else if (exerciseData?.body_part === "יד קדמית") {
    customIcon = frontHand;
  } else if (exerciseData?.body_part === "יד אחורית") {
    customIcon = backHand;
  } else if (exerciseData?.body_part === "כתפיים") {
    customIcon = shoulder;
  } else if (exerciseData?.body_part === "חזה") {
    customIcon = chest;
  } else if (exerciseData?.body_part === "ישבן") {
    customIcon = butt;
  } else if (exerciseData?.body_part === "גב תחתון") {
    customIcon = lowerBack;
  }
  let customEquipment = null;
  if (exerciseData?.equipment === "TRX") {
    customEquipment = trx;
  } else if (exerciseData?.equipment === "מכונות") {
    customEquipment = machine;
  } else if (exerciseData?.equipment === "משקולות") {
    customEquipment = dumbles;
  } else if (exerciseData?.equipment === "פולי") {
    customEquipment = pully;
  } else if (exerciseData?.equipment === "גומיות") {
    customEquipment = bands;
  } else if (exerciseData?.equipment === "מוטות") {
    customEquipment = weights;
  }

  return (
    <div
      className="w-[310px] sm:w-56 shadow-xl rounded-2xl p-3 mt-8 cursor-pointer"
      onClick={() => handleOpen(exerciseData?._id)}
    >
      {exerciseData?.video_url && (
        <div className="overflow-hidden rounded-2xl">
          <ReactPlayer
            url={exerciseData?.video_url}
            height="50%"
            width="100%"
            controls
          />
        </div>
      )}
      <div className="px-6 py-4 space-y-4">
        <p className="text-[#0A2533]  text-sm font-bold text-end">
          {exerciseData?.name}
        </p>
        <div className="flex gap-2 items-center flex-row-reverse">
          <img src={customIcon} alt="" className="w-6 h-6" />
          <p>{exerciseData?.body_part}</p>
        </div>
        <div className="flex gap-2  items-center flex-row-reverse">
          <img src={customEquipment} alt="" className="w-6 h-6" />
          <p>{exerciseData?.equipment}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
