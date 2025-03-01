import React from "react";

const CommonContainer = ({ children }) => {
  return (
    <div className="w-full bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        {children}
      </div>
    </div>
  );
};

export default CommonContainer;
