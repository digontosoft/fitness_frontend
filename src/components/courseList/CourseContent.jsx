import React from "react";

const CourseContent = ({ description }) => {
  return (
    <div dir="rtl" className="w-full py-10">
      <div className="flex flex-col justify-start text-[#0A2533]">
        <h1 className="text-[#0A2533] text-xl font-bold">תֵאוּר:</h1>
        <p className="text-sm font-normal pt-2">{description}</p>
      </div>
    </div>
  );
};

export default CourseContent;
