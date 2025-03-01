import { ApproveMailTable } from "@/components/admin/components/ApproveMailTable/ApproveMailTable";
import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";

const ApproveEmail = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title tilte="Approved Mail List" />
      <section className="grid  gap-5 h-full">
        <ApproveMailTable />
      </section>
    </Container>
  );
};

export default ApproveEmail;
