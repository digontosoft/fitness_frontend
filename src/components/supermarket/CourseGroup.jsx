import CourseCart from "./CourseCart";
const CourseGroup = ({ course }) => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4 pb-10">
      {course?.video?.map((video) => (
        <CourseCart key={video._id} video={video} />
      ))}
    </div>
  );
};

export default CourseGroup;
