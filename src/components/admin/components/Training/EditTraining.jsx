import { useParams } from "react-router-dom";
import FormTitle from "../ui/FormTitle";
import EditTrainingForm from "./EditTrainingForm";

const EditTraining = () => {
  const { id, userId } = useParams();

  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title={userId ? "הקצאת הדרכה" : "הוספת אימון חדש"} />
          <EditTrainingForm trainingId={id} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default EditTraining;
