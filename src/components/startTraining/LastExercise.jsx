const LastExercise = ({
  exerciseData = {},
  slotIndex,
  pairFirstSlotIndex,
  compact = false,
  notes,
}) => {
  const sessionInput = (() => {
    const currentSlotInput = exerciseData[String(slotIndex)];
    if (currentSlotInput != null) return currentSlotInput;
    if (pairFirstSlotIndex != null && pairFirstSlotIndex >= 0) {
      return exerciseData[String(pairFirstSlotIndex)];
    }
    if (slotIndex > 0) return exerciseData[String(slotIndex - 1)];
    return undefined;
  })();

  const hasPrev = sessionInput != null;
  const sets = hasPrev ? sessionInput.sets_done ?? sessionInput.sets ?? 0 : 0;
  const reps = hasPrev ? sessionInput.reps_done ?? sessionInput.reps ?? 0 : 0;
  const weightRaw = hasPrev
    ? sessionInput.lastSet ?? sessionInput.last_set_weight
    : 0;
  const weight =
    weightRaw === "" || weightRaw === undefined || weightRaw === null
      ? 0
      : weightRaw;

  // הערות: exercise notes (manipulation field) — shown only in this upper section
  const notesText =
    notes ||
    (hasPrev ? sessionInput.manipulation : null) ||
    "—";

  return (
    <div className="w-full" dir="rtl">
      <div className="rounded-xl bg-[#F3F5F9] border border-gray-200 p-4">
        <p className="text-[#0A2533] text-base font-bold mb-3">
          מה עשית פעם שעברה
        </p>
        <div className={`space-y-1.5 ${compact ? "text-sm" : "text-base"}`}>
          <p className="text-[#0A2533]">
            <span className="font-bold">{weight}</span> ק״ג משקל
          </p>
          <p className="text-[#0A2533]">
            <span className="font-bold">{reps}</span> חזרות שבוצעו
          </p>
          <p className="text-[#0A2533]">
            <span className="font-bold">{sets}</span> סטים שבוצעו
          </p>
          <p className="text-[#0A2533]">
            הערות: <span className="font-bold">{notesText}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastExercise;
