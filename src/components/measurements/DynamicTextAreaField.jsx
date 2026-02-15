import React from "react";
import { twMerge } from "tailwind-merge";

const DynamicTextAreaField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  errors,
  watch,
  className,
  defaultValue,
  disabled,
}) => {
  const value = typeof watch === "function" ? watch(id) : null;
  return (
    <div className="relative w-full mb-6">
      {/* Label */}
      <label
        htmlFor={id}
        className="absolute -top-3 right-4 px-2 text-gray-600 text-sm z-10 bg-white"
      >
        {label}
      </label>

      {/* Input Field */}
      <div className="relative">
        <textarea
          type={type}
          id={id}
          defaultValue={defaultValue}
          {...register(id, validation)}
          placeholder={placeholder}
          className={twMerge`w-full border ${
            errors[id] ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 text-right focus:outline-none focus:ring-2 ${
            errors[id] ? "focus:ring-red-500" : "focus:ring-blue-500"
          } ${className}`}
          disabled={disabled}
        />
        <span
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
            value ? "text-green-500" : "text-gray-400"
          }`}
        >
          &#10003;
        </span>
      </div>
      {errors[id] && (
        <p className="text-[#7994CB] text-sm mt-1">{errors[id].message}</p>
      )}
    </div>
  );
};

export default DynamicTextAreaField;
