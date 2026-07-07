import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VideoCourseCart from "../common/VideoCourseCart";
import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import { Button } from "../ui/button";

const ActionCourseCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: routeTaskId } = useParams();
  const workoutData = location.state?.data;
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [exercises, setExercises] = useState(
    workoutData?.userTrainingExercise || []
  );

  const fetchExercises = useCallback(async () => {
    const taskId = routeTaskId || workoutData?.task_id;
    if (!user?._id || !taskId) return;
    try {
      const taskRes = await axios.get(`${base_url}/get-user-task/${user._id}`);
      const matchedTask = taskRes.data.data?.find((t) => t._id === taskId);
      if (!matchedTask) return;

      const response = await axios.post(`${base_url}/get-user-workout-task`, {
        userId: user._id,
        workoutId: matchedTask.workout_id,
        taskId: matchedTask._id,
      });
      setExercises(response.data.data.userTrainingExercise);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }, [user?._id, routeTaskId, workoutData?.task_id]);

  useEffect(() => {
    fetchExercises();
    window.scrollTo(0, 0);
  }, [fetchExercises]);

  const handleCourse = () => {
    navigate("/startTraining", {
      state: { data: { ...workoutData, userTrainingExercise: exercises } },
    });
    window.scrollTo(0, 0);
  };

  const EditCourse = () => {
    navigate("/edit-exercise", { state: { data: workoutData } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#7994CB] relative flex items-center justify-center min-h-screen sm:mb-2">
      <div className="flex flex-col items-center max-w-6xl mx-auto sm:min-h-full min-h-screen h-auto bg-[#FDFDFD] sm:rounded-3xl rounded-b-none rounded-t-3xl p-2 md:p-10 relative sm:mt-0 mt-10">
        <Title title={workoutData?.task_name} />
        <RecipeParagraph trainingDesc={workoutData?.task_description} />
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4">
          <Button
            onClick={handleCourse}
            className="text-sm font-bold text-white bg-[#7994CB] px-8 py-4 rounded-full sm:mt-10 mt-0 w-48 md:w-40 h-12"
          >
            התחלת אימון
          </Button>
          <Button
            onClick={EditCourse}
            className="text-sm font-bold text-black hover:text-white bg-gray-100 border border-gray-400 px-10 py-4 rounded-full sm:mt-10 mt-0 w-48 md:w-40 h-12"
          >
            עריכת האימון
          </Button>
        </div>
        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl px-4 py-10 relative transform sm:-translate-x-0 sm:left-0 -translate-x-1/2 left-1/2"
        >
          תרגילים:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {exercises?.map((item, index) => (
            <VideoCourseCart key={item._id ?? index} exercise={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionCourseCart;
