import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";
import { useLocation } from "react-router-dom";
import AssignCustomTask from "./AssignCustomTask";

const AddCustomTask = () => {
 const { state: userId } = useLocation();    
  return (
     <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title="Add Custom Task" />
      <AssignCustomTask userId={userId} />
    </Container>
  )
}

export default AddCustomTask