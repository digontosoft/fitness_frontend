import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AdminArrowCard = ({ image, title, link }) => {
  return (
    <Link to={link}>
      <div
        className="sm:w-[342px] w-full h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300"
        dir="ltr"
      >
        <Button className="rounded-2xl w-[25px] h-6">
          <FaArrowLeftLong />
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-base font-bold leading-5 text-[#0A2533]">
            {title}
          </h1>
          <div className="w-[104px] h-[84px]">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdminArrowCard;
