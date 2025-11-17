import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";
import { useParams } from "react-router-dom";
import { TrainingListForTrainee } from "./TrainingListForTrainee";

const AssignTrainingList = () => {
  const { id } = useParams();
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title={"רשימת תוכניות אימון למתאמן "} />
      <TrainingListForTrainee userId={id} />
    </Container>
  );
};

export default AssignTrainingList;
