const RecipeParagraph = ({ trainingDesc }) => {
  return (
    <div className="flex justify-center items-center  pb-10 px-4" dir="rtl">
      <p className="text-[#0A2533] text-sm md:flex text-center">
        {trainingDesc}
      </p>
      {/* <p className="text-[#0A2533] text-sm md:hidden block text-center">
        ברוכים הבאים לספר המתכונים העשיר ביותר בחלבון! הסתבכתם עם מתכון? רוצים
        לשאול שאלה? צוות פיטל זמין עבורכם בווטסאפ ובטלפון בשעות הפעילות.
      </p> */}
    </div>
  );
};

export default RecipeParagraph;
