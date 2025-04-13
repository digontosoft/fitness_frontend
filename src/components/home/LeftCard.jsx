import { pixelCartImg } from "@/assets";
import muscle from "../../assets/image/arm.png";
import waist from "../../assets/image/waist.png";
import hips from "../../assets/image/thigh.png";
import chest from "../../assets/image/chest.png";
import { Button } from "../ui/button";
// import { icon, iconOne, iconThree, iconTwo, pixelCartImg } from "@assets/index";
import { Link } from "react-router-dom";

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
      className="w-80 h-56 bg-[#0A0A0A] p-2 rounded-2xl "
      style={{ backgroundImage: `url(${pixelCartImg})` }}
    >
      <div className="flex  flex-col justify-center items-start">
        <Link to="/mesurement-update">
          <Button className="bg-black text-white  text-xs border border-white rounded-full px-3 py-1 font-bold">
            להזנת המדדים
          </Button>
        </Link>
        <div className="w-full flex justify-center items-center mt-6">
          <div className="grid grid-cols-2 gap-6 justify-items-center items-center">
            <div className="flex items-center gap-4">
              <p className="text-lg text-white">זרוע:{avg}</p>
              <div className="h-8 w-8 bg-[#D6D6D6] rounded-md flex justify-center items-center">
                <img src={muscle} alt="" className="object-cover" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-lg text-white">מותניים:{data?.waist}</p>
              <div className="h-8 w-8 bg-[#D6D6D6] rounded-md flex justify-center items-center">
                <img src={waist} alt="" className="object-cover" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg text-white">
                חזה:{userDetails.gender === "male" ? data?.chest : data?.butt}
              </p>
              <div className="h-8 w-8 bg-[#D6D6D6] rounded-md flex justify-center items-center">
                <img src={chest} alt="" className="object-cover" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg text-white">יריכיים:{avgThigh}</p>
              <div className="h-8 w-8 bg-[#D6D6D6] rounded-md flex justify-center items-center">
                <img src={hips} alt="" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCard;
