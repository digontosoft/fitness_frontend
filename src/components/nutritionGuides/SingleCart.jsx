import React from "react";
import { Link } from "react-router-dom";

const SingleCart = ({ id, title, description, icon }) => {
  return (
    <div
      key={id}
      className="bg-white shadow-xl w-40 md:w-64 flex flex-col gap-6 justify-items-center rounded-3xl mt-10"
    >
      <img className="px-3  " src={icon} alt="" />
      <p className="text-center text-[#0A2533]">{title}</p>
      <p className="text-center text-[#0A2533]">{description}</p>
      <Link
        className=" flex justify-center  items-center"
        to={`/nutration-pdf/${id}`}
      >
        <button className="text-[#000000] font-bold text-sm  text-center underline pb-4 hover:text-blue-500">
          לצפייה במדריך
        </button>
      </Link>
    </div>
  );
};
export default SingleCart;
