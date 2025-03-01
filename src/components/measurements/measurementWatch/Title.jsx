import React from "react";

const Title = ({ title }) => {
  return (
    <div className="flex justify-center items-center md:py-20 py-14">
      <p className="text-center text-3xl font-bold text-[#0A2533]">{title}</p>
    </div>
  );
};

export default Title;
