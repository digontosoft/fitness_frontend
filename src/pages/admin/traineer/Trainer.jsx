import TraineerUi from "@/components/admin/components/traineer/TraineerUi";
import Container from "@/shared/Container";
import { useParams } from "react-router-dom";

const Trainer = () => {
  const { id } = useParams();
  return (
    <Container className="my-5">
      <TraineerUi userId={id} />
    </Container>
  );
};

export default Trainer;
