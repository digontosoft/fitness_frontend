import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";

const ExcersizeInput = ({ exerciseData, value, onChange }) => {
  const uid = useId();
  const field = (name) => `${uid}-${name}`;

  const {
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    reset({
      sets_done: value?.sets_done ?? "",
      reps_done: value?.reps_done ?? "",
      lastSet: value?.lastSet ?? "",
    });
  }, [value?.sets_done, value?.reps_done, value?.lastSet, reset]);

  const handleInputChange = (fieldName, val) => {
    onChange({ ...getValues(), [fieldName]: val });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sm:w-96 w-full sm:py-20 py-6 ml-auto" dir="rtl">
      <div className="flex flex-row-reverse text-[#0A2533] text-xl font-bold justify-between items-center">
        <p className="sm:ml-[48px] ml-[10px]">סט אחרון</p>
        <p className="sm:mr-[28px] mr-[10px]">יעד</p>
      </div>
      <div className="sm:w-96 w-full bg-white shadow-md rounded-2xl p-2 md:p-6 flex border-[1px] border-gray-100 mt-4 ml-auto">
        <form className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between w-full gap-2">
            <p className="text-base font-bold text-[#000000] flex-1 text-right">
              סטים: {exerciseData?.sets}
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor={field("sets_done")}
                className="px-1 absolute text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[35%]"
              >
                סטים
              </label>
              <input
                id={field("sets_done")}
                type="number"
                className={`border w-24 sm:w-28 md:w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7994CB] focus:border-[#7994CB] ${errors.sets_done ? "border-[#7994CB]" : ""}`}
                {...register("sets_done", {
                  required: "Exercise name is required",
                  onChange: (e) =>
                    handleInputChange("sets_done", e.target.value),
                })}
              />
              {errors.sets_done && (
                <p className="text-xs text-[#7994CB] mt-1">
                  {errors.sets_done.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-2">
            <p className="text-base font-bold text-[#000000] flex-1 text-right">
              חזרות: {exerciseData?.reps}
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor={field("reps_done")}
                className="absolute px-1 text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[30%]"
              >
                חזרות
              </label>
              <input
                id={field("reps_done")}
                type="number"
                className={`border w-24 sm:w-28 md:w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7994CB] focus:border-[#7994CB] ${errors.reps_done ? "border-[#7994CB]" : ""}`}
                {...register("reps_done", {
                  required: "reps_done reps are required",
                  onChange: (e) =>
                    handleInputChange("reps_done", e.target.value),
                })}
              />
              {errors.reps_done && (
                <p className="text-xs text-[#7994CB] mt-1">
                  {errors.reps_done.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-2">
            <p className="text-base font-bold text-[#000000] flex-1 text-right">
              מניפולציה: {exerciseData?.manipulation}
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor={field("manipulation")}
                className=" absolute px-1 text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[30%]"
              >
                משקל
              </label>
              <input
                id={field("lastSet")}
                type="text"
                className={`border w-24 sm:w-28 md:w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7994CB] focus:border-[#7994CB] ${errors.lastSet ? "border-[#7994CB]" : ""}`}
                {...register("lastSet", {
                  required: "Last set value is required",
                  onChange: (e) => handleInputChange("lastSet", e.target.value),
                })}
              />
              {errors.lastSet && (
                <p className="text-xs text-[#7994CB] mt-1">
                  {errors.lastSet.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExcersizeInput;
