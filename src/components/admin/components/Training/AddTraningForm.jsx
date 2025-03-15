import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";

const AddTrainingForm = () => {
  const [trainingExercises, setTrainingExercises] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [addMoreExercise, setAddMoreExercise] = useState(null);
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleWorkoutChange = (values) => {
    setSelectedTrainingExercises((prevWorkouts) => {
      const newWorkouts = values.map((workout) => {
        const existingWorkout = prevWorkouts.find(
          (w) => w.workout === workout._id
        );

        return {
          workout: workout._id,
          name: workout.name,
          exercises: existingWorkout
            ? existingWorkout.exercises
            : workout.exercises?.map((exercise) => ({
                exercise_id: exercise.exercise_id?._id || exercise._id,
                name: exercise.exercise_id?.name || exercise.name,
                sets: exercise.sets || 3,
                reps: exercise.reps || 10,
                manipulation: exercise.manipulation || "Default manipulation",
              })) || [],
        };
      });

      return newWorkouts;
    });
  };
  const [selectedTrainingExercises, setSelectedTrainingExercises] = useState(
    []
  );

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`${base_url}/workout`);
        setTrainingExercises(response.data.data);
      } catch (error) {
        console.error("Error fetching training exercises:", error);
      }
    };
    fetchWorkout();
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExerciseList(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const checkSupersetCompletion = () => {
    let incomplete = false;
    selectedTrainingExercises.forEach((workout) => {
      const supersetExercises = workout.exercises.filter(
        (exercise) => exercise.manipulation === "superset"
      );

      if (supersetExercises.length === 1) {
        incomplete = true;
      }
    });
    setIsSupersetIncomplete(incomplete);
  };

  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const updatedWorkouts = [...selectedTrainingExercises];
    const workout = updatedWorkouts[workoutIndex];
    const exercise = workout.exercises[exerciseIndex];

    if (field === "manipulation" && value === "superset") {
      const existingSuperset = workout.exercises.some(
        (ex, idx) => ex.manipulation === "superset" && idx !== exerciseIndex
      );

      if (existingSuperset) {
        toast.error("Only one superset is allowed per workout.");
        return;
      }

      if (!exercise.manipulation.includes("superset")) {
        setIsSupersetIncomplete(true);
      }
    }

    exercise[field] = value;
    setSelectedTrainingExercises(updatedWorkouts);
  };

  const handleAddMoreExercise = (workoutIndex) => {
    setAddMoreExercise(workoutIndex);
  };

  const handleNewExerciseSelection = (selectedExercises) => {
    if (addMoreExercise === null) return;

    setSelectedTrainingExercises((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workout = updatedWorkouts[addMoreExercise];

      selectedExercises.forEach((exercise) => {
        workout.exercises.push({
          exercise_id: exercise._id,
          name: exercise.name,
          sets: 3,
          reps: 10,
          manipulation: exercise.manipulation || "",
        });
      });
      return updatedWorkouts;
    });

    setIsSupersetIncomplete(false);
    setAddMoreExercise(null);
  };

  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
    setSelectedTrainingExercises((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      updatedWorkouts[workoutIndex].exercises.splice(exerciseIndex, 1);
      return updatedWorkouts;
    });
    checkSupersetCompletion();
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        workouts: selectedTrainingExercises.map((workout) => ({
          workout: workout.workout,
          exercises: workout.exercises.map((exercise) => ({
            exercise_id: exercise.exercise_id,
            sets: exercise.sets,
            reps: exercise.reps,
            manipulation: exercise.manipulation,
          })),
        })),
      };

      await axios.post(`${base_url}/training`, payload).then((response) => {
        if (response.status === 201) {
          toast.success("Training session saved successfully!");
          setSelectedTrainingExercises([]);
          reset();
          navigate("/dashboard/training-list");
        }
      });
    } catch (error) {
      console.error("Error submitting training session:", error);
      toast.error("Failed to save training session.");
    }
  };
  return (
    <div className="py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <DynamicInputField
            className="min-w-[350px]"
            id="name"
            type="text"
            label="Training Name"
            placeholder="Add Training Name..."
            register={register}
            validation={{ required: "Training Name is required" }}
            errors={errors}
          />

          <DynamicInputField
            className="min-w-[350px]"
            id="description"
            type="text"
            label="Training Description"
            placeholder="Add Training Description..."
            register={register}
            validation={{ required: "Training Description is required" }}
            errors={errors}
          />

          <Select
            className="rounded-lg h-12"
            direction="rtl"
            options={trainingExercises}
            valueField="_id"
            labelField="name"
            multi
            onChange={handleWorkoutChange}
          />
        </div>

        <div className="space-y-4 w-[550px]">
          {selectedTrainingExercises.map((workout, workoutIndex) => (
            <div key={workout.workout} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">{workout.name}</h3>
              <div className="space-y-2 mt-2">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div
                    key={exercise.exercise_id}
                    className="p-3 border rounded-md"
                  >
                    <h4 className="font-medium">{exercise.name}</h4>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Trash
                        className="text-red-500 cursor-pointer"
                        onClick={() =>
                          handleRemoveExercise(workoutIndex, exerciseIndex)
                        }
                      />
                      <div>
                        <label htmlFor="sets">Sets</label>
                        <input
                          type="number"
                          className="border rounded p-1 w-full"
                          value={exercise.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "sets",
                              e.target.value
                            )
                          }
                          placeholder="Sets"
                        />
                      </div>
                      <div>
                        <label htmlFor="reps">Reps</label>
                        <input
                          type="number"
                          className="border rounded p-1 w-full"
                          value={exercise.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "reps",
                              e.target.value
                            )
                          }
                          placeholder="Reps"
                        />
                      </div>
                      <div>
                        <label htmlFor="manipulation">Manipulation</label>
                        <input
                          type="text"
                          className="border rounded p-1 w-full"
                          value={exercise.manipulation}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "manipulation",
                              e.target.value
                            )
                          }
                          placeholder="Manipulation"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {addMoreExercise === workoutIndex && (
                <Select
                  className="rounded-lg h-12 mt-3"
                  direction="rtl"
                  options={exerciseList}
                  valueField="_id"
                  labelField="name"
                  multi
                  onChange={handleNewExerciseSelection}
                />
              )}

              <Button
                type="button"
                className="mt-5 bg-customBg"
                onClick={() => handleAddMoreExercise(workoutIndex)}
              >
                Add More Exercise
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
            disabled={isSupersetIncomplete}
          >
            Save a new training session
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainingForm;
