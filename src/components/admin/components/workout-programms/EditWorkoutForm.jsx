import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-dropdown-select";
import AddExercise from "./AddExercise";
import { useNavigate } from "react-router-dom";

const EditWorkoutForm = ({ workoutId }) => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const exercisesForm = watch("exercises", []);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercises(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, []);

  useEffect(() => {
    const fetchSingleWorkout = async () => {
      try {
        const response = await axios.get(`${base_url}/workout/${workoutId}`);
        const data = response.data.data;
        setValue("exercises", data.exercises || []);
        reset(data);
      } catch (error) {
        console.error("Error fetching workout:", error);
      }
    };
    fetchSingleWorkout();
  }, [workoutId, reset, setValue]);

  const onSubmit = (data) => {
    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: data.exercises.map((ex) => ({
        exercise_id: ex.exercise_id._id,
        sets: ex.sets,
        reps: ex.reps,
        manipulation: ex.manipulation,
      })),
    };

    axios
      .put(`${base_url}/workout/${workoutId}`, workoutData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Workout updated successfully");
          navigate("/dashboard/workout-list");
        }
      })
      .catch((error) => {
        toast.error("Failed to update workout");
        console.log(error);
      });
  };

  return (
    <div className="py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <DynamicInputField
            className="w-full"
            id="name"
            type="text"
            label="שם האימון"
            placeholder="Add שם האימון...."
            register={register}
            errors={errors}
            required
          />

          <DynamicInputField
            className="w-full"
            id="description"
            type="text"
            label="דגשים מיוחדים (במידה ויש)"
            placeholder="דגשים מיוחדים (במידה ויש)..."
            register={register}
            errors={errors}
          />

          <Select
            direction="rtl"
            options={exercises}
            valueField="_id"
            labelField="name"
            multi
            values={exercisesForm?.map((ex) => ({
              _id: ex.exercise_id?._id,
              name: ex.exercise_id?.name,
            }))}
            onChange={(selected) => {
              const newExercises = selected.map((option) => {
                const existing = exercisesForm.find(
                  (ex) => ex.exercise_id._id === option._id
                );
                return existing
                  ? existing
                  : {
                      exercise_id: { _id: option._id, name: option.name },
                      sets: 0,
                      reps: 0,
                      manipulation: "",
                    };
              });
              setValue("exercises", newExercises);
            }}
          />

          {exercisesForm?.map((exercise, index) => (
            <div
              key={exercise._id || index}
              className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md"
            >
              <div className="flex items-center justify-center bg-customBg py-4 w-1/2 h-5 rounded-md text-white">
                <p className="text-center">{exercise.exercise_id?.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 w-[327px]">
                <div className="flex flex-col space-y-2">
                  <label htmlFor={`sets-${exercise._id}`}>Sets</label>
                  <input
                    id={`sets-${exercise._id}`}
                    type="number"
                    className="w-full border border-red-200 h-10 px-2"
                    {...register(`exercises.${index}.sets`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor={`reps-${exercise._id}`}>Reps</label>
                  <input
                    id={`reps-${exercise._id}`}
                    type="number"
                    className="w-full border border-red-200 h-10 px-2"
                    {...register(`exercises.${index}.reps`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor={`manipulation-${exercise._id}`}>
                    Manipulation
                  </label>
                  <input
                    id={`manipulation-${exercise._id}`}
                    type="text"
                    className="w-full border border-red-200 h-10 px-2"
                    {...register(`exercises.${index}.manipulation`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
          >
            Update Workout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkoutForm;
