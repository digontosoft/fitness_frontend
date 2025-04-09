import FormTitle from "../admin/components/ui/FormTitle";
import CustomizeWorkoutForm from "./CustomizeWorkoutForm";

const CustomizeWorkout = () => {
  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title={"התאם אישית את האימון"} />
          <CustomizeWorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default CustomizeWorkout;
