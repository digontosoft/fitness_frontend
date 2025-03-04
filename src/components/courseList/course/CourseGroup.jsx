import { useEffect, useState } from "react";
import CourseCart from "./CourseCart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const CourseGroup = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        axios.get(`${base_url}/course`).then((res) => {
          if (res.status === 200) {
            setCourses(res.data.data);
            console.log("courses:", res?.data.data);
          }
        });
      } catch (err) {
        console.log("courses:", err);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 pb-10 justify-items-center items-center"
        dir="rtl"
      >
        {courses?.map((course) => (
          <CourseCart key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGroup;
