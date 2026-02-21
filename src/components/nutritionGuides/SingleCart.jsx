import { Link } from "react-router-dom";

const SingleCart = ({ id, title, description, icon, type }) => {
  return (
    <div
      key={id}
      className="bg-white shadow-xl w-44 md:w-64 min-h-72 h-auto flex flex-col gap-6 rounded-3xl sm:mt-10 px-2" dir="rtl"
    >
      <img className="px-3" src={icon} alt="" />
      <p className="text-center text-[#0A2533]" dir="rtl">{title}</p>
      <p className="text-center text-[#0A2533]" dir="rtl">{description}</p>
      <Link
        className=" flex justify-center  items-center"
        to={`/nutration-pdf/${id}`}
      >
        <button className="text-[#000000] font-bold text-sm  text-center underline pb-4 hover:text-blue-500" dir="rtl">
          {type === "guide" ? "לצפייה במדריך" : "  לצפיה בתפריט"}{" "}
        </button>
      </Link>
    </div>
  );
};
export default SingleCart;
