import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

const BasicButton = ({ type = "Submit", title, icon, className }) => {
  return (
    <Button
      type={type}
      className={twMerge(
        "w-auto min-h-10 bg-[#7994CB] hover:bg-[#7994CB] duration-200 ease-in-out delay-75 text-[#FFFFFF] hover:text-[#FFFFFF] flex items-center justify-center",
        className
      )}
      dir="rtl"
    >
      <span>{title}</span>
      <span>{icon}</span>
    </Button>
  );
};

export default BasicButton;
