import { Ractanglebg, Ellipse, Running } from "@/assets/index";

const TraineeRightCard = () => {
  return (
    <div
      className="w-72 h-48 bg-red-500 p-2 rounded-2xl "
      style={{
        backgroundImage: `url(${Ractanglebg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-between items-center relative" dir="ltr">
        <div className="bg-[#FFFFFF] w-28 h-28 rounded-full bg-opacity-50 p-2">
          <div className="bg-[#FFFFFF] w-24 h-24 rounded-full p-2 ">
            <div className="bg-[#FFFFFF] w-20 h-20 rounded-full border-red-500 border-[4px] flex justify-center items-center">
              <div className="flex flex-col items-center">
                <p className="text-[#B9192E] text-sm font-bold">30%</p>
                <p className="text-[#8C8C8C] text-xs font-normal">הושלם</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" absolute -top-2 -right-9 w-36 h-40 "
          style={{
            backgroundImage: `url(${Ellipse})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <img className="pl-10 pt-4" src={Running} alt="" />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end pr-4" dir="ltr">
        <div className="flex justify-end items-center ">
          <span className="text-[#FFFFFF] text-xs font-normal">10,000 /</span>
          <span className="text-[#FFFFFF] text-2xl font-bold">3500</span>
        </div>
        <p className="text-[#FFFFFF] text-xs font-normal text-end">צעדים</p>
      </div>
    </div>
  );
};

export default TraineeRightCard;
