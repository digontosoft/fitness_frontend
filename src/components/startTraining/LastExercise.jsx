import React from "react";

const LastExercise = ({ currentExercise }) => {
  return (
    <div className="sm:w-96 w-full">
      <p className="text-[#0A2533] text-xl font-bold text-start" dir="rtl">
        מה עשית פעם שעברה:
      </p>
      <div
        className="sm:w-96 w-full flex flex-row-reverse gap-10 justify-between items-center bg-white shadow-md rounded-xl p-2 md:p-6"
        dir="rtl"
      >
        <div className="flex flex-col gap-2 text-[#000000] text-xs">
          <p className="flex items-center text-base font-normal">
            <span className="font-bold  pl-1">מניפולציה:</span>
            {currentExercise?.manipulation}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[#000000] text-xs">
          <p className="flex text-base items-center font-normal">
            <span className="font-bold">חזרות שבוצעו: </span>{" "}
            {currentExercise?.reps}
          </p>
          <p className="flex text-base items-center font-normal">
            <span className=" font-bold">סטים שבוצעו: </span>{" "}
            {currentExercise?.sets}
          </p>
          <p className="flex text-base items-center font-normal">
            <span className=" font-bold">משקל: </span>{" "}
            {currentExercise?.last_set_weight}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastExercise;
