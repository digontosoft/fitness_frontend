import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import PersonalExercise from "../PersonalExercise";
import { useEffect } from "react";
const ProgressCourseCart = () => {
  const location = useLocation();
  const workout = location.state?.workout;
  const training = location.state?.training;

  useEffect(() => {}, [workout, training]);

  console.log("workout:", workout);
  return (
    <div className=" bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title title={training?.training_id?.name} />
        <RecipeParagraph trainingDesc={training?.training_id?.description} />

        <div className="flex flex-col md:flex-row-reverse gap-4">
          <Link to={"/startTraining"} state={{ data: workout }}>
            <Button className="text-sm font-bold text-white  bg-gradient-to-tr from-[rgb(148,0,25)] to-[#FD4753] px-8 py-4 rounded-full sm:my-10 my-0 w-52 md:w-40 h-12">
              התחלת אימון
            </Button>
          </Link>
          <Link to="/customize-workout" state={{ workout, training }}>
            <Button className="text-sm font-bold text-black hover:text-white bg-gray-100  border border-gray-400 px-10 py-4 rounded-full sm:my-10 my-0 w-52 md:w-44 h-12">
              התאם אישית את האימון
            </Button>
          </Link>
        </div>

        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text center"
        >
          תרגילים:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {workout.exercises.map((exercise) => (
            <PersonalExercise key={exercise._id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCourseCart;
