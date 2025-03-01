import ExerciseLibraries from "@/components/admin/components/exercise-library/ExerciseLibraries";
import { useParams } from "react-router-dom";

const ExerciseLibrary = () => {
  const { id } = useParams();
  return (
    <>
      <ExerciseLibraries exerciseId={id} />
    </>
  );
};

export default ExerciseLibrary;
