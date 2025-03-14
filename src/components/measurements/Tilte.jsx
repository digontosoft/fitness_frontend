import React from "react";

const Title = ({ title }) => {
  return (
    <div className="w-full flex justify-center items-center py-10 ">
      <span className="text-4xl font-bold leading-[46.8px] text-center text-textColor">
        {title}
      </span>
    </div>
  );
};

export default Title;
