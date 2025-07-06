import { ApproveMailTable } from "@/components/admin/components/ApproveMailTable/ApproveMailTable";
import Container from "@/shared/Container";

const ApproveEmail = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <ApproveMailTable />
    </Container>
  );
};

export default ApproveEmail;
