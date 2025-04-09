import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
const ProgressCourseCart = () => {
  const {
    state: { workout, training },
  } = useLocation();

  return (
    <div className=" bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title title={training?.training_id?.name} />
        <RecipeParagraph trainingDesc={training?.training_id?.description} />
        {/* <Subtitle /> */}
        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text center"
        >
          תרגילים:
        </p>
        <Link to="/customize-workout" state={{ workout, training }}>
          <Button className="text-sm font-bold text-white  bg-gradient-to-tr from-[rgb(148,0,25)] to-[#FD4753] px-8 py-4 rounded-full my-10 w-52 md:w-40 h-12">
            התאם אישית את האימון
          </Button>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {workout.exercises.map((exercise) => (
            <VideoCourseCart key={exercise._id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCourseCart;
