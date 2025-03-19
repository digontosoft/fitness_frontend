import Container from "@/shared/Container";
import { TraineeUsersLists } from "./TraineeUsersList";
import Title from "@/components/measurements/Tilte";

const TraineeUsers = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title={"Trainee Users List"} />
      {/* <section className="grid  gap-5 h-full">
      </section> */}
      <TraineeUsersLists />
    </Container>
  );
};

export default TraineeUsers;
