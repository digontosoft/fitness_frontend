import React from "react";
import { twMerge } from "tailwind-merge";

const Title = ({ title, className }) => {
  return (
    <div
      className={`w-full flex justify-center items-center py-10 ${twMerge(
        className
      )}`}
    >
      <span className="text-4xl font-bold leading-[46.8px] text-center text-textColor">
        {title}
      </span>
    </div>
  );
};

export default Title;
