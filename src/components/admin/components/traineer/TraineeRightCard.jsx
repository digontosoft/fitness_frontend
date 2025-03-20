import {
  Ractanglebg,
  Ellipse,
  Running,
  vector2,
  vector3,
  female2,
  men2,
  Ellipse88,
} from "@/assets/index";

const TraineeRightCard = ({ gender, stepAverage, stepTarget }) => {
  const progress = 30;
  const target = Math.max(stepTarget || 1, 1);
  const strokeWidth = 4;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const parcentage = ((progress / target) * 100).toFixed(1);
  const offset = circumference - (parcentage / 100) * circumference;
  return (
    // <div className="w-72 h-48 bg-customRadial p-2 rounded-2xl">
    //   <div className="flex justify-between items-center relative" dir="ltr">
    //     <div className="bg-slate-50 w-28 h-28 rounded-full bg-opacity-50 p-2">
    //       <div className="bg-[#FFFFFF] w-24 h-24 rounded-full p-2 ">
    //         <div className="bg-[#FFFFFF] w-20 h-20 rounded-full border-red-500 border-[4px] flex justify-center items-center">
    //           <div className="flex flex-col items-center">
    //             <p className="text-[#B9192E] text-sm font-bold">30%</p>
    //             <p className="text-[#8C8C8C] text-xs font-normal">הושלם</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       className=" absolute -top-2 -right-9 w-36 h-40 "
    //       style={{
    //         backgroundImage: `url(${Ellipse})`,
    //         backgroundRepeat: "no-repeat",
    //       }}
    //     >
    //       <img className="pl-10 pt-4" src={Running} alt="" />
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-end justify-end pr-4" dir="ltr">
    //     <div className="flex justify-end items-center ">
    //       <span className="text-[#FFFFFF] text-xs font-normal">10,000 /</span>
    //       <span className="text-[#FFFFFF] text-2xl font-bold">3500</span>
    //     </div>
    //     <p className="text-[#FFFFFF] text-xs font-normal text-end">צעדים</p>
    //   </div>
    // </div>
    <div className="w-80 h-56 bg-gradient-to-tr from-[#0A0A0A] via-[#343434] to-[#0A0A0A] p-2 rounded-2xl relative">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${vector2})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-24 w-24 rounded-full top-3 left-3 absolute bg-[#7E7E7E] flex items-center justify-center">
          <div className="h-[74px] w-[74px] rounded-full bg-white flex items-center justify-center ">
            <div className="flex items-center justify-center">
              <svg
                className="w-20 h-16 transform -rotate-90"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="#CCFFC4"
                  strokeWidth={strokeWidth}
                />

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="#47C659"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-sm font-semibold text-green-500">
                  {parcentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-52 left-10 w-full h-full"
        style={{
          backgroundImage: `url(${vector3})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute top-0 left-[174px] w-full h-full"
        style={{
          backgroundImage: `url(${Ellipse88})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="absolute top-0 left-[201px] w-full h-full"
        style={{
          backgroundImage: `url(${Ellipse})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={gender === "male" ? men2 : female2}
          alt="female"
          className="h-[102px] w-8 relative left-[-70%] top-4"
        />
      </div>
      <div className="flex flex-col items-end justify-end pr-4 absolute bottom-5 right-0">
        <div>
          <span className="text-white">
            <span className="text-lg"> {stepAverage}</span> /{" "}
            <span className="text-2xl font-semibold">{stepTarget}</span>
            <h1 className="text-lg font-semibold text-right">צעדים</h1>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TraineeRightCard;
