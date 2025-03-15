import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { base_url } from "@/api/baseUrl";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditTrainingFormUser = ({ trainingId, user_Id }) => {
  //const { trainingId, userId } = useParams();
  const [training, setTraining] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
  const [exerciseSelectVisible, setExerciseSelectVisible] = useState({});

  //console.log("userId", userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exerciseRes, workoutRes, trainingRes] = await Promise.all([
          axios.get(`${base_url}/exercise`),
          axios.get(`${base_url}/workout`),
          axios.get(`${base_url}/get-training-by-id/${trainingId}`),
        ]);

        if (exerciseRes.status === 200) setExerciseList(exerciseRes.data.data);
        if (workoutRes.status === 200) setWorkouts(workoutRes.data.data);
        if (trainingRes.status === 200) setTraining(trainingRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [trainingId]);
  console.log("training-Data", exerciseList);

  // Add selected workout with exercises
  const handleAddWorkout = (selected) => {
    if (!selected.length) return;
    const newWorkout = selected[0];

    if (training.workouts?.some((w) => w.workout._id === newWorkout._id)) {
      setSelectedWorkout(null);
      return;
    }

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
    setSelectedWorkout(null);
    setShowWorkoutSelect(false);
  };

  // Add a new exercise to a specific workout
  const handleAddExercise = (workoutId, selected) => {
    //console.log("selected", selected);

    if (!selected.length) return;
    const newExercise = selected[0];

    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout._id === workoutId
          ? {
              ...workout,
              exercises: [
                ...workout.exercises,
                {
                  _id: newExercise._id,
                  exercise_id: newExercise._id,
                  sets: "",
                  reps: "",
                  manipulation: "",
                },
              ],
            }
          : workout
      ),
    }));

    setExerciseSelectVisible((prev) => ({ ...prev, [workoutId]: false }));
  };

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
  const handleSetChange = (workoutId, exerciseId, field, value) => {
    //  console.log("changeExercise:", exerciseId);
    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout._id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.map((ex) =>
                ex._id === exerciseId ? { ...ex, [field]: value } : ex
              ),
            }
          : workout
      ),
    }));
  };

  console.log("Training", training);

  const onSubmit = async () => {
    // console.log("payload", training);
    const payload = {
      user_id: user_Id,
      training_id: trainingId,
      workouts: (training.workouts || []).map((w) => ({
        workout: w._id,
        // name: w.workout?.name,
        // description: w.workout?.description,

        exercises: (w.exercises || []).map((ex) => ({
          _id: ex._id,
          // Ensure exercise_id is sent as a plain string or object based on your schema:
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
    console.log("Payload", payload);

    // axios
    //   .put(`${base_url}/update-user-training/${training._id}`, payload)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       toast.success("Training session updated successfully!");
    //     }
    //  });
    try {
      const response = await axios.put(
        `${base_url}/update-user-training/${trainingId}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Training session updated successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //console.log("training-Data", training);

  return (
    <div className="py-10 w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DynamicInputField
          id="name"
          type="text"
          label="Training Name"
          placeholder="Enter training name..."
          register={register}
          validation={{ required: !user_Id && "Name is required" }}
          errors={errors}
          defaultValue={training?.name}
        />
        <DynamicInputField
          id="description"
          type="text"
          label="Description"
          placeholder="Enter description..."
          register={register}
          validation={{ required: !user_Id && "Description is required" }}
          errors={errors}
          defaultValue={training?.description}
        />

        {showWorkoutSelect && (
          <Select
            options={workouts}
            valueField="_id"
            labelField="name"
            onChange={handleAddWorkout}
          />
        )}

        <div className="my-5">
          {training?.workouts?.map((workout) => (
            <div key={workout._id} className="border py-2 px-4 rounded-md my-4">
              <h1 className="font-semibold">{workout?.workout?.name}</h1>

              {workout?.exercises?.map((ex) => (
                <div
                  key={ex._id}
                  className="border py-2 px-4 rounded-md my-4 flex items-center justify-between gap-x-2"
                >
                  <div>
                    <p className="py-4">{ex?.exercise_id?.name}</p>
                    <div className="flex items-center justify-between gap-x-2">
                      <div className="flex flex-col items-center space-y-4">
                        <p>Sets</p>

                        <Input
                          type="number"
                          defaultValue={ex?.sets}
                          onChange={(e) =>
                            handleSetChange(
                              workout._id,
                              ex._id,
                              "sets",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>Reps</p>
                        <Input
                          type="number"
                          defaultValue={ex?.reps}
                          onChange={(e) =>
                            handleSetChange(
                              workout._id,
                              ex._id,
                              "reps",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>Manipulation</p>
                        <Input
                          type="text"
                          defaultValue={ex?.manipulation}
                          onChange={(e) =>
                            handleSetChange(
                              workout._id,
                              ex._id,
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
                className="mt-2 bg-customBg"
              >
                Add More Exercise
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit" className="bg-customBg">
            Update Training
          </Button>
          <Button
            onClick={() => setShowWorkoutSelect(true)}
            type="button"
            className="bg-customBg"
          >
            Add More Workout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainingFormUser;
