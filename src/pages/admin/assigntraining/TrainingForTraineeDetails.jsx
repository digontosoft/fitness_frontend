import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { UI_TEXT } from "@/constants/hebrewText";

export default function TrainingForTraineeDetails({ trainingId }) {
  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch only when user opens the details dialog (not on list mount)
  const fetchTrainingDetails = async () => {
    if (!trainingId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${base_url}/get-training-by-id/${trainingId}`
      );
      if (response.status === 200) {
        setTrainingData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching training details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchTrainingDetails();
    } else {
      setTrainingData(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#7994CB]" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[70vh] mx-auto p-6 rounded-lg overflow-y-scroll">
        {loading ? (
          <p className="text-center text-gray-500">{UI_TEXT.loading}</p>
        ) : trainingData ? (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-bold text-gray-900">
              {trainingData.name}
            </h2>
            <p className="text-sm text-gray-600">{trainingData.description}</p>

            <div className="w-full flex flex-wrap justify-center items-center gap-6">
              {trainingData.workouts?.length > 0 ? (
                trainingData.workouts.map((workoutItem) => (
                  <div
                    key={workoutItem._id}
                    className="border rounded-lg p-4 shadow-md bg-white"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 pb-2 mb-3 text-center">
                      {workoutItem.workout?.name || "שם אימון לא זמין"}
                    </h3>

                    {workoutItem.exercises?.length > 0 ? (
                      <div className="mt-3">
                        {workoutItem.exercises.map((exercise) => (
                          <div
                            key={exercise._id}
                            className="border p-2 space-y-4 rounded-md bg-gray-50 mb-2 shadow-xl"
                          >
                            <h4 className="text-md font-medium text-center text-gray-700">
                              {exercise.exercise_id?.name || "תרגיל ללא שם"}
                            </h4>
                            <div className="flex flex-wrap gap-3 justify-center ">
                              <span
                                className="text-sm  px-3 py-1 rounded-md  uppercase font-bold"
                                dir="rtl"
                              >
                                סטים :{" "}
                                <span className="font-normal">
                                  {exercise.sets}
                                </span>
                              </span>
                              <span
                                className="text-sm  px-3 py-1 rounded-md  uppercase font-bold"
                                dir="rtl"
                              >
                                חזרות:{" "}
                                <span className="font-normal">
                                  {exercise.reps}
                                </span>
                              </span>
                              <span
                                className="text-sm  px-3 py-1 rounded-md  uppercase font-bold"
                                dir="rtl"
                              >
                                מניפולציה:{" "}
                                <span className="font-normal">
                                  {exercise.manipulation || "לא זמין"}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {UI_TEXT.noExercisesAvailable}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">{UI_TEXT.noWorkoutsAvailable}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">{UI_TEXT.noResults}</p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-[#7994CB] uppercase ">{UI_TEXT.close}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
