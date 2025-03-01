import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";

const AddTrainingForm = () => {
  const [selectedTrainingExercises, setSelectedTrainingExercises] = useState(
    []
  );
  const [trainingExercises, setTrainingExercises] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/workout`);
        setTrainingExercises(response.data.data);
      } catch (error) {
        console.error("Error fetching training exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const handleWorkoutChange = (values) => {
    // Update selected workouts and prefill exercises
    const updatedExercises = values.map((workout) => ({
      workout: workout._id,
      name: workout.name, // Workout Name
      exercises:
        workout.exercises?.map((exercise) => ({
          exercise_id: exercise.exercise_id?._id || exercise._id,
          name: exercise.exercise_id?.name || exercise.name, // Exercise Name
          sets: exercise.sets || 3,
          reps: exercise.reps || 10,
          manipulation: exercise.manipulation || "Default manipulation",
        })) || [],
    }));

    setSelectedTrainingExercises(updatedExercises);
  };

  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const updatedWorkouts = [...selectedTrainingExercises];
    updatedWorkouts[workoutIndex].exercises[exerciseIndex][field] = value;
    setSelectedTrainingExercises(updatedWorkouts);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        workouts: selectedTrainingExercises.map((workout) => ({
          workout: workout.workout, // Workout ID
          exercises: workout.exercises.map((exercise) => ({
            exercise_id: exercise.exercise_id, // Exercise ID
            sets: exercise.sets,
            reps: exercise.reps,
            manipulation: exercise.manipulation,
          })),
        })),
      };

      console.log("Payload:", payload);

      await axios.post(`${base_url}/training`, payload).then((response) => {
        if (response.status === 201) {
          toast.success("Training session saved successfully!");
          setSelectedTrainingExercises([]);
          setTrainingExercises([]);
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
            label="שם האימון"
            placeholder="Add שם האימון...."
            register={register}
            validation={{ required: "שם האימון is required" }}
            errors={errors}
          />

          <DynamicInputField
            className="min-w-[350px]"
            id="description"
            type="text"
            label="דגשים מיוחדים (במידה ויש)"
            placeholder="דגשים מיוחדים (במידה ויש)..."
            register={register}
            validation={{ required: "דגשים מיוחדים is required" }}
            errors={errors}
          />

          {/* Workout Selection */}
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

        {/* Selected Workouts and Exercises */}
        <div className="space-y-4 w-[450px]">
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
                    <div className="grid grid-cols-3 gap-2 mt-2">
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
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
          >
            Saving a new training session
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainingForm;
