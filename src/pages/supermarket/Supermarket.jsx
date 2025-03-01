import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import React from "react";
import { supermarket } from "@/assets";
import SuperTitle from "@/components/supermarket/SuperTitle";
import CourseGroup from "@/components/supermarket/CourseGroup";
const Supermarket = () => {
  return (
    <div className="">
      <WorkOutListBaground bgImg={supermarket} />
      <div className="bg-white ">
        <SuperTitle title={" קורס חכם בסופר"} />
        <CourseGroup />
      </div>
    </div>
  );
};

export default Supermarket;
