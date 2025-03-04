import CommonContainer from "@/components/startTraining/CommonContainer";
import CourseContent from "@/components/courseList/CourseContent";
import HeroVideo from "@/components/startTraining/HeroVideo";
import LastExercise from "@/components/startTraining/LastExercise";
import Title from "@/components/measurements/Tilte";
import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
const StartTraining = () => {
  return (
    <div className="px-2">
      <CommonContainer>
        <Title tilte={"סקווט"} />
        <HeroVideo
          videoUrl={
            "https://www.youtube.com/embed/SV3I9YYM8o0?si=4w_093vBtkAM1m7H"
          }
        />
        <CourseContent />
        <LastExercise />
        <ExcersizeInput />
      </CommonContainer>
    </div>
  );
};

export default StartTraining;
