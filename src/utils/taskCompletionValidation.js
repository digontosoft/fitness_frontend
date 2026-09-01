/**
 * Shared task-completion validation (reps / weight + superset rule).
 * Keep API field names: reps_done, last_set_weight, manipulation.
 */

export const hasRequiredExerciseInput = (entry) => {
  const weight = String(entry?.last_set_weight ?? "").trim();
  const reps = String(entry?.reps_done ?? "").trim();
  return Boolean(weight && reps);
};

export const isSupersetManipulation = (manipulation) =>
  String(manipulation || "").toLowerCase() === "superset";

/**
 * Returns indices that fail validation.
 * Superset at i requires slot i and i+1 both filled.
 */
export const validateTaskCompletion = (exercises, exerciseDataBySlot) => {
  const errors = [];
  const invalidSlots = new Set();

  if (!Array.isArray(exercises) || exercises.length === 0) {
    return {
      valid: false,
      errors: ["אין תרגילים במשימה"],
      invalidSlots: [],
    };
  }

  for (let i = 0; i < exercises.length; i++) {
    const slotKey = String(i);
    const entry = exerciseDataBySlot[slotKey];
    const manipulation = entry?.manipulation ?? exercises[i]?.manipulation;

    if (!hasRequiredExerciseInput(entry)) {
      invalidSlots.add(i);
      errors.push(`תרגיל ${i + 1}: יש למלא חזרות ומשקל`);
    }

    if (isSupersetManipulation(manipulation)) {
      const nextIndex = i + 1;
      if (nextIndex >= exercises.length) {
        invalidSlots.add(i);
        errors.push(`תרגיל ${i + 1}: סופרסט דורש תרגיל משויך`);
      } else {
        const nextEntry = exerciseDataBySlot[String(nextIndex)];
        if (!hasRequiredExerciseInput(nextEntry)) {
          invalidSlots.add(nextIndex);
          errors.push(
            `תרגיל ${i + 1} (סופרסט): יש למלא גם את התרגיל המשויך (${nextIndex + 1})`
          );
        }
      }
    }
  }

  return {
    valid: invalidSlots.size === 0,
    errors,
    invalidSlots: [...invalidSlots],
  };
};

export const countFilledExercises = (exercises, exerciseDataBySlot) => {
  if (!Array.isArray(exercises)) return 0;
  return exercises.reduce((acc, _, i) => {
    return acc + (hasRequiredExerciseInput(exerciseDataBySlot[String(i)]) ? 1 : 0);
  }, 0);
};

/**
 * Build complete-workout-task payload entries (same API shape).
 */
export const buildExercisePayload = (exercises, exerciseDataBySlot, getExerciseLibraryId) => {
  return exercises
    .map((exercise, idx) => {
      const exerciseId = getExerciseLibraryId(exercise);
      const value = exerciseDataBySlot[String(idx)];
      if (!exerciseId || !value) return null;

      return {
        exercise_id: exerciseId,
        sets_done: Number(value.sets_done) || 0,
        reps_done: Number(value.reps_done) || 0,
        last_set_weight: String(value.last_set_weight ?? "").trim(),
      };
    })
    .filter(Boolean);
};
