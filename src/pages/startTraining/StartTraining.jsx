import { base_url } from "@/api/baseUrl";
import CommonContainer from "@/components/startTraining/CommonContainer";
import ExerciseFormCard from "@/components/startTraining/ExerciseFormCard";
import TaskActionBar from "@/components/startTraining/TaskActionBar";
import TaskProgressSummary from "@/components/startTraining/TaskProgressSummary";
import { UI_TEXT } from "@/constants/hebrewText";
import { useTaskExerciseDraft } from "@/hooks/useTaskExerciseDraft";
import {
  buildExercisePayload,
  countFilledExercises,
  hasRequiredExerciseInput,
  isSupersetManipulation,
  validateTaskCompletion,
} from "@/utils/taskCompletionValidation";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const getExerciseLibraryId = (ex) => {
  if (!ex) return null;
  if (typeof ex.exercise_id === "string") return ex.exercise_id;
  if (ex.exercise_id?._id) return ex.exercise_id._id;
  return null;
};

const normalizeExercises = (list) =>
  list.map((ex) => {
    if (ex.exercise_id && typeof ex.exercise_id === "object") {
      return {
        ...ex,
        sets: ex.sets || 0,
        reps: ex.reps || 0,
        manipulation: ex.manipulation || "",
      };
    }
    return ex;
  });

