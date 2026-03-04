import React from "react";

const LastExercise = ({ currentExercise }) => {
  // last time data – try done fields first, then planned, so it's user-specific
  const sets =
    currentExercise?.sets_done ?? currentExercise?.sets ?? "-";
  const reps =
    currentExercise?.reps_done ?? currentExercise?.reps ?? "-";
  const weight =
    currentExercise?.last_set_weight ?? currentExercise?.lastSet ?? "-";
  const manipulation = currentExercise?.manipulation ?? "-";

  return (
    <div className="sm:w-96 w-full">
      <p
        className="text-[#0A2533] text-xl font-bold text-center mb-10 md:pr-10 pr-4"
        dir="rtl"
      >
        מה עשית פעם שעברה
      </p>
      <div
        className="sm:w-96 w-full flex flex-col gap-4 items-start bg-white shadow-md rounded-xl p-2 md:p-6"
        dir="rtl"
      >
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
