import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
const AdminArrowCardWithoutImage = ({ title }) => {
  return (
    <div
      className="w-[342px] h-[74px] flex gap-4 items-center justify-between px-4 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300"
      dir="ltr"
    >
      <Button className="rounded-2xl w-[25px] h-6">
        <FaArrowLeftLong />
      </Button>
      <div className="flex items-center">
        <h1 className="text-base font-bold leading-5 text-[#0A2533]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default AdminArrowCardWithoutImage;
