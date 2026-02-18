import React from "react";
import { GoSearch } from "react-icons/go";

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  containerClass = "",
  inputClass = "",
  iconClass = "",
}) => {
  return (
    <div
      className={`flex justify-between items-center relative ${containerClass}`}
      dir="rtl"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-gray-200 bg-white shadow-xl py-3 px-2 rounded-xl text-sm w-full md:w-56 ${inputClass}`}
      />
      <div
        className={`absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2 ${iconClass}`}
      >
        <GoSearch className="text-white" />
      </div>
    </div>
  );
};

export default SearchBox;
