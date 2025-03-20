import React from "react";

const Paragraph = ({ text }) => {
  return (
    <div className="text-[#0A2533] text-sm font-normal text-center">
      <p className="text-center" dir="rtl">
        {text}
      </p>
    </div>
  );
};

export default Paragraph;
