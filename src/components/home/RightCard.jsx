import circle from "@/assets/image/circle.svg";
import men from "@/assets/image/men.svg";
import women from "@/assets/image/women.svg";
import bgCard from "@/assets/image/image.svg";

const RightCard = ({ userSteps }) => {
  const progress = userSteps?.step_average || 0;
  const target = Math.max(userSteps?.step_target || 1, 1);
  const strokeWidth = 8;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.round((progress / target) * 100), 100);
  const offset = circumference - (percentage / 100) * circumference;
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const gender = userDetails?.gender;

  return (
    <div className="relative sm:w-[500px] w-full h-[245px] rounded-3xl bg-[#F1F0EB] p-4" >
      <div className="absolute top-0 right-0">
        <img src={bgCard} alt="" className="w-[250px] h-full" />
      </div>
      <div className="h-32 w-32 rounded-full bg-[#f8f8f8] flex items-center justify-center">
        <div className="h-28 w-28 rounded-full shadow-md shadow-slate-200 bg-white flex items-center justify-center">
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
                {percentage}%
              </p>
              <p className="text-sm font-semibold text-[#BCBCBC]">הושלם</p>
            </div>
          </div>
        </div>
      </div>
      {/* circle + runner image together so position stays same on all devices */}
      <div className="absolute top-4 right-4 sm:top-2 sm:right-8 w-[150px] sm:w-[190px] md:w-[210px] aspect-square">
        <img
          src={circle}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={gender === "male" ? men : women}
            alt="runner"
            className="h-[70%] w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end pr-4 absolute bottom-5 right-0">
        <div>
          <span className="text-black">
            {userSteps?.step_target} /{" "}
            <span className="text-2xl font-semibold">
              {userSteps?.step_average}
            </span>
            <h1 className="text-sm font-semibold text-right">צעדים</h1>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightCard;