const StartTraining = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workData = location.state?.data || {};
  const training = location.state?.training || location.state?.trainings || {};
  const workout = location.state?.workout || {};

  const stateData = useMemo(() => {
    let exercises = [];
    let taskId = null;
    let userTrainingWorkoutId = null;
    let taskName = null;

    if (training?.workouts && training.workouts.length > 0) {
      const selectedWorkout = workout?._id
        ? training.workouts.find(
            (w) => w.workout?._id === workout._id || w._id === workout._id
          )
        : training.workouts[0];
      if (selectedWorkout?.exercises) {
        exercises = selectedWorkout.exercises;
        taskId = selectedWorkout.task_id;
        userTrainingWorkoutId = selectedWorkout.user_training_workout_id;
        taskName = selectedWorkout.workout?.name || training.training_id?.name;
      }
    } else if (workData?.userTrainingExercise?.length > 0) {
      exercises = workData.userTrainingExercise;
      taskId = workData.task_id;
      userTrainingWorkoutId = workData.user_training_workout_id;
      taskName = workData.task_name;
    } else if (workout?.exercises?.length > 0) {
      exercises = workout.exercises;
      taskId = workout.task_id;
      userTrainingWorkoutId = workout.user_training_workout_id;
      taskName = workout.name;
    } else if (workData?.exercises?.length > 0) {
      exercises = workData.exercises;
      taskId = workData.task_id;
      userTrainingWorkoutId = workData.user_training_workout_id;
      taskName = workData.task_name || workData.name;
    }

    return { exercises, taskId, userTrainingWorkoutId, taskName };
    // location.state is frozen at navigation time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    exercises: allExercisesFromState,
    taskId,
    userTrainingWorkoutId,
    taskName,
  } = stateData;

  const [liveExercises, setLiveExercises] = useState(null);
  const fetchedRef = useRef(false);
  const [lastWorkoutData, setLastWorkoutData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invalidSlots, setInvalidSlots] = useState([]);

  useEffect(() => {
    if (fetchedRef.current || !taskId) return;
    fetchedRef.current = true;

    const fetchFresh = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
        if (!user?._id) return;

        const taskRes = await axios.get(`${base_url}/get-user-task/${user._id}`);
        const matchedTask = taskRes.data.data?.find((t) => t._id === taskId);
        if (!matchedTask) return;

        const [workoutRes, trainingRes] = await Promise.all([
          axios.post(`${base_url}/get-user-workout-task`, {
            userId: user._id,
            workoutId: matchedTask.workout_id,
            taskId: matchedTask._id,
          }),
          axios.get(`${base_url}/get-training-by-user-id/${user._id}`),
        ]);

        const workoutExercises = workoutRes.data.data?.userTrainingExercise;
        if (!Array.isArray(workoutExercises) || workoutExercises.length === 0) {
          return;
        }

        const getExId = (ex) =>
          typeof ex?.exercise_id === "object"
            ? ex.exercise_id?._id
            : ex?.exercise_id || ex?._id;

        const allTrainings = trainingRes.data.data || [];
        let planExercises = null;
        for (const t of allTrainings) {
          const mw = t.workouts?.find(
            (w) =>
              w.workout?._id === matchedTask.workout_id ||
              w._id === matchedTask.workout_id
          );
          if (Array.isArray(mw?.exercises) && mw.exercises.length > 0) {
            planExercises = mw.exercises;
            break;
          }
        }

        if (planExercises) {
          const merged = workoutExercises.map((wEx) => {
            const wId = getExId(wEx);
            const planEx = planExercises.find((p) => getExId(p) === wId);
            if (!planEx) return wEx;
            return {
              ...wEx,
              sets: planEx.sets ?? wEx.sets,
              reps: planEx.reps ?? wEx.reps,
              manipulation: planEx.manipulation ?? wEx.manipulation,
            };
          });
          setLiveExercises(merged);
        } else {
          setLiveExercises(workoutExercises);
        }
      } catch (err) {
        console.error("StartTraining: failed to fetch fresh exercises:", err);
      }
    };

    fetchFresh();
  }, [taskId]);

  const exercisesToUse = useMemo(() => {
    const source = liveExercises ?? allExercisesFromState;
    return source.length > 0 ? normalizeExercises(source) : [];
  }, [liveExercises, allExercisesFromState]);

  const finalWorkData = {
    ...workData,
    task_id: taskId || workData.task_id,
    user_training_workout_id:
      userTrainingWorkoutId || workData.user_training_workout_id,
    task_name: taskName || workData.task_name,
    userTrainingExercise: exercisesToUse,
  };

  const {
    exerciseData,
    draftStatus,
    updateExerciseSlot,
    saveDraftNow,
    clearDraft,
  } = useTaskExerciseDraft({
    userTrainingWorkoutId: finalWorkData.user_training_workout_id,
    taskId: finalWorkData.task_id,
    exercises: exercisesToUse,
    getExerciseLibraryId,
    enabled: exercisesToUse.length > 0,
  });

  const filledCount = countFilledExercises(exercisesToUse, exerciseData);
  const totalExercises = exercisesToUse.length;
  const canCompleteTask =
    totalExercises > 0 &&
    validateTaskCompletion(exercisesToUse, exerciseData).valid;

  const handleInputChange = useCallback(
    (slotIndex, value) => {
      const exercise = exercisesToUse[slotIndex];
      updateExerciseSlot(slotIndex, value, exercise);
      setInvalidSlots((prev) => prev.filter((i) => i !== slotIndex));
    },
    [exercisesToUse, updateExerciseSlot]
  );

  // Prefetch last-workout data for all exercises (stable ids)
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const userId = userDetails?._id;
    if (!userId || exercisesToUse.length === 0) return;

    let cancelled = false;

    const fetchAll = async () => {
      const results = await Promise.all(
        exercisesToUse.map(async (selectedExercise, slotIndex) => {
          const exerciseId = getExerciseLibraryId(selectedExercise);
          if (!exerciseId) {
            return [
              String(slotIndex),
              {
                sets_done: 0,
                reps_done: 0,
                last_set_weight: 0,
                manipulation: selectedExercise?.manipulation || "",
              },
            ];
          }

          try {
            const response = await axios.post(
              `${base_url}/get-last-workout-excercisedata`,
              { user_id: userId, exercise_id: exerciseId }
            );
            const responseData = response?.data?.data || response?.data || {};
            return [
              String(slotIndex),
              {
                sets_done: Number(responseData?.sets_done) || 0,
                reps_done: Number(responseData?.reps_done) || 0,
                last_set_weight: Number(responseData?.last_set_weight) || 0,
                manipulation:
                  responseData?.manipulation ||
                  selectedExercise?.manipulation ||
                  "",
              },
            ];
          } catch {
            return [
              String(slotIndex),
              {
                sets_done: 0,
                reps_done: 0,
                last_set_weight: 0,
                manipulation: selectedExercise?.manipulation || "",
              },
            ];
          }
        })
      );

      if (cancelled) return;
      setLastWorkoutData(Object.fromEntries(results));
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [exercisesToUse]);

  const handleFinish = async () => {
    if (!finalWorkData?.user_training_workout_id) {
      toast.error(UI_TEXT.missingWorkoutInfo);
      return;
    }

    const validation = validateTaskCompletion(exercisesToUse, exerciseData);
    if (!validation.valid) {
      setInvalidSlots(validation.invalidSlots);
      toast.error(validation.errors[0] || UI_TEXT.completeAllExercises);
      const firstInvalid = validation.invalidSlots[0];
      if (firstInvalid != null) {
        document
          .getElementById(`exercise-card-${firstInvalid}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Keep draft — do not clear
      saveDraftNow();
      return;
    }

    const exerciseDataArray = buildExercisePayload(
      exercisesToUse,
      exerciseData,
      getExerciseLibraryId
    );

    if (!exerciseDataArray.length) {
      toast.error(UI_TEXT.completeAtLeastOneExercise);
      return;
    }

    const payload = {
      ...(finalWorkData.task_id && { task_id: finalWorkData.task_id }),
      user_training_workout_id: finalWorkData.user_training_workout_id,
      excerciseData: exerciseDataArray,
    };

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${base_url}/complete-workout-task`,
        payload
      );

      if (response.status === 200) {
        clearDraft();
        toast.success(UI_TEXT.workoutCompleted);
        navigate("/");
      }
    } catch (error) {
      console.error("Error completing workout:", error);
      // Preserve draft on failure
      saveDraftNow();
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        UI_TEXT.workoutCompleteFailed;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <CommonContainer>
        {/* Header */}
        <div className="w-full mb-6 sm:mb-8" dir="rtl">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7994CB] hover:text-[#6a84bb] self-start"
            >
              <span aria-hidden>→</span>
              חזרה לדשבורד
            </button>
            <div className="self-start sm:self-auto">
              <TaskProgressSummary
                filledCount={filledCount}
                totalCount={totalExercises}
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2533] text-center">
            {finalWorkData?.task_name || taskName || "אימון"}
          </h1>
          <p className="text-sm sm:text-base text-[#7F7F7F] text-center mt-2 max-w-2xl mx-auto">
            מלאו את הביצוע לכל תרגיל והשלימו את האימון
          </p>
        </div>

        {/* Exercises */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {exercisesToUse.map((exercise, index) => {
            const prevIsSuperset =
              index > 0 &&
              isSupersetManipulation(exercisesToUse[index - 1]?.manipulation);

            return (
              <div
                key={`${getExerciseLibraryId(exercise) || "ex"}-${index}`}
                id={`exercise-card-${index}`}
              >
                <ExerciseFormCard
                  exercise={exercise}
                  slotIndex={index}
                  value={exerciseData[String(index)]}
                  lastWorkoutEntry={lastWorkoutData[String(index)]}
                  onChange={handleInputChange}
                  showError={invalidSlots.includes(index)}
                  isPairedSupersetChild={prevIsSuperset}
                  isComplete={hasRequiredExerciseInput(
                    exerciseData[String(index)]
                  )}
                />
              </div>
            );
          })}
        </div>

        {totalExercises > 0 && (
          <TaskActionBar
            onComplete={handleFinish}
            isSubmitting={isSubmitting}
            disabled={!canCompleteTask}
            draftStatus={draftStatus}
          />
        )}
      </CommonContainer>
    </div>
  );
};

export default StartTraining;
