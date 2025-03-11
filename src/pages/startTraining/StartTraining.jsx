import CommonContainer from "@/components/startTraining/CommonContainer";
import CourseContent from "@/components/courseList/CourseContent";
import HeroVideo from "@/components/startTraining/HeroVideo";
import LastExercise from "@/components/startTraining/LastExercise";
import Title from "@/components/measurements/Tilte";
import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const StartTraining = () => {
  const location = useLocation();
  const workData = location.state.data;
  console.log("exersize data:", workData);
  const { userTrainingExercise } = workData;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < userTrainingExercise.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="px-2">
      <CommonContainer>
        <Title tilte={userTrainingExercise[currentIndex]?.exercise_id?.name} />
        <HeroVideo
          videoUrl={userTrainingExercise[currentIndex]?.exercise_id?.video_url}
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
      </CommonContainer>
    </div>
  );
};

export default StartTraining;
