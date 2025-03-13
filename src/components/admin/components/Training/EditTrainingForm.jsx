// import { useEffect, useState } from "react";
// import { set, useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import Select from "react-dropdown-select";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import { base_url } from "@/api/baseUrl";
// import {
//   Select as ShadSelect,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Trash } from "lucide-react";

// const EditTrainingForm = ({ trainingId, userId }) => {
//   const [trainingExercises, setTrainingExercises] = useState([]);
//   const [addMoreExercise, setAddMoreExercise] = useState(false);
//   const [exercises, setExercises] = useState([]);
//   const [selectedTrainingExercises, setSelectedTrainingExercises] = useState(
//     []
//   );
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [isSupersetSelected, setIsSupersetSelected] = useState(false); // Track superset selection
//   const [assignButton, setAssignButton] = useState("");
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleAssignButtonClick = (value) => {
//     setAssignButton(value);
//   };

//   useEffect(() => {
//     axios
//       .get(`${base_url}/training/${trainingId}`)
//       .then((response) => {
//         const trainingData = response.data.data;
//         setTrainingExercises(trainingData);
//         console.log("trainingId:", trainingData);
//       })
//       .catch((error) =>
//         console.error("Error fetching training details:", error)
//       );
//   }, [trainingId, reset]);

//   useEffect(() => {
//     const fetchExercise = async () => {
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         setExercises(response.data.data);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercise();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         name: data.name,
//         description: data.description,
//         workouts: selectedTrainingExercises.map((workout) => ({
//           workout: workout._id,
//           exercises: workout.exercises.map((ex) => ({
//             exercise_id: ex.exercise_id,
//             sets: ex.sets,
//             reps: ex.reps,
//             manipulation: ex.manipulation,
//           })),
//         })),
//       };
//       axios
//         .put(`${base_url}/training/${trainingId}`, payload)
//         .then((response) => {
//           if (response.status === 200) {
//             toast.success("Training updated successfully!");
//             navigate("/dashboard/training-list");
//           }
//         });
//     } catch (error) {
//       console.error("Error updating training:", error);
//       toast.error("Failed to update training.");
//     }
//   };

//   return (
//     <div className="py-10 w-[500px]">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <DynamicInputField
//           id="name"
//           type="text"
//           label="Training Name"
//           placeholder="Enter training name..."
//           register={register}
//           validation={{ required: "Name is required" }}
//           errors={errors}
//         />

//         <DynamicInputField
//           id="description"
//           type="text"
//           label="Description"
//           placeholder="Enter description..."
//           register={register}
//           validation={{ required: "Description is required" }}
//           errors={errors}
//         />

//         <Select
//           options={trainingExercises.workout}
//           valueField="_id"
//           labelField="name"
//           multi
//         />

//         {selectedTrainingExercises.map((workout, wIndex) => (
//           <div key={wIndex} className="border p-4 rounded-lg" dir="rtl">
//             <h3 className="font-semibold">{workout.name}</h3>
//             {workout.exercises.map((ex, exIndex) => (
//               <div key={exIndex} className="flex items-center justify-between">
//                 <div className="mt-16">
//                   <Trash
//                     // onClick={() => removeExercise(wIndex, exIndex)}
//                     className="cursor-pointer text-red-500"
//                   />
//                 </div>
//                 <div>
//                   <p className="col-span-1 font-medium">{ex?.name}</p>
//                   <div className="grid grid-cols-3 gap-4 mt-4">
//                     <div className="space-y-2">
//                       <label htmlFor="sets">Sets</label>
//                       <input
//                         type="number"
//                         value={ex.sets}
//                         onChange={(e) => {
//                           const updatedExercises = [...workout.exercises];
//                           updatedExercises[exIndex].sets = e.target.value;
//                           setSelectedTrainingExercises((prev) => {
//                             const updated = [...prev];
//                             updated[wIndex].exercises = updatedExercises;
//                             return updated;
//                           });
//                         }}
//                         className="border rounded p-2 w-full"
//                         placeholder="Sets"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="reps">Reps</label>
//                       <input
//                         type="number"
//                         value={ex.reps}
//                         onChange={(e) => {
//                           const updatedExercises = [...workout.exercises];
//                           updatedExercises[exIndex].reps = e.target.value;
//                           setSelectedTrainingExercises((prev) => {
//                             const updated = [...prev];
//                             updated[wIndex].exercises = updatedExercises;
//                             return updated;
//                           });
//                         }}
//                         className="border rounded p-2 w-full"
//                         placeholder="Reps"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="manipulation">Manipulation</label>
//                       <ShadSelect
//                         value={ex.manipulation}
//                         onValueChange={(value) => {
//                           const updatedExercises = [...workout.exercises];
//                           updatedExercises[exIndex].manipulation = value;
//                           setSelectedTrainingExercises((prev) => {
//                             const updated = [...prev];
//                             updated[wIndex].exercises = updatedExercises;
//                             return updated;
//                           });

//                           // Disable "Superset" if it is selected
//                           if (value === "Superset") {
//                             setIsSupersetSelected(true);
//                           }
//                           handleAssignButtonClick(value);
//                         }}
//                       >
//                         <SelectTrigger className="border rounded p-2 w-full">
//                           <SelectValue placeholder="Select manipulation">
//                             {ex?.manipulation}
//                           </SelectValue>
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem
//                             value="Superset"
//                             disabled={isSupersetSelected}
//                           >
//                             Superset
//                           </SelectItem>
//                           <SelectItem value="DropSet">Drop Set</SelectItem>
//                         </SelectContent>
//                       </ShadSelect>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="my-5">
//               {selectedExercises.length > 0 && (
//                 <Button
//                   type="button"
//                   onClick={() => addSelectedExercisesToWorkout(wIndex)}
//                   className="bg-customBg text-white px-4 py-2 rounded-full"
//                 >
//                   Add Selected Exercises
//                 </Button>
//               )}
//             </div>
//             <div className="flex justify-center ">
//               <div
//                 className="bg-customBg text-white px-4 py-2 rounded-full my-4 cursor-pointer"
//                 onClick={() => setAddMoreExercise(true)}
//               >
//                 Add More Exercise
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="bg-customBg text-white px-4 py-2 rounded-full"
//             disabled={assignButton === "Superset"}
//           >
//             {userId ? "Assign Training" : " Update Training"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditTrainingForm;

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-dropdown-select";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import { base_url } from "@/api/baseUrl";
// import { Trash } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const EditTrainingForm = () => {
//   const { id } = useParams();
//   const [training, setTraining] = useState({});
//   const [exerciseList, setExerciseList] = useState([]);
//   const [workouts, setWorkouts] = useState([]);
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
//   const [exerciseSelectVisible, setExerciseSelectVisible] = useState({});

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [exerciseRes, workoutRes, trainingRes] = await Promise.all([
//           axios.get(`${base_url}/exercise`),
//           axios.get(`${base_url}/workout`),
//           axios.get(`${base_url}/training/${id}`),
//         ]);

//         if (exerciseRes.status === 200) setExerciseList(exerciseRes.data.data);
//         if (workoutRes.status === 200) setWorkouts(workoutRes.data.data);
//         if (trainingRes.status === 200) setTraining(trainingRes.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);
//   console.log("training:", training);
//   // Add selected workout with exercises
//   const handleAddWorkout = (selected) => {
//     if (!selected.length) return;
//     const newWorkout = selected[0];

//     if (training.workouts?.some((w) => w.workout?._id === newWorkout?._id)) {
//       setSelectedWorkout(null);
//       return;
//     }

//     const updatedTraining = {
//       ...training,
//       workouts: [
//         ...(training.workouts || []),
//         {
//           _id: newWorkout._id,
//           workout: newWorkout,
//           exercises: newWorkout.exercises || [],
//         },
//       ],
//     };

//     setTraining(updatedTraining);
//     setSelectedWorkout(null);
//     setShowWorkoutSelect(false);
//   };

//   // Add a new exercise to a specific workout
//   const handleAddExercise = (workoutId, selected) => {
//     if (!selected.length) return;
//     const newExercise = selected[0];

//     setTraining((prev) => ({
//       ...prev,
//       workouts: prev.workouts.map((workout) =>
//         workout._id === workoutId
//           ? {
//               ...workout,
//               exercises: [
//                 ...workout.exercises,
//                 {
//                   _id: newExercise._id,
//                   exercise_id: newExercise,
//                   sets: "",
//                   reps: "",
//                   manipulation: "",
//                 },
//               ],
//             }
//           : workout
//       ),
//     }));

//     setExerciseSelectVisible((prev) => ({ ...prev, [workoutId]: false }));
//   };

//   // Remove an exercise from a workout
//   const handleRemoveExercise = (workoutId, exerciseId) => {
//     setTraining((prev) => ({
//       ...prev,
//       workouts: prev.workouts.map((workout) =>
//         workout._id === workoutId
//           ? {
//               ...workout,
//               exercises: workout.exercises.filter(
//                 (ex) => ex._id !== exerciseId
//               ),
//             }
//           : workout
//       ),
//     }));
//   };

//   const onSubmit = async (data) => {
//     console.log("trainingUpdate:", data);
//   };

//   return (
//     <div className="py-10 w-[500px]">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <DynamicInputField
//           id="name"
//           type="text"
//           label="Training Name"
//           placeholder="Enter training name..."
//           register={register}
//           validation={{ required: !id && "Name is required" }}
//           errors={errors}
//           defaultValue={training?.name}
//         />

//         <DynamicInputField
//           id="description"
//           type="text"
//           label="Description"
//           placeholder="Enter description..."
//           register={register}
//           validation={{ required: !id && "Description is required" }}
//           errors={errors}
//           defaultValue={training?.description}
//         />

//         {showWorkoutSelect && (
//           <Select
//             options={workouts}
//             valueField="_id"
//             labelField="name"
//             onChange={handleAddWorkout}
//           />
//         )}

//         <div className="my-5">
//           {training?.workouts?.map((workout) => (
//             <div key={workout._id} className="border py-2 px-4 rounded-md my-4">
//               <h1 className="font-semibold">{workout?.workout?.name}</h1>

//               {workout?.exercises?.map((ex) => (
//                 <div
//                   key={ex._id}
//                   className="border py-2 px-4 rounded-md my-4 flex items-center justify-between gap-x-2"
//                 >
//                   <div>
//                     <p className="py-4">{ex?.name}</p>
//                     <div className="flex items-center justify-between gap-x-2">
//                       <div className="flex flex-col items-center space-y-4">
//                         <p>Sets</p>
//                         <Input type="number" defaultValue={ex?.sets} />
//                       </div>
//                       <div className="flex flex-col items-center space-y-4">
//                         <p>Reps</p>
//                         <Input type="number" defaultValue={ex?.reps} />
//                       </div>
//                       <div className="flex flex-col items-center space-y-4">
//                         <p>Manipulation</p>
//                         <Input type="text" defaultValue={ex?.manipulation} />
//                       </div>
//                     </div>
//                   </div>
//                   <Trash
//                     className="cursor-pointer text-red-600"
//                     onClick={() => handleRemoveExercise(workout._id, ex._id)}
//                   />
//                 </div>
//               ))}

//               {exerciseSelectVisible[workout._id] && (
//                 <Select
//                   options={exerciseList}
//                   valueField="_id"
//                   labelField="name"
//                   onChange={(selected) =>
//                     handleAddExercise(workout._id, selected)
//                   }
//                 />
//               )}

//               <Button
//                 onClick={() =>
//                   setExerciseSelectVisible((prev) => ({
//                     ...prev,
//                     [workout._id]: true,
//                   }))
//                 }
//                 className="mt-2"
//               >
//                 Add More Exercise
//               </Button>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center justify-between">
//           <Button type="submit">Update Training</Button>
//           <Button onClick={() => setShowWorkoutSelect(true)}>
//             Add More Workout
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditTrainingForm;

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-dropdown-select";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import { base_url } from "@/api/baseUrl";
// import { Trash } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const EditTrainingForm = () => {
//   const { id } = useParams();
//   const [training, setTraining] = useState({});
//   const [exerciseList, setExerciseList] = useState([]);
//   const [workouts, setWorkouts] = useState([]);
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
//   const [exerciseSelectVisible, setExerciseSelectVisible] = useState({});

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [exerciseRes, workoutRes, trainingRes] = await Promise.all([
//           axios.get(`${base_url}/exercise`),
//           axios.get(`${base_url}/workout`),
//           axios.get(`${base_url}/training/${id}`),
//         ]);

//         if (exerciseRes.status === 200) setExerciseList(exerciseRes.data.data);
//         if (workoutRes.status === 200) setWorkouts(workoutRes.data.data);
//         if (trainingRes.status === 200) setTraining(trainingRes.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleAddWorkout = (selected) => {
//     if (!selected.length) return;
//     const newWorkout = selected[0];

//     if (training.workouts?.some((w) => w.workout?._id === newWorkout?._id)) {
//       setSelectedWorkout(null);
//       return;
//     }

//     const updatedTraining = {
//       ...training,
//       workouts: [
//         ...(training.workouts || []),
//         {
//           _id: newWorkout._id,
//           workout: newWorkout,
//           exercises: newWorkout.exercises || [],
//         },
//       ],
//     };

//     setTraining(updatedTraining);
//     setSelectedWorkout(null);
//     setShowWorkoutSelect(false);
//   };

//   const handleAddExercise = (workoutId, selected) => {
//     if (!selected.length) return;
//     const newExercise = selected[0];

//     setTraining((prev) => ({
//       ...prev,
//       workouts: prev.workouts.map((workout) =>
//         workout._id === workoutId
//           ? {
//               ...workout,
//               exercises: [
//                 ...workout.exercises,
//                 {
//                   _id: newExercise._id,
//                   exercise_id: newExercise,
//                   sets: "",
//                   reps: "",
//                   manipulation: "",
//                 },
//               ],
//             }
//           : workout
//       ),
//     }));

//     setExerciseSelectVisible((prev) => ({ ...prev, [workoutId]: false }));
//   };

//   const handleRemoveExercise = (workoutId, exerciseId) => {
//     setTraining((prev) => ({
//       ...prev,
//       workouts: prev.workouts.map((workout) =>
//         workout._id === workoutId
//           ? {
//               ...workout,
//               exercises: workout.exercises.filter(
//                 (ex) => ex._id !== exerciseId
//               ),
//             }
//           : workout
//       ),
//     }));
//   };

//   const onSubmit = async (data) => {
//     // try {
//     //   const response = await axios.put(`${base_url}/training/${id}`, {
//     //     ...data,
//     //     workouts: training.workouts,
//     //   });
//     //   if (response.status === 200) {
//     //     console.log("Training updated successfully");
//     //   }
//     // } catch (error) {
//     //   console.error("Error updating training:", error);
//     // }

//     const payload = {
//       ...data,
//       workouts: training.workouts,
//     };
//     console.log("updateTData:", payload);
//   };

//   return (
//     <div className="py-10 w-[500px]">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <DynamicInputField
//           id="name"
//           type="text"
//           label="Training Name"
//           placeholder="Enter training name..."
//           register={register}
//           validation={{ required: !id && "Name is required" }}
//           errors={errors}
//           defaultValue={training?.name}
//         />

//         <DynamicInputField
//           id="description"
//           type="text"
//           label="Description"
//           placeholder="Enter description..."
//           register={register}
//           validation={{ required: !id && "Description is required" }}
//           errors={errors}
//           defaultValue={training?.description}
//         />

//         {showWorkoutSelect && (
//           <Select
//             options={workouts}
//             valueField="_id"
//             labelField="name"
//             onChange={handleAddWorkout}
//           />
//         )}

//         <div className="my-5">
//           {training?.workouts?.map((workout) => (
//             <div key={workout._id} className="border py-2 px-4 rounded-md my-4">
//               <h1 className="font-semibold">{workout?.workout?.name}</h1>

//               {workout?.exercises?.map((ex) => (
//                 <div
//                   key={ex._id}
//                   className="border py-2 px-4 rounded-md my-4 flex items-center justify-between gap-x-2"
//                 >
//                   <div>
//                     <p className="py-4">{ex?.name}</p>
//                     <div className="flex items-center justify-between gap-x-2">
//                       <div className="flex flex-col items-center space-y-4">
//                         <p>Sets</p>
//                         <Input type="number" defaultValue={ex?.sets} />
//                       </div>
//                       <div className="flex flex-col items-center space-y-4">
//                         <p>Reps</p>
//                         <Input type="number" defaultValue={ex?.reps} />
//                       </div>
//                       <div className="flex flex-col items-center space-y-4">
//                         <p>Manipulation</p>
//                         <Input type="text" defaultValue={ex?.manipulation} />
//                       </div>
//                     </div>
//                   </div>
//                   <Trash
//                     className="cursor-pointer text-red-600"
//                     onClick={() => handleRemoveExercise(workout._id, ex._id)}
//                   />
//                 </div>
//               ))}

//               {exerciseSelectVisible[workout._id] && (
//                 <Select
//                   options={exerciseList}
//                   valueField="_id"
//                   labelField="name"
//                   onChange={(selected) =>
//                     handleAddExercise(workout._id, selected)
//                   }
//                 />
//               )}

//               <Button
//                 onClick={() =>
//                   setExerciseSelectVisible((prev) => ({
//                     ...prev,
//                     [workout._id]: true,
//                   }))
//                 }
//                 className="mt-2"
//               >
//                 Add More Exercise
//               </Button>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center justify-between">
//           <Button type="submit">Update Training</Button>
//           <Button onClick={() => setShowWorkoutSelect(true)}>
//             Add More Workout
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditTrainingForm;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { base_url } from "@/api/baseUrl";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditTrainingForm = () => {
  const { id } = useParams();
  const [training, setTraining] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutSelect, setShowWorkoutSelect] = useState(false);
  const [exerciseSelectVisible, setExerciseSelectVisible] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exerciseRes, workoutRes, trainingRes] = await Promise.all([
          axios.get(`${base_url}/exercise`),
          axios.get(`${base_url}/workout`),
          axios.get(`${base_url}/training/${id}`),
        ]);

        if (exerciseRes.status === 200) setExerciseList(exerciseRes.data.data);
        if (workoutRes.status === 200) setWorkouts(workoutRes.data.data);
        if (trainingRes.status === 200) {
          setTraining(trainingRes.data.data);
          setValue("name", trainingRes.data.data.name);
          setValue("description", trainingRes.data.data.description);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleAddWorkout = (selected) => {
    if (!selected.length) return;
    const newWorkout = selected[0];

    if (training.workouts?.some((w) => w.workout?._id === newWorkout?._id)) {
      setSelectedWorkout(null);
      return;
    }

    const updatedTraining = {
      ...training,
      workouts: [
        ...(training.workouts || []),
        {
          _id: newWorkout._id,
          workout: newWorkout,
          exercises: [], // Initialize exercises as an empty array
        },
      ],
    };

    setTraining(updatedTraining);
    setSelectedWorkout(null);
    setShowWorkoutSelect(false);
  };

  const handleAddExercise = (workoutId, selected) => {
    if (!selected.length) return;
    const newExercise = selected[0];

    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout._id === workoutId
          ? {
              ...workout,
              exercises: [
                ...workout.exercises,
                {
                  _id: newExercise._id,
                  exercise_id: newExercise,
                  sets: 0,
                  reps: 0,
                  manipulation: "",
                },
              ],
            }
          : workout
      ),
    }));

    setExerciseSelectVisible((prev) => ({ ...prev, [workoutId]: false }));
  };

  const handleRemoveExercise = (workoutId, exerciseId) => {
    setTraining((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout._id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.filter(
                (ex) => ex._id !== exerciseId
              ),
            }
          : workout
      ),
    }));
  };

  const onSubmit = async (data) => {
    // try {
    //   const response = await axios.put(`${base_url}/training/${id}`, {
    //     ...data,
    //     workouts: training.workouts,
    //   });
    //   if (response.status === 200) {
    //     console.log("Training updated successfully");
    //   }
    // } catch (error) {
    //   console.error("Error updating training:", error);
    // }

    console.log("trainingData:", { ...data, workouts: training.workouts });
  };

  return (
    <div className="py-10 w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DynamicInputField
          id="name"
          type="text"
          label="Training Name"
          placeholder="Enter training name..."
          register={register}
          validation={{ required: !id && "Name is required" }}
          errors={errors}
          defaultValue={training?.name}
        />

        <DynamicInputField
          id="description"
          type="text"
          label="Description"
          placeholder="Enter description..."
          register={register}
          validation={{ required: !id && "Description is required" }}
          errors={errors}
          defaultValue={training?.description}
        />

        {showWorkoutSelect && (
          <Select
            options={workouts}
            valueField="_id"
            labelField="name"
            onChange={handleAddWorkout}
          />
        )}

        <div className="my-5">
          {training?.workouts?.map((workout) => (
            <div key={workout._id} className="border py-2 px-4 rounded-md my-4">
              <h1 className="font-semibold">{workout?.workout?.name}</h1>

              {workout?.exercises?.map((ex) => (
                <div
                  key={ex._id}
                  className="border py-2 px-4 rounded-md my-4 flex items-center justify-between gap-x-2"
                >
                  <div>
                    <p className="py-4">{ex?.exercise_id?.name}</p>
                    <div className="flex items-center justify-between gap-x-2">
                      <div className="flex flex-col items-center space-y-4">
                        <p>Sets</p>
                        <Input
                          type="number"
                          defaultValue={ex?.sets || 0}
                          onChange={(e) => {
                            const updatedSets = e.target.value;
                            setTraining((prev) => ({
                              ...prev,
                              workouts: prev.workouts.map((w) =>
                                w._id === workout._id
                                  ? {
                                      ...w,
                                      exercises: w.exercises.map((exercise) =>
                                        exercise._id === ex._id
                                          ? { ...exercise, sets: updatedSets }
                                          : exercise
                                      ),
                                    }
                                  : w
                              ),
                            }));
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>Reps</p>
                        <Input
                          type="number"
                          defaultValue={ex?.reps || 0}
                          onChange={(e) => {
                            const updatedReps = e.target.value;
                            setTraining((prev) => ({
                              ...prev,
                              workouts: prev.workouts.map((w) =>
                                w._id === workout._id
                                  ? {
                                      ...w,
                                      exercises: w.exercises.map((exercise) =>
                                        exercise._id === ex._id
                                          ? { ...exercise, reps: updatedReps }
                                          : exercise
                                      ),
                                    }
                                  : w
                              ),
                            }));
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-center space-y-4">
                        <p>Manipulation</p>
                        <Input
                          type="text"
                          defaultValue={ex?.manipulation || ""}
                          onChange={(e) => {
                            const updatedManipulation = e.target.value;
                            setTraining((prev) => ({
                              ...prev,
                              workouts: prev.workouts.map((w) =>
                                w._id === workout._id
                                  ? {
                                      ...w,
                                      exercises: w.exercises.map((exercise) =>
                                        exercise._id === ex._id
                                          ? {
                                              ...exercise,
                                              manipulation: updatedManipulation,
                                            }
                                          : exercise
                                      ),
                                    }
                                  : w
                              ),
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Trash
                    className="cursor-pointer text-red-600"
                    onClick={() => handleRemoveExercise(workout._id, ex._id)}
                  />
                </div>
              ))}

              {exerciseSelectVisible[workout._id] && (
                <Select
                  options={exerciseList}
                  valueField="_id"
                  labelField="name"
                  onChange={(selected) =>
                    handleAddExercise(workout._id, selected)
                  }
                />
              )}

              <Button
                onClick={() =>
                  setExerciseSelectVisible((prev) => ({
                    ...prev,
                    [workout._id]: true,
                  }))
                }
                className="mt-2"
              >
                Add More Exercise
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit">Update Training</Button>
          <Button onClick={() => setShowWorkoutSelect(true)}>
            Add More Workout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainingForm;
