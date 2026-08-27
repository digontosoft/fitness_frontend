import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";

/** Allow typing decimals; normalize to 2 places on blur. */
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
      sets_done: value?.sets_done ?? "",
      reps_done:
        value?.reps_done === "" || value?.reps_done == null
          ? ""
          : formatFloat2(value.reps_done) || value.reps_done,
      last_set_weight:
        value?.last_set_weight === "" || value?.last_set_weight == null
          ? ""
          : formatFloat2(value.last_set_weight) || value.last_set_weight,
    });
  }, [value?.sets_done, value?.reps_done, value?.last_set_weight, reset]);

  const emitChange = (fieldName, val) => {
    onChange({ ...getValues(), [fieldName]: val });
  };

  const handleInputChange = (fieldName, val) => {
    emitChange(fieldName, val);
  };

  const handleFloatBlur = (fieldName, raw) => {
    const formatted = formatFloat2(raw);
    setValue(fieldName, formatted);
    emitChange(fieldName, formatted);
  };

  useEffect(() => {
    if (scrollOnMount) window.scrollTo(0, 0);
  }, [scrollOnMount]);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#0A2533] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7994CB] focus:border-[#7994CB] bg-white text-right";

  // Client order: Weight → Reps → Sets
  const rows = [
    {
      label: "משקל",
      name: "last_set_weight",
      placeholder: "0.00",
      target: exerciseData?.manipulation || "—",
      isFloat: true,
    },
    {
      label: "חזרות",
      name: "reps_done",
      placeholder: "0.00",
      target: `${exerciseData?.reps ?? 0} חזרות`,
      isFloat: true,
    },
    {
      label: "סטים",
      name: "sets_done",
      placeholder: "הזן סטים",
      target: `${exerciseData?.sets ?? 0} סטים`,
      isFloat: false,
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
              <input
                id={field(row.name)}
                type="number"
                min="0"
                step={row.isFloat ? "0.01" : "1"}
                inputMode={row.isFloat ? "decimal" : "numeric"}
                placeholder={row.placeholder}
                className={inputClass}
                {...register(row.name, {
                  onChange: (e) =>
                    handleInputChange(row.name, e.target.value),
                  onBlur: row.isFloat
                    ? (e) => handleFloatBlur(row.name, e.target.value)
                    : undefined,
                })}
              />
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
