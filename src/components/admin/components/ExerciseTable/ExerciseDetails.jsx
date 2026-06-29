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
import { useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";
import HeroVideo from "@/components/startTraining/HeroVideo";
import { UI_TEXT } from "@/constants/hebrewText";

export default function ExerciseDetails({ exerciseId }) {
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch only when user opens the details dialog (not on list mount)
  const fetchExerciseDetails = async () => {
    if (!exerciseId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/exercise/${exerciseId}`);
      if (response.status === 200) {
        setExerciseData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching exercise details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchExerciseDetails();
    } else {
      setExerciseData(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7994CB]" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            פרטי תרגיל
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <p className="text-center text-gray-500">{UI_TEXT.loading}</p>
          ) : exerciseData ? (
            <>
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <HeroVideo videoUrl={exerciseData?.video_url} />
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
            </>
          ) : (
            <p className="text-center text-gray-500">{UI_TEXT.noResults}</p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-[#7994CB] ">סגור </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
