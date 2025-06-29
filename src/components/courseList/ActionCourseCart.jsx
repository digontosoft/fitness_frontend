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
  console.log("workoutData:", workoutData);

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
    // <div className="bg-gradient-to-br from-[rgb(148,0,25)] to-[#FD4753] min-h-screen h-auto py-12">
    // </div>
    <div className="bg-custom-radial relative flex items-center justify-center min-h-screen sm:mb-2">
      <div className="flex flex-col items-center max-w-6xl mx-auto sm:min-h-full min-h-screen h-auto bg-[#FDFDFD] sm:rounded-3xl rounded-b-none rounded-t-3xl p-2 md:p-10 relative sm:mt-0 mt-10">
        <Title title={workoutData?.task_name} />
        <RecipeParagraph trainingDesc={workoutData?.task_description} />
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={EditCourse}
            className="text-sm font-bold text-black hover:text-white bg-gray-100  border border-gray-400 px-10 py-4 rounded-full sm:mt-10 mt-0 w-48 md:w-40 h-12 "
          >
            עריכת האימון
          </Button>
          <Button
            onClick={handleCourse}
            className="text-sm font-bold text-white  bg-gradient-to-tr from-[rgb(148,0,25)] to-[#FD4753] px-8 py-4 rounded-full sm:mt-10 mt-0 w-48 md:w-40 h-12"
          >
            התחלת אימון
          </Button>
        </div>
        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl px-4 py-10 relative transform sm:-translate-x-0 sm:left-0 -translate-x-1/2 left-1/2"
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
