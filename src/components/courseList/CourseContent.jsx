import React from "react";

const CourseContent = ({}) => {
  return (
    <div dir="rtl" className="w-full py-10">
      <div className="flex flex-col justify-start text-[#0A2533]">
        <h1 className="text-[#0A2533] text-xl font-bold">עמדת התחלה:</h1>
        <p className="text-sm font-normal pt-2">
          1.שבו על ספסל עם הרגשה שטוחה על הרצפה.
        </p>
        <p className="text-sm font-normal">
          2.החזק משקולת בכל יד, ידיים מושטות לגמרי.
        </p>
        <h1 className="text-[#0A2533] text-xl font-bold pt-10">מתחילים:</h1>
        <p className="text-sm font-normal pt-2">
          לאט לאט לקצר את המשקולת עד הכתף, נוריד לאט לאט וכניראה שזה לא ההסבר על
          סקווט אבל נזרום בנתיים.
        </p>
      </div>
    </div>
  );
};

export default CourseContent;
