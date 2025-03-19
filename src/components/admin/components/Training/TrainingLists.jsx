import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";
import { TrainingList } from "./TrainingList";
import { useParams } from "react-router-dom";

const TrainingLists = () => {
  const { id } = useParams();
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title={"Training List"} />
      {/* <section className="grid  gap-5 h-full">
      </section> */}
      <TrainingList userId={id} />
    </Container>
  );
};

export default TrainingLists;
