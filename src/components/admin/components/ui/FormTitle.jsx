import { twMerge } from "tailwind-merge";

const FormTitle = ({ className, title }) => {
  return (
    <span
      className={twMerge(
        "text-2xl font-bold leading-normal text-[#010101]",
        className
      )}
      dir="rtl"
    >
      {title}
    </span>
  );
};

export default FormTitle;
