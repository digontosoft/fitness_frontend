import { Controller, useFormContext } from "react-hook-form";

/**
 * React-hook-form controlled select input (matches FInput / FRadioInput patterns).
 * options: [{ value: string | number, label: string }]
 */
const FSelectInput = ({ label, name, placeholder = "בחרי", options = [] }) => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-2" dir="rtl">
      <label htmlFor={name} className="text-sm font-normal">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div dir="rtl">
            <select
              id={name}
              {...field}
              className={`w-full h-[56px] px-4 rounded-[16px] border-[2px] bg-white ${
                error ? "border-[#7994CB]" : "border-opacity-0"
              } focus:outline-none focus:ring-2 focus:ring-[#7994CB]`}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={String(opt.value)} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="mt-1 text-sm text-[#7994CB]" dir="rtl">
                {error?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FSelectInput;


