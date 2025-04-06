import Container from "@/shared/Container";
import { TraineeUsersLists } from "./TraineeUsersList";
import Title from "@/components/measurements/Tilte";

const TraineeUsers = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title={"רשימת מתאמנים"} />
      <TraineeUsersLists />
    </Container>
  );
};

export default TraineeUsers;
