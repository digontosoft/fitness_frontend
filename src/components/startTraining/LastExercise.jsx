import React from "react";

const LastExercise = ({ currentExercise }) => {
  console.log("current excersize", currentExercise);
  return (
    <div className="w-96 ">
      <p className="text-[#0A2533] text-xl font-bold text-start" dir="rtl">
        נתוני תרגיל אחרונים:
      </p>
      <div
        className="w-96 flex flex-row-reverse gap-10 justify-between items-center bg-white shadow-md rounded-xl p-2 md:p-6"
        dir="rtl"
      >
        <div className="flex flex-col gap-2 text-[#000000] text-xs">
          <p className="flex  items-center font-normal">
            <span className="font-bold">חזרות שבוצעו: </span> N/A
          </p>
          <p className="flex  items-center font-normal">
            <span className="font-bold">סטים שבוצעו: </span> N/A
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[#000000] text-xs">
          <p className="flex  items-center font-normal">
            <span className="font-bold">אימון:</span> N/A
          </p>
          <p className="flex  items-center font-normal ">
            <span className="font-bold text-sm pl-1">מניפולציה:</span>
            {currentExercise?.manipulation}
          </p>
          <p className="flex  items-center font-normal">
            <span className="font-bold">משקל שבוצע:</span> N/A
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastExercise;
