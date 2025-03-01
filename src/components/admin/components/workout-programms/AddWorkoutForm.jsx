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

const AddWorkoutForm = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const handleExerciseChange = (exerciseId, data) => {
    setWorkoutExercises((prevExercises) => {
      const updatedExercises = prevExercises.filter(
        (ex) => ex.exercise_id !== exerciseId
      );
      return [...updatedExercises, { exercise_id: exerciseId, ...data }];
    });
  };

  const onSubmit = async (data) => {
    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: workoutExercises,
    };

    try {
      const response = await axios.post(`${base_url}/workout`, workoutData);
      if (response.status === 201) {
        toast.success("Workout created successfully");
        reset();
        setWorkoutExercises([]);
        setSelectedExercises([]);
        navigate("/dashboard/workout-list");
      }
    } catch (error) {
      toast.error("Failed to create workout");
      console.error(error);
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
          <Select
            className="rounded-lg h-12"
            direction="rtl"
            options={exercises}
            valueField="_id"
            labelField="name"
            multi
            onChange={(values) => setSelectedExercises(values)}
          />
          {selectedExercises.map((exercise) => (
            <AddExercise
              key={exercise._id}
              exercise={exercise}
              onChange={(data) => handleExerciseChange(exercise._id, data)}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
          >
            Saving a new workout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkoutForm;
