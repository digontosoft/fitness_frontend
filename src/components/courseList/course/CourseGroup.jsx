import { useEffect, useState } from "react";
import CourseCart from "./CourseCart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import { Link } from "react-router-dom";
// import { FaLock } from "react-icons/fa6";
// import cartFor from "../../../assets/image/course/cartFour.png";

const CourseGroup = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const gender = user?.gender;
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        axios.get(`${base_url}/course`).then((res) => {
          if (res.status === 200) {
            setCourses(res.data.data);
            setLoading(false);
          }
        });
      } catch (err) {
        console.log("courses:", err);
      }
    };
    fetchCourses();
  }, []);
  console.log("courses:", courses);

  return (
    <div className="max-w-6xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex sm:flex-row flex-col gap-10 md:gap-10 pb-10 justify-center items-center">
          {/* <div className="relative w-80 h-[450px] bg-white shadow-md rounded-2xl p-4 overflow-hidden">
        
          <div className="flex flex-col justify-between items-center gap-6 relative z-10">
            <img src={cartFor} alt="Course" className="rounded-xl" />
            <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
             
              <h1 className="text-2xl font-bold text-center">קורס פרימיום</h1>
              <p className="text-sm font-normal text-center">
                קורס קצר וקליל שיתן לכם כלים סופר חשובים להתנהלות נכונה בסופר
                ימקד אתכם לקנייה חכמה וצריכת חלבון גבוהה יותר.
              </p>
            </div>
          </div>

          
          <div className="absolute inset-0 bg-gray-100 bg-opacity-40 flex flex-col justify-between items-center rounded-2xl z-20 pointer-events-none">
            <button
              className="mt-8 px-4 py-2 bg-black text-white text-sm rounded-full z-30 pointer-events-auto"
              disabled
            >
              קורס בתשלום - לפרטים צרו קשר
            </button>
            <div className="flex items-center justify-center h-full mb-40">
              <FaLock className="text-black text-4xl" />
            </div>
          </div>
        </div> */}
          {/* {courses?.map((course, index) => {
            let courseTitle = "";

            if (index === 0) {
              courseTitle =
                gender === "male"
                  ? course?.male_supermaket
                  : course?.female_supermaket;
            } else if (index === 1) {
              courseTitle =
                gender === "male"
                  ? course?.male_kitchen
                  : course?.female_kitchen;
            }

            console.log("courseTitle:", courseTitle);

            return (
              <Link to={`/supermarket/${course?._id}`} key={course._id}>
                <div
                  className="relative w-80 h-[450px] bg-white shadow-md rounded-2xl p-4"
                  key={course._id}
                >
                  <div className="flex flex-col justify-between items-center gap-6">
                    <img
                      src={`${base_url}/${course?.image}`}
                      alt={course?.title}
                      className="rounded-xl"
                    />
                    <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
                      <h1 className="text-2xl font-bold text-center" dir="rtl">
                        {courseTitle}
                      </h1>
                      <p className="text-sm font-normal text-center" dir="rtl">
                        {course?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })} */}
          {[...courses]
            .sort((a, b) => (a._id < b._id ? 1 : -1)) // descending order
            .map((course, index) => {
              let courseTitle = "";

              if (index === 1) {
                courseTitle =
                  gender === "male"
                    ? course?.male_supermaket
                    : course?.female_supermaket;
              } else if (index === 0) {
                courseTitle =
                  gender === "male"
                    ? course?.male_kitchen
                    : course?.female_kitchen;
              }

              return (
                <Link to={`/supermarket/${course?._id}`} key={course._id}>
                  <div className="relative w-80 h-[450px] bg-white shadow-md rounded-2xl p-4">
                    <div className="flex flex-col justify-between items-center gap-6">
                      <img
                        src={`${base_url}/${course?.image}`}
                        alt={course?.title}
                        className="rounded-xl"
                      />
                      <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
                        <h1
                          className="text-2xl font-bold text-center"
                          dir="rtl"
                        >
                          {courseTitle}
                        </h1>
                        <p
                          className="text-sm font-normal text-center"
                          dir="rtl"
                        >
                          {course?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CourseGroup;
