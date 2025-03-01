import { useParams } from "react-router-dom";
import FormTitle from "../ui/FormTitle";
import AddWorkoutForm from "./AddWorkoutForm";

const WorkoutProgramms = () => {
  const { id } = useParams();
  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title="הוספת אימון חדש" />
          <AddWorkoutForm workoutId={id} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutProgramms;
