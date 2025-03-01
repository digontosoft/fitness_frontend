import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import React from "react";
import { excersizeBg } from "@/assets";
import Title from "@/components/measurements/Tilte";
import { CourseListGroup } from "@/components/courseList/CourseListGroup";
const CourseList = () => {
  return (
    <div>
      <WorkOutListBaground bgImg={excersizeBg} />
      <Title tilte={"מאגר תרגילים"} />
      <CourseListGroup />
    </div>
  );
};

export default CourseList;
