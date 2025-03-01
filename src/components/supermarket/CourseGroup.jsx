import React from "react";
import { superMarketData } from "@/constants/supermarketData";
import CourseCart from "./CourseCart";
const CourseGroup = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
      {superMarketData?.map((item) => (
        <CourseCart key={item._id} title={item.title} courseVideo={item.Url} />
      ))}
    </div>
  );
};

export default CourseGroup;
