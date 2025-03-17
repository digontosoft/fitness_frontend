import { Button } from "@/components/ui/button";
import { image } from "@/assets/index";
import { Link } from "react-router-dom";

const TraineeLeftCard = ({ userId }) => {
  return (
    <div
      className="w-72 h-48 bg-[#0A0A0A] p-2 rounded-2xl "
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-between items-start" dir="ltr"></div>
    </div>
  );
};

export default TraineeLeftCard;
