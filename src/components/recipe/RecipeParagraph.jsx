import React from "react";

const RecipeParagraph = () => {
  return (
    <div className="flex justify-center items-center  pb-10 px-4" dir="rtl">
      <p className="text-[#0A2533] text-sm md:flex hidden text-center">
        ברוכים הבאים לספר המתכונים העשיר ביותר בחלבון! הסתבכתם עם מתכון? <br />{" "}
        רוצים לשאול שאלה? צוות פיטל זמין עבורכם בווטסאפ ובטלפון בשעות הפעילות.
      </p>
      <p className="text-[#0A2533] text-sm md:hidden block text-center">
        ברוכים הבאים לספר המתכונים העשיר ביותר בחלבון! הסתבכתם עם מתכון? רוצים
        לשאול שאלה? צוות פיטל זמין עבורכם בווטסאפ ובטלפון בשעות הפעילות.
      </p>
    </div>
  );
};

export default RecipeParagraph;
