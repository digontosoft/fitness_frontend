import { useParams } from "react-router-dom";
import AssignTrainingForm from "./AssignTrainingForm";
import FormTitle from "@/components/admin/components/ui/FormTitle";

const AssignTraining = () => {
  const { trainingId, userId } = useParams();
  return (
    <div className="bg-[#7994CB] relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title="שייך תוכנית אימון חדשה" />
          <AssignTrainingForm user_id={userId} trainingId={trainingId} />
        </div>
      </div>
    </div>
  );
};

export default AssignTraining;
