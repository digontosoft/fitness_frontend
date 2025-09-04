import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";
import { useSearchParams } from "react-router-dom";
import AssignCustomTask from "./AssignCustomTask";

const AddCustomTask = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title="הוסף משימה מותאמת אישית" />
      <AssignCustomTask userId={userId} />
    </Container>
  );
};

export default AddCustomTask;
