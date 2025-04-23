import { twMerge } from "tailwind-merge";

const Title = ({ title, className }) => {
  return (
    <div
      className={`w-full flex justify-center items-center sm:py-10 py-5 ${twMerge(
        className
      )}`}
    >
      <span className="sm:text-4xl text-[28px] font-bold leading-[46.8px] text-center text-textColor">
        {title}
      </span>
    </div>
  );
};

export default Title;
