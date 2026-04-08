import { base_url } from "@/api/baseUrl";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
import axios from "axios";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

const EditExercise = () => {
  const location = useLocation();
  const workData = location.state?.data;
  const navigate = useNavigate();
  const [exerciseList, setExerciseList] = useState([]);
  const workoutId = workData?.user_training_workout_id;

  const [allExercises, setAllExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // States for filtering and selecting a new exercise
  const [selectedExerciseIdForAdd, setSelectedExerciseIdForAdd] = useState("");
  const [selectedExerciseOptions, setSelectedExerciseOptions] = useState(null); // This will hold the filtered exercises for the dropdown
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // States for the new exercise's sets, reps, manipulation
  const [newExerciseSets, setNewExerciseSets] = useState("");
  const [newExerciseReps, setNewExerciseReps] = useState("");
  const [newExerciseManipulation, setNewExerciseManipulation] = useState("");
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const validateSuperset = (list) => {
    const items = Array.isArray(list) ? list : [];
    const last = items[items.length - 1];
    const incomplete =
      items.length > 0 &&
      String(last?.manipulation ?? "").trim().toLowerCase() === "superset";
    setIsSupersetIncomplete(incomplete);
  };

  const fetchWorkout = useCallback(async () => {
    try {
      const response = await axios.get(`${base_url}/get-user-task/${user._id}`);
      console.log("workout:", response.data.data);
      setWorkoutData(response.data.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      toast.error("Failed to fetch exercises.");
    }
  }, [user?._id]);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  const filteredExercises = workoutData?.filter(
    (ex) => ex?._id === workData?.task_id
  );
  console.log("filteredExercises:", filteredExercises);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${base_url}/exercise`);
      setAllExercises(response.data.data);
      setSelectedExerciseOptions(response.data.data); // Initially show all exercises
    } catch (error) {
      console.error("Error fetching exercises:", error);
      toast.error("Failed to fetch exercises.");
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    const getWorkout = async () => {
      const matchedExercise = workoutData.find(
        (ex) => ex._id === workData?.task_id
      );
      if (!matchedExercise) return;

      const requestBody = {
        userId: user._id,
        workoutId: matchedExercise?.workout_id,
        taskId: matchedExercise?._id,
      };

      try {
        const response = await axios.post(
          `${base_url}/get-user-workout-task`,
          requestBody
        );
        setExerciseList(response.data.data.userTrainingExercise);
        validateSuperset(response.data.data.userTrainingExercise);
        console.log("filteredWorkoutData:", response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error("Failed to fetch exercises.");
      }
    };

    if (user._id && workoutData.length && workData?.task_id) {
      getWorkout();
    }
  }, [user._id, workoutData, workData?.task_id]);

  useEffect(() => {
    let filtered = allExercises;

    if (selectedBodyPart) {
      filtered = filtered.filter((ex) => ex.body_part === selectedBodyPart);
    }

    if (selectedEquipment) {
      filtered = filtered.filter((ex) => ex.equipment === selectedEquipment);
    }
    setSelectedExerciseOptions(filtered);
    setSelectedExerciseIdForAdd(""); // Reset selected exercise when filters change
  }, [selectedBodyPart, selectedEquipment, allExercises]);

  const handleAddMoreExerciseClick = () => {
    setShowDropdown(true);
  };

  const handleAddNewExercise = () => {
    if (!selectedExerciseIdForAdd) {
      toast.error("Please select an exercise to add.");
      return;
    }
    if (!newExerciseSets || Number(newExerciseSets) <= 0) {
      toast.error("Please enter a valid number of sets for the new exercise.");
      return;
    }
    if (!newExerciseReps || Number(newExerciseReps) <= 0) {
      toast.error("Please enter a valid number of reps for the new exercise.");
      return;
    }

    const selected = allExercises.find(
      (ex) => ex._id === selectedExerciseIdForAdd
    );

    if (selected) {
      setExerciseList((prevList) => [
        ...prevList,
        {
          _id: selected._id + Date.now(), // Use a unique ID for new entries
          exercise_id: selected,
          sets: Number(newExerciseSets),
          reps: Number(newExerciseReps),
          manipulation: newExerciseManipulation,
        },
      ]);
      // Superset validation after add
      setTimeout(() => validateSuperset([...exerciseList, {
        _id: selected._id + Date.now(),
        exercise_id: selected,
        sets: Number(newExerciseSets),
        reps: Number(newExerciseReps),
        manipulation: newExerciseManipulation,
      }]), 0);
      // Reset states for adding new exercise
      setSelectedExerciseIdForAdd("");
      setSelectedBodyPart(null);
      setSelectedEquipment(null);
      setNewExerciseSets("");
      setNewExerciseReps("");
      setNewExerciseManipulation("");
      setShowDropdown(false); // Hide dropdowns after adding
      toast.success("Exercise added successfully!");
    } else {
      toast.error("Selected exercise not found.");
    }
  };

  const handleRemoveExercise = (idToRemove) => {
    const next = exerciseList.filter((item) => item._id !== idToRemove);
    setExerciseList(next);
    validateSuperset(next);
    toast.info("Exercise removed.");
  };

  const handleChange = (index, field, value) => {
    const updatedExercises = [...exerciseList];
    // Basic validation for sets and reps
    if ((field === "sets" || field === "reps") && Number(value) < 0) {
      toast.error(`${field} cannot be negative.`);
      return;
    }
    updatedExercises[index][field] = value;
    setExerciseList(updatedExercises);
    validateSuperset(updatedExercises);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...exerciseList];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setExerciseList(updated);
    validateSuperset(updated);
  };

  const handleMoveDown = (index) => {
    if (index === exerciseList.length - 1) return;
    const updated = [...exerciseList];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setExerciseList(updated);
    validateSuperset(updated);
  };

  const handleSubmit = async () => {
    // Validate existing exercises before submission
    for (const item of exerciseList) {
      if (!item.sets || Number(item.sets) <= 0) {
        toast.error(
          `Please enter valid sets for ${
            item.exercise_id?.name || "an exercise"
          }.`
        );
        return;
      }
      if (!item.reps || Number(item.reps) <= 0) {
        toast.error(
          `Please enter valid reps for ${
            item.exercise_id?.name || "an exercise"
          }.`
        );
        return;
      }
    }

    const payload = {
      user_training_workout_id: workoutId,
      exercises: exerciseList.map((item) => ({
        exercise_id: item.exercise_id._id || item.exercise_id,
        sets: Number(item.sets),
        reps: Number(item.reps),
        manipulation: item.manipulation,
      })),
    };

    try {
      const response = await axios.post(
        `${base_url}/customize-single-workout`,
        payload
      );
      if (response.status === 200) {
        toast.success("Workout updated successfully!");
        setAllExercises((prevExercises) => [
          ...prevExercises,
          response?.data.data.userTrainingExercise,
        ]);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      toast.error("Error updating workout.");
    }
  };

  return (
    <div
      dir="rtl"
      className="w-full bg-[#7994CB] min-h-screen border-b-8 border-white sm:py-12 py-6"
    >
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <h1 className="text-2xl font-semibold">{workData?.task_name}</h1>

        {exerciseList.map((item, index) => (
          <div
            key={item._id}
            className="w-full flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-xl mb-4 shadow mt-4"
          >
            {/* ✅ Up/Down order arrows */}
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded border border-gray-300 transition-opacity ${
                  index === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
                title="Move up"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(index)}
                disabled={index === exerciseList.length - 1}
                className={`p-1 rounded border border-gray-300 transition-opacity ${
                  index === exerciseList.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
                title="Move down"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>
            <Trash
              onClick={() => handleRemoveExercise(item._id)}
              className="text-[#7994CB]-600 cursor-pointer"
            />
            <div>
              <h2 className="text-lg text-center font-semibold text-gray-800">
                {item.exercise_id?.name || "Exercise"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center mt-2">
                <div className="flex flex-col items-center md:justify-center gap-3">
                  <label>סטים:</label>
                  <input
                    type="number"
                    value={item.sets}
                    onChange={(e) =>
                      handleChange(index, "sets", e.target.value)
                    }
                    className="p-2 rounded-lg border mr-[30px] sm:mr-0"
                    required
                    min="1" // Ensure positive input
                  />
                </div>
                <div className="flex flex-col items-center md:justify-center gap-3">
                  <label>חזרות:</label>
                  <input
                    type="number"
                    value={item.reps}
                    onChange={(e) =>
                      handleChange(index, "reps", e.target.value)
                    }
                    className="p-2 rounded-lg border mr-6 sm:mr-0"
                    required
                    min="1" // Ensure positive input
                  />
                </div>
                <div className="flex flex-col items-center md:justify-center gap-3">
                  <label>מניפולציה:</label>
                  <input
                    type="text"
                    value={item.manipulation || ""}
                    onChange={(e) =>
                      handleChange(index, "manipulation", e.target.value)
                    }
                    className="p-2 rounded border"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {!showDropdown && (
          <div className="flex items-center justify-end gap-4 mt-4">
            <Button
              onClick={handleAddMoreExerciseClick}
              className="bg-[#7994CB] rounded-lg text-white px-6 py-2"
            >
              הוסף תרגיל נוסף
            </Button>
          </div>
        )}

        {showDropdown && (
          <div className="w-full bg-gray-100 p-4 rounded-xl mb-4 shadow mt-4">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
              הוסף תרגיל חדש
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  אזור בגוף
                </label>
                <Select
                  className="rounded-lg h-12 w-full"
                  direction="rtl"
                  valueField="id"
                  labelField="label"
                  options={bodyPartOptions}
                  placeholder="סנן לפי חלק בגוף"
                  onChange={(selectedOptions) => {
                    setSelectedBodyPart(selectedOptions[0]?.value || null);
                  }}
                  searchBy="label"
                  values={
                    selectedBodyPart
                      ? [
                          {
                            id: selectedBodyPart,
                            label: bodyPartOptions.find(
                              (opt) => opt.id === selectedBodyPart
                            )?.label,
                          },
                        ]
                      : []
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ציוד
                </label>
                <Select
                  className="rounded-lg h-12 w-full"
                  direction="rtl"
                  options={equipmentOptions}
                  valueField="id"
                  labelField="label"
                  placeholder="סנן לפי ציוד"
                  onChange={(selectedOptions) => {
                    setSelectedEquipment(selectedOptions[0]?.value || null);
                  }}
                  searchBy="label"
                  values={
                    selectedEquipment
                      ? [
                          {
                            id: selectedEquipment,
                            label: equipmentOptions.find(
                              (opt) => opt.id === selectedEquipment
                            )?.label,
                          },
                        ]
                      : []
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  סנן לפי שם תרגיל
                </label>
                <Select
                  className="rounded-lg h-12 w-full"
                  direction="rtl"
                  options={selectedExerciseOptions}
                  valueField="_id"
                  labelField="name"
                  placeholder="בחר"
                  onChange={(selected) => {
                    setSelectedExerciseIdForAdd(selected[0]?._id || "");
                  }}
                  searchBy="name"
                  values={
                    selectedExerciseIdForAdd
                      ? [
                          {
                            _id: selectedExerciseIdForAdd,
                            name: allExercises.find(
                              (ex) => ex._id === selectedExerciseIdForAdd
                            )?.name,
                          },
                        ]
                      : []
                  }
                />
              </div>
            </div>

            {selectedExerciseIdForAdd && ( // Show input fields only after an exercise is selected
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center mt-4">
                <div className="flex flex-col items-center md:justify-center gap-3 w-full">
                  <label>סטים:</label>
                  <input
                    type="number"
                    value={newExerciseSets}
                    onChange={(e) => setNewExerciseSets(e.target.value)}
                    className="p-2 rounded-lg border w-full"
                    required
                    min="1"
                  />
                </div>
                <div className="flex flex-col items-center md:justify-center gap-3 w-full">
                  <label>חזרות:</label>
                  <input
                    type="number"
                    value={newExerciseReps}
                    onChange={(e) => setNewExerciseReps(e.target.value)}
                    className="p-2 rounded-lg border w-full"
                    required
                    min="1"
                  />
                </div>
                <div className="flex flex-col items-center md:justify-center gap-3 w-full">
                  <label>מניפולציה:</label>
                  <input
                    type="text"
                    value={newExerciseManipulation}
                    onChange={(e) => setNewExerciseManipulation(e.target.value)}
                    className="p-2 rounded border w-full"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button
                onClick={handleAddNewExercise}
                className="bg-[#7994CB] rounded-lg text-white px-6 py-2 hover:bg-[#7994CB] mt-4"
              >
                הוסף תרגיל
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSupersetIncomplete}
          className={`rounded-lg text-white px-6 py-2 mt-4 ${
            isSupersetIncomplete
              ? "bg-gray-200 text-black cursor-not-allowed"
              : "bg-[#7994CB] hover:bg-[#7994CB]"
          }`}
        >
          שמור שינויים
        </Button>
      </div>
    </div>
  );
};

export default EditExercise;
