const LastExercise = ({
  exerciseData = {},
  slotIndex,
  pairFirstSlotIndex,
  compact = false,
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
  const setsDone = hasPrev ? sessionInput.sets_done ?? sessionInput.sets ?? 0 : 0;
  const reps = hasPrev ? sessionInput.reps_done ?? sessionInput.reps ?? 0 : 0;
  const weightRaw = hasPrev
    ? sessionInput.lastSet ?? sessionInput.last_set_weight
    : 0;
  const weight =
    weightRaw === "" || weightRaw === undefined || weightRaw === null
      ? 0
      : weightRaw;

  return (
    <div className="w-full" dir="rtl">
      <div className="rounded-xl bg-[#F3F5F9] border border-gray-200 p-4">
        <p className="text-[#0A2533] text-base font-bold mb-3 text-right">
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
            <span className="font-bold">{setsDone}</span> סטים שבוצעו
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastExercise;
