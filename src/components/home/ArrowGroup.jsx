import ArrowCard from "./ArrowCard";
import { bodyBuilder3 } from "@/assets";
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
    } else {
      onclick(task);
    }
  };
  return (
    <ArrowCard
      onClick={handleClick}
      tilte={task?.task_name}
      tilte1={task?.task_description}
      image={bodyBuilder3}
    />
  );
};

export default ArrowGroup;
