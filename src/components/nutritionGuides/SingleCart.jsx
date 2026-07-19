import { Link } from "react-router-dom";

const SingleCart = ({ id, title, description, icon, type }) => {
  return (
    <Link to={`/nutration-pdf/${id}`}>
      <div className="md:w-56 w-48 shadow-xl rounded-2xl p-3" dir="rtl">
        <div className="w-full h-40 rounded-2xl flex justify-center items-center overflow-hidden bg-gray-50">
          <img className="w-40 h-40 object-contain" src={icon} alt="" />
        </div>
        <div className="px-3 py-4 text-center">
          <p className="text-[#0A2533] text-sm font-bold">{title}</p>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{description}</p>
          <p className="text-[#000000] font-bold text-xs underline mt-2 hover:text-blue-500">
            {type === "guide" ? "לצפייה במדריך" : "לצפיה בתפריט"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SingleCart;
