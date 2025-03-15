import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";

export default function TrainingForTraineeDetails({ trainingId }) {
  const [trainingData, setTrainingData] = useState({});

  useEffect(() => {
    if (trainingId) {
      axios
        .get(`${base_url}/get-training-by-id/${trainingId}`)
        .then((response) => {
          if (response.status === 200) {
            setTrainingData(response.data.data);
          }
        });
    }
  }, [trainingId]);

  console.log("trainingData:", trainingData);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-customBg" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[70vh] mx-auto p-6 rounded-lg overflow-y-scroll">
        {trainingData ? (
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
                      {workoutItem.workout?.name || "No Workout Name Available"}
                    </h3>

                    {workoutItem.exercises?.length > 0 ? (
                      <div className="mt-3">
                        {workoutItem.exercises.map((exercise) => (
                          <div
                            key={exercise._id}
                            className="border p-2 space-y-4 rounded-md bg-gray-50 mb-2 shadow-xl"
                          >
                            <h4 className="text-md font-medium text-center text-gray-700">
                              {exercise.exercise_id?.name || "Unnamed Exercise"}
                            </h4>
                            <div className="flex flex-wrap gap-3 justify-center ">
                              <span className="text-sm  px-3 py-1 rounded-md  uppercase font-bold">
                                Sets:{" "}
                                <span className="font-normal">
                                  {exercise.sets}
                                </span>
                              </span>
                              <span className="text-sm  px-3 py-1 rounded-md  uppercase font-bold">
                                Reps:{" "}
                                <span className="font-normal">
                                  {exercise.reps}
                                </span>
                              </span>
                              <span className="text-sm  px-3 py-1 rounded-md  uppercase font-bold">
                                Manipulation:{" "}
                                <span className="font-normal">
                                  {exercise.manipulation || "N/A"}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No exercises available.
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No workouts available.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-customBg uppercase ">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
