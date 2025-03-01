import React from "react";

const SuperTitle = ({ title }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-center text-[#0A2533] py-20">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-sm font-normal" dir="rtl">
        ברוכים הבאים לספר המתכונים העשיר ביותר בחלבון! הסתבכתם עם מתכון?
        <br />
        רוצים לשאול שאלה? צוות פיטל זמין עבורכם בווטסאפ ובטלפון בשעות הפעילות.
      </p>
    </div>
  );
};

export default SuperTitle;
