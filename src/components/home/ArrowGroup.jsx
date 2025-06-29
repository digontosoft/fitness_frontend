import ArrowCard from "./ArrowCard";
import bodyBuilder3 from "@/assets/image/body-builder.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const ArrowGroup = ({ task, onclick }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    if (task?.task_type === "workout") {
      try {
        const requestBody = {
          userId: task?.user_id,
          workoutId: task?.workout_id,
          taskId: task?._id,
        };

        const response = await axios.post(
          `${base_url}/get-user-workout-task`,
          requestBody
        );
        if (response?.data) {
          navigate(`/action-course-cart/${task?._id}`, {
            state: response.data,
          });
        }
      } catch (error) {
        console.error("Error fetching workout task:", error);
      }
    } else if (task.task_type === "measurement") {
      console.log("Navigating to /measurements with data:", task);
      navigate("/mesurement-complete", { state: task });
    } else if (task.task_type === "food_dairy") {
      navigate("/food-dairy", { state: task });
    } else {
      onclick(task);
    }
  };
  return (
    <ArrowCard
      onClick={handleClick}
      tilte={task?.task_name}
      tilte1={task?.task_description}
      taskType={task?.task_type}
      image={bodyBuilder3}
    />
  );
};

export default ArrowGroup;
