import CourseGroup from "@/components/supermarket/CourseGroup";
import SuperTitle from "@/components/supermarket/SuperTitle";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import React from "react";
import { supermarketBg } from "@/assets";

const SuperMarketTwo = () => {
  return (
    <div className="">
      <WorkOutListBaground bgImg={supermarketBg} />
      <div className="bg-white ">
        <SuperTitle title={" קורס חכם בסופר"} />
        <CourseGroup />
      </div>
    </div>
  );
};

export default SuperMarketTwo;
