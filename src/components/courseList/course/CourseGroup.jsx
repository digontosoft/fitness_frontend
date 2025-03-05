import { useEffect, useState } from "react";
import CourseCart from "./CourseCart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { FaLock } from "react-icons/fa6";
import cartFor from "../../../assets/image/course/cartFour.png";

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
        <div className="relative w-80 h-[450px] bg-white shadow-md rounded-2xl p-4 overflow-hidden">
          {/* Card Content */}
          <div className="flex flex-col justify-between items-center gap-6 relative z-10">
            <img src={cartFor} alt="Course" className="rounded-xl" />
            <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
              <h1 className="text-2xl font-bold text-center">חכם במטבח</h1>
              <p className="text-sm font-normal text-center">
                קורס קצר וקליל שיתן לכם כלים סופר חשובים להתנהלות נכונה בסופר
                ימקד אתכם לקנייה חכמה וצריכת חלבון גבוהה יותר.
              </p>
            </div>
          </div>

          {/* Locked Overlay */}
          <div className="absolute inset-0 bg-gray-100 bg-opacity-40 flex flex-col justify-between items-center rounded-2xl z-20 pointer-events-none">
            <button className="mt-8 px-4 py-2 bg-black text-white text-sm rounded-full z-30 pointer-events-auto">
              קורס בתשלום - לפרטים צרו קשר
            </button>
            <div className="flex items-center justify-center h-full mb-40">
              <FaLock className="text-black text-4xl" />
            </div>
          </div>
        </div>
        {courses?.map((course) => (
          <CourseCart key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGroup;
