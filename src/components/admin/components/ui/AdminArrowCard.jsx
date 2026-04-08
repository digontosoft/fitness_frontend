import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AdminArrowCard = ({ image, title, link }) => {
  return (
    <Link to={link} className="w-full">
      <div
        className="w-full h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
        dir="ltr"
      >
        <Button className="rounded-2xl w-[25px] h-6 flex-shrink-0">
          <FaArrowLeftLong />
        </Button>
        <div className="flex items-center gap-4 flex-1 justify-between">
          <div className="flex-1">
            <h1
              className="text-sm sm:text-base font-bold leading-5 text-[#0A2533] text-right line-clamp-2"
              dir="rtl"
            >
              {title}
            </h1>
          </div>
          <div className="w-[95px] h-[90px] flex-shrink-0 overflow-hidden flex items-center justify-center bg-[#F7FAFC] rounded-lg">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdminArrowCard;
