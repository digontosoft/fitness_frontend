import {
    clearTaskDraft,
    getTaskDraftKey,
    loadTaskDraft,
    mergeDraftWithExercises,
    saveTaskDraft,
} from "@/utils/taskDraftStorage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const AUTOSAVE_MS = 700;

/**
 * Local persistent draft for workout task completion.
 * Keys slots by index; stores exercise_id for safe restore when list changes.
 */
export function useTaskExerciseDraft({
  userTrainingWorkoutId,
  taskId,
  exercises,
  getExerciseLibraryId,
  enabled = true,
}) {
  const draftKey = useMemo(
    () => getTaskDraftKey(userTrainingWorkoutId, taskId),
    [userTrainingWorkoutId, taskId]
  );

  const [exerciseData, setExerciseData] = useState({});
  const [draftStatus, setDraftStatus] = useState("idle"); // idle | saving | saved
  const [hydrated, setHydrated] = useState(false);

  const exerciseDataRef = useRef(exerciseData);
  exerciseDataRef.current = exerciseData;

  const saveTimerRef = useRef(null);
  const hydratedForKeyRef = useRef(null);

  // Hydrate once exercises are available
  useEffect(() => {
    if (!enabled || !draftKey || !exercises?.length) return;
    if (hydratedForKeyRef.current === draftKey) return;

    const draft = loadTaskDraft(draftKey);
    const restored = mergeDraftWithExercises(
      draft,
      exercises,
      getExerciseLibraryId
    );

    if (Object.keys(restored).length > 0) {
      setExerciseData(restored);
      setDraftStatus("saved");
    }

    hydratedForKeyRef.current = draftKey;
    setHydrated(true);
  }, [enabled, draftKey, exercises, getExerciseLibraryId]);

  const persistNow = useCallback(
    (data = exerciseDataRef.current) => {
      if (!draftKey) return false;

      const exercisesBySlot = {};
      Object.entries(data || {}).forEach(([slotKey, value]) => {
        if (!value) return;
        const hasAny =
          value.sets_done ||
          value.reps_done ||
          value.last_set_weight ||
          value.user_notes ||
          value.manipulation;
        if (!hasAny) return;
        exercisesBySlot[slotKey] = value;
      });

      if (Object.keys(exercisesBySlot).length === 0) {
        clearTaskDraft(draftKey);
        setDraftStatus("idle");
        return true;
      }

      const ok = saveTaskDraft(draftKey, {
        draftKey,
        taskId: taskId || null,
        user_training_workout_id: userTrainingWorkoutId || null,
        exercisesBySlot,
      });
      setDraftStatus(ok ? "saved" : "idle");
      return ok;
    },
    [draftKey, taskId, userTrainingWorkoutId]
  );

  const schedulePersist = useCallback(
    (nextData) => {
      if (!draftKey) return;
      setDraftStatus("saving");
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        persistNow(nextData);
      }, AUTOSAVE_MS);
    },
    [draftKey, persistNow]
  );

  // Flush pending draft on unmount / page hide
  useEffect(() => {
    const flush = () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
      if (hydratedForKeyRef.current) {
        persistNow();
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      flush();
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [persistNow]);

  const updateExerciseSlot = useCallback(
    (slotIndex, value, exercise) => {
      const storageKey = String(slotIndex);
      const exerciseId = getExerciseLibraryId(exercise);

      setExerciseData((prev) => {
        const next = {
          ...prev,
          [storageKey]: {
            ...prev[storageKey],
            ...value,
            exercise_id: exerciseId,
            target_sets: exercise?.sets || 0,
            target_reps: exercise?.reps || 0,
            manipulation:
              value?.manipulation ??
              prev[storageKey]?.manipulation ??
              exercise?.manipulation ??
              "",
          },
        };
        schedulePersist(next);
        return next;
      });
    },
    [getExerciseLibraryId, schedulePersist]
  );

  const saveDraftNow = useCallback(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    return persistNow();
  }, [persistNow]);

  const clearDraft = useCallback(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    clearTaskDraft(draftKey);
    setExerciseData({});
    setDraftStatus("idle");
  }, [draftKey]);

  return {
    exerciseData,
    draftStatus,
    hydrated,
    updateExerciseSlot,
    saveDraftNow,
    clearDraft,
    draftKey,
  };
}
