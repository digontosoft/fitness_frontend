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
//   const workData = location.state?.data || {};
//   console.log("data from start", workData);
//   // const { userTrainingExercise = [] } = workData;
//   const { userTrainingExercise, exercises } = workData;
//   const allExercises = userTrainingExercise || exercises || [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showPrevious, setShowPrevious] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [exerciseData, setExerciseData] = useState({});
//   const [valid, setValid] = useState({});
//   const [buttonDisabled, setButtonDisabled] = useState(true);

//   useEffect(() => {
//     if (valid.sets_done && valid.reps_done && valid.lastSet) {
//       setButtonDisabled(false);
//     } else {
//       setButtonDisabled(true);
//     }
//   }, [valid, buttonDisabled]);

//   console.log("exerciseData", Object.values(exerciseData));
//   const data = Object.values(exerciseData);

//   useEffect(() => {
//     if (data[currentIndex]) {
//       setButtonDisabled(false);
//     } else {
//       setButtonDisabled(true);
//     }
//   }, [currentIndex]);
//   const navigate = useNavigate();
//   const isSuperset =
//     userTrainingExercise[currentIndex]?.manipulation?.toLowerCase() ===
//     "superset";

//   const handleInputChange = (courseId, value) => {
//     setValid(value);

//     setExerciseData((prev) => ({
//       ...prev,
//       [courseId]: { ...prev[courseId], ...value },
//     }));
//   };

//   const getNextIndex = () => {
//     let nextIndex = currentIndex + 1;

//     if (nextIndex < userTrainingExercise.length) {
//       return nextIndex;
//     }

//     return currentIndex;
//   };

//   const getPreviousIndex = () => {
//     let prevIndex = currentIndex - 1;

//     if (prevIndex >= 0) {
//       return prevIndex;
//     }

//     return currentIndex;
//   };

//   const handleNext = () => {
//     const nextIndex = getNextIndex();

//     if (nextIndex !== currentIndex) {
//       setButtonDisabled(true);
//       setCurrentIndex(nextIndex);
//       setShowPrevious(true);

//       if (
//         userTrainingExercise.length === 1 ||
//         nextIndex === userTrainingExercise.length - 1
//       ) {
//         setIsFinished(true);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     const prevIndex = getPreviousIndex();

//     if (prevIndex !== currentIndex) {
//       setCurrentIndex(prevIndex);
//       setShowPrevious(prevIndex > 0);
//       setIsFinished(false);
//     }
//   };

//   const handleFinish = async () => {
//     //console.log("All exercise data on finish:", exerciseData);

//     const payload = {
//       task_id: workData.task_id,
//       user_training_workout_id: workData.user_training_workout_id,
//       excerciseData: Object.entries(exerciseData).map(([key, value]) => ({
//         exercise_id: key,
//         sets_done: Number(value.sets_done), // Convert to number
//         reps_done: Number(value.reps_done),
//       })),
//     };
//     console.log("payload", payload);

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
//     }
//   };

//   const nextIndex = currentIndex + 1;
//   const currentExercise = userTrainingExercise[currentIndex] || {};
//   const courseId =
//     currentExercise?.exercise_id?._id || `course-${currentIndex}`;

//   console.log("current index data", currentIndex);
//   console.log("workout", workData);

//   return (
//     <div className="px-2">
//       <CommonContainer>
//         <>
//           <Title title={workData?.task_name} />
//           <Title
//             title={userTrainingExercise[currentIndex]?.exercise_id?.name}
//           />
//           <HeroVideo
//             videoUrl={
//               userTrainingExercise[currentIndex]?.exercise_id?.video_url
//             }
//           />
//           <CourseContent
//             description={
//               userTrainingExercise[currentIndex]?.exercise_id?.description
//             }
//           />
//           <LastExercise
//             currentExercise={userTrainingExercise[currentIndex] || {}}
//           />
//           <ExcersizeInput
//             exerciseData={userTrainingExercise[currentIndex] || {}}
//             value={exerciseData[courseId] || {}}
//             onChange={(value) => handleInputChange(courseId, value)}
//             onNext={handleNext}
//             onPrevious={handlePrevious}
//             isFirst={currentIndex === 0}
//             isLast={currentIndex === userTrainingExercise.length - 1}
//           />

