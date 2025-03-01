import { Button } from "../ui/button";
import { image } from "../../assets/index";

const LeftCard = () => {
  return (
    <div
      className="w-72 h-48 bg-[#0A0A0A] p-2 rounded-2xl "
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-between items-start">
        <Button className="bg-black text-white text-xs border border-white rounded-full px-3 py-1 font-bold">
          להזנת המדדים
        </Button>
      </div>
    </div>
  );
};

export default LeftCard;
