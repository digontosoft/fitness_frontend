import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

const FInput = ({ label, name, placeholder, type = "text" }) => {
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
            <Input
              {...field}
              type={type}
              id={name}
              className={`w-full h-[56px] p-4 gap-4 rounded-[16px] border-[2px] ${
                error ? "border-red-500" : "border-opacity-0"
              } focus:outline-none focus:ring-2 focus:ring-gray-400`}
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

export default FInput;
