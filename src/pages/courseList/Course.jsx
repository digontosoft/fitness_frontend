import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { courseBg } from "@/assets";
import CourseTitle from "@/components/courseList/course/CourseTitle";
import CourseGroup from "@/components/courseList/course/CourseGroup";
const Course = () => {
  return (
    <div className="">
      <WorkOutListBaground bgImg={courseBg} />
      <CourseTitle title={"קורסים של פיטל"} />
      <CourseGroup />
    </div>
  );
};

export default Course;
