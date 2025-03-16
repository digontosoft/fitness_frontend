import { twMerge } from "tailwind-merge";

function SelectInputField({
  label = "select",
  id,
  placeholder,
  register,
  validation,
  errors,
  watch,
  className,
  defaultValue,
}) {
  return (
    <div className="relative w-full mb-6">
      <label
        htmlFor={id}
        className="absolute -top-3 right-4 px-2 text-gray-600 text-sm z-10 bg-white"
      >
        {label}
      </label>
      <div className="relative">
        <select id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={twMerge`w-full border ${
            errors[id] ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 text-right focus:outline-none focus:ring-2 ${
            errors[id] ? "focus:ring-red-500" : "focus:ring-blue-500"
          } ${className}`}
        />
      </div>
    </div>
  );
}

export default SelectInputField;
