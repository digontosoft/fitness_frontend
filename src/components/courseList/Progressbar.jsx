import React from "react";
import { Vector } from "@/assets";
const Progressbar = ({ label, percentage }) => {
  return (
    <div className="overflow-hidden w-full  py-3 ">
      <p className="text-xs text-[#000000] font-bold " dir="rtl">
        {label}
      </p>
      <div className="w-full h-3 bg-gray-100 rounded-md mt-2 relative border-[1px] border-gray-400">
        <div
          className="h-full bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] rounded-md"
          style={{ width: `${percentage}%` }}
        ></div>
        <div
          className="absolute -top-3 border-[1px] border-red-700  left-[calc(100%_*_0.8)] transform -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
          style={{ left: `${percentage}%` }}
        >
          <img src={Vector} alt="Progress Indicator" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Progressbar;
