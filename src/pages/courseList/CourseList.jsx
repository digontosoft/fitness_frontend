import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { excersizeBg } from "@/assets";
import Title from "@/components/measurements/Tilte";
import { CourseListGroup } from "@/components/courseList/CourseListGroup";
const CourseList = () => {
  return (
    <div className="bg-[#FDFDFD]">
      {/* <WorkOutListBaground bgImg={excersizeBg} /> */}
      <Title title={"ספריית תרגילים"} />
      <CourseListGroup />
    </div>
  );
};

export default CourseList;
