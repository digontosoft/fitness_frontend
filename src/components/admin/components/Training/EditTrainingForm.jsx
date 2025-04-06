import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { base_url } from "@/api/baseUrl";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditTrainingForm = () => {
  const { id } = useParams();
  const [training, setTraining] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  // const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
  const [exerciseSelectVisible, setExerciseSelectVisible] = useState({});
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(training);
  }, [training, reset]);

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
        const [exerciseRes, workoutRes, trainingRes] = await Promise.all([
          axios.get(`${base_url}/exercise`),
          axios.get(`${base_url}/workout`),
          axios.get(`${base_url}/training/${id}`),
        ]);

        if (exerciseRes.status === 200) setExerciseList(exerciseRes.data.data);
        if (workoutRes.status === 200) setWorkouts(workoutRes.data.data);
        if (trainingRes.status === 200) setTraining(trainingRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  //ok
  const handleAddWorkout = (selected) => {
    if (!selected.length) return;
    const newWorkout = selected[0];

    if (training.workouts?.some((w) => w.workout?._id === newWorkout?._id)) {
      // setSelectedWorkout(null);
      return;
    }
    //test
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

  // // Add a new exercise to a specific workout
  const handleAddExercise = (workoutId, selected) => {
    if (!selected.length) return;
    const newExercise = selected[0];

    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        //change prev Line

        workout._id === workoutId
          ? {
              ...workout,
              exercises: [
                ...workout.exercises,
                {
                  _id: newExercise._id,
                  exercise_id: newExercise,
                  sets: 0,
                  reps: 0,
                  manipulation: "",
                },
              ],
            }
          : workout
      ),
    }));

    setExerciseSelectVisible((prev) => ({ ...prev, [workoutId]: false }));
  };

  // // Remove an exercise from a workout
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

  //console.log("Training:", training);

  const handleRemoveWorkout = (workoutId) => {
    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.filter((workout) => workout._id !== workoutId),
    }));
  };

  // const handleSetChange = (workoutId, exerciseId, field, value) => {
  //   // console.log("changeExercise:", value);
  //   setTraining((prev) => ({
  //     ...prev,
  //     workouts: prev.workouts.map((workout) =>
  //       workout._id === workoutId
  //         ? {
  //             ...workout,
  //             exercises: workout.exercises.map((ex) =>
  //               ex._id === exerciseId ? { ...ex, [field]: value } : ex
  //             ),
  //           }
  //         : workout
  //     ),
  //   }));
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
      console.log("firstExercise", isLastExercise);

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

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      workouts: (training.workouts || []).map((w) => ({
        workout: w._id,
        // name: w.workout?.name,
        // description: w.workout?.description,

        exercises: (w.exercises || []).map((ex) => ({
          _id: ex._id,
          exercise_id:
            typeof ex.exercise_id === "object"
              ? ex.exercise_id._id
              : ex.exercise_id,
          sets: Number(ex.sets),
          reps: Number(ex.reps),
          manipulation: ex.manipulation,
        })),
      })),
    };

    try {
      const response = await axios.put(`${base_url}/training/${id}`, payload);
      if (response.status === 200) {
        navigate("/dashboard/training-list");
      }

      toast.success("Training session updated successfully!");
    } catch (error) {
      console.log(error);

      console.error("Error updating training:", error);
    }
  };

  return (
    <div className="py-10 sm:w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DynamicInputField
          id="name"
          type="text"
          label="Training Name"
          placeholder="Enter training name..."
          register={register}
          validation={{ required: !id && "Name is required" }}
          errors={errors}
          defaultValue={training?.name}
        />

        <DynamicInputField
          id="description"
          type="text"
          label="Description"
          placeholder="Enter description..."
          register={register}
          validation={{ required: !id && "Description is required" }}
          errors={errors}
          defaultValue={training?.description}
        />

        {showWorkoutSelect && (
          <Select
            options={workouts}
            valueField="_id"
            labelField="name"
            onChange={handleAddWorkout}
            searchBy="name"
          />
        )}

        <div className="my-5">
          {training?.workouts?.map((workout, workoutIndex) => (
            <div key={workout._id} className="border py-2 px-4 rounded-md my-4">
              <h1 className="font-semibold">{workout?.name}</h1>
              <div className="flex items-center gap-x-2" dir="rtl">
                <Trash
                  className="cursor-pointer text-red-600"
                  onClick={() => handleRemoveWorkout(workout._id)} // Fix the typo here
                />
              </div>
              {workout?.exercises?.map((ex, exerciseIndex) => (
                <div
                  key={ex._id}
                  className="border py-2 px-4 rounded-md my-4 flex items-center justify-between gap-x-2"
                >
                  <div>
                    <p className="py-4" dir="rtl">
                      {ex?.name} {ex?.exercise_id?.name}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:gap-x-2 gap-y-2">
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

              {exerciseSelectVisible[workout._id] && (
                <Select
                  options={exerciseList}
                  valueField="_id"
                  labelField="name"
                  onChange={(selected) =>
                    handleAddExercise(workout._id, selected)
                  }
                  searchBy="name"
                />
              )}

              <Button
                type="button"
                onClick={() =>
                  setExerciseSelectVisible((prev) => ({
                    ...prev,
                    [workout._id]: true,
                  }))
                }
                className="mt-2 bg-customBg flex mx-auto"
              >
                הוסף תרגילים לאימון
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:gap-y-0 gap-y-2">
          <Button
            type="submit"
            className={
              isButtonDisabled || isSupersetIncomplete
                ? "text-black px-4 md:px-8 py-2 rounded-full bg-gray-200 sm:order-first order-last"
                : "text-white px-4 md:px-8 py-2 rounded-full bg-customBg sm:order-first order-last"
            }
            disabled={isButtonDisabled || isSupersetIncomplete}
          >
        שמור תוכנית אימון חדשה
          </Button>
          <Button
            type="button"
            className=" bg-customBg"
            onClick={() => setShowWorkoutSelect(true)}
          >
            הוסף אימון לתוכנית
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainingForm;
