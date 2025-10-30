import { trainingandexercisebanner } from "@/assets/index";
import Title from "@/components/measurements/Tilte";
import WorkOutListBaground from "@/components/workOutList/WorkOutListBaground";
import { TraineeExerciseLibraryCard } from "./TraineeExerciseLibraryCard";
const TraineeExerciseLibrary = () => {
  return (
    <div className="bg-[#FDFDFD] min-h-[75vh] h-auto">
        <WorkOutListBaground bgImg={trainingandexercisebanner} />
      <Title title={"ספריית תרגילים"} />
      <TraineeExerciseLibraryCard />
    </div>
  );
};

export default TraineeExerciseLibrary;
