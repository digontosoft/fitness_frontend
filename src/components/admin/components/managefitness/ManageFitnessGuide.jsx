import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { measurementRope, ArrowBurger, ArrowDumbel } from "@/assets";
import AdminArrowCard from "../ui/AdminArrowCard";
const ManageFitnessGuide = () => {
  return (
    // <div
    //   className="w-[342px] h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300"
    //   dir="ltr"
    // >
    //   <Button className="rounded-2xl w-[25px] h-6">
    //     <FaArrowLeftLong />
    //   </Button>
    //   <div className="flex items-center">
    //     <h1 className="text-base font-bold leading-5 text-[#0A2533]">
    //       Manage Fitness Guide
    //     </h1>
    //     <div>
    //       <img src={ArrowBurger} alt="" className="w-[104px] h-[84px]" />
    //     </div>
    //   </div>
    // </div>
    <AdminArrowCard image={ArrowBurger} title={"Manage Fitness Guide"} />
  );
};

export default ManageFitnessGuide;
