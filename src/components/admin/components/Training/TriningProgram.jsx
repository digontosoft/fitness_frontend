import AddTraningForm from "./AddTraningForm";
import FormTitle from "../ui/FormTitle";
import { useParams } from "react-router-dom";

const TriningProgram = () => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title="הוסף תוכנית אימון חדשה" />
          <AddTraningForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default TriningProgram;
