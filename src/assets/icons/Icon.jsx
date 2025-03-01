import { twMerge } from "tailwind-merge";

const MoveIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge("lucide lucide-move-left", className)}
    >
      <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
    </svg>
  );
};

export default MoveIcon;
