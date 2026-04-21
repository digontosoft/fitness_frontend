
const LastExercise = ({
  exerciseData = {},
  slotIndex,
  pairFirstSlotIndex,
}) => {
  const sessionInput = (() => {
    if (pairFirstSlotIndex != null && pairFirstSlotIndex >= 0) {
      return exerciseData[String(pairFirstSlotIndex)];
    }
    if (slotIndex > 0) {
      return exerciseData[String(slotIndex - 1)];
    }
    return undefined;
  })();

  const hasPrev = sessionInput != null;

  const sets = hasPrev
    ? sessionInput.sets_done ?? sessionInput.sets ?? 0
    : 0;
  const reps = hasPrev
    ? sessionInput.reps_done ?? sessionInput.reps ?? 0
    : 0;
  const weightRaw = hasPrev
    ? sessionInput.lastSet ?? sessionInput.last_set_weight
    : 0;
  const weight =
    weightRaw === "" || weightRaw === undefined || weightRaw === null
      ? 0
      : weightRaw;
  const manipulation = hasPrev ? sessionInput.manipulation ?? 0 : 0;

  return (
    <div className="sm:w-96 w-full ml-auto">
      <p className="text-[#0A2533] text-xl font-bold text-right mb-4" dir="rtl">
        מה עשית פעם שעברה
      </p>
      <div className="sm:w-96 w-full ml-auto flex flex-col gap-4 items-start bg-white shadow-md rounded-xl p-2 md:p-6" dir="rtl">
        <p className="flex text-base items-center font-normal text-[#000000]">
          <span className="font-bold">סטים שבוצעו: {sets}</span>
        </p>
        <p className="flex text-base items-center font-normal text-[#000000]">
          <span className="font-bold">חזרות שבוצעו: {reps}</span>
        </p>
        <p className="flex text-base items-center font-normal text-[#000000]">
          <span className="font-bold">משקל: {weight}</span>
        </p>
        <p className="flex text-base items-center font-normal text-[#000000]">
          <span className="font-bold pl-1">מניפולציה: {manipulation}</span>
        </p>
      </div>
    </div>
  );
};

export default LastExercise;
