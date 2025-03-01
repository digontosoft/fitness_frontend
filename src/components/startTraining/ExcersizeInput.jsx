import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

const ExcersizeInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-96 py-20" dir="rtl">
      <div className="flex text-[#0A2533] text-xl font-bold justify-between items-center">
        <p>סט אחרון:</p>
        <p>יעד:</p>
      </div>
      <div className="w-96 bg-white shadow-md rounded-2xl p-2 md:p-6 flex justify-between border-[1px] border-gray-100 mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Input 1 */}
          <div className="flex justify-between  w-80">
            <p className="text-xs font-bold text-[#000000] flex">
              סטים:
              <span className="text-xs font-normal">4</span>
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor="exerciseName"
                className="px-1 absolute text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[35%]"
              >
                סטים
              </label>
              <input
                id="exerciseName"
                type="text"
                className="border w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD4753] focus:border-[#FD4753]"
                {...register("exerciseName", {
                  required: "Exercise name is required",
                })}
              />
              {errors.exerciseName && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.exerciseName.message}
                </p>
              )}
            </div>
          </div>

          {/* Input 2 */}
          <div className="flex justify-between  w-80">
            <p className="text-xs font-bold text-[#000000] flex">
              חזרות:
              <span className="text-xs font-normal">15</span>
            </p>
            <div className="flex flex-col relative">
              <label
                htmlFor="target"
                className="absolute px-1 text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[30%]"
              >
                חזרות
              </label>
              <input
                id="target"
                type="text"
                className="border w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD4753] focus:border-[#FD4753]"
                {...register("target", {
                  required: "Target reps are required",
                })}
              />
              {errors.target && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.target.message}
                </p>
              )}
            </div>
          </div>

          {/* Input 3 */}
          <div className="flex justify-between  w-80">
            <p className="text-xs font-bold text-[#000000] flex">משקל (ק׳׳ג)</p>
            <div className="flex flex-col relative">
              <label
                htmlFor="lastSet"
                className=" absolute px-1 text-sm font-medium text-[#7F7F7F]  bg-white -top-2.5 left-[30%]"
              >
                משקל
              </label>
              <input
                id="lastSet"
                type="text"
                className="border w-32 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD4753] focus:border-[#FD4753]"
                {...register("lastSet", {
                  required: "Last set value is required",
                })}
              />
              {errors.lastSet && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.lastSet.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
        </form>
      </div>

      <div className="flex gap-2 flex-row-reverse md:gap-6 mt-20 justify-center items-center">
        <Button className="bg-gradient-to-tr from-red-800 to-red-600 text-white font-bold text-xs px-8 md:px-10 rounded-full">
          סיים אימון
        </Button>
        <Button className="bg-[#15151573] text-white font-bold text-xs px-6 md:px-8 rounded-full">
          לתרגיל הקודם
        </Button>
      </div>
    </div>
  );
};

export default ExcersizeInput;
