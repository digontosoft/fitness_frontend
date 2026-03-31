import { Link } from "react-router-dom";

const SingleCart = ({ id, title, description, icon, type }) => {
  return (
    <div
      key={id}
      className="bg-white shadow-md rounded-3xl w-full h-full flex flex-col items-center gap-3 px-3 py-4 sm:py-5"
      dir="rtl"
    >
      <img className="w-full h-24 sm:w-full sm:h-full object-contain rounded-xl" src={icon} alt="" />
      <p className="text-center text-sm sm:text-base font-semibold text-[#0A2533]" dir="rtl">
        {title}
      </p>
      <p className="text-center text-xs sm:text-sm text-[#4B6475]" dir="rtl">
        {description}
      </p>
      <Link
        className="flex justify-center items-center mt-auto"
        to={`/nutration-pdf/${id}`}
      >
        <button className="text-[#000000] font-bold text-xs sm:text-sm text-center underline pb-2 hover:text-blue-500" dir="rtl">
          {type === "guide" ? "לצפייה במדריך" : "  לצפיה בתפריט"}{" "}
        </button>
      </Link>
    </div>
  );
};
export default SingleCart;
