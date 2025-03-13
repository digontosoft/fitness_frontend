import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ExcersizeInput = ({}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("exerciseData"));
    if (storedData) {
      Object.keys(storedData).forEach((key) => setValue(key, storedData[key]));
    }
  }, [setValue]);

  // Save input values to localStorage when clicking next
  const handleNext = () => {
    const formData = getValues();
    localStorage.setItem("exerciseData", JSON.stringify(formData));
    onNext(); // Proceed to the next step
  };

  return (
    <div className="w-96 py-20" dir="rtl">
      <div className="flex text-[#0A2533] text-xl font-bold justify-between items-center">
        <p>סט אחרון:</p>
        <p>יעד:</p>
      </div>
      <div className="w-96 bg-white shadow-md rounded-2xl p-2 md:p-6 flex justify-between border-[1px] border-gray-100 mt-4">
        <form className="flex flex-col gap-6">
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
        </form>
      </div>
    </div>
  );
};

export default ExcersizeInput;
