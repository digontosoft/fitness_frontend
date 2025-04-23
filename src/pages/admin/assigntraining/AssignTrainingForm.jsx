import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";

const AssignTrainingForm = ({ trainingId, user_id }) => {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainingbyId, setTrainingById] = useState({});
  const [addMoreExerciseIndex, setAddMoreExerciseIndex] = useState(null);
  const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);
  const [trainingList, setTrainingList] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if any field (sets, reps, or manipulation) is empty in any exercise
  // useEffect(() => {
  //   if (!selectedTraining) {
  //     setIsButtonDisabled(false);
  //     return;
  //   }
  //   const isAnyFieldEmpty = selectedTraining.workouts?.some((workout) =>
  //     workout.exercises.some(
  //       (exercise) =>
  //         exercise.sets === 0 || exercise.reps === 0 || !exercise.manipulation
  //     )
  //   );

  //   setIsButtonDisabled(isAnyFieldEmpty);
  // }, [selectedTraining]);

  const checkFormCompleteness = () => {
    if (!trainingbyId?.workouts) return false;

    // Check if name and description are filled
    if (!trainingbyId.name || !trainingbyId.description) return false;

    // Check all workouts and exercises
    return trainingbyId.workouts.every((workout) =>
      workout.exercises.every(
        (exercise) =>
          exercise.sets > 0 && exercise.reps > 0 && exercise.manipulation
      )
    );
  };

  useEffect(() => {
    const isAnyFieldEmpty = checkFormCompleteness();
    setIsButtonDisabled(!isAnyFieldEmpty);
  }, [trainingbyId]);

  // Fetch training
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(`${base_url}/training`);
        setTrainingList(response.data.data);
      } catch (error) {
        console.error("Error fetching training sessions:", error);
      }
    };
    fetchTraining();
  }, []);

  // Fetch trainingbyId
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(`${base_url}/training/${trainingId}`);
        setTrainingById(response.data.data);
        console.log("trainingById:", response.data.data);
      } catch (error) {
        console.error("Error fetching training sessions:", error);
      }
    };
    fetchTraining();
  }, [trainingId]);

  // Fetch exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercise(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  // Fetch workouts
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`${base_url}/workout`);
        setWorkout(response.data.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkout();
  }, []);

  // Handler to open the add exercise dropdown for a given workout.
  const handleMoreExercise = (workoutIndex, e) => {
    e.preventDefault();
    setAddMoreExerciseIndex(workoutIndex);
  };

  const handleTrainingChange = (values) => {
    if (values.length > 0) {
      setSelectedTraining(values[0]);
    } else {
      setSelectedTraining(null);
    }
  };

  //check if superset completion
  const checkSupersetCompletion = () => {
    let incomplete = false;
    selectedTraining?.workouts.forEach((workout) => {
      const supersetExercises = workout.exercises.filter(
        (exercise) => exercise.manipulation === "superset"
      );

      if (supersetExercises.length === 1) {
        incomplete = true;
      }
    });
    setIsSupersetIncomplete(incomplete);
  };

  // When a user changes an exercise field, especially the manipulation field.
  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const updatedWorkouts = [...trainingbyId.workouts];
    const workout = updatedWorkouts[workoutIndex];
    const exercise = workout.exercises[exerciseIndex];

    if (field === "manipulation" && value === "superset") {
      // Check if there is already a superset in the workout
      // const existingSuperset = workout.exercises.some(
      //   (ex, idx) => ex.manipulation === "superset" && idx !== exerciseIndex
      // );

      // if (existingSuperset) {
      //   toast.error("Only one superset is allowed per workout.");
      //   setIsSupersetIncomplete(true);
      //   return;
      // } else {
      //   setIsSupersetIncomplete(false);
      // }

      // Check if this is the last exercise
      const isLastExercise = exerciseIndex === workout.exercises.length - 1;

      // If it's not the last exercise, check the next exercise
      if (!isLastExercise) {
        const nextExercise = workout.exercises[exerciseIndex + 1];
        if (!nextExercise || nextExercise.manipulation !== "superset") {
          // If the next exercise doesn't exist or isn't a superset, check if it has other manipulations
          if (nextExercise && nextExercise.manipulation !== "superset") {
            // If the next exercise has a different manipulation, it's allowed
            setIsSupersetIncomplete(false);
          } else {
            // If there is no next exercise or it's not a superset, the superset is incomplete
            setIsSupersetIncomplete(true);
            toast.error("The next exercise must also be a superset.");
            return;
          }
        }
      } else {
        // If it's the last exercise, allow creating a superset
        setIsSupersetIncomplete(false);
      }
    }

    // If the current exercise is being removed from superset, check the previous exercise
    if (
      field === "manipulation" &&
      value !== "superset" &&
      exercise.manipulation === "superset"
    ) {
      const previousExercise = workout.exercises[exerciseIndex - 1];
      if (previousExercise && previousExercise.manipulation === "superset") {
        setIsSupersetIncomplete(true);
        toast.error(
          "Cannot remove superset from this exercise as the previous exercise is a superset."
        );
        return;
      }
    }

    // Check if the superset is complete after the update
    if (field === "manipulation" && value === "superset") {
      const nextExercise = workout.exercises[exerciseIndex + 1];
      if (!nextExercise || nextExercise.manipulation !== "superset") {
        // If there is no next exercise or it's not a superset, check if it has other manipulations
        if (nextExercise && nextExercise.manipulation !== "superset") {
          // If the next exercise has a different manipulation, it's allowed
          setIsSupersetIncomplete(false);
        } else {
          // Otherwise, the superset is incomplete
          setIsSupersetIncomplete(true);
        }
      } else {
        setIsSupersetIncomplete(false);
      }
    }

    // setSelectedTraining(updatedWorkouts);
    const updatedTraining = { ...trainingbyId };
    updatedTraining.workouts[workoutIndex].exercises[exerciseIndex][field] =
      value;
    setTrainingById(updatedTraining);
  };

  // When new exercises are selected (for "Add More Exercise")
  const handleNewExerciseSelection = (selectedExercises, workoutIndex) => {
    if (!trainingbyId) return;
    const updatedTraining = { ...trainingbyId };
    const currentWorkout = updatedTraining.workouts[workoutIndex];

    selectedExercises.forEach((exercise) => {
      currentWorkout.exercises.push({
        _id: exercise._id,
        name: exercise.name,
        exercise_id: exercise._id,
        sets: "",
        reps: "",
        manipulation: "",
      });
    });

    setIsSupersetIncomplete(false);
    setTrainingById(updatedTraining);
    setAddMoreExerciseIndex(null);
  };

  const fetchWorkoutData = async (workoutId) => {
    try {
      const response = await axios.get(`${base_url}/workout/${workoutId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching workout data:", error);
      return null;
    }
  };

  const handleAddWorkout = async (selectedWorkouts) => {
    if (!trainingbyId || selectedWorkouts.length === 0) return;

    const updatedTraining = { ...trainingbyId };

    for (const workout of selectedWorkouts) {
      const fullWorkoutData = await fetchWorkoutData(workout._id);
      if (fullWorkoutData) {
        updatedTraining.workouts.push({
          _id: fullWorkoutData._id,
          name: fullWorkoutData.name,
          exercises: fullWorkoutData.exercises.map(
            (exercise) => (
              console.log("exercise_id:", exercise.exercise_id._id),
              {
                _id: exercise.exercise_id._id,
                exercise_id: exercise.exercise_id._id,
                name: exercise.name,
                sets: exercise.sets || 3,
                reps: exercise.reps || 10,
                manipulation: exercise.manipulation || "normal",
              }
            )
          ),
        });
      }
    }

    setTrainingById(updatedTraining);
    setShowWorkoutDropdown(false);
  };

  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
    if (!trainingbyId) return;
    const updatedTraining = { ...trainingbyId };
    updatedTraining.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
    setSelectedTraining(updatedTraining);
    checkSupersetCompletion();
  };

  const handleRemoveWorkout = (workoutIndex) => {
    if (!trainingbyId) return;
    const updatedTraining = { ...trainingbyId };
    updatedTraining.workouts.splice(workoutIndex, 1);
    setSelectedTraining(updatedTraining);
  };

  const onSubmit = async (data) => {
    // console.log("training name:", data)

    try {
      const formattedWorkouts = trainingbyId.workouts.map(
        (workout) => (
          console.log("workout:", workout),
          {
            workout: workout._id,
            exercises: workout.exercises.map((exercise) => ({
              exercise_id: exercise?.exercise_id,
              sets: exercise.sets,
              reps: exercise.reps,
              manipulation: exercise.manipulation,
            })),
          }
        )
      );

      const payload = {
        name: data.name || trainingbyId?.name,
        description: data.description || trainingbyId.description,
        user_id,
        training_id: trainingbyId._id,
        workouts: formattedWorkouts,
      };

      console.log("assignTraining:", payload);

      const response = await axios.post(`${base_url}/assign-training`, payload);
      if (response.status === 201) {
        toast.success("Training session updated successfully!");
        navigate(`/dashboard/assigned-training-list/${user_id}`);
      }
    } catch (error) {
      console.error("Error updating training session:", error);
      toast.error("Failed to update training session.");
    }
  };
  return (
    <div className="sm:py-20 py-6" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* <Select
          className="rounded-lg h-12 sm:min-w-[400px] w-full"
          direction="rtl"
          options={trainingList}
          valueField="_id"
          labelField="name"
          onChange={handleTrainingChange}
          searchBy="name"
        /> */}

        {trainingbyId && (
          <div className="space-y-4">
            <DynamicInputField
              className="sm:min-w-[350px] "
              id="name"
              type="text"
              label="Training Name"
              placeholder="Add Training Name..."
              register={register}
              validation={{
                required: !trainingbyId?.name
                  ? "Training Name is required"
                  : false,
              }}
              errors={errors}
              defaultValue={trainingbyId?.name}
            />

            <DynamicTextAreaField
              className="sm:min-w-[350px]"
              id="description"
              type="text"
              label="Training Description"
              placeholder="Add Training Description..."
              register={register}
              validation={{
                required: !trainingbyId?.description
                  ? "Training Description is required"
                  : false,
              }}
              errors={errors}
              defaultValue={trainingbyId?.description}
            />

            {trainingbyId?.workouts?.map((workout, workoutIndex) => (
              <div key={workout._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{workout.name}</h3>
                  <Button
                    type="button"
                    className="text-white bg-customBg"
                    onClick={() => handleRemoveWorkout(workoutIndex)}
                  >
                    <Trash className=" text-white cursor-pointer" />
                  </Button>
                </div>
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise._id} className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <p>{exercise.name}</p>
                    </div>
                    <div className="flex sm:flex-row flex-col items-center justify-center gap-4">
                      <Trash
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() =>
                          handleRemoveExercise(workoutIndex, exerciseIndex)
                        }
                      />

                      <div className="flex flex-col gap-y-4">
                        <label htmlFor="sets">סטים</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "sets",
                              e.target.value
                            )
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col gap-y-4">
                        <label htmlFor="reps">חזרות</label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "reps",
                              e.target.value
                            )
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col gap-y-4">
                        <label htmlFor="manipulation">מניפולציה</label>
                        <input
                          type="text"
                          value={exercise.manipulation}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "manipulation",
                              e.target.value
                            )
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="my-4">
                  {addMoreExerciseIndex === workoutIndex && (
                    <div>
                      {/* <Select
                        className="rounded-lg h-12"
                        direction="rtl"
                        options={exercise}
                        valueField="_id"
                        labelField="name"
                        multi
                        onChange={(selected) =>
                          handleNewExerciseSelection(selected, workoutIndex)
                        }
                        searchBy="name"
                      /> */}

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          אזור בגוף
                        </label>
                        <Select
                          className="rounded-lg h-12 w-auto"
                          direction="rtl"
                          valueField="_id"
                          labelField="body_part"
                          options={exercise}
                          placeholder="סנן לפי חלק בגוף"
                          onChange={(selected) =>
                            handleNewExerciseSelection(selected, workoutIndex)
                          }
                          searchBy="body_part"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          ציוד
                        </label>
                        <Select
                          className="rounded-lg h-12 w-auto"
                          direction="rtl"
                          options={exercise}
                          valueField="_id"
                          labelField="equipment"
                          placeholder="סנן לפי ציוד"
                          onChange={(selected) =>
                            handleNewExerciseSelection(selected, workoutIndex)
                          }
                          searchBy="equipment"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          סנן לפי שם תרגיל
                        </label>
                        <Select
                          className="rounded-lg h-12 w-auto"
                          direction="rtl"
                          options={exercise}
                          valueField="_id"
                          labelField="name"
                          placeholder="בחר"
                          onChange={(selected) =>
                            handleNewExerciseSelection(selected, workoutIndex)
                          }
                          searchBy="name"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    className="my-4 bg-customBg"
                    onClick={(e) => handleMoreExercise(workoutIndex, e)}
                  >
                    הוסף תרגילים לאימון
                  </Button>
                </div>
              </div>
            ))}

            {/* Add More Workout Button and Dropdown */}
            <div className="my-4">
              {showWorkoutDropdown && (
                <Select
                  className="rounded-lg h-12"
                  direction="rtl"
                  options={workout}
                  valueField="_id"
                  labelField="name"
                  onChange={(selected) => handleAddWorkout(selected)}
                  searchBy="name"
                />
              )}
              <Button
                type="button"
                className="my-4 bg-customBg"
                onClick={() => setShowWorkoutDropdown(!showWorkoutDropdown)}
              >
                {showWorkoutDropdown
                  ? "Hide Workout Dropdown"
                  : "הוסף אימון לתוכנית"}
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            className={
              isButtonDisabled || isSupersetIncomplete
                ? "text-black px-4 md:px-8 py-2 rounded-full bg-gray-200"
                : "text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
            }
            disabled={isButtonDisabled || isSupersetIncomplete}
          >
            {/* שייך תוכנית אימון */}
            שייך אימון למתאמן
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignTrainingForm;
