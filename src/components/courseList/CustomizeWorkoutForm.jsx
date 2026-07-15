import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSearchableSelect from "@/components/common/CustomSearchableSelect";
import Select from "react-dropdown-select";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { base_url } from "@/api/baseUrl";
import { Trash, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";

const CustomizeWorkoutForm = () => {
  const {
    state: { workout, training: trainings },
  } = useLocation();
  const [training, setTraining] = useState({});
  const [workouts] = useState(workout);
  const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
  const [addMoreExerciseIndex, setAddMoreExerciseIndex] = useState(null);
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingExercise, setIsAddingExercise] = useState({});
  // Same exercise filter state as AddWorkoutForm
  const [body_part, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredExercisesForSelection, setFilteredExercisesForSelection] =
    useState([]);
  const [isLoadingExercises, setIsLoadingExercises] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const user_Id = userInfo._id;
  const trainingId = trainings?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchTrainingByUserId = useCallback(async () => {
    try {
      const response = await axios.get(
        `${base_url}/get-training-by-user-id/${user_Id}`
      );
      if (response.status === 200) {
        // console.log("userTrainingId:", response.data.data);
        const filteredTrainings = response.data.data.filter(
          (training) => training._id === trainings._id
        );
        setTraining(filteredTrainings[0]);
      }
    } catch (error) {
      console.error("Error fetching training:", error);
      toast.error("שגיאה בטעינת הנתונים. נסה שוב מאוחר יותר.");
    }
  }, [trainings?._id, user_Id]);

  useEffect(() => {
    fetchTrainingByUserId();
  }, [fetchTrainingByUserId]);

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

  const validateSupersetAndToggle = (nextTraining) => {
    const workouts = nextTraining?.workouts ?? [];
    const hasIncompleteSuperset = workouts.some((w) => {
      const list = Array.isArray(w?.exercises) ? w.exercises : [];
      const last = list[list.length - 1];
      return (
        list.length > 0 &&
        String(last?.manipulation ?? "").trim().toLowerCase() === "superset"
      );
    });
    setIsSupersetIncomplete(hasIncompleteSuperset);
  };

  const resetExerciseFilters = () => {
    setBodyPart("");
    setEquipment("");
    setSearchValue("");
  };

  // Same server-side filter as AddWorkoutForm
  useEffect(() => {
    let ignore = false;

    const fetchExercises = async () => {
      setIsLoadingExercises(true);
      try {
        const buildUrl = (pageNum) =>
          `${base_url}/exercise?search=${searchValue}&page=${pageNum}&limit=10&body_part=${body_part}&equipment=${equipment}`;

        const firstRes = await axios.get(buildUrl(1));
        if (firstRes.status !== 200) return;

        const firstData = firstRes.data.data || [];
        const totalPages = firstRes.data.pagination?.totalPages ?? 1;

        let allData = firstData;
        if (totalPages > 1) {
          const rest = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) =>
              axios.get(buildUrl(i + 2))
            )
          );
          allData = [
            ...firstData,
            ...rest.flatMap((r) => r.data.data || []),
          ];
        }

        if (!ignore) {
          setFilteredExercisesForSelection(allData);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching exercises:", error);
          setFilteredExercisesForSelection([]);
        }
      } finally {
        if (!ignore) {
          setIsLoadingExercises(false);
        }
      }
    };

    fetchExercises();

    return () => {
      ignore = true;
    };
  }, [searchValue, body_part, equipment]);

  const handleMoreExercise = (workoutIndex, e) => {
    e.preventDefault();
    setAddMoreExerciseIndex(workoutIndex);
    resetExerciseFilters();
  };

  // CustomSearchableSelect passes the selected option object directly
  const handleNewExerciseSelection = (exercise, workoutIndex) => {
    if (!training || !exercise) return;

    setIsAddingExercise((prev) => ({ ...prev, [workoutIndex]: true }));

    try {
      const updatedTraining = { ...training };
      const currentWorkout = updatedTraining.workouts[workoutIndex];

      currentWorkout.exercises.push({
        _id: exercise._id,
        name: exercise.name,
        sets: 0,
        reps: 0,
        manipulation: "",
      });

      setTraining(updatedTraining);
      validateSupersetAndToggle(updatedTraining);
      setAddMoreExerciseIndex(null);
      resetExerciseFilters();
    } catch (error) {
      console.error("Error adding exercise:", error);
      toast.error("שגיאה בהוספת התרגיל. נסה שוב.");
    } finally {
      setIsAddingExercise((prev) => ({ ...prev, [workoutIndex]: false }));
    }
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
    validateSupersetAndToggle(updatedTraining);
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
    setTraining((prev) => {
      const next = {
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
      };
      validateSupersetAndToggle(next);
      return next;
    });
  };

  // const handleRemoveWorkout = (workoutId) => {
  //   console.log("Removing workout:", workoutId); // Debugging log
  //   setTraining((prev) => {
  //     const next = {
  //       ...prev,
  //       workouts: prev.workouts.filter((workout) => workout._id !== workoutId),
  //     };
  //     validateSupersetAndToggle(next);
  //     return next;
  //   });
  // };
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
            toast.error("התרגיל הבא חייב להיות גם סופרסט");
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
          "לא ניתן להסיר סופרסט מתרגיל זה כי התרגיל הקודם הוא סופרסט"
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
    validateSupersetAndToggle(updatedTraining);
  };

  const handleMoveExerciseUp = (workoutIndex, exerciseIndex) => {
    if (exerciseIndex === 0) return;
    setTraining((prev) => {
      const workouts = [...(prev.workouts || [])];
      const workout = workouts[workoutIndex];
      if (!workout) return prev;
      const exercises = Array.isArray(workout.exercises) ? [...workout.exercises] : [];
      if (exerciseIndex >= exercises.length) return prev;
      [exercises[exerciseIndex - 1], exercises[exerciseIndex]] = [
        exercises[exerciseIndex],
        exercises[exerciseIndex - 1],
      ];
      workouts[workoutIndex] = { ...workout, exercises };
      const next = { ...prev, workouts };
      validateSupersetAndToggle(next);
      return next;
    });
  };

  const handleMoveExerciseDown = (workoutIndex, exerciseIndex) => {
    setTraining((prev) => {
      const workouts = [...(prev.workouts || [])];
      const workout = workouts[workoutIndex];
      if (!workout) return prev;
      const exercises = Array.isArray(workout.exercises) ? [...workout.exercises] : [];
      if (exerciseIndex < 0 || exerciseIndex >= exercises.length - 1) return prev;
      [exercises[exerciseIndex], exercises[exerciseIndex + 1]] = [
        exercises[exerciseIndex + 1],
        exercises[exerciseIndex],
      ];
      workouts[workoutIndex] = { ...workout, exercises };
      const next = { ...prev, workouts };
      validateSupersetAndToggle(next);
      return next;
    });
  };

  // const isSupersetAlreadyUsed = (workoutIndex) => {
  //   if (!training) return false;
  //   const currentWorkout = training.workouts[workoutIndex];
  //   return currentWorkout.exercises.some(
  //     (ex) => ex.manipulation.trim().toLowerCase() === "superset"
  //   );
  // };

  const onSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        user_id: user_Id,
        training_id: training.training_id._id,
        workouts: (training.workouts || []).map((w) => ({
          workout: w?.workout?._id,
          exercises: (w.exercises || []).map((ex) => ({
            exercise_id: ex?.exercise_id?._id || ex?.exercise_id || ex?._id,
            sets: Number(ex.sets),
            reps: Number(ex.reps),
            manipulation: ex.manipulation,
          })),
        })),
      };
      const response = await axios.put(
        `${base_url}/update-user-training/${trainingId}`,
        payload
      );
      if (response.status === 200) {
        toast.success("תוכנית האימון עודכנה בהצלחה!");
        await fetchTrainingByUserId();
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    } catch (error) {
      // console.log(error);
      toast.error("שגיאה בשמירת תוכנית האימון. נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
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
          placeholder="הזן שם תוכנית אימון..."
          register={register}
          validation={{ required: !user_Id && "נדרש שם" }}
          errors={errors}
          defaultValue={training?.name}
          disabled={true}
        />
        <DynamicInputField
          id="description"
          type="text"
          label="תיאור"
          placeholder="הזן תיאור..."
          register={register}
          validation={{ required: !user_Id && "נדרש תיאור" }}
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
                      {/* ✅ Up/Down order arrows */}
                      <div className="flex flex-col gap-1 self-center sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleMoveExerciseUp(workoutIndex, exerciseIndex)}
                          disabled={exerciseIndex === 0}
                          className={`p-1 rounded border border-gray-300 transition-opacity ${
                            exerciseIndex === 0
                              ? "opacity-30 cursor-not-allowed"
                              : "hover:bg-gray-100 cursor-pointer"
                          }`}
                          title="הזז למעלה"
                        >
                          <ChevronUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveExerciseDown(workoutIndex, exerciseIndex)}
                          disabled={exerciseIndex === workout.exercises.length - 1}
                          className={`p-1 rounded border border-gray-300 transition-opacity ${
                            exerciseIndex === workout.exercises.length - 1
                              ? "opacity-30 cursor-not-allowed"
                              : "hover:bg-gray-100 cursor-pointer"
                          }`}
                          title="הזז למטה"
                        >
                          <ChevronDown className="size-4" />
                        </button>
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>סטים</p>

                        <Input
                          type="number"
                          min={0}
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
                          min={0}
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
                    className="cursor-pointer text-[#7994CB]-600 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleRemoveExercise(workout._id, ex._id)}
                  />
                </div>
              ))}

              {addMoreExerciseIndex === workoutIndex && (
                <div dir="rtl" className="space-y-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      אזור בגוף
                    </label>
                    <Select
                      className="rounded-lg h-12 w-auto"
                      direction="rtl"
                      valueField="id"
                      labelField="label"
                      options={bodyPartOptions}
                      placeholder="סנן לפי חלק בגוף"
                      values={
                        body_part
                          ? bodyPartOptions.filter(
                              (opt) => opt.value === body_part
                            )
                          : []
                      }
                      onChange={(selected) =>
                        setBodyPart(selected[0]?.value || "")
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      ציוד
                    </label>
                    <Select
                      className="rounded-lg h-12 w-auto"
                      direction="rtl"
                      options={equipmentOptions}
                      valueField="id"
                      labelField="label"
                      placeholder="סנן לפי ציוד"
                      values={
                        equipment
                          ? equipmentOptions.filter(
                              (opt) => opt.value === equipment
                            )
                          : []
                      }
                      onChange={(selected) =>
                        setEquipment(selected[0]?.value || "")
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      סנן לפי שם תרגיל
                    </label>
                    <CustomSearchableSelect
                      options={filteredExercisesForSelection}
                      valueField="_id"
                      labelField="name"
                      placeholder="בחר תרגיל"
                      onChange={(exercise) =>
                        handleNewExerciseSelection(exercise, workoutIndex)
                      }
                      onSearchChange={setSearchValue}
                      loading={isLoadingExercises}
                      direction="rtl"
                    />
                  </div>
                </div>
              )}

              <Button
                type="button"
                onClick={(e) => handleMoreExercise(workoutIndex, e)}
                className="mt-2 bg-[#7994CB] hover:bg-[#6a84b8] flex mx-auto transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isAddingExercise[workoutIndex]}
                dir="rtl"
              >
                {isAddingExercise[workoutIndex] ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    מוסיף...
                  </>
                ) : (
                  "הוסף תרגיל לאימון"
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className={
              isButtonDisabled || isSupersetIncomplete || isSubmitting
                ? "text-black px-4 md:px-8 py-2 rounded-full bg-gray-200 cursor-not-allowed transition-all duration-200"
                : "text-white px-4 md:px-8 py-2 rounded-full bg-[#7994CB] hover:bg-[#6a84b8] transition-all duration-200 shadow-md hover:shadow-lg"
            }
            disabled={isButtonDisabled || isSupersetIncomplete || isSubmitting}
            dir="rtl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                שומר...
              </>
            ) : (
              "שמור תוכנית אימון "
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomizeWorkoutForm;
