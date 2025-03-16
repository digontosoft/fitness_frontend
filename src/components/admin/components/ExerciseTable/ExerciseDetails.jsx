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
import { base_url } from "@/api/baseUrl";
import axios from "axios";

export default function ExerciseDetails({ exerciseId }) {
  const [exerciseData, setExerciseData] = useState({});
  useEffect(() => {
    axios.get(`${base_url}/exercise/${exerciseId}`).then((response) => {
      if (response.status === 200) {
        setExerciseData(response.data.data);
      }
    });
  }, [exerciseId]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-customBg" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Exercise Details
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            {/* <iframe
              className="w-full h-full"
              src={exerciseData?.video_url}
              title="Exercise Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            <iframe
              className="w-full h-full"
              src={`${exerciseData?.video_url}`}
              title="Exercise Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
           
          </div>
          <h2 className="text-lg font-bold">{exerciseData?.name}</h2>
          <p className="text-sm text-gray-600 text-center px-4">
            {exerciseData?.description}
          </p>
          <p className="text-sm text-gray-600 text-center px-4">
            {exerciseData?.body_part} : אזור בגוף
          </p>
          <p className="text-sm text-gray-600 text-center px-4">
            {exerciseData?.equipment} : ציוד
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-customBg ">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
