import { IoSettingsOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
const SuperTitle = ({ title, description, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-5 justify-center items-center text-center text-[#0A2533] py-20",
        className
      )}
    >
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p
        className="text-sm font-normal sm:w-3/4 w-full px-[10%] leading-normal"
        dir="rtl"
      >
        {description}
      </p>
      <p
        dir="rtl"
        className="w-full px-[10%] sm:w-3/4 text-center text-base sm:text-lg font-bold text-[#0A2533]"
      >
        תלחצו על הגלגל שיניים{" "}
        {/* <Settings
          className="inline-block size-5 sm:size-6 align-middle mx-1"
          aria-label="settings"
        />{" "} */}
        <IoSettingsOutline className="inline-block size-5 sm:size-6 align-middle mx-1 bg-red-600 text-white" aria-label="settings" />
        בסרטון לשנות לאיכות צפייה HD
      </p>
    </div>
  );
};

export default SuperTitle;
