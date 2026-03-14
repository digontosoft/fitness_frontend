import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import HeroVideo from "./startTraining/HeroVideo";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import backHand from "@/assets/image/back-hand.svg";
import back from "@/assets/image/back.svg";
import bands from "@/assets/image/bands.svg";
import butt from "@/assets/image/butt.svg";
import chest from "@/assets/image/chest.svg";
import dumbles from "@/assets/image/dumbles.svg";
import frontHand from "@/assets/image/front-hand.svg";
import lowerBack from "@/assets/image/lower-back.svg";
import stomache from "@/assets/image/man-belly.svg";
import machine from "@/assets/image/machine.svg";
import pully from "@/assets/image/pully.svg";
import shoulder from "@/assets/image/shoulder.svg";
import trx from "@/assets/image/trx.svg";
import weights from "@/assets/image/weights.svg";
import womenback from "@/assets/image/woman-back.svg";
import womenstomache from "@/assets/image/woman-belly.svg";
import noEquipment from "@/assets/image/noequipment.jpeg";


const PersonalExercise = ({ exercise }) => {
  console.log("exerciseP:", exercise.exercise_id);
  const exerciseId = exercise?.exercise_id?._id;
  const [exerciseData, setExerciseData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (!exerciseId) return;

    axios.get(`${base_url}/exercise/${exerciseId}`).then((response) => {
      if (response.status === 200) {
        setExerciseData(response.data.data);
        console.log("exerciseData:", response.data.data);
      }
    });
  }, [exerciseId]);

  const user = JSON.parse(localStorage.getItem("userInfo"));

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
  } else if (exerciseData?.body_part === "בטן") {
    customIcon = user?.gernder === "male" ? stomache : womenstomache;
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
  } else if (exerciseData?.equipment === "ללא ציוד") {
    customEquipment = noEquipment;
  }

  const videoUrl = exerciseData?.video_url || "";

  const getYoutubeId = (url) => {
    if (!url) return null;
    try {
      const regExp =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/;
      const match = url.match(regExp);
      return match && match[1] ? match[1] : null;
    } catch {
      return null;
    }
  };

  const youtubeId = getYoutubeId(videoUrl);
  const thumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : null;

  return (
    <Dialog>
      <div className="w-full md:w-96 flex gap-2 items-center justify-between px-2 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300">
        <DialogTrigger asChild>
          <Button className="rounded-2xl cursor-pointer">
            <FaArrowLeftLong />
          </Button>
        </DialogTrigger>
        <div className="w-full flex items-center" dir="rtl">
          <h1 className="text-sm font-bold text-[#0A2533]">
            {exerciseData?.name}
          </h1>
        </div>
        <div className="relative w-full max-w-xs mx-auto">
          {/* Thumbnail with custom play button, like VideoCourseCart */}
          {!isPlaying && thumbnail && (
            <button
              type="button"
              className="w-full h-[80px] rounded-lg overflow-hidden border border-gray-200 shadow-sm relative"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
              }}
            >
              <img
                src={thumbnail}
                alt={exerciseData?.name || "exercise-video"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 shadow-lg">
                  <FaPlay className="text-white ml-0.5" size={18} />
                </div>
              </div>
            </button>
          )}

          {/* Actual player, starts after click or if no thumbnail */}
          {(isPlaying || !thumbnail) && (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="80px"
              playing={isPlaying}
              controls
              muted
              className="rounded-lg border border-gray-200 shadow-sm"
            />
          )}
        </div>
      </div>
      <DialogContent className="sm:max-w-4xl p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            פרטי תרגיל
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <HeroVideo
              videoUrl={exerciseData?.video_url}
              className="sm:mt-10 mt-0"
            />
          </div>
          <h2 className="text-lg font-bold">{exerciseData?.name}</h2>
          <p className="text-sm text-gray-600 text-center px-4">
            {exerciseData?.description}
          </p>
          <div className="flex gap-2 items-center flex-row-reverse" dir="rtl">
            {customIcon && (
              <img src={customIcon} alt="" className="w-6 h-6" />
            )}
            <p className="flex flex-row-reverse gap-2">
              <span>{exerciseData?.body_part}</span> : <span>איזור בגוף</span>
            </p>
          </div>
          <div className="flex gap-2  items-center flex-row-reverse" dir="rtl">
            {customEquipment && (
              <img src={customEquipment} alt="" className="w-6 h-6" />
            )}
            <p className="flex flex-row-reverse gap-2">
              <span>{exerciseData?.equipment}</span> : <span>ציוד</span>
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

export default PersonalExercise;
