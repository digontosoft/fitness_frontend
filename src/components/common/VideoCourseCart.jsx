import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import HeroVideo from "@/components/startTraining/HeroVideo";
import { useState } from "react";
import back from "@/assets/image/back.svg";
import womenback from "@/assets/image/woman-back.svg";
import lowerBack from "@/assets/image/lower-back.svg";
import frontHand from "@/assets/image/front-hand.svg";
import backHand from "@/assets/image/back-hand.svg";
import shoulder from "@/assets/image/shoulder.svg";
import chest from "@/assets/image/chest.svg";
import butt from "@/assets/image/butt.svg";
import trx from "@/assets/image/trx.svg";
import machine from "@/assets/image/machine.svg";
import weights from "@/assets/image/weights.svg";
import pully from "@/assets/image/pully.svg";
import bands from "@/assets/image/bands.svg";
import dumbles from "@/assets/image/dumbles.svg";
const VideoCourseCart = ({ exercise }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  let customIcon = null;
  if (exercise.exercise_id?.body_part === "גב") {
    customIcon = user?.gernder === "male" ? back : womenback;
  } else if (exercise.exercise_id?.body_part === "יד קדמית") {
    customIcon = frontHand;
  } else if (exercise.exercise_id?.body_part === "יד אחורית") {
    customIcon = backHand;
  } else if (exercise.exercise_id?.body_part === "כתפיים") {
    customIcon = shoulder;
  } else if (exercise.exercise_id?.body_part === "חזה") {
    customIcon = chest;
  } else if (exercise.exercise_id?.body_part === "ישבן") {
    customIcon = butt;
  } else if (exercise.exercise_id?.body_part === "גב תחתון") {
    customIcon = lowerBack;
  }
  let customEquipment = null;
  if (exercise.exercise_id?.equipment === "TRX") {
    customEquipment = trx;
  } else if (exercise.exercise_id?.equipment === "מכונות") {
    customEquipment = machine;
  } else if (exercise.exercise_id?.equipment === "משקולות") {
    customEquipment = dumbles;
  } else if (exercise.exercise_id?.equipment === "פולי") {
    customEquipment = pully;
  } else if (exercise.exercise_id?.equipment === "גומיות") {
    customEquipment = bands;
  } else if (exercise.exercise_id?.equipment === "מוטות") {
    customEquipment = weights;
  }
  console.log("exercise:", exercise);
  return (
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <div className="w-full cursor-pointer md:w-96 flex gap-2 items-center justify-between px-2 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300">
    //       <Button className="rounded-2xl">
    //         <FaArrowLeftLong />
    //       </Button>
    //       <div className="w-full flex items-center justify-center">
    //         <h1 className="text-sm font-bold text-[#0A2533]">
    //           {exercise?.exercise_id?.name}
    //         </h1>
    //       </div>
    //       <div className="w-full max-w-xs mx-auto">
    //         <ReactPlayer
    //           url={exercise?.exercise_id?.video_url}
    //           width="100%"
    //           height="80px"
    //           controls
    //           className="rounded-lg border border-gray-200 shadow-sm"
    //         />
    //       </div>
    //     </div>
    //   </DialogTrigger>

    //   <DialogContent className="sm:max-w-[720px]">
    //     <DialogHeader>
    //       <DialogTitle className="text-center">
    //         {exercise?.exercise_id?.name}
    //       </DialogTitle>
    //     </DialogHeader>
    //     <div className="w-full">
    //       <ReactPlayer
    //         url={exercise?.exercise_id?.video_url}
    //         width="100%"
    //         height="360px"
    //         controls
    //         className="rounded-lg border border-gray-200 shadow-sm"
    //       />
    //     </div>
    //     <DialogFooter>
    //       <DialogClose asChild>
    //         <Button variant="default" className="bg-[#7994CB]">
    //           Close
    //         </Button>
    //       </DialogClose>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer md:w-96 flex gap-2 items-center justify-between px-2 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300">
          <Button className="rounded-2xl">
            <FaArrowLeftLong />
          </Button>
          <div className="w-full flex items-center justify-center">
            <h1 className="text-sm font-bold text-[#0A2533]">
              {exercise?.exercise_id?.name}
            </h1>
          </div>
          <div className="w-full max-w-xs mx-auto">
            <ReactPlayer
              url={exercise?.exercise_id?.video_url}
              width="100%"
              height="80px"
              controls
              className="rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            פרטי תרגיל
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <HeroVideo
              videoUrl={exercise.exercise_id?.video_url}
              className="sm:mt-10 mt-0"
            />
          </div>
          <h2 className="text-lg font-bold">{exercise.exercise_id?.name}</h2>
          <p className="text-sm text-gray-600 text-center px-4">
            {exercise.exercise_id?.description}
          </p>
          <div className="flex gap-2 items-center flex-row-reverse" dir="rtl">
            <img src={customIcon} alt="" className="w-6 h-6" />
            <p className="flex flex-row-reverse gap-2">
              <span>{exercise.exercise_id?.body_part}</span> :{" "}
              <span>איזור בגוף</span>
            </p>
          </div>
          <div className="flex gap-2  items-center flex-row-reverse" dir="rtl">
            <img src={customEquipment} alt="" className="w-6 h-6" />
            <p className="flex flex-row-reverse gap-2">
              <span>{exercise.exercise_id?.equipment}</span> : <span>ציוד</span>
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-[#7994CB]">סגור</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCourseCart;
