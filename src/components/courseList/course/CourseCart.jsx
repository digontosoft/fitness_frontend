import { file_url } from "@/api/baseUrl";
import { Link } from "react-router-dom";
const CourseCart = ({ course }) => {
  const imageUrl = `${file_url}/${course?.image}`;
  return (
    <Link to={`/supermarket/${course?._id}`}>
      <div
        className={`relative w-80 h-[450px] bg-white shadow-md  rounded-2xl p-4
        `}
      >
        <div className="flex flex-col justify-between items-center gap-6">
          <img src={imageUrl} alt={course?.title} className="rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
            <h1 className="text-2xl font-bold text-center">{course?.title}</h1>
            <p className="text-sm font-normal text-center">
              {course?.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCart;
