import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@/assets";
import { Button } from "../ui/button";
// import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@assets/index";
import { Link } from "react-router-dom";

const LeftCard = ({ data }) => {
  const userType = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div
      className="w-72 h-48 bg-[#0A0A0A] p-2 rounded-2xl "
      style={{ backgroundImage: `url(${pixelCartImg})` }}
    >
      <div className="flex  flex-col justify-center items-start">
        <Link to="/mesurement-update">
          <Button className="bg-black text-white  text-xs border border-white rounded-full px-3 py-1 font-bold">
            להזנת המדדים
          </Button>
        </Link>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-between gap-6 items-center flex-row-reverse">
            <div>
              <div className="flex items-center ">
                <p className="text-sm text-white">זרוע:{data?.arml}</p>
                <img src={icon} alt="" />
              </div>
              <div className="flex items-center ">
                <p className="text-sm text-white">
                  חזה:{userType.gender === "male" ? data?.chest : data?.butt}
                </p>
                <img src={iconOne} alt="" />
              </div>
            </div>
            <div>
              <div className="flex items-center ">
                <p className="text-sm text-white">מותניים:{data?.waist}</p>
                <img src={iconTwo} alt="" />
              </div>
              <div className="flex items-center ">
                <p className="text-sm text-white">יריכיים:{data?.thighl}</p>
                <img src={iconThree} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCard;
