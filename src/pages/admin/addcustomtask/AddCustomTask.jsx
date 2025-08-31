import Title from "@/components/measurements/Tilte"
import Container from "@/shared/Container"
import AssignCustomTask from "./AssignCustomTask"

const AddCustomTask = () => {
  return (
     <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title="Add Custom Task" />
      <AssignCustomTask />
    </Container>
  )
}

export default AddCustomTask