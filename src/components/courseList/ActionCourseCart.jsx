import React from "react";
import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { VideoCartData } from "@/constants/VideoCartData";
import Progressbar from "./Progressbar";
import Subtitle from "./Subtitle";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
const ActionCourseCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const workoutData = location.state.data;

  console.log("workout data from action page", workoutData);
  const handleCourse = () => {
    navigate("/startTraining", { state: { data: workoutData } });
  };
  return (
    <div className=" bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title tilte={workoutData?.task_name} />
        <RecipeParagraph trainingDesc={workoutData?.task_description} />
        <Subtitle />
        <Button
          onClick={handleCourse}
          className="text-sm font-bold text-white  bg-gradient-to-tr from-[rgb(148,0,25)] to-[#FD4753] px-8 py-4 rounded-full mt-10 w-52 md:w-40 h-12"
        >
          התחלת אימון
        </Button>
        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text center"
        >
          תרגילים:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {workoutData?.userTrainingExercise?.map((item, index) => (
            <VideoCourseCart
              key={`${item?.exercise_id?._id}-${index}`}
              exercise={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionCourseCart;
