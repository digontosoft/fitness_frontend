import { Controller, useFormContext } from "react-hook-form";

const FTextarea = ({ label, name, placeholder, rows = 4 }) => {
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
            <textarea
              {...field}
              id={name}
              rows={rows}
              className={`w-full p-4 rounded-[16px] border-[2px] resize-none ${
                error ? "border-[#7994CB]" : "border-opacity-0"
              } focus:outline-none focus:ring-2 focus:ring-[#7994CB]`}
              placeholder={placeholder}
            />
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

export default FTextarea;


