import cartBg from "../../assets/image/workoutList/Bg.png";
import whiteLogo from "../../assets/image/whiteLogo.png";
import icon from "../../assets/image/courseList/Bicep.png";
const CourseCart = ({ exercise }) => {
  return (
    <div className="md:w-52 w-48 shadow-xl rounded-2xl p-3 mt-8">
      <div
        className="w-full h-40 rounded-2xl flex justify-center items-center "
        style={{
          backgroundImage: `url(${cartBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img className="w-20 h-20" src={whiteLogo} alt="" />
      </div>
      <div className="px-6 py-4">
        <p className="text-[#0A2533]  text-sm font-bold text-end">
          {exercise?.name}
        </p>
        <div className="flex gap-2 justify-end items-center">
          {/* <p className="text-[#97A2B0] text-xs">{subTitle}</p> */}
          <img src={icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
