import { pixelCartImg } from "@/assets";
import muscle from "../../assets/image/arm.png";
import waist from "../../assets/image/waist.png";
import hips from "../../assets/image/thigh.png";
import chest from "../../assets/image/chest.png";
import { Button } from "../ui/button";
// import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@assets/index";
import { Link } from "react-router-dom";
import rightArmIcon from "@/assets/image/right-arm.svg";
import leftArmIcon from "@/assets/image/left-arm.svg";
import rightLeg from "@/assets/image/right-leg.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import thigh from "@/assets/image/thigh.svg";
import butt from "@/assets/image/butt.svg";

const LeftCard = ({ data }) => {
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const leftArm = Number(data?.arml) || 0;
  const rightArm = Number(data?.armr) || 0;
  const total = leftArm + rightArm;
  const avg = Math.floor(total / 2);
  const leftThigh = Number(data?.thighl) || 0;
  const rightThigh = Number(data?.thighr) || 0;
  const totalThigh = leftThigh + rightThigh;
  const avgThigh = Math.floor(totalThigh / 2);
  return (
    <div className="sm:w-[400px] w-full h-[245px] rounded-md bg-[#EEEEEE]">
      <div className="flex items-center justify-between p-4">
        <Link to="/mesurement-update">
          <Button className="bg-black text-white  text-xs border border-white rounded-full px-3 py-1 font-bold">
            להזנת המדדים
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">מדדים</h1>
      </div>
      <div className="w-full flex justify-end items-center py-4 px-2">
        <div className="grid grid-cols-2 gap-6 justify-items-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="text-lg">
                ירך ימין:
                {userDetails.gender === "male" ? data?.chest : data?.butt}
              </p>
              <img src={rightLeg} alt="" className="object-cover h-8 w-8" />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="text-lg">ירך שמאל: {avgThigh}</p>
              <img src={leftLeg} alt="" className="object-cover h-8 w-8" />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="text-lg">היקף מותניים: {avgThigh}</p>
              <img src={thigh} alt="" className="object-cover h-8 w-8" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="text-lg">זרוע ימין::{avg}</p>
              <img src={rightArmIcon} alt="" className="object-cover h-8 w-8" />
            </div>

            <div className="flex items-center justify-end gap-2 w-full">
              <p className="text-lg">זרוע שמאל: {data?.waist}</p>
              <img src={leftArmIcon} alt="" className="object-cover h-8 w-8" />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="text-lg">ישבן: {avgThigh}</p>
              <img src={butt} alt="" className="object-cover h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCard;
