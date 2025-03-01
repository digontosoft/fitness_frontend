import { Controller, useFormContext } from "react-hook-form";

const FRadioInput = ({ label, name, options }) => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-2" dir="rtl">
      <label className="text-sm font-normal">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    {...field}
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    className="w-4 h-4 accent-gray-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {error && (
              <p className="mt-1 text-sm text-red-500" dir="rtl">
                {error?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FRadioInput;
