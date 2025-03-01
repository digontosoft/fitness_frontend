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

export default function WorkoutDetails({ workoutId }) {
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    if (workoutId) {
      axios.get(`${base_url}/workout/${workoutId}`).then((response) => {
        if (response.status === 200) {
          setWorkoutData(response.data.data);
        }
      });
    }
  }, [workoutId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-customBg" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-6 rounded-lg">
        {workoutData ? (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-bold">{workoutData?.name}</h2>
            <div className="w-full">
              {workoutData?.exercises && workoutData?.exercises.length > 0 ? (
                <div className="space-y-4">
                  {workoutData?.exercises.map((exercise) => (
                    <div
                      key={exercise?._id}
                      className=" rounded-md p-3 shadow-2xl border-[1px] border-gray-300  bg-gradient-to-tr from-slate-100 to-gray-100  "
                    >
                      <div className="flex flex-col items-center justify-center space-y-6 ">
                        <div className="border p-2 w-2/4 rounded-md">
                          <h4 className="font-medium text-center">
                            {exercise?.exercise_id?.name}
                          </h4>
                        </div>
                        <div className="flex  gap-4 items-center">
                          <p className="text-sm  py-2 px-4 font-bold rounded-md text-black uppercase  tracking-wide">
                            Sets:{" "}
                            <span className="font-normal">
                              {exercise?.sets}
                            </span>
                          </p>
                          <p className="text-sm  py-2 px-4 rounded-md text-black uppercase font-bold tracking-wide">
                            Reps:{" "}
                            <span className="font-normal">
                              {exercise?.reps}
                            </span>
                          </p>
                          <p className="text-sm  py-2 px-4 rounded-md text-black uppercase font-bold tracking-wide">
                            Manipulation:{" "}
                            <span className="font-normal">
                              {exercise?.manipulation}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No exercises available.</p>
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
