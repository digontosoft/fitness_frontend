import React from "react";

// const CourseDetails = () => {
//   return (
//     <div>CourseDetails</div>
//   )
// }

// export default CourseDetails
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroVideo from "@/components/startTraining/HeroVideo";
import { base_url } from "@/api/baseUrl";

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

export default function CourseDetails({ open, setOpen, exerciseId }) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            פרטי תרגיל
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
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
              <img src={customIcon} alt="" className="w-6 h-6" />
              <p className="flex flex-row-reverse gap-2">
                <span>{exerciseData?.body_part}</span> : <span>איזור בגוף</span>
              </p>
            </div>
            <div
              className="flex gap-2  items-center flex-row-reverse"
              dir="rtl"
            >
              <img src={customEquipment} alt="" className="w-6 h-6" />
              <p className="flex flex-row-reverse gap-2">
                <span>{exerciseData?.equipment}</span> : <span>ציוד</span>
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-customBg">סגור</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
