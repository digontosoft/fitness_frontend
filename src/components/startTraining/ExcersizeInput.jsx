import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";

/** Reps: normalize decimals to 2 places on blur. */
const formatFloat2 = (val) => {
  if (val === "" || val == null) return "";
  const n = Number(val);
  if (Number.isNaN(n)) return "";
  return n.toFixed(2);
};

const ExcersizeInput = ({
  exerciseData,
  value,
  onChange,
  scrollOnMount = true,
  compact = false,
}) => {
  const uid = useId();
  const field = (name) => `${uid}-${name}`;

  const { register, reset, getValues, setValue } = useForm();

  useEffect(() => {
    reset({
      reps_done:
        value?.reps_done === "" || value?.reps_done == null
          ? ""
          : formatFloat2(value.reps_done) || value.reps_done,
      last_set_weight:
        value?.last_set_weight == null ? "" : String(value.last_set_weight),
      user_notes: value?.user_notes == null ? "" : String(value.user_notes),
    });
  }, [value?.reps_done, value?.last_set_weight, value?.user_notes, reset]);

  const emitChange = (fieldName, val) => {
    onChange({ ...getValues(), [fieldName]: val });
  };

  const handleInputChange = (fieldName, val) => {
    emitChange(fieldName, val);
  };

  const handleRepsBlur = (raw) => {
    const formatted = formatFloat2(raw);
    setValue("reps_done", formatted);
    emitChange("reps_done", formatted);
  };

  useEffect(() => {
    if (scrollOnMount) window.scrollTo(0, 0);
  }, [scrollOnMount]);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#0A2533] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7994CB] focus:border-[#7994CB] bg-white text-right";

  const rows = [
    {
      label: "משקל",
      name: "last_set_weight",
      placeholder: "הזן משקל",
      target: "—",
      inputType: "text",
      inputMode: "text",
    },
    {
      label: "חזרות",
      name: "reps_done",
      placeholder: "0.00",
      target: `${exerciseData?.reps ?? 0} חזרות`,
      inputType: "number",
      inputMode: "decimal",
      isReps: true,
    },
    {
      label: "הערות",
      name: "user_notes",
      placeholder: "הזן הערות",
      target: exerciseData?.manipulation || "—",
      inputType: "text",
      inputMode: "text",
    },
    {
      label: "סטים",
      readOnly: true,
      target: `${exerciseData?.sets ?? 0} סטים`,
    },
  ];

  return (
    <div className={`w-full ${compact ? "" : "py-4"}`} dir="rtl">
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-2 bg-[#F3F5F9] px-3 py-2.5 text-sm font-bold text-[#0A2533]">
          <div />
          <div className="text-center">סט אחרון</div>
          <div className="text-center">יעד</div>
        </div>

        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_1.2fr_1fr] gap-2 items-center px-3 py-2.5 border-t border-gray-100"
          >
            <div className="text-sm font-bold text-[#0A2533] text-right">
              {row.label}
            </div>
            <div>
              {row.readOnly ? (
                <div className="h-[42px]" aria-hidden />
              ) : (
                <input
                  id={field(row.name)}
                  type={row.inputType}
                  {...(row.inputType === "number"
                    ? { min: "0", step: "0.01" }
                    : {})}
                  inputMode={row.inputMode}
                  placeholder={row.placeholder}
                  className={inputClass}
                  {...register(row.name, {
                    onChange: (e) =>
                      handleInputChange(row.name, e.target.value),
                    onBlur: row.isReps
                      ? (e) => handleRepsBlur(e.target.value)
                      : undefined,
                  })}
                />
              )}
            </div>
            <div className="text-sm font-bold text-[#0A2533] text-center truncate">
              {row.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcersizeInput;
