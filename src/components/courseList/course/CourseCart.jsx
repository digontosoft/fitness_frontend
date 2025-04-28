// import { base_url } from "@/api/baseUrl";
// import { Link } from "react-router-dom";
// const CourseCart = ({ course }) => {
//   const imageUrl = `${base_url}/${course?.image}`;
//   const user = JSON.parse(localStorage.getItem("userInfo"));
//   const title =
//     user.gender === "male"
//       ? course?.male_supermaket || course?.male_kitchen
//       : course?.female_supermaket || course?.female_kitchen;
//   return (
//     <Link to={`/supermarket/${course?._id}`}>
//       <div
//         className={`relative w-80 h-[450px] bg-white shadow-md  rounded-2xl p-4
//         `}
//       >
//         <div className="flex flex-col justify-between items-center gap-6">
//           <img src={imageUrl} alt={course?.title} className="rounded-xl" />

//           <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
//             <h1 className="text-2xl font-bold text-center" dir="rtl">
//               {title}
//             </h1>
//             <p className="text-sm font-normal text-center" dir="rtl">
//               {course?.description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CourseCart;

import { base_url } from "@/api/baseUrl";
import { Link } from "react-router-dom";

const CourseCart = ({ course }) => {
  const imageUrl = `${base_url}/${course?.image}`;
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // Determine the appropriate title based on course type and user gender
  const getCourseTitle = () => {
    if (course?.title === "חכם בסופר") {
      // Supermarket course
      return user.gender === "male"
        ? course?.male_supermaket || course?.title
        : course?.female_supermaket || course?.title;
    } else if (course?.title === "חכם במטבח") {
      // Kitchen course
      return user.gender === "male"
        ? course?.male_kitchen || course?.title
        : course?.female_kitchen || course?.title;
    }
    return course?.title; // Fallback
  };

  const title = getCourseTitle();

  return (
    <Link to={`/supermarket/${course?._id}`}>
      <div
        className={`relative w-80 h-[450px] bg-white shadow-md rounded-2xl p-4`}
      >
        <div className="flex flex-col justify-between items-center gap-6">
          <img src={imageUrl} alt={course?.title} className="rounded-xl" />

          <div className="flex justify-center items-center flex-col gap-4 text-[#0A2533]">
            <h1 className="text-2xl font-bold text-center" dir="rtl">
              {title}
            </h1>
            <p className="text-sm font-normal text-center" dir="rtl">
              {course?.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCart;
