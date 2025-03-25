import { ExerciseTable } from "@/components/admin/components/ExerciseTable/ExerciseTable";
import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";

const ExerciseList = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title="רשימת תרגילים" />
      <ExerciseTable />
    </Container>
  );
};

export default ExerciseList;