//           {isSuperset && nextIndex < userTrainingExercise.length && (
//             <>
//               <Title
//                 title={userTrainingExercise[nextIndex]?.exercise_id?.name}
//               />
//               <HeroVideo
//                 videoUrl={
//                   userTrainingExercise[nextIndex]?.exercise_id?.video_url
//                 }
//               />
//               <CourseContent
//                 description={
//                   userTrainingExercise[currentIndex]?.exercise_id?.description
//                 }
//               />
//               <LastExercise
//                 currentExercise={userTrainingExercise[currentIndex] || {}}
//               />
//               <ExcersizeInput
//                 exerciseData={userTrainingExercise[currentIndex] || {}}
//                 value={exerciseData[courseId] || {}}
//                 onChange={(value) => handleInputChange(courseId, value)}
//                 onNext={handleNext}
//                 onPrevious={handlePrevious}
//                 isFirst={currentIndex === 0}
//                 isLast={currentIndex === userTrainingExercise.length - 1}
//               />
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
  const navigate = useNavigate();
  const workData = location.state?.data || {};
  console.log("workout data from start", workData);
  const { userTrainingExercise = [], exercises = [] } = workData;
  const allExercises = userTrainingExercise.length
    ? userTrainingExercise
    : exercises;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [exerciseData, setExerciseData] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const currentExercise = allExercises[currentIndex] || {};
  const nextExercise = allExercises[currentIndex + 1];
  const courseId =
    currentExercise?.exercise_id?._id || `course-${currentIndex}`;
  const isSuperset =
    currentExercise?.manipulation?.toLowerCase() === "superset";

  // Enable next only if all required fields are present
  // MODIFIED useEffect for buttonDisabled
  useEffect(() => {
    const value = exerciseData[courseId] || {};
    const isValid = value.sets_done && value.reps_done && value.lastSet;
    // If there's only one exercise and it's the current one, the finish button should be enabled if inputs are valid.
    // Otherwise, the next button should be enabled.
    setButtonDisabled(!isValid);

    // If it's the last exercise (or the only exercise), set isFinished to true
    if (currentIndex === allExercises.length - 1) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }

    // If there's only one exercise, make sure showPrevious is false
    if (allExercises.length === 1) {
      setShowPrevious(false);
    }
  }, [exerciseData, currentIndex, courseId, allExercises.length]); // Added allExercises.length to dependencies

  const handleInputChange = (courseId, value) => {
    setExerciseData((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], ...value },
    }));
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < allExercises.length) {
      setCurrentIndex(nextIndex);
      setShowPrevious(true);
      // isFinished is now managed by the useEffect hook above
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setShowPrevious(prevIndex > 0);
      setIsFinished(false);
      window.scrollTo(0, 0);
    }
  };

  const handleFinish = async () => {
    const payload = {
      task_id: workData.task_id,
      user_training_workout_id: workData.user_training_workout_id,
      excerciseData: Object.entries(exerciseData).map(([key, value]) => ({
        exercise_id: key,
        sets_done: Number(value.sets_done),
        reps_done: Number(value.reps_done),
      })),
    };

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
      console.log(error);
      toast.error("Something went wrong while completing the workout.");
    }
  };

  return (
    <div className="sm:px-0 px-2">
      <CommonContainer>
        <>
          <Title title={currentExercise?.exercise_id?.name} />
          <HeroVideo
            videoUrl={currentExercise?.exercise_id?.video_url}
            className="mt-0 sm:mt-10"
          />
          <CourseContent
            description={currentExercise?.exercise_id?.description}
          />
          <LastExercise currentExercise={currentExercise} />
          <ExcersizeInput
            exerciseData={currentExercise}
            value={exerciseData[courseId] || {}}
            onChange={(value) => handleInputChange(courseId, value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentIndex === 0}
            isLast={currentIndex === allExercises.length - 1}
          />

          {isSuperset && nextExercise && (
            <>
              <Title title={nextExercise?.exercise_id?.name} />
              <HeroVideo videoUrl={nextExercise?.exercise_id?.video_url} />
              <CourseContent
                description={nextExercise?.exercise_id?.description}
              />
              <LastExercise currentExercise={nextExercise} />
            </>
          )}
        </>
        <ButtonGroup
          onNext={isFinished ? handleFinish : handleNext}
          onPrevious={handlePrevious}
          showPrevious={showPrevious}
          isFinished={isFinished}
          disabled={buttonDisabled}
        />
      </CommonContainer>
    </div>
  );
};

export default StartTraining;
