import { useParams } from "react-router-dom";
import AddNutritionForm from "./AddNutritionForm";
import FormTitle from "@/components/admin/components/ui/FormTitle";
import AddNutritionMenu from "./AddNutritionMenu";

const AddNutrition = () => {
  const { id } = useParams();
  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle
            title={id ? "הוסף תפריט תזונה אישי " : "הוסף מדריך תזונה"}
          />
          {id ? <AddNutritionMenu userId={id} /> : <AddNutritionForm />}
        </div>
      </div>
    </div>
  );
};

export default AddNutrition;
