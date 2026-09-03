import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";

const DASH = "—";
const dashClass = "text-[#0A2533] font-bold text-lg leading-none";

/** Reps: keep plain number string — no 0.00 template. */
const toRepsFormValue = (val) => {
  if (val === "" || val == null || val === 0 || val === "0") return "";
  const text = String(val).trim();
  if (!text) return "";
  const n = Number(text);
  if (Number.isNaN(n) || n === 0) return "";
  return String(n);
};

const DashCell = () => (
  <div className={`flex h-[42px] items-center justify-center ${dashClass}`}>
    {DASH}
  </div>
);

const formatPlanNotes = (val) => {
  const text = String(val ?? "").trim();
  if (!text || text.toLowerCase() === "superset") return DASH;
  return text;
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
      reps_done: toRepsFormValue(value?.reps_done),
      last_set_weight:
        value?.last_set_weight == null ? "" : String(value.last_set_weight),
    });
  }, [value?.reps_done, value?.last_set_weight, reset]);

  const emitChange = (fieldName, val) => {
    onChange({ ...getValues(), [fieldName]: val });
  };

  const handleInputChange = (fieldName, val) => {
    emitChange(fieldName, val);
  };

  const handleRepsBlur = (raw) => {
    const next = toRepsFormValue(raw);
    setValue("reps_done", next);
    emitChange("reps_done", next);
  };

  useEffect(() => {
    if (scrollOnMount) window.scrollTo(0, 0);
  }, [scrollOnMount]);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#0A2533] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7994CB] focus:border-[#7994CB] bg-white text-right";

  const planNotes = formatPlanNotes(exerciseData?.manipulation);

  const rows = [
    {
      label: "משקל",
      name: "last_set_weight",
      placeholder: "הזן משקל",
      target: DASH,
      targetIsDash: true,
      inputType: "text",
      inputMode: "text",
    },
    {
      label: "חזרות",
      name: "reps_done",
      placeholder: "הזן חזרות",
      target: `${exerciseData?.reps ?? 0} חזרות`,
      inputType: "number",
      inputMode: "numeric",
      step: "1",
      isReps: true,
    },
    {
      label: "סטים",
      dashMiddle: true,
      target: `${exerciseData?.sets ?? 0} סטים`,
    },
    // {
    //   label: "הערות",
    //   dashMiddle: true,
    //   target: planNotes,
    //   targetIsDash: planNotes === DASH,
    // },
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
              {row.dashMiddle ? (
                <DashCell />
              ) : (
                <input
                  id={field(row.name)}
                  type={row.inputType}
                  {...(row.inputType === "number"
                    ? { min: "0", step: row.step || "1" }
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
            <div
              className={`flex min-h-[42px] items-center justify-center text-center truncate ${
                row.targetIsDash ? dashClass : "text-sm font-bold text-[#0A2533]"
              }`}
            >
              {row.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcersizeInput;
