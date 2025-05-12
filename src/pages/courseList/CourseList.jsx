import Title from "@/components/measurements/Tilte";
import { CourseListGroup } from "@/components/courseList/CourseListGroup";
const CourseList = () => {
  return (
    <div className="bg-[#FDFDFD]">
      <Title title={"ספריית תרגילים"} />
      <CourseListGroup />
    </div>
  );
};

export default CourseList;
