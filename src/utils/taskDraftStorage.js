const DRAFT_PREFIX = "task_workout_draft:";

export const getTaskDraftKey = (userTrainingWorkoutId, taskId) => {
  const id = userTrainingWorkoutId || taskId;
  return id ? `${DRAFT_PREFIX}${id}` : null;
};

export const loadTaskDraft = (draftKey) => {
  if (!draftKey) return null;
  try {
    const raw = localStorage.getItem(draftKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
};

export const saveTaskDraft = (draftKey, draft) => {
  if (!draftKey || !draft) return false;
  try {
    localStorage.setItem(
      draftKey,
      JSON.stringify({
        ...draft,
        updatedAt: new Date().toISOString(),
      })
    );
    return true;
  } catch (err) {
    console.error("Failed to save task draft:", err);
    return false;
  }
};

export const clearTaskDraft = (draftKey) => {
  if (!draftKey) return;
  try {
    localStorage.removeItem(draftKey);
  } catch (err) {
    console.error("Failed to clear task draft:", err);
  }
};

/**
 * Restore draft entries that still match the current exercise list by
 * exercise library id at each slot. Drop removed/changed slots.
 */
export const mergeDraftWithExercises = (draft, exercises, getExerciseLibraryId) => {
  if (!draft?.exercisesBySlot || !Array.isArray(exercises)) return {};

  const restored = {};
  exercises.forEach((ex, index) => {
    const slotKey = String(index);
    const exerciseId = getExerciseLibraryId(ex);
    const entry = draft.exercisesBySlot[slotKey];
    if (!entry || !exerciseId) return;
    if (entry.exercise_id && entry.exercise_id !== exerciseId) return;

    restored[slotKey] = {
      ...entry,
      exercise_id: exerciseId,
      manipulation: entry.manipulation ?? ex.manipulation ?? "",
      target_sets: ex.sets || 0,
      target_reps: ex.reps || 0,
    };
  });

  return restored;
};
