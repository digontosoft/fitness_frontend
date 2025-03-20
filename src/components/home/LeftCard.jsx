import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@/assets";
import { Button } from "../ui/button";
// import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@assets/index";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserInfoContext } from "@/context";

const LeftCard = ({ data }) => {
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));

  console.log("user ", userDetails);

  // const arm=
  console.log("M data", data);

  const leftArm = Number(data?.arml) || 0;
  const rightArm = Number(data?.armr) || 0;
  const total = leftArm + rightArm;
  const avg = Math.floor(total / 2);
  const leftThigh = Number(data?.thighl) || 0;
  const rightThigh = Number(data?.thighr) || 0;
  const totalThigh = leftThigh + rightThigh;
  const avgThigh = Math.floor(totalThigh / 2);
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
                <p className="text-sm text-white">זרוע:{avg}</p>
                <img src={icon} alt="" />
              </div>
              <div className="flex items-center ">
                <p className="text-sm text-white">
                  חזה:{userDetails.gender === "male" ? data?.chest : data?.butt}
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
                <p className="text-sm text-white">יריכיים:{avgThigh}</p>
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
