import React from "react";
import { twMerge } from "tailwind-merge";

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  placeholder = "ציוד",
  className = "",
}) => {
  return (
    <select
      dir="rtl"
      className={twMerge(
        `px-3 py-3 bg-white shadow-md placeholder:text-[#2A2F3B] rounded-xl w-full md:w-56`,
        className
      )}
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
    >
      <option
        className="text-[#2A2F3B] text-sm placeholder:text-[#2A2F3B]"
        value=""
        disabled
      >
        {placeholder}
      </option>
      {options?.map((option) => (
        <option key={option.id || option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
