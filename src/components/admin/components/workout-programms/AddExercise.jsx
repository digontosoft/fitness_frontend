import { useState } from "react";

const AddExercise = ({ exercise, onChange }) => {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [manipulation, setManipulation] = useState("");

  const handleInputChange = () => {
    onChange({
      sets: parseInt(sets, 10),
      reps: parseInt(reps, 10),
      manipulation,
    });
  };

  return (
    <div className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md">
      <div className="flex items-center justify-center bg-customBg py-4 w-1/2 h-5 rounded-md text-white">
        <p className="text-center">{exercise?.name}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-[327px]">
        <div className="flex flex-col space-y-2">
          <label htmlFor={`sets-${exercise?.name}`}>Sets</label>
          <input
            id={`sets-${exercise?.name}`}
            type="number"
            className="w-full border border-red-200 h-10 px-2"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            onBlur={handleInputChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor={`reps-${exercise?.name}`}>Reps</label>
          <input
            id={`reps-${exercise?.name}`}
            type="number"
            className="w-full border border-red-200 h-10 px-2"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            onBlur={handleInputChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor={`manipulation-${exercise?.name}`}>Manipulation</label>
          <input
            id={`manipulation-${exercise?.name}`}
            type="text"
            className="w-full border border-red-200 h-10 px-2"
            value={manipulation}
            onChange={(e) => setManipulation(e.target.value)}
            onBlur={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
