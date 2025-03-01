import React from "react";
import { sideNavData } from "@/constants/SideNavData";
import SideNav from "@/components/supermarket/SideNav";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { sideNavBg } from "@/assets";
import SuperTitle from "@/components/supermarket/SuperTitle";
import CourseGroup from "@/components/supermarket/CourseGroup";
const SideNavSupperShop = () => {
  return (
    <div className="flex">
      <SideNav data={sideNavData} />
      <div className="flex-grow ">
        <WorkOutListBaground bgImg={sideNavBg} />
        <SuperTitle title={" קורס אימונים ותזונה"} />
        <CourseGroup />
      </div>
    </div>
  );
};

export default SideNavSupperShop;
