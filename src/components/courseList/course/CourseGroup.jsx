import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
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
  console.log("courses", courses);

  return (
    <div className="max-w-6xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex sm:flex-row flex-col gap-10 md:gap-10 pb-10 justify-center items-center flex-wrap">
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
                  <div className="relative bg-white shadow-md rounded-2xl p-4 w-full max-w-xs sm:max-w-[20rem] md:max-w-[20rem] flex flex-col h-[500px]">
                    <div className="flex flex-col items-center gap-6 flex-1">
                      <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-xl mb-2">
                        <img
                          src={`${base_url}/${course?.image}`}
                          alt={course?.title}
                          className="object-cover w-full h-full rounded-xl"
                        />
                      </div>
                      <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533] w-full">
                        <h1
                          className="text-2xl font-bold text-center break-words w-full"
                          dir="rtl"
                        >
                          {courseTitle}
                        </h1>
                        <p
                          className="text-sm font-normal text-center break-words w-full"
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
