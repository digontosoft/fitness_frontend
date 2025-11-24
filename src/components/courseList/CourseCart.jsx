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

import ReactPlayer from "react-player";
import backHand from "../../assets/image/back-hand.svg";
import back from "../../assets/image/back.svg";
import bands from "../../assets/image/bands.svg";
import butt from "../../assets/image/butt.svg";
import chest from "../../assets/image/chest.svg";
import dumbles from "../../assets/image/dumbles.svg";
import frontHand from "../../assets/image/front-hand.svg";
import leg from "../../assets/image/leg.svg";
import lowerBack from "../../assets/image/lower-back.svg";
import machine from "../../assets/image/machine.svg";
import menbelly from "../../assets/image/man-belly.svg";
import noequipment from "../../assets/image/no-equipment.svg";
import pully from "../../assets/image/pully.svg";
import shoulder from "../../assets/image/shoulder.svg";
import trx from "../../assets/image/trx.svg";
import weights from "../../assets/image/weights.svg";
import womenback from "../../assets/image/woman-back.svg";
import womenbelly from "../../assets/image/woman-belly.svg";
const CourseCart = ({ exercise, handleOpen }) => {

  const user = JSON.parse(localStorage.getItem("userInfo"));

  let customIcon = null;
  if (exercise?.body_part === "גב") {
    customIcon = user?.gender === "male" ? back : womenback;
  } else if (exercise?.body_part === "יד קדמית") {
    customIcon = frontHand;
  } else if (exercise?.body_part === "יד אחורית") {
    customIcon = backHand;
  } else if (exercise?.body_part === "כתפיים") {
    customIcon = shoulder;
  } else if (exercise?.body_part === "חזה") {
    customIcon = chest;
  } else if (exercise?.body_part === "ישבן") {
    customIcon = butt;
  } else if (exercise?.body_part === "גב תחתון") {
    customIcon = lowerBack;
  }else if (exercise?.body_part === "רגליים") {
    customIcon = leg;
  }else if (exercise?.body_part === "בטן") {
    customIcon = user.gender === "male" ? menbelly : womenbelly;
  }

  let customEquipment = null;
  if (exercise?.equipment === "TRX") {
    customEquipment = trx;
  } else if (exercise?.equipment === "מכונות" || exercise?.equipment === "מכונה") {
    customEquipment = machine;
  } else if (exercise?.equipment === "משקולות") {
    customEquipment = dumbles;
  } else if (exercise?.equipment === "פולי") {
    customEquipment = pully;
  } else if (exercise?.equipment === "גומיות") {
    customEquipment = bands;
  } else if (exercise?.equipment === "מוטות") {
    customEquipment = weights;
  }else if (exercise?.equipment === "ללא ציוד") {
    customEquipment = noequipment;
  }

  return (
    <div
      className="w-[310px] sm:w-56 min-h-80 h-auto shadow-xl rounded-2xl p-3 mt-8 cursor-pointer"
      onClick={() => handleOpen(exercise?._id)}
    >
      {exercise?.video_url && (
        <div className="overflow-hidden rounded-2xl">
          <ReactPlayer
            url={exercise?.video_url}
            height="50%"
            width="100%"
            controls
          />
        </div>
      )}
      <div className="px-6 py-4 space-y-4">
        <p className="text-[#0A2533]  text-sm font-bold text-end">
          {exercise?.name}
        </p>
        <div className="flex gap-2 items-center flex-row-reverse">
          <img src={customIcon} alt="" className="w-6 h-6" />
          <p>{exercise?.body_part}</p>
        </div>
        <div className="flex gap-2  items-center flex-row-reverse">
          <img src={customEquipment} alt="" className="w-6 h-6" />
          <p>{exercise?.equipment}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
