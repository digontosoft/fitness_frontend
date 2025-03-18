import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ExcersizeInput = ({
  onNext,
  onPrevious,
  exerciseData,
  isFirst,
  isLast,
  value,
  onChange,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (value) {
      setValue("sets_done", value.sets_done || "");
      setValue("reps_done", value.reps_done || "");
      setValue("lastSet", value.lastSet || "");
    }
  }, [value, setValue]);

  const handleInputChange = (field, val) => {
    onChange({ ...getValues(), [field]: val });
  };
  // console.log("exercise data", exerciseData);
  return (
    <div className="w-96 py-20" dir="rtl">
      <div className="flex flex-row-reverse text-[#0A2533] text-xl font-bold justify-between items-center">
        <p>סט אחרון:</p>
        <p>יעד:</p>
      </div>
      <div className="w-96 bg-white shadow-md rounded-2xl p-2 md:p-6 flex justify-between border-[1px] border-gray-100 mt-4">
        <form className="flex flex-col gap-6">
          {/* Input 1 */}
          <div className="flex justify-between  w-80">
            <p className="text-xs font-bold text-[#000000] flex">
              סטים:
              <span className="text-xs font-normal">{exerciseData?.sets}</span>
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor="sets_done"
                className="px-1 absolute text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[35%]"
              >
                סטים
              </label>
              <input
                id="sets_done"
                type="number"
                className="border w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD4753] focus:border-[#FD4753]"
                {...register("sets_done", {
                  required: "Exercise name is required",
                  onChange: (e) =>
                    handleInputChange("sets_done", e.target.value),
                })}
              />
              {errors.sets_done && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.sets_done.message}
                </p>
              )}
            </div>
          </div>

          {/* Input 2 */}
          <div className="flex justify-between  w-80">
            <p className="text-xs font-bold text-[#000000] flex">
              חזרות:
              <span className="text-xs font-normal">{exerciseData?.reps}</span>
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor="reps_done"
                className="absolute px-1 text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[30%]"
              >
                חזרות
              </label>
              <input
                id="reps_done"
                type="number"
                className="border w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD4753] focus:border-[#FD4753]"
                {...register("reps_done", {
                  required: "reps_done reps are required",
                  onChange: (e) => handleInputChange("reps_done", e.target.value),
                })}
              />
              {errors.reps_done && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.reps_done.message}
                </p>
              )}
            </div>
          </div>

          {/* Input 3 */}
          <div className="flex justify-between  w-80">
            <p className="text-xs font-bold text-[#000000] flex">
              מניפולציה:
              <span className="text-xs font-normal">
                :{exerciseData?.manipulation}
              </span>
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor="lastSet"
                className=" absolute px-1 text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[30%]"
              >
                מניפולציה
              </label>
              <input
                id="lastSet"
                type="text"
                className="border w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD4753] focus:border-[#FD4753]"
                {...register("lastSet", {
                  required: "Last set value is required",
                  onChange: (e) => handleInputChange("lastSet", e.target.value),
                })}
              />
              {errors.lastSet && (
                <p className="text-xs text-red-600 mt-1">
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
