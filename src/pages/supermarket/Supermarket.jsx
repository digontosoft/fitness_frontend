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
      <WorkOutListBaground bgImg={course?.image} />
      <div className="bg-white ">
        <SuperTitle title={course?.title} description={course?.description} />
        <CourseGroup course={course} />
      </div>
    </div>
  );
};

export default Supermarket;
