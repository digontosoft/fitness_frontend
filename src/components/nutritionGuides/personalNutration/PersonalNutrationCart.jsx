import React from "react";

const PersonalNutrationCart = ({
  _id,
  image,
  courseTitle,
  courseParagraph,
}) => {
  return (
    <div key={_id} className="w-80 bg-white shadow-md  rounded-2xl p-4">
      <div className="flex flex-col justify-between items-center gap-6">
        <img src={image} alt={courseTitle} className="rounded-xl w-full" />

        <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
          <h1 className="text-2xl font-bold text-center">{courseTitle}</h1>
          <p className="text-xs font-bold text-center text-[#000000] underline">
            {courseParagraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalNutrationCart;
