import React from "react";

const SuperTitle = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-center text-[#0A2533] py-20">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-sm font-normal w-2/4" dir="rtl">
        {description}
      </p>
    </div>
  );
};

export default SuperTitle;
