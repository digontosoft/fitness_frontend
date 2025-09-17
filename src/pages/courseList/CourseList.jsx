import { trainingandexercisebanner } from "@/assets/index";
import { CourseListGroup } from "@/components/courseList/CourseListGroup";
import Title from "@/components/measurements/Tilte";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
const CourseList = () => {
  return (
    <div className="bg-[#FDFDFD] min-h-[75vh] h-auto">
        <WorkOutListBaground bgImg={trainingandexercisebanner} />
      <Title title={"ספריית תרגילים"} />
      <CourseListGroup />
    </div>
  );
};

export default CourseList;
