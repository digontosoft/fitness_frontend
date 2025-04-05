import WorkoutLists from "@/components/admin/components/workout-programms/WorkoutLists";
import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";

const WorkoutList = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title="רשימת אימונים" />
      <WorkoutLists />
    </Container>
  );
};

export default WorkoutList;
