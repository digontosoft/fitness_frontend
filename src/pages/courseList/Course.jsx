import CourseTitle from "@/components/courseList/course/CourseTitle";
import CourseGroup from "@/components/courseList/course/CourseGroup";
const Course = () => {
  return (
    <div className="bg-[#FDFDFD]">
      <CourseTitle title={"קורסים של פיטל"} />
      <CourseGroup />
    </div>
  );
};

export default Course;
