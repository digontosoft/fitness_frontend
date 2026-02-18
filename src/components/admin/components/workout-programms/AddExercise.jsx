import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

const AddExercise = ({
  exercise,
  onChange,
  setSuperset,
  superset,
  isSupersetSelected,
  setIsSupersetSelected,
  setIsButtonDisabled,
  handleRemoveExercise,
}) => {
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [manipulation, setManipulation] = useState("");

  useEffect(() => {
    // Check if any of the fields are empty or 0
    const isDisabled = sets === 0 || reps === 0 || manipulation === "";
    setIsButtonDisabled(isDisabled);
  }, [sets, reps, manipulation, setIsButtonDisabled]);

  const handleInputChange = () => {
    onChange({
      sets: parseInt(sets, 10),
      reps: parseInt(reps, 10),
      manipulation,
    });
  };

  const handleManipulationChange = (e) => {
    const value = e.target.value.toLowerCase();

    // Check if the user is trying to select "superset" and if it's already selected in another exercise
    // if (value === "superset" && isSupersetSelected) {
    //   toast.error("Superset can only be added to one exercise at a time.");
    //   return;
    // }

    // Update the manipulation state
    setManipulation(value);

    // Handle any additional input changes
    handleInputChange();

    // Update the superset state
    if (value === "superset") {
      setSuperset(true);
      setIsSupersetSelected(true); // Mark that superset has been selected
    } else {
      setSuperset(false);
      // If the user deselects "superset", mark it as not selected
      if (manipulation === "superset") {
        setIsSupersetSelected(false);
      }
    }
  };

  return (
    <div className="border p-4 rounded-md flex items-center justify-center gap-5">
      <Trash
        className="cursor-pointer text-[#7994CB]-600 size-5"
        onClick={() => handleRemoveExercise(exercise?._id, false)} // Pass false for existing exercise
      />
      <div className=" flex flex-col items-center justify-center space-y-4 ">
        <div className="flex items-center justify-center bg-[#7994CB] py-1 w-auto h-auto rounded-md text-white px-2">
          <p className="text-center">{exercise?.name}</p>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:w-[400px]">
          <div className="flex flex-col space-y-2">
            <label htmlFor={`sets-${exercise?.name}`}>סטים</label>
            <input
              id={`sets-${exercise?.name}`}
              type="number"
              className="w-full border border-red-200 h-10 px-2 rounded-md"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              onBlur={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor={`reps-${exercise?.name}`}>חזרות</label>
            <input
              id={`reps-${exercise?.name}`}
              type="number"
              className="w-full border border-red-200 h-10 px-2 rounded-md"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              onBlur={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor={`manipulation-${exercise?.name}`}>מניפולציה</label>
            <input
              id={`manipulation-${exercise?.name}`}
              type="text"
              className="w-full border border-red-200 h-10 px-2 rounded-md"
              value={manipulation}
              onChange={handleManipulationChange}
              onBlur={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
