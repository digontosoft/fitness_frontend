import React from "react";

const WorkOutListBaground = ({ bgImg }) => {
  return (
    <div>
      <img
        className="w-full h-[400px] object-cover object-center"
        src={bgImg}
        alt=""
      />
    </div>
  );
};

export default WorkOutListBaground;
