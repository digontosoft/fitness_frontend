import React from "react";

const CourseContent = ({ description }) => {
  return (
    <div dir="rtl" className="w-full sm:py-10 py-4">
      <div className="flex flex-col justify-start text-[#0A2533]">
        <h1 className="text-[#0A2533] text-xl font-bold">איך לבצע:</h1>
        <p className="text-sm font-normal pt-2">{description}</p>
      </div>
    </div>
  );
};

export default CourseContent;
