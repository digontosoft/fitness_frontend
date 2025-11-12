import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddWorkoutForm = () => {
  const [allExercises, setAllExercises] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [addMoreExercise, setAddMoreExercise] = useState(true);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [filteredExercisesForSelection, setFilteredExercisesForSelection] =
    useState([]);
  const [newExerciseData, setNewExerciseData] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch all exercises on mount
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setAllExercises(response.data.data);
        setFilteredExercisesForSelection(response.data.data);
      } catch (error) {
        console.error("Error fetching all exercises:", error);
      }
    };
    fetchAllExercises();
  }, []);

  // ✅ Filter exercises based on selected body part & equipment
  useEffect(() => {
    const fetchFilteredExercises = async () => {
      if (selectedBodyPart || selectedEquipment) {
        let url = `${base_url}/exercise?`;
        if (selectedBodyPart) url += `body_part=${selectedBodyPart}&`;
        if (selectedEquipment) url += `equipment=${selectedEquipment}&`;
        url = url.slice(0, -1);

        try {
          const response = await axios.get(url);
          setFilteredExercisesForSelection(response.data.data || []);
        } catch (error) {
          console.error("Error fetching filtered exercises:", error);
          setFilteredExercisesForSelection([]);
        }
      } else {
        setFilteredExercisesForSelection(allExercises);
      }
    };
    fetchFilteredExercises();
  }, [selectedBodyPart, selectedEquipment, allExercises]);

  // ✅ Handle add exercise (from dropdown)
  const handleAddMoreExercise = (selected) => {
    if (selected && selected.length > 0) {
      const exercise = selected[0];
      const newExercise = {
        exercise_id: exercise,
        sets: "",
        reps: "",
        manipulation: "",
      };

      setWorkoutExercises((prev) => [...prev, newExercise]);
      setNewExerciseData(null);
      setAddMoreExercise(false);
      setSelectedBodyPart(null);
      setSelectedEquipment(null);
    }
  };

  // ✅ Remove exercise
  const handleRemoveExercise = (indexToRemove) => {
    setWorkoutExercises((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // ✅ Handle input change for sets/reps/manipulation
  const handleInputChange = (index, field, value) => {
    setWorkoutExercises((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // ✅ Submit workout
  const onSubmit = async (data) => {
    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: workoutExercises.map((ex) => ({
        exercise_id: ex.exercise_id._id,
        sets: parseInt(ex.sets, 10),
        reps: parseInt(ex.reps, 10),
        manipulation: ex.manipulation || "",
      })),
    };

    if (workoutExercises.length === 0) {
      toast.error("Please add at least one exercise to the workout.");
      return;
    }

    try {
      const response = await axios.post(`${base_url}/workout`, workoutData);
      if (response.status === 201) {
        toast.success("Workout created successfully");
        reset();
        setWorkoutExercises([]);
        setSelectedBodyPart(null);
        setSelectedEquipment(null);
        setFilteredExercisesForSelection(allExercises);
        navigate("/dashboard/workout-list");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create workout");
      console.error(error);
    }
  };

  const isFormValid = workoutExercises.every(
    (ex, index, arr) =>
      ex.sets > 0 &&
      ex.reps > 0 &&
      (index === arr.length - 1
        ? ex.manipulation?.trim().toLowerCase() !== "superset"
        : true)
  );

  return (
    <div className="sm:py-20 py-6" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <DynamicInputField
            className="sm:min-w-[400px]"
            id="name"
            type="text"
            label="שם תוכנית אימון"
            placeholder="הוסף שם תוכנית אימון ...."
            register={register}
            validation={{ required: "Workout name is required" }}
            errors={errors}
          />

          <DynamicTextAreaField
            className="sm:min-w-[400px]"
            id="description"
            type="text"
            label=" תיאור האימון "
            placeholder="הוסף תיאור לאימון...."
            register={register}
            validation={{ required: "Workout Description is required" }}
            errors={errors}
          />

          {/* ✅ Existing Exercises */}
          {workoutExercises.map((exercise, index) => (
            <div
              key={index}
              className="border p-4 flex items-center justify-center gap-4 rounded-md"
            >
              <Trash
                className="cursor-pointer text-red-600 size-10"
                onClick={() => handleRemoveExercise(index)}
              />
              <div className="space-y-4">
                <p className="text-center">{exercise.exercise_id?.name}</p>
                <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:gap-x-2 gap-y-2">
                  <div className="flex flex-col space-y-2">
                    <label>סטים</label>
                    <Input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleInputChange(index, "sets", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>חזרות</label>
                    <Input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleInputChange(index, "reps", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>מניפולציה</label>
                    <Input
                      type="text"
                      value={exercise.manipulation}
                      onChange={(e) =>
                        handleInputChange(index, "manipulation", e.target.value)
                      }
                      placeholder="Enter manipulation"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ✅ Add More Exercise Section */}
          {addMoreExercise && (
            <div dir="rtl" className="space-y-4">
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
                  onChange={(selected) =>
                    setSelectedBodyPart(selected[0]?.value || null)
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">ציוד</label>
                <Select
                  className="rounded-lg h-12 w-auto"
                  direction="rtl"
                  options={equipmentOptions}
                  valueField="id"
                  labelField="label"
                  placeholder="סנן לפי ציוד"
                  onChange={(selected) =>
                    setSelectedEquipment(selected[0]?.value || null)
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  סנן לפי שם תרגיל
                </label>
                <Select
                  className="rounded-lg h-12 w-auto"
                  direction="rtl"
                  options={filteredExercisesForSelection}
                  valueField="_id"
                  labelField="name"
                  placeholder="בחר תרגיל"
                  onChange={(selected) => handleAddMoreExercise(selected)}
                  searchBy="name"
                />
              </div>
            </div>
          )}

          <div>
            <Button
              type="button"
              className="mt-2 bg-customBg flex mx-auto"
              onClick={() => setAddMoreExercise(!addMoreExercise)}
            >
              הוסף עוד פעילות גופנית
            </Button>
            {/* <Button
              type="button"
              className="mt-2 bg-customBg flex mx-auto"
              onClick={() => {
                setSelectedBodyPart(null);
                setSelectedEquipment(null);
                setFilteredExercisesForSelection(allExercises);
              }}
            >
              הוסף עוד פעילות גופנית
            </Button> */}

          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-3 text-base rounded-full bg-customBg hover:bg-customBg/90 focus:ring-2 focus:ring-customBg focus:ring-opacity-50"
            disabled={workoutExercises.length === 0 || !isFormValid}
          >
            לשמור תוכנית אימון חדשה
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkoutForm;
