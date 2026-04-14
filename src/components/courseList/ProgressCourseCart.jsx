import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Title from "../measurements/Tilte";
import PersonalExercise from "../PersonalExercise";
import RecipeParagraph from "../recipe/RecipeParagraph";
import { Button } from "../ui/button";

const ProgressCourseCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const workout = location.state?.workout || {};
  const training = location.state?.training || {};

  // Find the matching workout from training.workouts array
  const selectedWorkout = useMemo(() => {
    if (!training?.workouts || !Array.isArray(training.workouts)) {
      return null;
    }
    
    // Try to find workout by matching workout._id
    const found = training.workouts.find(
      (w) => w.workout?._id === workout?._id || w._id === workout?._id
    );
    
    // If not found, use first workout as fallback
    return found || training.workouts[0] || null;
  }, [training, workout]);

  // Get exercises from training.workouts[].exercises
  const exercises = useMemo(() => {
    return selectedWorkout?.exercises || [];
  }, [selectedWorkout]);

  // Validate data and handle missing state
  useEffect(() => {
    if (!workout || !training) {
      toast.error("נתונים חסרים. מועבר לדף הבית...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    }
  }, [workout, training, navigate]);
  // console.log(exercises);
 
  console.log("workoutdata:",workout);
  // console.log(training);

  // Show loading state if navigating or missing data
  if (isNavigating) {
    return (
      <div className="bg-[#7994CB] min-h-screen border-b-8 border-white py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <p className="text-white font-semibold" dir="rtl">טוען...</p>
        </div>
      </div>
    );
  }

  if (!workout || !training) {
    return (
      <div className="bg-[#7994CB] min-h-screen border-b-8 border-white py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <p className="text-white font-semibold" dir="rtl">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#7994CB] min-h-screen border-b-8 border-white py-12 transition-all duration-300">
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10 transition-all duration-300">
        <Title title={workout?.name} />
        <RecipeParagraph trainingDesc={workout?.description} />

        <div className="flex flex-col md:flex-row-reverse gap-4">
          <Link 
            to={"/startTraining"} 
            state={{ 
              workout: selectedWorkout || workout,
              training: training,
              // Also pass as data for compatibility with task-based flow
              data: {
                exercises: exercises,
                name: selectedWorkout?.workout?.name || workout?.name || training?.training_id?.name,
                workout_id: selectedWorkout?.workout?._id || workout?._id,
                task_id: selectedWorkout?.task_id || workout?.task_id || null,
                user_training_workout_id: selectedWorkout?.user_training_workout_id || workout?.user_training_workout_id || null,
              }
            }}
            onClick={() => setIsNavigating(true)}
          >
            <Button 
              className="text-sm font-bold text-white bg-[#7994CB] hover:bg-[#6a84b8] px-8 py-4 rounded-full sm:my-10 my-0 w-52 md:w-40 h-12 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isNavigating || !selectedWorkout}
              dir="rtl"
            >
              {isNavigating ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  טוען...
                </>
              ) : (
                "התחלת אימון"
              )}
            </Button>
          </Link>
          <Link 
            to="/customize-workout" 
            state={{ workout: selectedWorkout || workout, training }}
            onClick={() => setIsNavigating(true)}
          >
            <Button 
              className="text-sm font-bold text-black hover: bg-gray-100 hover:bg-gray-200 border border-gray-400 px-10 py-4 rounded-full sm:my-10 my-0 w-52 md:w-44 h-12 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isNavigating || !selectedWorkout}
              dir="rtl"
            >
              {isNavigating ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  טוען...
                </>
              ) : (
                "התאם אישית את האימון"
              )}
            </Button>
          </Link>
        </div>

        <p
          dir="rtl"
          className="text-[#0A2533] font-bold text-xl py-10 text-center transition-all duration-300"
        >
          תרגילים:
        </p>

        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-gray-500 text-lg font-medium" dir="rtl">
              אין תרגילים זמינים
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 w-full">
            {exercises.map((exercise, index) => (
              <div 
                key={exercise._id || index} 
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <PersonalExercise exercise={exercise} />
              </div>
            ))}
          </div>
        )}
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
