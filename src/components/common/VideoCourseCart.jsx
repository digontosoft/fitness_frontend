import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
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
import stomache from "@/assets/image/man-belly.svg";
import womenstomache from "@/assets/image/woman-belly.svg";
import noEquipment from "@/assets/image/noequipment.jpeg";

const VideoCourseCart = ({ exercise }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [isPlaying, setIsPlaying] = useState(false);

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
  } else if (exercise.exercise_id?.body_part === "בטן") {
    customIcon = user?.gernder === "male" ? stomache : womenstomache;
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
  } else if (exercise.exercise_id?.equipment === "ללא ציוד") {
    customEquipment = noEquipment;
  }

  const videoUrl = exercise?.exercise_id?.video_url || "";

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
            {exercise?.exercise_id?.name}
          </h1>
        </div>
        <div className="relative w-full max-w-xs mx-auto">
          {/* Thumbnail with custom play button */}
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
                alt={exercise?.exercise_id?.name || "exercise-video"}
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
              videoUrl={exercise.exercise_id?.video_url}
              className="sm:mt-10 mt-0"
            />
          </div>
          <h2 className="text-lg font-bold">{exercise.exercise_id?.name}</h2>
          <p className="text-sm text-gray-600 text-center px-4">
            {exercise.exercise_id?.description}
          </p>
          <div className="flex gap-2 items-center flex-row-reverse" dir="rtl">
            {customIcon && (
              <img src={customIcon} alt="" className="w-6 h-6" />
            )}
            <p className="flex flex-row-reverse gap-2">
              <span>{exercise.exercise_id?.body_part}</span> :{" "}
              <span>איזור בגוף</span>
            </p>
          </div>
          <div className="flex gap-2  items-center flex-row-reverse" dir="rtl">
            {customEquipment && (
              <img src={customEquipment} alt="" className="w-6 h-6" />
            )}
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
