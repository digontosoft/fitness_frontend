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
  const { userTrainingExercise = [] } = workData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [exerciseData, setExerciseData] = useState({});
  const navigate = useNavigate()
  const isSuperset =
    userTrainingExercise[currentIndex]?.manipulation?.toLowerCase() ===
    "superset";

  // useEffect(() => {
  //   console.log("Updated exerciseData:", exerciseData);
  // }, [exerciseData]);

  
  

  const handleInputChange = (courseId, value) => {
    setExerciseData((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], ...value },
    }));
  };

  const getNextIndex = () => {
    let nextIndex = currentIndex + 1;

    if (nextIndex < userTrainingExercise.length) {
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
  // const getPreviousIndex = () => {
  //   let prevIndex = currentIndex - 1;

  //   if (
  //     prevIndex > 0 &&
  //     userTrainingExercise[prevIndex]?.manipulation?.toLowerCase() ===
  //       "superset"
  //   ) {
  //     prevIndex--;
  //   }

  //   return prevIndex >= 0 ? prevIndex : 0;
  // };

  const handleNext = () => {
    const nextIndex = getNextIndex();

    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
      setShowPrevious(true);

      if (nextIndex === userTrainingExercise.length - 1) {
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
    //console.log("All exercise data on finish:", exerciseData);
    
    const payload = {
      task_id: workData.task_id, 
      user_training_workout_id: workData.user_training_workout_id,
      excerciseData:
        Object.entries(exerciseData).map(([key, value]) => ({
          exercise_id: key,     
          sets_done: Number(value.sets_done),   // Convert to number
          reps_done: Number(value.reps_done),   
        }))
    }
    console.log("payload", payload);
    
   try {
    const response = await axios.post(`${base_url}/complete-workout-task`, payload); 
    if (response.status === 200) {
      toast.success("Workout completed successfully!");
      navigate("/")
    
  }
   } catch (error) {
    console.log(error);
    
   }
};

  const nextIndex = currentIndex + 1;
  const currentExercise = userTrainingExercise[currentIndex] || {};
  const courseId =
    currentExercise?.exercise_id?._id || `course-${currentIndex}`;

  console.log("current index data", currentIndex);
  return (
    <div className="px-2">
      <CommonContainer>
        <>
          <Title
            title={userTrainingExercise[currentIndex]?.exercise_id?.name}
          />
          <HeroVideo
            videoUrl={
              userTrainingExercise[currentIndex]?.exercise_id?.video_url
            }
          />
          <CourseContent
            description={
              userTrainingExercise[currentIndex]?.exercise_id?.description
            }
          />
          <LastExercise
            currentExercise={userTrainingExercise[currentIndex] || {}}
          />
          <ExcersizeInput
            exerciseData={userTrainingExercise[currentIndex] || {}}
            value={exerciseData[courseId] || {}}
            onChange={(value) => handleInputChange(courseId, value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentIndex === 0}
            isLast={currentIndex === userTrainingExercise.length - 1}
          />

          {isSuperset && nextIndex < userTrainingExercise.length && (
            <>
              <Title
                title={userTrainingExercise[nextIndex]?.exercise_id?.name}
              />
              <HeroVideo
                videoUrl={
                  userTrainingExercise[nextIndex]?.exercise_id?.video_url
                }
              />
              <CourseContent
                description={
                  userTrainingExercise[currentIndex]?.exercise_id?.description
                }
              />
              <LastExercise
                currentExercise={userTrainingExercise[currentIndex] || {}}
              />
              <ExcersizeInput
                exerciseData={userTrainingExercise[currentIndex] || {}}
                value={exerciseData[courseId] || {}}
                onChange={(value) => handleInputChange(courseId, value)}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentIndex === 0}
                isLast={currentIndex === userTrainingExercise.length - 1}
              />
            </>
          )}
        </>
        <ButtonGroup
          onNext={isFinished ? handleFinish : handleNext}
          onPrevious={handlePrevious}
          showPrevious={showPrevious}
          isFinished={isFinished}
        />
      </CommonContainer>
    </div>
  );
};

export default StartTraining;
