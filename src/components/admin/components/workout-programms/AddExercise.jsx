// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";

// const AddExercise = ({
//   exercise,
//   onChange,
//   setSuperset,
//   superset,
//   isSupersetSelected,
//   setIsSupersetSelected,
// }) => {
//   const [sets, setSets] = useState("");
//   const [reps, setReps] = useState("");
//   const [manipulation, setManipulation] = useState("");

//   const handleInputChange = () => {
//     onChange({
//       sets: parseInt(sets, 10),
//       reps: parseInt(reps, 10),
//       manipulation,
//     });
//   };

//   const handleManipulationChange = (value) => {
//     setManipulation(value);
//     handleInputChange();
//     if (value === "superset") {
//       setSuperset(true);
//       setIsSupersetSelected(true);
//     } else {
//       setSuperset(false);
//     }
//   };

//   return (
//     <div className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md">
//       <div className="flex items-center justify-center bg-customBg py-4 w-1/2 h-5 rounded-md text-white">
//         <p className="text-center">{exercise?.name}</p>
//       </div>
//       <div className="grid grid-cols-3 gap-4 w-[400px]">
//         <div className="flex flex-col space-y-2">
//           <label htmlFor={`sets-${exercise?.name}`}>Sets</label>
//           <input
//             id={`sets-${exercise?.name}`}
//             type="number"
//             className="w-full border border-red-200 h-10 px-2 rounded-md"
//             value={sets}
//             onChange={(e) => setSets(e.target.value)}
//             onBlur={handleInputChange}
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label htmlFor={`reps-${exercise?.name}`}>Reps</label>
//           <input
//             id={`reps-${exercise?.name}`}
//             type="number"
//             className="w-full border border-red-200 h-10 px-2 rounded-md"
//             value={reps}
//             onChange={(e) => setReps(e.target.value)}
//             onBlur={handleInputChange}
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label htmlFor={`manipulation-${exercise?.name}`}>Manipulation</label>
//           <Select value={manipulation} onValueChange={handleManipulationChange}>
//             <SelectTrigger className="w-full border border-red-200">
//               <SelectValue placeholder="Select a manipulation" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="superset" disabled={isSupersetSelected}>
//                   Superset
//                 </SelectItem>
//                 <SelectItem value="dropset">Dropset</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExercise;

import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddExercise = ({
  exercise,
  onChange,
  setSuperset,
  superset,
  isSupersetSelected,
  setIsSupersetSelected,
  setIsButtonDisabled,
}) => {
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
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
    if (value === "superset" && isSupersetSelected) {
      toast.error("Superset can only be added to one exercise at a time.");
      return;
    }

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
    <div className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md">
      <div className="flex items-center justify-center bg-customBg py-4 w-1/2 h-5 rounded-md text-white">
        <p className="text-center">{exercise?.name}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-[400px]">
        <div className="flex flex-col space-y-2">
          <label htmlFor={`sets-${exercise?.name}`}>Sets</label>
          <input
            id={`sets-${exercise?.name}`}
            type="number"
            className="w-full border border-red-200 h-10 px-2 rounded-md"
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
            className="w-full border border-red-200 h-10 px-2 rounded-md"
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
            className="w-full border border-red-200 h-10 px-2 rounded-md"
            value={manipulation}
            onChange={handleManipulationChange}
            onBlur={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
