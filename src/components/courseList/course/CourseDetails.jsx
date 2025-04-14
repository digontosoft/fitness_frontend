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
        }
      })
      .finally(() => setLoading(false));
  }, [exerciseId]);

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
            <div className="w-full aspect-video rounded-lg">
              <HeroVideo videoUrl={exerciseData?.video_url} />
            </div>
            <h2 className="text-lg font-bold">{exerciseData?.name}</h2>
            <p className="text-sm text-gray-600 text-center px-4">
              {exerciseData?.description}
            </p>
            <p className="text-sm text-gray-600 text-center px-4" dir="rtl">
              {exerciseData?.body_part} : איזור בגוף
            </p>
            <p className="text-sm text-gray-600 text-center px-4" dir="rtl">
              {exerciseData?.equipment} : ציוד
            </p>
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
