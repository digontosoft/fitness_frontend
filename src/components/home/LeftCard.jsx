import { Button } from "../ui/button";
// import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@assets/index";
import { Link } from "react-router-dom";
import rightArmIcon from "@/assets/image/right-arm.svg";
import leftArmIcon from "@/assets/image/left-arm.svg";
import rightLeg from "@/assets/image/right-leg.svg";
import leftLeg from "@/assets/image/left-leg.svg";
import thigh from "@/assets/image/thigh.svg";
import butt from "@/assets/image/butt.svg";
import cardBg from "@/assets/image/image.svg";
import chest from "@/assets/image/man-chest.svg";
import manWaist from "@/assets/image/man-waist.svg";

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
  console.log("data:", data);
  return (
    <div className="relative sm:w-[500px] w-full h-[245px] rounded-3xl bg-[#EEEEEE]">
      <div className="absolute top-0 right-0">
        <img src={cardBg} alt="" className="w-[250px] h-full" />
      </div>
      <div className="flex items-center justify-between p-4 relative">
        <Link to="/mesurement-update">
          <Button className="bg-black text-white  text-xs border border-white rounded-full px-3 py-1 font-bold">
            להזנת המדדים
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">מדדים</h1>
      </div>
      <div className="relative w-full flex justify-end items-center py-4 px-4">
        <div className="grid grid-cols-2 gap-6 justify-items-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                {userDetails.gender === "male" ? (
                  <>חזה: {data?.chest}</>
                ) : (
                  <>ישבן: {data?.butt}</>
                )}
              </p>
              <img
                src={userDetails.gender === "female" ? butt : chest}
                alt=""
                className="object-cover sm:h-6 sm:w-6 h-5 w-5"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                זרוע שמאל: {data?.arml}
              </p>
              <img
                src={leftArmIcon}
                alt=""
                className="object-cover sm:h-6 sm:w-5 h-5 w-4"
              />
            </div>

            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                ירך שמאל: {data?.thighl}
              </p>
              <img
                src={leftLeg}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                היקף מותניים: {data?.waist}
              </p>
              <img
                src={manWaist}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                זרוע ימין: {data?.armr}
              </p>
              <img
                src={rightArmIcon}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
              <p className="sm:text-lg text-xs font-bold text-black">
                ירך ימין: {data?.thighr}
              </p>
              <img
                src={rightLeg}
                alt=""
                className="object-cover sm:h-5 sm:w-5 h-4 w-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCard;
