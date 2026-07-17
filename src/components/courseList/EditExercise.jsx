import { base_url } from "@/api/baseUrl";
import CustomSearchableSelect from "@/components/common/CustomSearchableSelect";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
import { UI_TEXT } from "@/constants/hebrewText";
import axios from "axios";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const [showDropdown, setShowDropdown] = useState(false);
  // Same exercise filter state as AddWorkoutForm
  const [body_part, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredExercisesForSelection, setFilteredExercisesForSelection] =
    useState([]);
  const [isLoadingExercises, setIsLoadingExercises] = useState(false);
  const [selectedExerciseForAdd, setSelectedExerciseForAdd] = useState(null);

  // States for the new exercise's sets, reps, manipulation
  const [newExerciseSets, setNewExerciseSets] = useState("");
  const [newExerciseReps, setNewExerciseReps] = useState("");
  const [newExerciseManipulation, setNewExerciseManipulation] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const initializedRef = useRef(false);
  const exerciseListRef = useRef([]);

  const isSuperset = (val) =>
    String(val ?? "").trim().toLowerCase() === "superset";

  const resetExerciseFilters = () => {
    setBodyPart("");
    setEquipment("");
    setSearchValue("");
    setSelectedExerciseForAdd(null);
  };

  // Load workout exercises once
  useEffect(() => {
    if (initializedRef.current) return;
    if (!user?._id || !workData?.task_id) return;
    initializedRef.current = true;

    const initialize = async () => {
      try {
        const taskRes = await axios.get(`${base_url}/get-user-task/${user._id}`);
        const tasks = taskRes.data.data || [];
        const matchedTask = tasks.find((t) => t._id === workData.task_id);
        if (!matchedTask) return;

        const workoutRes = await axios.post(`${base_url}/get-user-workout-task`, {
          userId: user._id,
          workoutId: matchedTask.workout_id,
          taskId: matchedTask._id,
        });
        const exercises = workoutRes.data.data.userTrainingExercise;
        exerciseListRef.current = exercises;
        setExerciseList(exercises);
      } catch (error) {
        console.error("Error initializing EditExercise:", error);
        toast.error("טעינת התרגילים נכשלה");
      }
    };

    initialize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Helper: update both ref and state atomically
  const applyList = (nextList) => {
    exerciseListRef.current = nextList;
    setExerciseList(nextList);
  };

  // "Effective list" = existing exercises + the pending new exercise (if dropdown is open
  // and a valid exercise is selected). This makes the submit button react in real-time
  // as the user fills in the add-exercise form.
  const effectiveList = useMemo(() => {
    if (!showDropdown || !selectedExerciseForAdd) return exerciseList;
    return [
      ...exerciseList,
      {
        exercise_id: selectedExerciseForAdd,
        sets: Number(newExerciseSets) || 0,
        reps: Number(newExerciseReps) || 0,
        manipulation: newExerciseManipulation || "",
      },
    ];
  }, [
    exerciseList,
    showDropdown,
    selectedExerciseForAdd,
    newExerciseSets,
    newExerciseReps,
    newExerciseManipulation,
  ]);

  // Derived submit-disabled state — computed from effectiveList, fully reactive
  const submitBlockerMsg = useMemo(() => {
    const emptyItem = effectiveList.find(
      (item) =>
        !item.sets ||
        Number(item.sets) <= 0 ||
        !item.reps ||
        Number(item.reps) <= 0 ||
        !String(item.manipulation ?? "").trim()
    );
    if (emptyItem)
      return `מלא את כל השדות (סטים, חזרות, מניפולציה) עבור "${emptyItem.exercise_id?.name || "תרגיל"}"`;

    const last = effectiveList[effectiveList.length - 1];
    if (effectiveList.length > 0 && isSuperset(last?.manipulation))
      return 'אחרי "סופרסט" חייב לבוא תרגיל עם מניפולציה אחרת';

    return null;
  }, [effectiveList]);

  const isSubmitDisabled = submitBlockerMsg !== null;

  const handleAddMoreExerciseClick = () => {
    resetExerciseFilters();
    setNewExerciseSets("");
    setNewExerciseReps("");
    setNewExerciseManipulation("");
    setShowDropdown(true);
  };

  const commitPendingExercise = () => {
    if (!selectedExerciseForAdd) {
      toast.error("נא לבחור תרגיל להוספה");
      return false;
    }
    if (!newExerciseSets || Number(newExerciseSets) <= 0) {
      toast.error("נא להזין מספר סטים תקין לתרגיל החדש");
      return false;
    }
    if (!newExerciseReps || Number(newExerciseReps) <= 0) {
      toast.error("נא להזין מספר חזרות תקין לתרגיל החדש");
      return false;
    }
    const newItem = {
      _id: selectedExerciseForAdd._id + Date.now(),
      exercise_id: selectedExerciseForAdd,
      sets: Number(newExerciseSets),
      reps: Number(newExerciseReps),
      manipulation: newExerciseManipulation,
    };
    applyList([...exerciseListRef.current, newItem]);
    resetExerciseFilters();
    setNewExerciseSets("");
    setNewExerciseReps("");
    setNewExerciseManipulation("");
    setShowDropdown(false);
    return true;
  };

  const handleAddNewExercise = () => {
    if (commitPendingExercise()) {
      toast.success("התרגיל נוסף בהצלחה!");
    }
  };

  const handleRemoveExercise = (idToRemove) => {
    applyList(exerciseListRef.current.filter((item) => item._id !== idToRemove));
    toast.info("התרגיל הוסר");
  };

  const handleChange = (index, field, value) => {
    if ((field === "sets" || field === "reps") && Number(value) < 0) {
      toast.error(`${field === "sets" ? "סטים" : "חזרות"} לא יכולים להיות שליליים`);
      return;
    }

    if (field === "manipulation") {
      const currentList = exerciseListRef.current;
      const exercise = currentList[index];
      const isLastExercise = index === currentList.length - 1;

      // Setting to "superset" when NOT last exercise: next must exist
      if (isSuperset(value) && !isLastExercise) {
        const nextExercise = currentList[index + 1];
        if (!nextExercise) {
          toast.error('אחרי "סופרסט" חייב לבוא תרגיל עם מניפולציה אחרת');
          return;
        }
      }

      // Removing "superset": previous exercise must NOT be "superset"
      if (!isSuperset(value) && isSuperset(exercise?.manipulation)) {
        const prevExercise = currentList[index - 1];
        if (prevExercise && isSuperset(prevExercise?.manipulation)) {
          toast.error('לא ניתן להסיר סופרסט מתרגיל זה כי התרגיל הקודם הוא סופרסט');
          return;
        }
      }
    }

    const updated = exerciseListRef.current.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    applyList(updated);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...exerciseListRef.current];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    applyList(updated);
  };

  const handleMoveDown = (index) => {
    if (index === exerciseListRef.current.length - 1) return;
    const updated = [...exerciseListRef.current];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    applyList(updated);
  };

  const handleSubmit = async () => {
    // Auto-add pending exercise if user forgot to click "הוסף תרגיל"
    if (showDropdown && selectedExerciseForAdd) {
      if (!commitPendingExercise()) return;
    }

    const currentList = exerciseListRef.current;

    // Validate directly from ref — do NOT rely on isSupersetIncomplete state
    // because setIsSupersetIncomplete is async and may not have applied yet
    for (const item of currentList) {
      if (!item.sets || Number(item.sets) <= 0) {
        toast.error(`נא להזין מספר סטים תקין עבור ${item.exercise_id?.name || "תרגיל"}.`);
        return;
      }
      if (!item.reps || Number(item.reps) <= 0) {
        toast.error(`נא להזין מספר חזרות תקין עבור ${item.exercise_id?.name || "תרגיל"}.`);
        return;
      }
      if (!String(item.manipulation ?? "").trim()) {
        toast.error(`מלא מניפולציה עבור "${item.exercise_id?.name || "תרגיל"}"`);
        return;
      }
    }

    // Superset rule: last exercise cannot have manipulation = "superset"
    const last = currentList[currentList.length - 1];
    if (currentList.length > 0 && isSuperset(last?.manipulation)) {
      toast.error('אחרי "סופרסט" חייב לבוא תרגיל עם מניפולציה אחרת');
      return;
    }

    try {
      const payload = {
        user_training_workout_id: workoutId,
        exercises: currentList.map((item) => ({
          exercise_id: item.exercise_id?._id || item.exercise_id,
          sets: Number(item.sets),
          reps: Number(item.reps),
          manipulation: item.manipulation,
        })),
      };
      const response = await axios.post(
        `${base_url}/customize-single-workout`,
        payload
      );
      if (response.status === 200) {
        toast.success(UI_TEXT.workoutUpdated);
        const taskId = workData?.task_id;
        if (taskId) {
          navigate(`/action-course-cart/${taskId}`, {
            state: location.state,
            replace: true,
          });
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      toast.error(UI_TEXT.workoutUpdateFailed);
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
                title="הזז למעלה"
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
                title="הזז למטה"
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
                {item.exercise_id?.name || "תרגיל"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center mt-2">
                <div className="flex flex-col items-center gap-2 w-52 max-w-[90%]">
                  <label>סטים:</label>
                  <input
                    type="number"
                    value={item.sets}
                    onChange={(e) =>
                      handleChange(index, "sets", e.target.value)
                    }
                    className="w-full p-2 rounded-lg border"
                    required
                    min="1"
                  />
                </div>
                <div className="flex flex-col items-center gap-2 w-52 max-w-[90%]">
                  <label>חזרות:</label>
                  <input
                    type="number"
                    value={item.reps}
                    onChange={(e) =>
                      handleChange(index, "reps", e.target.value)
                    }
                    className="w-full p-2 rounded-lg border"
                    required
                    min="1"
                  />
                </div>
                <div className="flex flex-col items-center gap-2 w-52 max-w-[90%]">
                  <label>מניפולציה:</label>
                  <input
                    type="text"
                    value={item.manipulation || ""}
                    onChange={(e) =>
                      handleChange(index, "manipulation", e.target.value)
                    }
                    className="w-full p-2 rounded-lg border"
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
                  values={
                    body_part
                      ? bodyPartOptions.filter((opt) => opt.value === body_part)
                      : []
                  }
                  onChange={(selected) =>
                    setBodyPart(selected[0]?.value || "")
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
                  values={
                    equipment
                      ? equipmentOptions.filter((opt) => opt.value === equipment)
                      : []
                  }
                  onChange={(selected) =>
                    setEquipment(selected[0]?.value || "")
                  }
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  סנן לפי שם תרגיל
                </label>
                <CustomSearchableSelect
                  options={filteredExercisesForSelection}
                  valueField="_id"
                  labelField="name"
                  value={selectedExerciseForAdd}
                  placeholder="בחר תרגיל"
                  onChange={(exercise) =>
                    setSelectedExerciseForAdd(exercise || null)
                  }
                  onSearchChange={setSearchValue}
                  loading={isLoadingExercises}
                  direction="rtl"
                />
              </div>
            </div>

            {selectedExerciseForAdd && (
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

            <div className="flex justify-center gap-3 mt-4">
              <Button
                onClick={handleAddNewExercise}
                className="bg-[#7994CB] rounded-lg text-white px-6 py-2 hover:bg-[#7994CB] mt-4"
              >
                הוסף תרגיל
              </Button>
              <Button
                onClick={() => {
                  setShowDropdown(false);
                  resetExerciseFilters();
                  setNewExerciseSets("");
                  setNewExerciseReps("");
                  setNewExerciseManipulation("");
                }}
                className="bg-gray-200 text-black rounded-lg px-6 py-2 hover:bg-gray-300 mt-4"
              >
                ביטול
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={`rounded-lg text-white px-6 py-2 mt-4 ${
            isSubmitDisabled
              ? "bg-gray-200 text-black cursor-not-allowed"
              : "bg-[#7994CB] hover:bg-[#7994CB]"
          }`}
        >
          שמור שינויים
        </Button>
        {submitBlockerMsg && (
          <p className="text-red-500 text-sm mt-2 text-center" dir="rtl">
            {submitBlockerMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditExercise;
