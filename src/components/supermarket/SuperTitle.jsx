import React from "react";
import { twMerge } from "tailwind-merge";

const SuperTitle = ({ title, description, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-5 justify-center items-center text-center text-[#0A2533] py-20",
        className
      )}
    >
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p
        className="text-sm font-normal sm:w-3/4 w-full px-[10%] leading-normal"
        dir="rtl"
      >
        {description}
      </p>
    </div>
  );
};

export default SuperTitle;
