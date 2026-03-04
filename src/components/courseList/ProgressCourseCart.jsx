import Title from "../measurements/Tilte";
import RecipeParagraph from "../recipe/RecipeParagraph";
import VideoCourseCart from "../common/VideoCourseCart";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import PersonalExercise from "../PersonalExercise";
import { useEffect } from "react";
const ProgressCourseCart = () => {
  const location = useLocation();
  const workout = location.state?.workout || { exercises: [] };
  const training = location.state?.training || {};

  console.log(training, "training from workout list");
  console.log(workout, "workout from workout list");

  useEffect(() => {}, [workout, training]);
  return (
    <div className=" bg-[#7994CB] min-h-screen border-b-8 border-white py-12  ">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <Title title={training?.training_id?.name} />
        <RecipeParagraph trainingDesc={training?.training_id?.description} />

        <div className="flex flex-col md:flex-row-reverse gap-4">
          {/* startTraining এ এখন workout + training দুইটাই state এ যাবে */}
          <Link to={"/startTraining"} state={{ data: workout, training }}>
            <Button className="text-sm font-bold text-white  bg-[#7994CB] px-8 py-4 rounded-full sm:my-10 my-0 w-52 md:w-40 h-12">
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
          className="text-[#0A2533] font-bold text-xl py-10 text-center"
        >
          תרגילים:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {(workout?.exercises || []).map((exercise) => (
            <PersonalExercise key={exercise?._id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCourseCart;


// import Title from "../measurements/Tilte";
// import RecipeParagraph from "../recipe/RecipeParagraph";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import PersonalExercise from "../PersonalExercise";
// import { useEffect } from "react";

// const ProgressCourseCart = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // data should be passed to /startTraining page
//   const workout = location.state?.workout || null;
//   const training = location.state?.training || null;

//   // If no workout, redirect to home page
//   useEffect(() => {
//     if (!workout) {
//       navigate("/");
//     }
//   }, [workout, navigate]);

//   // Navigate with all necessary state
//   const handleStartTraining = () => {
//     navigate("/startTraining", {
//       state: {
//         data: workout,
//         workout: workout,
//         training: training
//       }
//     });
//   };

//   const handleCustomizeWorkout = () => {
//     navigate("/customize-workout", {
//       state: { workout, training }
//     });
//   };

//   if (!workout) return null;

//   return (
//     <div className="bg-[#7994CB] min-h-screen border-b-8 border-white py-12">
//       <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
//         <Title title={training?.training_id?.name || "Training"} />
//         <RecipeParagraph trainingDesc={training?.training_id?.description || ""} />

//         <div className="flex flex-col md:flex-row-reverse gap-4">
//           <Button
//             className="text-sm font-bold text-white bg-[#7994CB] px-8 py-4 rounded-full sm:my-10 my-0 w-52 md:w-40 h-12"
//             onClick={handleStartTraining}
//           >
//             התחלת אימון
//           </Button>

//           <Button
//             className="text-sm font-bold text-black hover:text-white bg-gray-100 border border-gray-400 px-10 py-4 rounded-full sm:my-10 my-0 w-52 md:w-44 h-12"
//             onClick={handleCustomizeWorkout}
//           >
//             התאם אישית את האימון
//           </Button>
//         </div>

//         <p
//           dir="rtl"
//           className="text-[#0A2533] font-bold text-xl py-10 text-center"
//         >
//           תרגילים:
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
//           {(workout?.exercises || []).map((exercise) => (
//             <PersonalExercise
//               key={exercise?._id}
//               exercise={exercise}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressCourseCart;
