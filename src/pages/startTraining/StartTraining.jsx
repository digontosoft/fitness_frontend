import CommonContainer from "@/components/startTraining/CommonContainer";
import CourseContent from "@/components/courseList/CourseContent";
import HeroVideo from "@/components/startTraining/HeroVideo";
import LastExercise from "@/components/startTraining/LastExercise";
import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonGroup from "@/components/startTraining/ButtonGroup";
import Title from "@/components/measurements/Tilte";
const StartTraining = () => {
  const location = useLocation();
  const workData = location.state?.data || {};
  const { userTrainingExercise = [] } = workData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [exerciseData, setExerciseData] = useState({});
  const isSuperset =
    userTrainingExercise[currentIndex]?.manipulation === "Superset";

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

  const handleFinish = () => {
    console.log("All exercise data on finish:", exerciseData);
  };

  const nextIndex = currentIndex + 1;
  const currentExercise = userTrainingExercise[currentIndex] || {};
  const courseId =
    currentExercise?.exercise_id?._id || `course-${currentIndex}`;

  // console.log("current index data", currentIndex);
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
          <CourseContent />
          <LastExercise
            currentExercise={userTrainingExercise[currentIndex] || {}}
          />
          <ExcersizeInput
            exerciseData={userTrainingExercise[currentIndex]}
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
              <CourseContent />
              <LastExercise
                currentExercise={userTrainingExercise[nextIndex] || {}}
              />
              <ExcersizeInput
                exerciseData={userTrainingExercise[currentIndex]}
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
