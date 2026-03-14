import manBody from "@/assets/image/body.png";
import { foodDiaryTask, measurementTask, workoutTask } from "@/assets/index";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "../ui/button";
const ArrowCard = ({ tilte, tilte1, taskType, onClick }) => {
  let taskImage = null;
  if (taskType === "workout") {
    taskImage = workoutTask;
  } else if (taskType === "measurement") {
    taskImage = measurementTask;
  } else if (taskType === "food_dairy") {
    taskImage = foodDiaryTask;
  } else {
    taskImage = manBody;
  }
  return (
    <div
      onClick={onClick}
      className="sm:w-auto w-full h-24 flex gap-4 items-center justify-start px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
    >
       <div className="w-[104px] h-[84px] flex-shrink-0">
          <img
            src={taskImage}
            alt=""
            className="w-full h-full object-cover rounded-[16px]"
          />
        </div>
      
      <div className="flex items-center gap-4 flex-1 min-w-0" dir="rtl">
        {/* Text Section */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h1 className="text-sm font-bold text-gray-500 truncate text-right">
            {tilte}
          </h1>
          <h1 className="text-xs font-normal text-[#97A2B0] text-right break-words">
            {tilte1}
          </h1>
        </div>
        <Button className="rounded-2xl">
        <FaArrowLeftLong />
      </Button>
        {/* Image Section */}
      </div>
    </div>
  );
};

export default ArrowCard;
