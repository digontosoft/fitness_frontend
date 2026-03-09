import CommonContainer from "@/components/startTraining/CommonContainer";
import CourseContent from "@/components/courseList/CourseContent";
import HeroVideo from "@/components/startTraining/HeroVideo";
import LastExercise from "@/components/startTraining/LastExercise";
import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonGroup from "@/components/startTraining/ButtonGroup";
import Title from "@/components/measurements/Tilte";
import axios from "axios";
import { toast } from "sonner";
import { base_url } from "@/api/baseUrl";
const StartTraining = () => {
  const location = useLocation();
  const workData = location.state?.data || {};
  const training = location.state?.training || location.state?.trainings || {};
  const workout = location.state?.workout || {};
  
  console.log("=== StartTraining Data ===");
  console.log("workData:", workData);
  console.log("training:", training);
  console.log("workout:", workout);
  console.log("training.workouts:", training?.workouts);
  
  // Handle different data sources:
  // 1. Task-based flow (ActionCourseCart): workData has userTrainingExercise
  // 2. Training.workouts flow: training.workouts[0].exercises
  // 3. Workout list flow: workout.exercises
  
  let allExercises = [];
  let selectedWorkoutData = null;
  let taskId = null;
  let userTrainingWorkoutId = null;
  let taskName = null;
  
  // Priority 1: Check if coming from training.workouts structure (customize workout flow)
  if (training?.workouts && training.workouts.length > 0) {
    // Get first workout or find by workout._id if available
    selectedWorkoutData = workout?._id 
      ? training.workouts.find(w => w.workout?._id === workout._id || w._id === workout._id)
      : training.workouts[0];
    
    if (selectedWorkoutData?.exercises) {
      allExercises = selectedWorkoutData.exercises;
      taskId = selectedWorkoutData.task_id;
      userTrainingWorkoutId = selectedWorkoutData.user_training_workout_id;
      taskName = selectedWorkoutData.workout?.name || training.training_id?.name;
    }
  }
  // Priority 2: Check if coming from task-based flow (ActionCourseCart)
  else if (workData?.userTrainingExercise && workData.userTrainingExercise.length > 0) {
    allExercises = workData.userTrainingExercise;
    taskId = workData.task_id;
    userTrainingWorkoutId = workData.user_training_workout_id;
    taskName = workData.task_name;
  }
  // Priority 3: Check if coming from workout list (workout.exercises)
  else if (workout?.exercises && workout.exercises.length > 0) {
    allExercises = workout.exercises;
    taskId = workout?.task_id;
    userTrainingWorkoutId = workout?.user_training_workout_id;
    taskName = workout?.name;
  }
  // Priority 4: Fallback to workData.exercises
  else if (workData?.exercises && workData.exercises.length > 0) {
    allExercises = workData.exercises;
    taskId = workData.task_id;
    userTrainingWorkoutId = workData.user_training_workout_id;
    taskName = workData.task_name || workData.name;
  }
  
  console.log("Selected workout data:", selectedWorkoutData);
  console.log("All exercises:", allExercises);
  console.log("Task ID:", taskId);
  console.log("User Training Workout ID:", userTrainingWorkoutId);
  console.log("Task Name:", taskName);
  // Convert exercises to userTrainingExercise format (preserve sets, reps, manipulation)
  const exercisesToUse = allExercises.length > 0 
    ? allExercises.map((ex) => {
        // If already in userTrainingExercise format (has exercise_id object)
        if (ex.exercise_id && typeof ex.exercise_id === 'object') {
          return {
            ...ex,
            sets: ex.sets || 0,
            reps: ex.reps || 0,
            manipulation: ex.manipulation || "",
          };
        }
        // Otherwise keep as is
        return ex;
      })
    : [];
  
  // Update workData with extracted values
  const finalWorkData = {
    ...workData,
    task_id: taskId || workData.task_id,
    user_training_workout_id: userTrainingWorkoutId || workData.user_training_workout_id,
    task_name: taskName || workData.task_name,
    userTrainingExercise: exercisesToUse,
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [exerciseData, setExerciseData] = useState({});
  const [valid, setValid] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track progress
  const completedExercisesCount = Object.keys(exerciseData).filter(
    (key) => exerciseData[key]?.sets_done && exerciseData[key]?.reps_done && exerciseData[key]?.lastSet
  ).length;
  const totalExercises = exercisesToUse.length;
  const progressPercentage = totalExercises > 0 
    ? Math.round((completedExercisesCount / totalExercises) * 100) 
    : 0;

  useEffect(() => {
    if (valid.sets_done && valid.reps_done && valid.lastSet) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [valid, buttonDisabled]);

  console.log("exerciseData", Object.values(exerciseData));
  const data = Object.values(exerciseData);

  useEffect(() => {
    if (data[currentIndex]) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [currentIndex, data]);
  
  const navigate = useNavigate();
  const isSuperset =
    exercisesToUse[currentIndex]?.manipulation?.toLowerCase() ===
    "superset";

  const handleInputChange = (courseId, value) => {
    setValid(value);

    // Get current exercise data to preserve sets, reps, manipulation
    const currentExercise = exercisesToUse.find(
      (ex) => (ex.exercise_id?._id || ex._id) === courseId
    ) || exercisesToUse.find(
      (ex, idx) => `course-${idx}` === courseId
    );

    setExerciseData((prev) => ({
      ...prev,
      [courseId]: { 
        ...prev[courseId], 
        ...value,
        // Preserve workout data (target values)
        target_sets: currentExercise?.sets || 0,
        target_reps: currentExercise?.reps || 0,
        manipulation: currentExercise?.manipulation || "",
      },
    }));
  };

  const getNextIndex = () => {
    let nextIndex = currentIndex + 1;

    if (nextIndex < exercisesToUse.length) {
      return nextIndex;
    }

    return currentIndex;
  };

  const getPreviousIndex = () => {
    let prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      return prevIndex;
    }

    return currentIndex;
  };

  const handleNext = () => {
    const nextIndex = getNextIndex();

    if (nextIndex !== currentIndex) {
      setButtonDisabled(true);
      setCurrentIndex(nextIndex);
      setShowPrevious(true);

      if (
        exercisesToUse.length === 1 ||
        nextIndex === exercisesToUse.length - 1
      ) {
        setIsFinished(true);
      }
    }
  };

  const handlePrevious = () => {
    const prevIndex = getPreviousIndex();

    if (prevIndex !== currentIndex) {
      setCurrentIndex(prevIndex);
      setShowPrevious(prevIndex > 0);
      setIsFinished(false);
    }
  };

  const handleFinish = async () => {
    // Validation: Check if required data exists for API call
    if (!finalWorkData.task_id || !finalWorkData.user_training_workout_id) {
      toast.error("Missing required task information. Cannot complete workout.");
      console.error("Missing data:", { 
        task_id: finalWorkData.task_id, 
        user_training_workout_id: finalWorkData.user_training_workout_id 
      });
      return;
    }

    // Map exercise data with proper exercise_id from exercisesToUse
    const exerciseDataArray = Object.entries(exerciseData)
      .map(([key, value]) => {
        // Find the actual exercise_id from exercisesToUse
        const exercise = exercisesToUse.find(
          (ex) => (ex.exercise_id?._id || ex._id) === key
        ) || exercisesToUse.find(
          (ex, idx) => `course-${idx}` === key
        );
        
        const exerciseId = exercise?.exercise_id?._id || exercise?._id || key;
        
        return {
          exercise_id: exerciseId,
          sets_done: Number(value.sets_done) || 0,
          reps_done: Number(value.reps_done) || 0,
        };
      })
      .filter((item) => item.sets_done > 0 || item.reps_done > 0);

    if (exerciseDataArray.length === 0) {
      toast.error("Please complete at least one exercise");
      return;
    }

    const payload = {
      task_id: finalWorkData.task_id,
      user_training_workout_id: finalWorkData.user_training_workout_id,
      excerciseData: exerciseDataArray,
    };
    
    console.log("=== Final Workout Submission ===");
    console.log("Total exercises:", totalExercises);
    console.log("Completed exercises:", completedExercisesCount);
    console.log("Progress:", `${progressPercentage}%`);
    console.log("Final payload:", payload);
    console.log("================================");
    
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${base_url}/complete-workout-task`,
        payload
      );
      if (response.status === 200) {
        toast.success("Workout completed successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error completing workout:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to complete workout";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextIndex = currentIndex + 1;
  const currentExercise = exercisesToUse[currentIndex] || {};
  const courseId =
    currentExercise?.exercise_id?._id || currentExercise?._id || `course-${currentIndex}`;

  // console.log("current index data", currentIndex);
  // console.log("workout", workData);

  return (
    <div className="px-2">
      <CommonContainer>
        <>
          {/* Progress Indicator */}
          {totalExercises > 0 && (
            <div className="mb-4 mt-10" dir="rtl">
              <div className="flex justify-between items-center mb-2 gap-2">
                <span className="text-sm font-semibold text-[#0A2533]">
                  התקדמות: {completedExercisesCount} מתוך {totalExercises} תרגילים
                </span>
                <span className="text-sm font-semibold text-[#7994CB]">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#7994CB] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <Title title={finalWorkData?.task_name || taskName} />
          <Title
            title={currentExercise?.exercise_id?.name || currentExercise?.name}
          />
          <HeroVideo
            videoUrl={
              currentExercise?.exercise_id?.video_url || currentExercise?.video_url
            }
          />
          <CourseContent
            description={
              currentExercise?.exercise_id?.description || currentExercise?.description
            }
          />
          <LastExercise
            currentExercise={currentExercise}
          />
          <ExcersizeInput
            exerciseData={currentExercise}
            value={exerciseData[courseId] || {}}
            onChange={(value) => handleInputChange(courseId, value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentIndex === 0}
            isLast={currentIndex === exercisesToUse.length - 1}
          />

          {isSuperset && nextIndex < exercisesToUse.length && (
            <>
              <Title
                title={exercisesToUse[nextIndex]?.exercise_id?.name || exercisesToUse[nextIndex]?.name}
              />
              <HeroVideo
                videoUrl={
                  exercisesToUse[nextIndex]?.exercise_id?.video_url || exercisesToUse[nextIndex]?.video_url
                }
              />
              <CourseContent
                description={
                  exercisesToUse[nextIndex]?.exercise_id?.description || exercisesToUse[nextIndex]?.description
                }
              />
              <LastExercise
                currentExercise={exercisesToUse[nextIndex] || {}}
              />
              <ExcersizeInput
                exerciseData={exercisesToUse[nextIndex] || {}}
                value={exerciseData[exercisesToUse[nextIndex]?.exercise_id?._id || exercisesToUse[nextIndex]?._id || `course-${nextIndex}`] || {}}
                onChange={(value) => handleInputChange(exercisesToUse[nextIndex]?.exercise_id?._id || exercisesToUse[nextIndex]?._id || `course-${nextIndex}`, value)}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentIndex === 0}
                isLast={currentIndex === exercisesToUse.length - 1}
              />
            </>
          )}
        </>
        <ButtonGroup
          onNext={isFinished ? handleFinish : handleNext}
          onPrevious={handlePrevious}
          showPrevious={showPrevious}
          isFinished={isFinished}
          disabled={buttonDisabled || isSubmitting}
        />
      </CommonContainer>
    </div>
  );
};

export default StartTraining;

// import CommonContainer from "@/components/startTraining/CommonContainer";
// import CourseContent from "@/components/courseList/CourseContent";
// import HeroVideo from "@/components/startTraining/HeroVideo";
// import LastExercise from "@/components/startTraining/LastExercise";
// import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ButtonGroup from "@/components/startTraining/ButtonGroup";
// import Title from "@/components/measurements/Tilte";
// import axios from "axios";
// import { toast } from "sonner";
// import { base_url } from "@/api/baseUrl";

// const StartTraining = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const workData = location.state?.data || {};
//   console.log("workout data from start", workData);
//   const { userTrainingExercise = [], exercises = [] } = workData;
//   const allExercises = userTrainingExercise.length
//     ? userTrainingExercise
//     : exercises;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showPrevious, setShowPrevious] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [exerciseData, setExerciseData] = useState({});
//   const [buttonDisabled, setButtonDisabled] = useState(true);

//   const currentExercise = allExercises[currentIndex] || {};
//   const nextExercise = allExercises[currentIndex + 1];
//   const courseId =
//     currentExercise?.exercise_id?._id || `course-${currentIndex}`;
//   const isSuperset =
//     currentExercise?.manipulation?.toLowerCase() === "superset";

//   // Enable next only if all required fields are present
//   useEffect(() => {
//     const value = exerciseData[courseId] || {};
//     const isValid = value.sets_done && value.reps_done && value.lastSet;
//     setButtonDisabled(!isValid);
//   }, [exerciseData, currentIndex, courseId]);

//   const handleInputChange = (courseId, value) => {
//     setExerciseData((prev) => ({
//       ...prev,
//       [courseId]: { ...prev[courseId], ...value },
//     }));
//   };

//   const handleNext = () => {
//     const nextIndex = currentIndex + 1;

//     if (nextIndex < allExercises.length) {
//       setCurrentIndex(nextIndex);
//       setShowPrevious(true);
//       setIsFinished(nextIndex === allExercises.length - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const handlePrevious = () => {
//     const prevIndex = currentIndex - 1;

//     if (prevIndex >= 0) {
//       setCurrentIndex(prevIndex);
//       setShowPrevious(prevIndex > 0);
//       setIsFinished(false);
//       window.scrollTo(0, 0);
//     }
//   };

//   const handleFinish = async () => {
//     const payload = {
//       task_id: workData.task_id,
//       user_training_workout_id: workData.user_training_workout_id,
//       excerciseData: Object.entries(exerciseData).map(([key, value]) => ({
//         exercise_id: key,
//         sets_done: Number(value.sets_done),
//         reps_done: Number(value.reps_done),
//       })),
//     };
//     // console.log("payload", payload);
//     // const payload = {
//     //   task_id: workData.task_id,
//     //   user_training_workout_id: workData.user_training_workout_id,
//     //   excerciseData: allExercises.map((exercise, index) => {
//     //     const id = exercise?.exercise_id?._id;
//     //     const data = exerciseData[id] || exerciseData[`course-${index}`] || {};

//     //     return {
//     //       exercise_id: id,
//     //       sets_done: Number(data.sets_done || 0),
//     //       reps_done: Number(data.reps_done || 0),
//     //     };
//     //   }),
//     // };

//     try {
//       const response = await axios.post(
//         `${base_url}/complete-workout-task`,
//         payload
//       );
//       if (response.status === 200) {
//         toast.success("Workout completed successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong while completing the workout.");
//     }
//   };

//   return (
//     <div className="sm:px-0 px-2">
//       <CommonContainer>
//         <>
//           <Title title={currentExercise?.exercise_id?.name} />
//           <HeroVideo
//             videoUrl={currentExercise?.exercise_id?.video_url}
//             className="mt-0 sm:mt-10"
//           />
//           <CourseContent
//             description={currentExercise?.exercise_id?.description}
//           />
//           <LastExercise currentExercise={currentExercise} />
//           <ExcersizeInput
//             exerciseData={currentExercise}
//             value={exerciseData[courseId] || {}}
//             onChange={(value) => handleInputChange(courseId, value)}
//             onNext={handleNext}
//             onPrevious={handlePrevious}
//             isFirst={currentIndex === 0}
//             isLast={currentIndex === allExercises.length - 1}
//           />

//           {isSuperset && nextExercise && (
//             <>
//               <Title title={nextExercise?.exercise_id?.name} />
//               <HeroVideo videoUrl={nextExercise?.exercise_id?.video_url} />
//               <CourseContent
//                 description={nextExercise?.exercise_id?.description}
//               />
//               <LastExercise currentExercise={nextExercise} />
//             </>
//           )}
//         </>
//         <ButtonGroup
//           onNext={isFinished ? handleFinish : handleNext}
//           onPrevious={handlePrevious}
//           showPrevious={showPrevious}
//           isFinished={isFinished}
//           disabled={buttonDisabled}
//         />
//       </CommonContainer>
//     </div>
//   );
// };

// export default StartTraining;

