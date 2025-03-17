import FormTitle from "../ui/FormTitle";
import AddExerciseForm from "./AddExerciseForm";

const ExerciseLibraries = ({ exerciseId }) => {
  // return (
  //   <div className="bg-customBg relative min-h-screen mb-2">
  //     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-[60px] p-6 w-5/6 h-5/6 flex items-center justify-center">
  //       <div className="grid gap-4 items-center justify-items-center">
  //         <FormTitle title={exerciseId ? "עדכון תרגיל" : "הוספת תרגיל חדש"} />
  //         <AddExerciseForm exerciseId={exerciseId} />
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
        <FormTitle title={exerciseId ? "עדכון תרגיל" : "הוספת תרגיל חדש"} />
          <AddExerciseForm exerciseId={exerciseId} />
        </div>
      </div>
    </div>
  )
};

export default ExerciseLibraries;
