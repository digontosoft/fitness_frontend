import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import buger from "@/assets/image/burger.svg";
import measurement from "@/assets/image/measurementRope.svg";
import dumble from "@/assets/image/dumble-square.svg";

const ArrowCard = ({ image, tilte, tilte1, taskType, onClick }) => {
  console.log("title", tilte);
  let taskImage = null;
  if (taskType === "workout") {
    taskImage = dumble;
  } else if (taskType === "measurement") {
    taskImage = measurement;
  } else if (taskType === "food_dairy") {
    taskImage = buger;
  } else {
    taskImage = image;
  }
  return (
    <div
      onClick={onClick}
      className="w-full h-24 flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
    >
      <Button className="rounded-2xl">
        <FaArrowLeftLong />
      </Button>
      <div className=" w-full flex flex-col items-center justify-center">
        <h1 className="text-sm font-bold text-[#0A2533]">{tilte}</h1>
        <h1 className="text-xs font-normal text-[#97A2B0]">{tilte1}</h1>
      </div>
      <div className="w-full">
        <img
          src={taskImage}
          alt=""
          className="w-full sm:w-auto sm:h-auto h-full"
        />
      </div>
    </div>
  );
};

export default ArrowCard;
