import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { useEffect, useState } from "react";
import SuperTitle from "@/components/supermarket/SuperTitle";
import CourseGroup from "@/components/supermarket/CourseGroup";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
const Supermarket = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const gender = user?.gender;
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        axios.get(`${base_url}/course/${id}`).then((res) => {
          if (res.status === 200) {
            setCourse(res.data.course);
            console.log("courses:", res?.data.course);
          }
        });
      } catch (err) {
        console.log("courses:", err);
      }
    };
    fetchCourse();
  }, [id]);
  return (
    <div className="">
      <WorkOutListBaground bgImg={course?.cover} />
      <div className="bg-white ">
        <SuperTitle
          title={
            gender === "male"
              ? course?.male_supermaket || course?.male_kitchen
              : course?.female_supermaket || course?.female_kitchen
          }
          description={course?.description}
          className="py-5"
        />
        <CourseGroup course={course} />
      </div>
    </div>
  );
};

export default Supermarket;
