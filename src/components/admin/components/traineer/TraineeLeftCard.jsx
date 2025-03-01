import { Button } from "@/components/ui/button";
import { image } from "@/assets/index";

const TraineeLeftCard = () => {
  return (
    <div
      className="w-72 h-48 bg-red-600 p-2 rounded-2xl "
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-between items-start" dir="ltr">
        <Button className="bg-black text-white text-xs border border-white rounded-full px-3 py-1 font-bold">
          להזנת המדדים
        </Button>
      </div>
    </div>
  );
};

export default TraineeLeftCard;
