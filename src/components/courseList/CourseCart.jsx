import cartBg from "../../assets/image/workoutList/Bg.png";
import whiteLogo from "../../assets/image/whiteLogo.png";
import icon from "../../assets/image/right-arm.svg";
import HeroVideo from "../startTraining/HeroVideo";
import ReactPlayer from "react-player";
const CourseCart = ({ exercise, handleOpen }) => {
  console.log("exercise:", exercise);
  return (
    <div
      className="w-[310px] sm:w-56 shadow-xl rounded-2xl p-3 mt-8 cursor-pointer"
      onClick={() => handleOpen(exercise._id)}
    >
      {/* <div
        className="w-full h-40 rounded-2xl flex justify-center items-center "
        style={{
          backgroundImage: `url(${cartBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img className="w-20 h-20" src={whiteLogo} alt="" />
      </div> */}
      {exercise?.video_url && (
        <div className="overflow-hidden rounded-2xl">
          <ReactPlayer
            url={exercise?.video_url}
            height="50%"
            width="100%"
            controls
          />
        </div>
      )}
      <div className="px-6 py-4">
        <p className="text-[#0A2533]  text-sm font-bold text-end">
          {exercise?.name}
        </p>
        <div className="flex gap-2  items-center flex-row-reverse">
          <img src={icon} alt="" />
          <p>{exercise.body_part}</p>
        </div>
        <div className="flex gap-2  items-center flex-row-reverse">
          <img src={icon} alt="" />
          <p>{exercise?.equipment}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
