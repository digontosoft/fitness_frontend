import Container from "@/shared/Container";
import { useParams } from "react-router-dom";
import { TrainingListForTrainee } from "./TrainingListForTrainee";
import Title from "@/components/measurements/Tilte";

const AssignTrainingList = () => {
  const { id } = useParams();
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title={"Assigned Training List"} />
      <section className="grid  gap-5 h-full">
        <TrainingListForTrainee userId={id} />
      </section>
    </Container>
  );
};

export default AssignTrainingList;
