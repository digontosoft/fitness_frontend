import React from "react";
import { FaLock } from "react-icons/fa6";
const CourseCart = ({ _id, image, courseTitle, courseParagraph, paid }) => {
  return (
    <div
      key={_id}
      className={`relative w-80 bg-white shadow-md  rounded-2xl p-4 ${
        paid ? "blur-[1px] pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col justify-between items-center gap-6">
        <img src={image} alt={courseTitle} className="rounded-xl" />

        <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
          <h1 className="text-2xl font-bold text-center">{courseTitle}</h1>
          <p className="text-sm font-normal text-center">{courseParagraph}</p>
        </div>
      </div>
      {paid && (
        <div className="absolute inset-0 flex justify-between items-center flex-col bg-black bg-opacity-5 rounded-2xl pointer-events-none">
          <button className="mt-8 px-4 py-2 bg-black text-white text-sm rounded-full">
            קורס בתשלום- לפרטים צרו קשר
          </button>

          <div className="flex items-center justify-center h-full mb-40">
            <FaLock className="text-black text-4xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCart;
