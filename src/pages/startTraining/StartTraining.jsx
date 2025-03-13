import CommonContainer from "@/components/startTraining/CommonContainer";
import CourseContent from "@/components/courseList/CourseContent";
import HeroVideo from "@/components/startTraining/HeroVideo";
import LastExercise from "@/components/startTraining/LastExercise";
import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ButtonGroup from "@/components/startTraining/ButtonGroup";
import Title from "@/components/measurements/Tilte";
const StartTraining = () => {
  const location = useLocation();
  const workData = location.state?.data || {};
  const { userTrainingExercise = [] } = workData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);

  // Find the next exercise index based on superset logic
  const getNextIndex = () => {
    let nextIndex = currentIndex + 1;
    if (
      userTrainingExercise[nextIndex] &&
      userTrainingExercise[nextIndex]?.isSuperset
    ) {
      nextIndex++; // Skip to next non-superset exercise
    }
    return nextIndex;
  };

  const handleNext = () => {
    if (currentIndex < userTrainingExercise.length - 1) {
      setCurrentIndex(getNextIndex());
      setShowPrevious(true); // Show previous button when moving forward
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      let prevIndex = currentIndex - 1;
      while (prevIndex > 0 && userTrainingExercise[prevIndex]?.isSuperset) {
        prevIndex--; // Move back to the previous standalone exercise
      }
      setCurrentIndex(prevIndex);
      if (prevIndex === 0) setShowPrevious(false); // Hide previous button when at first exercise
    }
  };

  // Determine if the current exercise is part of a superset
  const isSuperset = userTrainingExercise[currentIndex]?.isSuperset || false;

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
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentIndex === 0}
            isLast={currentIndex === userTrainingExercise.length - 1}
          />
        </>
        <ButtonGroup
          onNext={handleNext}
          onPrevious={handlePrevious}
          showPrevious={showPrevious}
        />
      </CommonContainer>
    </div>
  );
};

export default StartTraining;
