import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ActionCourseCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const workoutData = location.state.data;

  const handleCourse = () => {
    navigate("/startTraining", { state: { data: workoutData } });
    window.scrollTo(0, 0);
  };
  const EditCourse = () => {
    navigate("/edit-exercise", { state: { data: workoutData } });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title title={workoutData?.task_name} />
        <RecipeParagraph trainingDesc={workoutData?.task_description} />
        <div className="flex items-center flex-col md:flex-row gap-10">
          {" "}
          <Button
            onClick={handleCourse}
            className="text-sm font-bold text-white  bg-gradient-to-tr from-[rgb(148,0,25)] to-[#FD4753] px-8 py-4 rounded-full sm:mt-10 mt-0 w-52 md:w-40 h-12"
          >
            התחלת אימון
          </Button>
          <Button
            onClick={EditCourse}
            className="text-sm font-bold text-black  bg-gradient-to-tr from-gray-100 to-gray-200 px-8 py-4 rounded-full sm:mt-10 mt-0 w-52 md:w-40 h-12 border border-black"
          >
            עריכת האימון
          </Button>
        </div>

        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text center"
        >
          תרגילים:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {workoutData?.userTrainingExercise?.map((item, index) => (
            <VideoCourseCart key={index} exercise={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionCourseCart;
