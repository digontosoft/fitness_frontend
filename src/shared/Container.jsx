import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  return (
    <div
      className={twMerge(`max-w-7xl mx-auto justify-center py-10 ${className}`)}
      dir="rtl"
    >
      {children}
    </div>
  );
};

export default Container;
