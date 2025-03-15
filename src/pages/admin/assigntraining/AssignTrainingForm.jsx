// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import { useNavigate } from "react-router-dom";
// import { Trash } from "lucide-react";

// const AssignTrainingForm = ({ user_id }) => {
//   const [selectedTraining, setSelectedTraining] = useState(null);
//   const [addMoreExerciseIndex, setAddMoreExerciseIndex] = useState(null);
//   const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);
//   const [trainingList, setTrainingList] = useState([]);
//   const [exercise, setExercise] = useState([]);
//   const [workout, setWorkout] = useState([]);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // New state for submit button
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchTraining = async () => {
//       try {
//         const response = await axios.get(`${base_url}/training`);
//         setTrainingList(response.data.data);
//       } catch (error) {
//         console.error("Error fetching training sessions:", error);
//       }
//     };
//     fetchTraining();
//   }, []);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         setExercise(response.data.data);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercises();
//   }, []);

//   useEffect(() => {
//     const fetchWorkout = async () => {
//       try {
//         const response = await axios.get(`${base_url}/workout`);
//         setWorkout(response.data.data);
//       } catch (error) {
//         console.error("Error fetching workouts:", error);
//       }
//     };
//     fetchWorkout();
//   }, []);

//   // Check if the submit button should be disabled
//   useEffect(() => {
//     if (!selectedTraining) {
//       setIsSubmitDisabled(false);
//       return;
//     }

//     const hasInvalidSuperset = selectedTraining.workouts.some((workout) => {
//       const supersetCount = workout.exercises.filter(
//         (ex) => ex.manipulation === "superset"
//       ).length;

//       // If there is a superset, there must be at least one more exercise
//       return supersetCount > 0 && workout.exercises.length < 2;
//     });

//     setIsSubmitDisabled(hasInvalidSuperset);
//   }, [selectedTraining]);

//   const handleMoreExercise = (workoutIndex, e) => {
//     e.preventDefault(); // Prevent form submission
//     setAddMoreExerciseIndex(workoutIndex);
//   };

//   const handleTrainingChange = (values) => {
//     if (values.length > 0) {
//       setSelectedTraining(values[0]);
//     } else {
//       setSelectedTraining(null);
//     }
//   };

//   const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
//     if (field === "manipulation" && value.toLowerCase() === "superset") {
//       if (isSupersetAlreadyUsed(workoutIndex)) {
//         toast.error("Only one exercise per workout can be a superset.");
//         return;
//       }
//     }

//     const updatedTraining = { ...selectedTraining };
//     updatedTraining.workouts[workoutIndex].exercises[exerciseIndex][field] =
//       value;
//     setSelectedTraining(updatedTraining);
//   };

//   const handleNewExerciseSelection = (selectedExercises, workoutIndex) => {
//     if (!selectedTraining) return;
//     const updatedTraining = { ...selectedTraining };
//     const workout = updatedTraining.workouts[workoutIndex];

//     selectedExercises.forEach((exercise) => {
//       workout.exercises.push({
//         _id: exercise._id,
//         name: exercise.name,
//         sets: 0,
//         reps: 0,
//         manipulation: "",
//       });
//     });

//     setSelectedTraining(updatedTraining);
//     setAddMoreExerciseIndex(null);
//   };

//   const fetchWorkoutData = async (workoutId) => {
//     try {
//       const response = await axios.get(`${base_url}/workout/${workoutId}`);
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching workout data:", error);
//       return null;
//     }
//   };

//   const handleAddWorkout = async (selectedWorkouts) => {
//     if (!selectedTraining || selectedWorkouts.length === 0) return;

//     const updatedTraining = { ...selectedTraining };

//     for (const workout of selectedWorkouts) {
//       const fullWorkoutData = await fetchWorkoutData(workout._id);
//       if (fullWorkoutData) {
//         updatedTraining.workouts.push({
//           _id: fullWorkoutData._id,
//           name: fullWorkoutData.name,
//           exercises: fullWorkoutData.exercises.map((exercise) => ({
//             _id: exercise._id,
//             name: exercise.name,
//             sets: exercise.sets || 3,
//             reps: exercise.reps || 10,
//             manipulation: exercise.manipulation || "normal",
//           })),
//         });
//       }
//     }

//     setSelectedTraining(updatedTraining);
//     setShowWorkoutDropdown(false);
//   };

//   const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
//     if (!selectedTraining) return;

//     const updatedTraining = { ...selectedTraining };
//     updatedTraining.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
//     setSelectedTraining(updatedTraining);
//   };

//   const handleRemoveWorkout = (workoutIndex) => {
//     if (!selectedTraining) return;

//     const updatedTraining = { ...selectedTraining };
//     updatedTraining.workouts.splice(workoutIndex, 1);
//     setSelectedTraining(updatedTraining);
//   };

//   const isSupersetAlreadyUsed = (workoutIndex) => {
//     if (!selectedTraining) return false;
//     const workout = selectedTraining.workouts[workoutIndex];
//     return workout.exercises.some((ex) => ex.manipulation === "superset");
//   };

//   const onSubmit = async () => {
//     try {
//       // Check for multiple supersets in any workout
//       const hasMultipleSupersets = selectedTraining.workouts.some((workout) => {
//         const supersetCount = workout.exercises.filter(
//           (ex) => ex.manipulation === "superset"
//         ).length;
//         return supersetCount > 1;
//       });

//       if (hasMultipleSupersets) {
//         toast.error("Only one exercise per workout can be a superset.");
//         return;
//       }

//       const formattedWorkouts = selectedTraining.workouts.map((workout) => ({
//         workout: workout._id,
//         exercises: workout.exercises.map((exercise) => ({
//           exercise_id: exercise._id,
//           sets: exercise.sets,
//           reps: exercise.reps,
//           manipulation: exercise.manipulation,
//         })),
//       }));

//       const payload = {
//         name: selectedTraining.name || "Default Training Name",
//         description:
//           selectedTraining.description || "Default Training Description",
//         user_id,
//         training_id: selectedTraining._id,
//         workouts: formattedWorkouts,
//       };

//       console.log("assignTraining:", payload);

//       await axios.post(`${base_url}/assign-training`, payload);
//       toast.success("Training session updated successfully!");
//     } catch (error) {
//       console.error("Error updating training session:", error);
//       toast.error("Failed to update training session.");
//     }
//   };

//   return (
//     <div className="py-20" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <Select
//           className="rounded-lg h-12 min-w-[400px] w-full"
//           direction="rtl"
//           options={trainingList}
//           valueField="_id"
//           labelField="name"
//           onChange={handleTrainingChange}
//         />

//         {selectedTraining && (
//           <div className="space-y-4">
//             {selectedTraining.workouts.map((workout, workoutIndex) => (
//               <div key={workout._id} className="border p-4 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold">{workout.name}</h3>
//                   <Button
//                     type="button" // Ensure type is "button"
//                     className="text-white bg-customBg"
//                     onClick={() => handleRemoveWorkout(workoutIndex)}
//                   >
//                     <Trash className="mr-2 text-white" /> Remove Workout
//                   </Button>
//                 </div>
//                 {workout.exercises.map((exercise, exerciseIndex) => (
//                   <div key={exercise._id} className="space-y-4 mt-4">
//                     <div className="space-y-4">
//                       <p>{exercise.name}</p>
//                     </div>
//                     <div className="flex items-center justify-center gap-4">
//                       <Trash
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() =>
//                           handleRemoveExercise(workoutIndex, exerciseIndex)
//                         }
//                       >
//                         Remove Exercise
//                       </Trash>
//                       <input
//                         type="number"
//                         value={exercise.sets}
//                         onChange={(e) =>
//                           handleExerciseChange(
//                             workoutIndex,
//                             exerciseIndex,
//                             "sets",
//                             e.target.value
//                           )
//                         }
//                         className="border p-2 rounded"
//                       />
//                       <input
//                         type="number"
//                         value={exercise.reps}
//                         onChange={(e) =>
//                           handleExerciseChange(
//                             workoutIndex,
//                             exerciseIndex,
//                             "reps",
//                             e.target.value
//                           )
//                         }
//                         className="border p-2 rounded"
//                       />
//                       <input
//                         type="text"
//                         value={exercise.manipulation}
//                         onChange={(e) =>
//                           handleExerciseChange(
//                             workoutIndex,
//                             exerciseIndex,
//                             "manipulation",
//                             e.target.value
//                           )
//                         }
//                         className="border p-2 rounded"
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <div className="my-4">
//                   {addMoreExerciseIndex === workoutIndex && (
//                     <Select
//                       className="rounded-lg h-12"
//                       direction="rtl"
//                       options={exercise}
//                       valueField="_id"
//                       labelField="name"
//                       multi
//                       onChange={(selected) =>
//                         handleNewExerciseSelection(selected, workoutIndex)
//                       }
//                     />
//                   )}
//                   <Button
//                     type="button"
//                     className="my-4 bg-customBg"
//                     onClick={(e) => handleMoreExercise(workoutIndex, e)} // Pass event to prevent default
//                   >
//                     Add More Exercise
//                   </Button>
//                 </div>
//               </div>
//             ))}

//             {/* Add More Workout Button and Dropdown */}
//             <div className="my-4">
//               {showWorkoutDropdown && (
//                 <Select
//                   className="rounded-lg h-12"
//                   direction="rtl"
//                   options={workout}
//                   valueField="_id"
//                   labelField="name"
//                   multi
//                   onChange={(selected) => handleAddWorkout(selected)}
//                 />
//               )}
//               <Button
//                 type="button"
//                 className="my-4 bg-customBg"
//                 onClick={() => setShowWorkoutDropdown(!showWorkoutDropdown)}
//               >
//                 {showWorkoutDropdown
//                   ? "Hide Workout Dropdown"
//                   : "Add More Workout"}
//               </Button>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//             disabled={isSubmitDisabled} // Disable button if condition is not met
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AssignTrainingForm;

// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import { useNavigate } from "react-router-dom";
// import { Trash } from "lucide-react";

// const AssignTrainingForm = ({ user_id }) => {
//   const [selectedTraining, setSelectedTraining] = useState(null);
//   const [addMoreExerciseIndex, setAddMoreExerciseIndex] = useState(null);
//   const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);
//   const [trainingList, setTrainingList] = useState([]);
//   const [exercise, setExercise] = useState([]);
//   const [workout, setWorkout] = useState([]);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchTraining = async () => {
//       try {
//         const response = await axios.get(`${base_url}/training`);
//         setTrainingList(response.data.data);
//       } catch (error) {
//         console.error("Error fetching training sessions:", error);
//       }
//     };
//     fetchTraining();
//   }, []);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         setExercise(response.data.data);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercises();
//   }, []);

//   useEffect(() => {
//     const fetchWorkout = async () => {
//       try {
//         const response = await axios.get(`${base_url}/workout`);
//         setWorkout(response.data.data);
//       } catch (error) {
//         console.error("Error fetching workouts:", error);
//       }
//     };
//     fetchWorkout();
//   }, []);

//   // Check if a workout has a superset
//   const hasSupersetInWorkout = (workout) => {
//     return workout.exercises.some(
//       (exercise) => exercise.manipulation === "superset"
//     );
//   };

//   // Check if a workout has a superset but no additional exercises
//   const hasSupersetWithoutExercises = (workout) => {
//     const hasSuperset = workout.exercises.some(
//       (exercise) => exercise.manipulation === "superset"
//     );
//     const hasOtherExercises = workout.exercises.some(
//       (exercise) => exercise.manipulation !== "superset"
//     );

//     return hasSuperset && !hasOtherExercises;
//   };

//   // Check if the submit button should be disabled
//   useEffect(() => {
//     if (!selectedTraining) {
//       setIsSubmitDisabled(false);
//       return;
//     }

//     const hasInvalidSuperset = selectedTraining.workouts.some((workout) =>
//       hasSupersetWithoutExercises(workout)
//     );

//     setIsSubmitDisabled(hasInvalidSuperset);
//   }, [selectedTraining]);

//   const handleMoreExercise = (workoutIndex, e) => {
//     e.preventDefault();
//     setAddMoreExerciseIndex(workoutIndex);
//   };

//   const handleTrainingChange = (values) => {
//     if (values.length > 0) {
//       setSelectedTraining(values[0]);
//     } else {
//       setSelectedTraining(null);
//     }
//   };

//   const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
//     if (field === "manipulation" && value.toLowerCase() === "superset") {
//       const hasExistingSuperset = selectedTraining.workouts[
//         workoutIndex
//       ].exercises.some(
//         (ex, index) => index !== exerciseIndex && ex.manipulation === "superset"
//       );

//       if (hasExistingSuperset) {
//         toast.error("Only one exercise per workout can be a superset.");
//         return;
//       }
//     }

//     const updatedTraining = { ...selectedTraining };
//     updatedTraining.workouts[workoutIndex].exercises[exerciseIndex][field] =
//       value;
//     setSelectedTraining(updatedTraining);
//   };

//   const handleNewExerciseSelection = (selectedExercises, workoutIndex) => {
//     if (!selectedTraining) return;

//     const updatedTraining = { ...selectedTraining };
//     const workout = updatedTraining.workouts[workoutIndex];

//     const hasNewSuperset = selectedExercises.some(
//       (exercise) => exercise.manipulation === "superset"
//     );

//     const hasExistingSuperset = hasSupersetInWorkout(workout);

//     if (hasNewSuperset && hasExistingSuperset) {
//       toast.error("Only one superset is allowed per workout.");
//       return;
//     }

//     selectedExercises.forEach((exercise) => {
//       workout.exercises.push({
//         _id: exercise._id,
//         name: exercise.name,
//         sets: 0,
//         reps: 0,
//         manipulation: exercise.manipulation || "",
//       });
//     });

//     setSelectedTraining(updatedTraining);
//     setAddMoreExerciseIndex(null);
//   };

//   const fetchWorkoutData = async (workoutId) => {
//     try {
//       const response = await axios.get(`${base_url}/workout/${workoutId}`);
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching workout data:", error);
//       return null;
//     }
//   };

//   const handleAddWorkout = async (selectedWorkouts) => {
//     if (!selectedTraining || selectedWorkouts.length === 0) return;

//     const updatedTraining = { ...selectedTraining };

//     for (const workout of selectedWorkouts) {
//       const fullWorkoutData = await fetchWorkoutData(workout._id);
//       if (fullWorkoutData) {
//         updatedTraining.workouts.push({
//           _id: fullWorkoutData._id,
//           name: fullWorkoutData.name,
//           exercises: fullWorkoutData.exercises.map((exercise) => ({
//             _id: exercise._id,
//             name: exercise.name,
//             sets: exercise.sets || 3,
//             reps: exercise.reps || 10,
//             manipulation: exercise.manipulation || "normal",
//           })),
//         });
//       }
//     }

//     setSelectedTraining(updatedTraining);
//     setShowWorkoutDropdown(false);
//   };

//   const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
//     if (!selectedTraining) return;

//     const updatedTraining = { ...selectedTraining };
//     updatedTraining.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
//     setSelectedTraining(updatedTraining);
//   };

//   const handleRemoveWorkout = (workoutIndex) => {
//     if (!selectedTraining) return;

//     const updatedTraining = { ...selectedTraining };
//     updatedTraining.workouts.splice(workoutIndex, 1);
//     setSelectedTraining(updatedTraining);
//   };

//   const onSubmit = async () => {
//     try {
//       const hasMultipleSupersets = selectedTraining.workouts.some((workout) => {
//         const supersetCount = workout.exercises.filter(
//           (ex) => ex.manipulation === "superset"
//         ).length;
//         return supersetCount > 1;
//       });

//       if (hasMultipleSupersets) {
//         toast.error("Only one exercise per workout can be a superset.");
//         return;
//       }

//       const formattedWorkouts = selectedTraining.workouts.map((workout) => ({
//         workout: workout._id,
//         exercises: workout.exercises.map((exercise) => ({
//           exercise_id: exercise._id,
//           sets: exercise.sets,
//           reps: exercise.reps,
//           manipulation: exercise.manipulation,
//         })),
//       }));

//       const payload = {
//         name: selectedTraining.name || "Default Training Name",
//         description:
//           selectedTraining.description || "Default Training Description",
//         user_id,
//         training_id: selectedTraining._id,
//         workouts: formattedWorkouts,
//       };

//       console.log("assignTraining:", payload);

//       await axios.post(`${base_url}/assign-training`, payload);
//       toast.success("Training session updated successfully!");
//     } catch (error) {
//       console.error("Error updating training session:", error);
//       toast.error("Failed to update training session.");
//     }
//   };

//   return (
//     <div className="py-20" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <Select
//           className="rounded-lg h-12 min-w-[400px] w-full"
//           direction="rtl"
//           options={trainingList}
//           valueField="_id"
//           labelField="name"
//           onChange={handleTrainingChange}
//         />

//         {selectedTraining && (
//           <div className="space-y-4">
//             {selectedTraining.workouts.map((workout, workoutIndex) => (
//               <div key={workout._id} className="border p-4 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold">{workout.name}</h3>
//                   <Button
//                     type="button"
//                     className="text-white bg-customBg"
//                     onClick={() => handleRemoveWorkout(workoutIndex)}
//                   >
//                     <Trash className="mr-2 text-white" /> Remove Workout
//                   </Button>
//                 </div>
//                 {workout.exercises.map((exercise, exerciseIndex) => (
//                   <div key={exercise._id} className="space-y-4 mt-4">
//                     <div className="space-y-4">
//                       <p>{exercise.name}</p>
//                     </div>
//                     <div className="flex items-center justify-center gap-4">
//                       <Trash
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() =>
//                           handleRemoveExercise(workoutIndex, exerciseIndex)
//                         }
//                       >
//                         Remove Exercise
//                       </Trash>
//                       <input
//                         type="number"
//                         value={exercise.sets}
//                         onChange={(e) =>
//                           handleExerciseChange(
//                             workoutIndex,
//                             exerciseIndex,
//                             "sets",
//                             e.target.value
//                           )
//                         }
//                         className="border p-2 rounded"
//                       />
//                       <input
//                         type="number"
//                         value={exercise.reps}
//                         onChange={(e) =>
//                           handleExerciseChange(
//                             workoutIndex,
//                             exerciseIndex,
//                             "reps",
//                             e.target.value
//                           )
//                         }
//                         className="border p-2 rounded"
//                       />
//                       <input
//                         type="text"
//                         value={exercise.manipulation}
//                         onChange={(e) =>
//                           handleExerciseChange(
//                             workoutIndex,
//                             exerciseIndex,
//                             "manipulation",
//                             e.target.value
//                           )
//                         }
//                         className="border p-2 rounded"
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <div className="my-4">
//                   {addMoreExerciseIndex === workoutIndex && (
//                     <Select
//                       className="rounded-lg h-12"
//                       direction="rtl"
//                       options={exercise}
//                       valueField="_id"
//                       labelField="name"
//                       multi
//                       onChange={(selected) =>
//                         handleNewExerciseSelection(selected, workoutIndex)
//                       }
//                     />
//                   )}
//                   <Button
//                     type="button"
//                     className="my-4 bg-customBg"
//                     onClick={(e) => handleMoreExercise(workoutIndex, e)}
//                   >
//                     Add More Exercise
//                   </Button>
//                 </div>
//               </div>
//             ))}

//             <div className="my-4">
//               {showWorkoutDropdown && (
//                 <Select
//                   className="rounded-lg h-12"
//                   direction="rtl"
//                   options={workout}
//                   valueField="_id"
//                   labelField="name"
//                   multi
//                   onChange={(selected) => handleAddWorkout(selected)}
//                 />
//               )}
//               <Button
//                 type="button"
//                 className="my-4 bg-customBg"
//                 onClick={() => setShowWorkoutDropdown(!showWorkoutDropdown)}
//               >
//                 {showWorkoutDropdown
//                   ? "Hide Workout Dropdown"
//                   : "Add More Workout"}
//               </Button>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//             disabled={isSubmitDisabled}
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AssignTrainingForm;

import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";

const AssignTrainingForm = ({ user_id }) => {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [addMoreExerciseIndex, setAddMoreExerciseIndex] = useState(null);
  const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);
  const [trainingList, setTrainingList] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [workout, setWorkout] = useState([]);
  // This state disables form submission if a workout has a superset without an extra exercise.
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch training sessions
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(`${base_url}/training`);
        setTrainingList(response.data.data);
      } catch (error) {
        console.error("Error fetching training sessions:", error);
      }
    };
    fetchTraining();
  }, []);

  // Fetch exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercise(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  // Fetch workouts
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`${base_url}/workout`);
        setWorkout(response.data.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkout();
  }, []);

  // Update submit button state: for each workout,
  // if an exercise is marked as "superset" (case-insensitive) and the workout has fewer than 2 exercises,
  // disable the submit button.
  useEffect(() => {
    if (!selectedTraining) {
      setIsSubmitDisabled(false);
      return;
    }

    const disableDueToSuperset = selectedTraining.workouts.some((workout) => {
      const supersetCount = workout.exercises.filter(
        (ex) => ex.manipulation.trim().toLowerCase() === "superset"
      ).length;
      // If a superset exists, ensure there is at least one more exercise added.
      return supersetCount > 0 && workout.exercises.length < 2;
    });

    setIsSubmitDisabled(disableDueToSuperset);
  }, [selectedTraining]);

  // Handler to open the add exercise dropdown for a given workout.
  const handleMoreExercise = (workoutIndex, e) => {
    e.preventDefault();
    setAddMoreExerciseIndex(workoutIndex);
  };

  const handleTrainingChange = (values) => {
    if (values.length > 0) {
      setSelectedTraining(values[0]);
    } else {
      setSelectedTraining(null);
    }
  };

  // When a user changes an exercise field, especially the manipulation field.
  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const newVal = value.trim().toLowerCase();

    // When setting manipulation to "superset"
    if (field === "manipulation" && newVal === "superset") {
      // Check if a superset already exists in this workout
      if (isSupersetAlreadyUsed(workoutIndex)) {
        toast.error("Only one exercise per workout can be a superset.");
        return;
      }
      // If this is the only exercise in the workout, notify user they must add another exercise.
      const currentWorkout = selectedTraining.workouts[workoutIndex];
      if (currentWorkout.exercises.length < 2) {
        toast.error(
          "To use superset, please add another exercise to complete the set."
        );
      }
    }

    const updatedTraining = { ...selectedTraining };
    updatedTraining.workouts[workoutIndex].exercises[exerciseIndex][field] =
      value;
    setSelectedTraining(updatedTraining);
  };

  // When new exercises are selected (for "Add More Exercise")
  const handleNewExerciseSelection = (selectedExercises, workoutIndex) => {
    if (!selectedTraining) return;
    const updatedTraining = { ...selectedTraining };
    const currentWorkout = updatedTraining.workouts[workoutIndex];

    selectedExercises.forEach((exercise) => {
      currentWorkout.exercises.push({
        _id: exercise._id,
        name: exercise.name,
        sets: 0,
        reps: 0,
        manipulation: "",
      });
    });

    setSelectedTraining(updatedTraining);
    setAddMoreExerciseIndex(null);
  };

  const fetchWorkoutData = async (workoutId) => {
    try {
      const response = await axios.get(`${base_url}/workout/${workoutId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching workout data:", error);
      return null;
    }
  };

  const handleAddWorkout = async (selectedWorkouts) => {
    if (!selectedTraining || selectedWorkouts.length === 0) return;

    const updatedTraining = { ...selectedTraining };

    for (const workout of selectedWorkouts) {
      const fullWorkoutData = await fetchWorkoutData(workout._id);
      if (fullWorkoutData) {
        updatedTraining.workouts.push({
          _id: fullWorkoutData._id,
          name: fullWorkoutData.name,
          exercises: fullWorkoutData.exercises.map((exercise) => ({
            _id: exercise._id,
            name: exercise.name,
            sets: exercise.sets || 3,
            reps: exercise.reps || 10,
            manipulation: exercise.manipulation || "normal",
          })),
        });
      }
    }

    setSelectedTraining(updatedTraining);
    setShowWorkoutDropdown(false);
  };

  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
    if (!selectedTraining) return;
    const updatedTraining = { ...selectedTraining };
    updatedTraining.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
    setSelectedTraining(updatedTraining);
  };

  const handleRemoveWorkout = (workoutIndex) => {
    if (!selectedTraining) return;
    const updatedTraining = { ...selectedTraining };
    updatedTraining.workouts.splice(workoutIndex, 1);
    setSelectedTraining(updatedTraining);
  };

  // Helper to check if a superset is already used in a given workout.
  const isSupersetAlreadyUsed = (workoutIndex) => {
    if (!selectedTraining) return false;
    const currentWorkout = selectedTraining.workouts[workoutIndex];
    return currentWorkout.exercises.some(
      (ex) => ex.manipulation.trim().toLowerCase() === "superset"
    );
  };

  const onSubmit = async () => {
    try {
      // Final check: each workout with a superset must have at least 2 exercises.
      const invalidSupersetWorkout = selectedTraining.workouts.some(
        (workout) =>
          workout.exercises.some(
            (ex) => ex.manipulation.trim().toLowerCase() === "superset"
          ) && workout.exercises.length < 2
      );
      if (invalidSupersetWorkout) {
        toast.error(
          "A workout with a superset must have at least 2 exercises. Please add another exercise."
        );
        return;
      }

      // Also, check for multiple supersets in any workout.
      const hasMultipleSupersets = selectedTraining.workouts.some((workout) => {
        const supersetCount = workout.exercises.filter(
          (ex) => ex.manipulation.trim().toLowerCase() === "superset"
        ).length;
        return supersetCount > 1;
      });
      if (hasMultipleSupersets) {
        toast.error("Only one exercise per workout can be a superset.");
        return;
      }

      const formattedWorkouts = selectedTraining.workouts.map((workout) => ({
        workout: workout._id,
        exercises: workout.exercises.map((exercise) => ({
          exercise_id: exercise._id,
          sets: exercise.sets,
          reps: exercise.reps,
          manipulation: exercise.manipulation,
        })),
      }));

      const payload = {
        name: selectedTraining.name || "Default Training Name",
        description:
          selectedTraining.description || "Default Training Description",
        user_id,
        training_id: selectedTraining._id,
        workouts: formattedWorkouts,
      };

      console.log("assignTraining:", payload);

      await axios.post(`${base_url}/assign-training`, payload);
      toast.success("Training session updated successfully!");
    } catch (error) {
      console.error("Error updating training session:", error);
      toast.error("Failed to update training session.");
    }
  };

  return (
    <div className="py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Select
          className="rounded-lg h-12 min-w-[400px] w-full"
          direction="rtl"
          options={trainingList}
          valueField="_id"
          labelField="name"
          onChange={handleTrainingChange}
        />

        {selectedTraining && (
          <div className="space-y-4">
            {selectedTraining.workouts.map((workout, workoutIndex) => (
              <div key={workout._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{workout.name}</h3>
                  <Button
                    type="button"
                    className="text-white bg-customBg"
                    onClick={() => handleRemoveWorkout(workoutIndex)}
                  >
                    <Trash className="mr-2 text-white" /> Remove Workout
                  </Button>
                </div>
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise._id} className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <p>{exercise.name}</p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Trash
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          handleRemoveExercise(workoutIndex, exerciseIndex)
                        }
                      >
                        Remove Exercise
                      </Trash>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            "sets",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            "reps",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={exercise.manipulation}
                        onChange={(e) =>
                          handleExerciseChange(
                            workoutIndex,
                            exerciseIndex,
                            "manipulation",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                        placeholder="normal or superset"
                      />
                    </div>
                  </div>
                ))}
                <div className="my-4">
                  {addMoreExerciseIndex === workoutIndex && (
                    <Select
                      className="rounded-lg h-12"
                      direction="rtl"
                      options={exercise}
                      valueField="_id"
                      labelField="name"
                      multi
                      onChange={(selected) =>
                        handleNewExerciseSelection(selected, workoutIndex)
                      }
                    />
                  )}
                  <Button
                    type="button"
                    className="my-4 bg-customBg"
                    onClick={(e) => handleMoreExercise(workoutIndex, e)}
                  >
                    Add More Exercise
                  </Button>
                </div>
              </div>
            ))}

            {/* Add More Workout Button and Dropdown */}
            <div className="my-4">
              {showWorkoutDropdown && (
                <Select
                  className="rounded-lg h-12"
                  direction="rtl"
                  options={workout}
                  valueField="_id"
                  labelField="name"
                  multi
                  onChange={(selected) => handleAddWorkout(selected)}
                />
              )}
              <Button
                type="button"
                className="my-4 bg-customBg"
                onClick={() => setShowWorkoutDropdown(!showWorkoutDropdown)}
              >
                {showWorkoutDropdown
                  ? "Hide Workout Dropdown"
                  : "Add More Workout"}
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignTrainingForm;
