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
  const [superset, setSuperset] = useState(false);
  const [isSupersetSelected, setIsSupersetSelected] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const searchFields = ["name", "equipment", "body_part"];

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  // const validatedExercises = selectedExercises.map((ex) => ({
  //   exercise_id: ex._id,
  //   sets: ex.sets,
  //   reps: ex.reps,
  //   manipulation: ex.manipulation,
  // }));

  console.log("selectedExercises", selectedExercises);

  const onSubmit = async (data) => {
    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: workoutExercises,
    };

    console.log("workoutData", workoutData);

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
            className="sm:min-w-[400px]"
            id="name"
            type="text"
            label="Workout Name"
            placeholder="Add woukout name...."
            register={register}
            validation={{ required: "Workout name is required" }}
            errors={errors}
          />

          <DynamicInputField
            className="sm:min-w-[400px]"
            id="description"
            type="text"
            label="Workout Description"
            placeholder="Add Workout Description...."
            register={register}
            validation={{ required: "Workout Description is required" }}
            errors={errors}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter with Exercise Name
            </label>
            <Select
              className="rounded-lg h-12 w-auto"
              direction="rtl"
              options={exercises}
              valueField="_id"
              labelField="name"
              multi
              onChange={(values) => setSelectedExercises(values)}
              searchBy="name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter with Exercise Equipment
            </label>
            <Select
              className="rounded-lg h-12 w-auto"
              direction="rtl"
              options={exercises}
              valueField="_id"
              labelField="equipment"
              multi
              onChange={(values) => setSelectedExercises(values)}
              searchBy="equipment"
            />
          </div>
          {selectedExercises.map((exercise) => (
            <AddExercise
              key={exercise._id}
              exercise={exercise}
              onChange={(data) => handleExerciseChange(exercise._id, data)}
              setSuperset={setSuperset}
              superset={superset}
              isSupersetSelected={isSupersetSelected}
              setIsSupersetSelected={setIsSupersetSelected}
              isButtonDisabled={isButtonDisabled}
              setIsButtonDisabled={setIsButtonDisabled}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
            disabled={superset || isButtonDisabled}
          >
            Saving a new workout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkoutForm;
