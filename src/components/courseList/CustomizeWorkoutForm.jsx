import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { base_url } from "@/api/baseUrl";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";

const CustomizeWorkoutForm = () => {
  const {
    state: { workout, training: trainings },
  } = useLocation();
  console.log("trainings:", trainings);
  const [training, setTraining] = useState({});
  const [allExercises, setAllExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [workouts, setWorkouts] = useState(workout);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
  const [addMoreExerciseIndex, setAddMoreExerciseIndex] = useState(null);
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userTraining, setUserTraining] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const user_Id = userInfo._id;
  const trainingId = trainings?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchTrainingByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/get-training-by-user-id/${user_Id}`
      );
      if (response.status === 200) {
        console.log("userTrainingId:", response.data.data);
        setUserTraining(response.data.data);
        const filteredTrainings = response.data.data.filter(
          (training) => training._id === trainings._id
        );
        setTraining(filteredTrainings[0]);
      }
    } catch (error) {
      console.error("Error fetching training:", error);
    }
  };

  useEffect(() => {
    fetchTrainingByUserId();
  }, []);

  // console.log("filteredTrainings:", filteredTrainings);

  useEffect(() => {
    if (!training) {
      setIsButtonDisabled(false);
      return;
    }

    const isAnyFieldEmpty = training.workouts?.some((workout) =>
      workout.exercises.some(
        (exercise) =>
          exercise.sets === 0 || exercise.reps === 0 || !exercise.manipulation
      )
    );

    setIsButtonDisabled(isAnyFieldEmpty);
  }, [training]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exerciseRes] = await Promise.all([
          axios.get(`${base_url}/exercise`),
          //   axios.get(`${base_url}/workout`),
          //   axios.get(`${base_url}/get-training-by-id/${trainingId}`),
        ]);

        if (exerciseRes.status === 200) setAllExercises(exerciseRes.data.data);
        // if (workoutRes.status === 200) setWorkouts(workoutRes.data.data);
        // if (trainingRes.status === 200) setTraining(trainingRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredExercises = async () => {
      if (selectedBodyPart || selectedEquipment) {
        let url = `${base_url}/exercise?`;
        if (selectedBodyPart) {
          url += `body_part=${selectedBodyPart}&`;
        }
        if (selectedEquipment) {
          url += `equipment=${selectedEquipment}&`;
        }
        url = url.slice(0, -1); // Remove trailing '&' or '?'

        try {
          const response = await axios.get(url);
          setSelectedExercise(response.data.data || []);
          console.log("Filtered exercises for selection:", response.data.data);
        } catch (error) {
          console.error("Error fetching filtered exercises:", error);
          setSelectedExercise([]);
        }
      } else {
        // If no filters are selected, show all exercises again
        setSelectedExercise(allExercises);
      }
    };

    fetchFilteredExercises();
  }, [selectedBodyPart, selectedEquipment, allExercises]);

  const handleMoreExercise = (workoutIndex, e) => {
    e.preventDefault();
    setAddMoreExerciseIndex(workoutIndex);
  };

  const handleNewExerciseSelection = (selectedExercises, workoutIndex) => {
    if (!training) return;
    const updatedTraining = { ...training };
    const currentWorkout = updatedTraining.workouts[workoutIndex];

    selectedExercises.forEach((exercise) => {
      currentWorkout.exercises.push({
        _id: exercise._id,
        name: exercise.name,
        sets: 0,
        reps: 0,
        manipulation: "",
      });
    });

    setIsSupersetIncomplete(false);
    setTraining(updatedTraining);
    setAddMoreExerciseIndex(null);
  };

  // Add selected workout with exercises
  const handleAddWorkout = (selected) => {
    if (!selected.length) return;
    const newWorkout = selected[0];

    // if (training.workouts?.some((w) => w.workout?._id === newWorkout._id)) {
    //   setSelectedWorkout(null);
    //   return;
    // }

    const updatedTraining = {
      ...training,
      workouts: [
        ...(training.workouts || []),
        {
          _id: newWorkout._id,
          workout: newWorkout,
          exercises: newWorkout.exercises || [],
        },
      ],
    };

    //console.log("updatedTraining 1:", updatedTraining);

    setTraining(updatedTraining);
    // setSelectedWorkout(null);
    setShowWorkoutSelect(false);
  };

  // Add a new exercise to a specific workout
  // const handleAddExercise = (workoutId, selected) => {
  //   //console.log("selected", selected);

  //   if (!selected.length) return;
  //   const newExercise = selected[0];

  //   setTraining((prev) => ({
  //     ...prev,
  //     workouts: prev.workouts.map((workout) =>
  //       workout._id === workoutId
  //         ? {
  //             ...workout,
  //             exercises: [
  //               ...workout.exercises,
  //               {
  //                 _id: newExercise._id,
  //                 exercise_id: newExercise._id,
  //                 sets: "",
  //                 reps: "",
  //                 manipulation: "",
  //               },
  //             ],
  //           }
  //         : workout
  //     ),
  //   }));

  //   setExerciseSelectVisible((prev) => ({ ...prev, [workoutId]: false }));
  // };

  // Remove an exercise from a workout
  const handleRemoveExercise = (workoutId, exerciseId) => {
    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout._id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.filter(
                (ex) => ex._id !== exerciseId
              ),
            }
          : workout
      ),
    }));
  };

  const handleRemoveWorkout = (workoutId) => {
    console.log("Removing workout:", workoutId); // Debugging log
    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.filter((workout) => workout._id !== workoutId),
    }));
  };
  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const updatedWorkouts = [...training.workouts];
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

    // Update the exercise field
    // exercise[field] = value;

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
    } else {
      setIsSupersetIncomplete(false);
    }

    const updatedTraining = { ...training };
    updatedTraining.workouts[workoutIndex].exercises[exerciseIndex][field] =
      value;
    setTraining(updatedTraining);
  };

  const isSupersetAlreadyUsed = (workoutIndex) => {
    if (!training) return false;
    const currentWorkout = training.workouts[workoutIndex];
    return currentWorkout.exercises.some(
      (ex) => ex.manipulation.trim().toLowerCase() === "superset"
    );
  };

  const onSubmit = async () => {
    // console.log("payload", training);
    const payload = {
      user_id: user_Id,
      training_id: training.training_id._id,
      workouts: (training.workouts || []).map((w) => ({
        workout: w?.workout?._id,
        exercises: (w.exercises || []).map((ex) =>
          // console.log("exercise_id:", ex?.exercise_id._id),
          ({
            // _id: ex?._id,

            exercise_id: ex?.exercise_id._id,
            sets: Number(ex.sets),
            reps: Number(ex.reps),
            manipulation: ex.manipulation,
          })
        ),
      })),
    };
    try {
      const response = await axios.put(
        `${base_url}/update-user-training/${trainingId}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Workout customized successfully!");
        fetchTrainingByUserId();
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //console.log("training-Data", training);

  return (
    <div className="py-10 sm:w-[500px] w-[280px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DynamicInputField
          id="name"
          type="text"
          label="שם תוכנית אימון "
          placeholder="Enter training name..."
          register={register}
          validation={{ required: !user_Id && "Name is required" }}
          errors={errors}
          defaultValue={training?.name}
          disabled={true}
        />
        <DynamicInputField
          id="description"
          type="text"
          label="תיאור"
          placeholder="Enter description..."
          register={register}
          validation={{ required: !user_Id && "Description is required" }}
          errors={errors}
          defaultValue={training?.description}
          disabled={true}
        />

        {showWorkoutSelect && (
          <Select
            options={workouts}
            valueField="_id"
            labelField="name"
            searchBy="name"
            onChange={handleAddWorkout}
            placeholder="סנן לפי שם תרגיל"
          />
        )}

        <div className="my-5">
          {training?.workouts?.map((workout, workoutIndex) => (
            <div key={workout._id} className="border py-2 px-4 rounded-md my-4">
              <h1 className="font-semibold" dir="rtl">
                {workout?.workout?.name}
              </h1>

              {workout?.exercises?.map((ex, exerciseIndex) => (
                <div
                  key={ex._id}
                  className="border py-2 px-4 rounded-md my-4 flex items-center justify-between gap-x-2"
                >
                  <div>
                    <p className="py-4" dir="rtl">
                      {ex?.name} {ex?.exercise_id?.name}
                    </p>
                    <div
                      className="flex sm:flex-row flex-col items-center justify-between sm:gap-x-2 gap-y-2"
                      dir="rtl"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <p>סטים</p>

                        <Input
                          type="number"
                          defaultValue={ex?.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "sets",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>חזרות</p>
                        <Input
                          type="number"
                          defaultValue={ex?.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "reps",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>מניפולציה</p>
                        <Input
                          type="text"
                          defaultValue={ex?.manipulation}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "manipulation",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Trash
                    className="cursor-pointer text-red-600"
                    onClick={() => handleRemoveExercise(workout._id, ex._id)}
                  />
                </div>
              ))}

              {addMoreExerciseIndex === workoutIndex && (
                <div dir="rtl">
                  {/* <Select
                  options={exerciseList}
                  valueField="_id"
                  labelField="name"
                  searchBy="name"
                  placeholder="סנן לפי שם תרגיל"
                  onChange={(selected) =>
                    handleNewExerciseSelection(selected, workoutIndex)
                  }
                /> */}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      אזור בגוף
                    </label>
                    <Select
                      className="rounded-lg h-12 w-auto"
                      direction="rtl"
                      valueField="id"
                      labelField="label"
                      options={bodyPartOptions}
                      placeholder="סנן לפי חלק בגוף"
                      onChange={(selectedOptions) => {
                        const values = selectedOptions.map(
                          (option) => option.value
                        );
                        setSelectedBodyPart(values[0]);
                      }}
                      searchBy="label"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      ציוד
                    </label>
                    <Select
                      className="rounded-lg h-12 w-auto"
                      direction="rtl"
                      options={equipmentOptions}
                      valueField="id"
                      labelField="label"
                      placeholder="סנן לפי ציוד"
                      onChange={(selectedOptions) => {
                        const values = selectedOptions.map(
                          (option) => option.value
                        );
                        setSelectedEquipment(values[0]);
                      }}
                      searchBy="label"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      סנן לפי שם תרגיל
                    </label>
                    <Select
                      className="rounded-lg h-12 w-auto"
                      direction="rtl"
                      options={selectedExercise}
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
                onClick={(e) => handleMoreExercise(workoutIndex, e)}
                className="mt-2 bg-customBg flex mx-auto"
              >
                הוסף תרגיל לאימון
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className={
              isButtonDisabled || isSupersetIncomplete
                ? "text-black px-4 md:px-8 py-2 rounded-full bg-gray-200"
                : "text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
            }
            disabled={isButtonDisabled || isSupersetIncomplete}
          >
            שמיר תוכנית אימון
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomizeWorkoutForm;
