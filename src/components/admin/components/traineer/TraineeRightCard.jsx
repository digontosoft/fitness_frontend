import circle from "@/assets/image/circle.svg";
import men from "@/assets/image/men.svg";
import women from "@/assets/image/women.svg";
import bgCard from "@/assets/image/image.svg";

const TraineeRightCard = ({ gender, stepAverage, stepTarget }) => {
  const progress = stepAverage || 0;
  const target = Math.max(stepTarget || 1, 1);
  const strokeWidth = 4;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  // const parcentage = ((progress / target) * 100).toFixed(1);
  const parcentage = Math.min((progress / target) * 100, 100).toFixed(1);
  const offset = circumference - (parcentage / 100) * circumference;

  return (
    <div className="relative sm:w-[500px] w-full h-[245px] rounded-2xl bg-[#EEEEEE] p-4">
      <div className="absolute top-0 right-0">
        <img src={bgCard} alt="" className="w-[250px] h-full" />
      </div>
      <div className="h-32 w-32 absolute top-3 left-4 rounded-full bg-[#f8f8f8] flex items-center justify-center">
        <div className="h-[105px] w-[105px] rounded-full shadow-md shadow-slate-200 bg-white flex items-center justify-center">
          <div className="flex items-center justify-center">
            <svg
              className="w-[105px] h-[105px] transform -rotate-90"
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
            <div className="absolute flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-green-500">
                {parcentage}%
              </p>
              <p className="text-sm font-semibold text-[#BCBCBC]">הושלם</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <img src={circle} alt="" className="w-[200px] h-[180px]" />
      </div>
      <div className="absolute top-2 left-0 w-full h-full">
        <img
          src={gender === "male" ? men : women}
          alt="female"
          className="h-[130px] w-12 relative top-4 right-14"
        />
      </div>
      <div className="flex flex-col items-end justify-end pr-4 absolute bottom-5 right-0">
        <div>
          <span className="text-black">
            <span className="text-2xl font-semibold">{stepAverage}</span> /{" "}
            {stepTarget}
            <h1 className="text-sm font-semibold text-right">צעדים</h1>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TraineeRightCard;
