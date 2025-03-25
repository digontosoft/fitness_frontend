import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";
const ProgressCourseCart = () => {
  const { id } = useParams();
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        await axios.get(`${base_url}/training/${id}`).then((res) => {
          if (res.status === 200) {
            setTrainings(res.data.data);
          }
        });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchTrainings();
  }, [id]);
  return (
    <div className=" bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title tilte={trainings?.name} />
        <RecipeParagraph trainingDesc={trainings?.description} />
        {/* <Subtitle /> */}
        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text center"
        >
          תרגילים:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {trainings?.workouts?.map((workout) =>
            workout.exercises.map((exercise) => (
              <VideoCourseCart key={exercise._id} exercise={exercise} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCourseCart;
