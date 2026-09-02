const formatNotesDisplay = (val, fallback) => {
  const candidates = [val, fallback];
  for (const candidate of candidates) {
    const text = String(candidate ?? "").trim();
    if (text && text.toLowerCase() !== "superset") return text;
  }
  return "—";
};

const LastExercise = ({
  exerciseData = {},
  slotIndex,
  pairFirstSlotIndex,
  compact = false,
  planNotes = "",
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
  const setsDone = hasPrev ? sessionInput.sets_done ?? 0 : 0;
  const reps = hasPrev ? sessionInput.reps_done ?? 0 : 0;
  const weightRaw = hasPrev
    ? sessionInput.lastSet ?? sessionInput.last_set_weight
    : 0;
  const weight =
    weightRaw === "" || weightRaw === undefined || weightRaw === null
      ? 0
      : weightRaw;
  const notesDisplay = formatNotesDisplay(sessionInput?.manipulation, planNotes);

  const cellClass = `text-[#0A2533] text-right ${
    compact ? "text-sm" : "text-base"
  }`;

  return (
    <div className="w-full" dir="rtl">
      <div className="rounded-xl bg-[#F3F5F9] border border-gray-200 p-4">
        <p className="text-[#0A2533] text-base font-bold mb-3 text-right">
          מה עשית פעם שעברה
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <p className={cellClass}>
            <span className="font-bold">{weight}</span> ק״ג משקל
          </p>
          <p className={cellClass}>
            <span className="font-bold">{setsDone}</span> סטים
          </p>
          <p className={cellClass}>
            <span className="font-bold">{reps}</span> חזרות
          </p>
          <p className={cellClass}>
            הערות: <span className="font-bold">{notesDisplay}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastExercise;
