import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import burger from "@/assets/image/hamburger.png";
import measurement from "@/assets/image/measuring-tape.png";
import dumble from "@/assets/image/dumble.png";
import manBody from "@/assets/image/body.png";
const ArrowCard = ({ tilte, tilte1, taskType, onClick }) => {
  let taskImage = null;
  if (taskType === "workout") {
    taskImage = dumble;
  } else if (taskType === "measurement") {
    taskImage = measurement;
  } else if (taskType === "food_dairy") {
    taskImage = burger;
  } else {
    taskImage = manBody;
  }
  return (
    <div
      onClick={onClick}
      className="sm:w-auto w-full h-24 flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
    >
      <Button className="rounded-2xl">
        <FaArrowLeftLong />
      </Button>
      <div className="flex items-center gap-4">
        <div className=" w-full flex flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-[#0A2533]">{tilte}</h1>
          <h1 className="text-xs font-normal text-[#97A2B0]">{tilte1}</h1>
        </div>
        <div className="w-full">
          <img
            src={taskImage}
            alt=""
            className="w-[104px] h-[84px] object-cover rounded-[16px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ArrowCard;
