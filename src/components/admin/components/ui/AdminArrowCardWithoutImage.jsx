import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AdminArrowCardWithoutImage = ({ title, link, onClick }) => {
  return (
    <Link to={link}>
      <div
        onClick={onClick}
        className="w-[342px] h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
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
    </Link>
  );
};

export default AdminArrowCardWithoutImage;
