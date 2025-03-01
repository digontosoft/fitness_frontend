import React from "react";
import { Calories, Biceps } from "@/assets";
const Subtitle = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <p className="text-[#97A2B0] text-xs">180 קל׳</p>
        <img src={Calories} alt="calories" />
      </div>
      <span className="text-xl font-bold text-[#97A2B0] flex justify-center items-center px-1">
        .
      </span>
      <div className="flex justify-center items-center">
        <p className="text-[#97A2B0] text-xs">20 דקות</p>
        <img src={Biceps} alt="calories" />
      </div>
    </div>
  );
};

export default Subtitle;
