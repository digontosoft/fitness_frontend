// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import { useNavigate } from "react-router-dom";
// import { Trash } from "lucide-react";
// import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
// import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";

// const AddTrainingForm = () => {
//   const [trainingExercises, setTrainingExercises] = useState([]);
//   const [allExercises, setAllExercises] = useState([]);
//   const [addMoreExercise, setAddMoreExercise] = useState(null);
//   const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [selectedBodyPart, setSelectedBodyPart] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [selectedExercise, setSelectedExercise] = useState([]);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleWorkoutChange = (values) => {
//     setSelectedTrainingExercises((prevWorkouts) => {
//       const newWorkouts = values.map((workout) => {
//         const existingWorkout = prevWorkouts.find(
//           (w) => w.workout === workout._id
//         );

//         return {
//           workout: workout._id,
//           name: workout.name,
//           exercises: existingWorkout
//             ? existingWorkout.exercises
//             : workout.exercises?.map((exercise) => ({
//                 exercise_id: exercise.exercise_id?._id || exercise._id,
//                 name: exercise.exercise_id?.name || exercise.name,
//                 sets: exercise.sets || 3,
//                 reps: exercise.reps || 10,
//                 manipulation: exercise.manipulation || "Default manipulation",
//               })) || [],
//         };
//       });

//       return newWorkouts;
//     });
//   };
//   const [selectedTrainingExercises, setSelectedTrainingExercises] = useState(
//     []
//   );

//   // Check if any field (sets, reps, or manipulation) is empty in any exercise
//   useEffect(() => {
//     if (!selectedTrainingExercises) {
//       setIsButtonDisabled(false);
//       return;
//     }

//     const isAnyFieldEmpty = selectedTrainingExercises.some((workout) =>
//       workout.exercises.some(
//         (exercise) =>
//           exercise.sets === "" || exercise.reps === "" || !exercise.manipulation
//       )
//     );

//     setIsButtonDisabled(isAnyFieldEmpty);
//   }, [selectedTrainingExercises]);

//   useEffect(() => {
//     const fetchWorkout = async () => {
//       try {
//         const response = await axios.get(`${base_url}/workout`);
//         setTrainingExercises(response.data.data);
//       } catch (error) {
//         console.error("Error fetching training exercises:", error);
//       }
//     };
//     fetchWorkout();
//   }, []);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         setAllExercises(response.data.data);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercises();
//   }, []);

//   console.log("selectedTrainingExercises", selectedTrainingExercises);

//   const checkSupersetCompletion = () => {
//     let incomplete = false;
//     selectedTrainingExercises.forEach((workout) => {
//       const supersetExercises = workout.exercises.filter(
//         (exercise) => exercise.manipulation === "superset"
//       );

//       if (supersetExercises.length === 1) {
//         incomplete = true;
//       }
//     });
//     setIsSupersetIncomplete(incomplete);
//   };

//   const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
//     const updatedWorkouts = [...selectedTrainingExercises];
//     const workout = updatedWorkouts[workoutIndex];
//     const exercise = workout.exercises[exerciseIndex];

//     if (field === "manipulation" && value === "superset") {
//       // Check if there is already a superset in the workout
//       // const existingSuperset = workout.exercises.some(
//       //   (ex, idx) => ex.manipulation === "superset" && idx !== exerciseIndex
//       // );

//       // if (existingSuperset) {
//       //   toast.error("Only one superset is allowed per workout.");
//       //   setIsSupersetIncomplete(true);
//       //   return;
//       // } else {
//       //   setIsSupersetIncomplete(false);
//       // }

//       // Check if this is the last exercise
//       const isLastExercise = exerciseIndex === workout.exercises.length - 1;

//       // If it's not the last exercise, check the next exercise
//       if (!isLastExercise) {
//         const nextExercise = workout.exercises[exerciseIndex + 1];
//         if (!nextExercise || nextExercise.manipulation !== "superset") {
//           // If the next exercise doesn't exist or isn't a superset, check if it has other manipulations
//           if (nextExercise && nextExercise.manipulation !== "superset") {
//             // If the next exercise has a different manipulation, it's allowed
//             setIsSupersetIncomplete(false);
//           } else {
//             // If there is no next exercise or it's not a superset, the superset is incomplete
//             setIsSupersetIncomplete(true);
//             toast.error("The next exercise must also be a superset.");
//             return;
//           }
//         }
//       } else {
//         // If it's the last exercise, allow creating a superset
//         setIsSupersetIncomplete(false);
//       }
//     }

//     // If the current exercise is being removed from superset, check the previous exercise
//     if (
//       field === "manipulation" &&
//       value !== "superset" &&
//       exercise.manipulation === "superset"
//     ) {
//       const previousExercise = workout.exercises[exerciseIndex - 1];
//       if (previousExercise && previousExercise.manipulation === "superset") {
//         setIsSupersetIncomplete(true);
//         toast.error(
//           "Cannot remove superset from this exercise as the previous exercise is a superset."
//         );
//         return;
//       }
//     }

//     // Update the exercise field
//     exercise[field] = value;

//     // Check if the superset is complete after the update
//     if (field === "manipulation" && value === "superset") {
//       const nextExercise = workout.exercises[exerciseIndex + 1];
//       if (!nextExercise || nextExercise.manipulation !== "superset") {
//         // If there is no next exercise or it's not a superset, check if it has other manipulations
//         if (nextExercise && nextExercise.manipulation !== "superset") {
//           // If the next exercise has a different manipulation, it's allowed
//           setIsSupersetIncomplete(false);
//         } else {
//           // Otherwise, the superset is incomplete
//           setIsSupersetIncomplete(true);
//         }
//       } else {
//         setIsSupersetIncomplete(false);
//       }
//     } else {
//       setIsSupersetIncomplete(false);
//     }

//     setSelectedTrainingExercises(updatedWorkouts);
//   };

//   const handleAddMoreExercise = (workoutIndex) => {
//     setAddMoreExercise(workoutIndex);
//   };


//   useEffect(() => {
//     const fetchFilteredExercises = async () => {
//       if (selectedBodyPart || selectedEquipment) {
//         let url = `${base_url}/exercise?`;
//         if (selectedBodyPart) {
//           url += `body_part=${selectedBodyPart}&`;
//         }
//         if (selectedEquipment) {
//           url += `equipment=${selectedEquipment}&`;
//         }
//         url = url.slice(0, -1); // Remove trailing '&' or '?'

//         try {
//           const response = await axios.get(url);
//           setSelectedExercise(response.data.data || []);
//           console.log("Filtered exercises for selection:", response.data.data);
//         } catch (error) {
//           console.error("Error fetching filtered exercises:", error);
//           setSelectedExercise([]);
//         }
//       } else {
//         // If no filters are selected, show all exercises again
//         setSelectedExercise(allExercises);
//       }
//     };

//     fetchFilteredExercises();
//   }, [selectedBodyPart, selectedEquipment, allExercises]);

//   const handleNewExerciseSelection = (selectedExercises) => {
//     // if (addMoreExercise === null) return;

//     setSelectedTrainingExercises((prevWorkouts) => {
//       const updatedWorkouts = [...prevWorkouts];
//       const workout = updatedWorkouts[addMoreExercise];

//       selectedExercises.forEach((exercise) => {
//         workout.exercises.push({
//           exercise_id: exercise._id,
//           name: exercise.name,
//           sets: "",
//           reps: "",
//           manipulation: exercise.manipulation || "",
//         });
//       });
//       return updatedWorkouts;
//     });

//     setIsSupersetIncomplete(false);
//     setAddMoreExercise(null);
//   };

//   const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
//     setSelectedTrainingExercises((prevWorkouts) => {
//       const updatedWorkouts = [...prevWorkouts];
//       updatedWorkouts[workoutIndex].exercises.splice(exerciseIndex, 1);
//       return updatedWorkouts;
//     });
//     checkSupersetCompletion();
//   };

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         name: data.name,
//         description: data.description,
//         workouts: selectedTrainingExercises.map((workout) => ({
//           workout: workout.workout,
//           exercises: workout.exercises.map((exercise) => ({
//             exercise_id: exercise.exercise_id,
//             sets: exercise.sets,
//             reps: exercise.reps,
//             manipulation: exercise.manipulation,
//           })),
//         })),
//       };

//       console.log("add training payload", payload);

//       await axios.post(`${base_url}/training`, payload).then((response) => {
//         if (response.status === 201) {
//           toast.success("Training session saved successfully!");
//           setSelectedTrainingExercises([]);
//           reset();
//           navigate("/dashboard/training-list");
//         }
//       });
//     } catch (error) {
//       console.error("Error submitting training session:", error);
//       toast.error("Failed to save training session.");
//     }
//   };
//   return (
//     <div className="sm:py-20 py-6" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="sm:min-w-[350px]"
//             id="name"
//             type="text"
//             label="שם תוכנית אימון"
//             placeholder="הוסף 
// שם תוכנית אימון..."
//             register={register}
//             validation={{ required: "Training Name is required" }}
//             errors={errors}
//           />

//           <DynamicTextAreaField
//             className="sm:min-w-[350px]"
//             id="description"
//             type="text"
//             label="תיאור תוכנית אימון"
//             placeholder="הוסף תיאור תוכנית אימון..."
//             register={register}
//             validation={{ required: "Training Description is required" }}
//             errors={errors}
//           />

//           <Select
//             className="rounded-lg h-12"
//             direction="rtl"
//             options={trainingExercises}
//             valueField="_id"
//             labelField="name"
//             onChange={handleWorkoutChange}
//             placeholder="בחר..."
//             searchBy="name"
//           />
//         </div>

//         <div className="space-y-4 sm:w-[550px]">
//           {selectedTrainingExercises.map((workout, workoutIndex) => (
//             <div key={workout.workout} className="p-4 border rounded-lg">
//               <h3 className="text-lg font-semibold">{workout.name}</h3>
//               <div className="space-y-2 mt-2">
//                 {workout.exercises.map((exercise, exerciseIndex) => (
//                   <div
//                     key={exercise.exercise_id}
//                     className="p-3 border rounded-md"
//                   >
//                     <h4 className="font-medium">{exercise.name}</h4>
//                     <div className="flex items-center justify-center gap-2 mt-2">
//                       <Trash
//                         className="text-red-500 cursor-pointer size-9"
//                         onClick={() =>
//                           handleRemoveExercise(workoutIndex, exerciseIndex)
//                         }
//                       />
//                       <div>
//                         <label htmlFor="sets">סטים</label>
//                         <input
//                           type="number"
//                           className="border rounded p-1 w-full"
//                           value={exercise.sets}
//                           onChange={(e) =>
//                             handleExerciseChange(
//                               workoutIndex,
//                               exerciseIndex,
//                               "sets",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="reps">חזרות</label>
//                         <input
//                           type="number"
//                           className="border rounded p-1 w-full"
//                           value={exercise.reps}
//                           onChange={(e) =>
//                             handleExerciseChange(
//                               workoutIndex,
//                               exerciseIndex,
//                               "reps",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="manipulation">מניפולציה </label>
//                         <input
//                           type="text"
//                           className="border rounded p-1 w-full  text-center placeholder:text-sm  "
//                           value={exercise.manipulation}
//                           onChange={(e) =>
//                             handleExerciseChange(
//                               workoutIndex,
//                               exerciseIndex,
//                               "manipulation",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {addMoreExercise === workoutIndex && (
//                 <div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       אזור בגוף
//                     </label>
//                     <Select
//                       className="rounded-lg h-12 w-auto"
//                       direction="rtl"
//                       valueField="id"
//                       labelField="label"
//                       options={bodyPartOptions}
//                       placeholder="סנן לפי חלק בגוף"
//                       onChange={(selectedOptions) => {
//                         const values = selectedOptions.map(
//                           (option) => option.value
//                         );
//                         setSelectedBodyPart(values[0]);
//                       }}
//                       searchBy="label"
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       ציוד
//                     </label>
//                     <Select
//                       className="rounded-lg h-12 w-auto"
//                       direction="rtl"
//                       options={equipmentOptions}
//                       valueField="id"
//                       labelField="label"
//                       placeholder="סנן לפי ציוד"
//                       onChange={(selectedOptions) => {
//                         const values = selectedOptions.map(
//                           (option) => option.value
//                         );
//                         setSelectedEquipment(values[0]);
//                       }}
//                       searchBy="label"
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       סנן לפי שם תרגיל
//                     </label>
//                     <Select
//                       className="rounded-lg h-12 w-auto"
//                       direction="rtl"
//                       options={selectedExercise}
//                       valueField="_id"
//                       labelField="name"
//                       placeholder="בחר"
//                       onChange={handleNewExerciseSelection}
//                       searchBy="name"
//                     />
//                   </div>
//                 </div>
//               )}

//               <Button
//                 type="button"
//                 className="mt-5 bg-customBg"
//                 onClick={() => handleAddMoreExercise(workoutIndex)}
//               >
//                 הוסף עוד תרגיל לאימון
//               </Button>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className={
//               isButtonDisabled || isSupersetIncomplete
//                 ? "text-black px-4 md:px-8 py-2 rounded-full bg-gray-200"
//                 : "text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//             }
//             disabled={isButtonDisabled || isSupersetIncomplete}
//           >
//             שמור תכנית אימון חדשה
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTrainingForm;




import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
import { Button } from "@/components/ui/button";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddTrainingForm = () => {
  const [trainingExercises, setTrainingExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [selectedTrainingExercises, setSelectedTrainingExercises] = useState([]);
  const [showWorkoutSelect, setShowWorkoutSelect] = useState(true);
  const [addMoreExercise, setAddMoreExercise] = useState(null);
  const [isSupersetIncomplete, setIsSupersetIncomplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ✅ Workout select handler (single add at a time)
  const handleWorkoutSelect = (selected) => {
    if (!selected.length) return;
    const newWorkout = selected[0];

    // prevent duplicate
    const alreadyExists = selectedTrainingExercises.some(
      (w) => w.workout === newWorkout._id
    );
    if (alreadyExists) {
      toast.error("Workout already added!");
      setShowWorkoutSelect(false);
      return;
    }

    const newEntry = {
      workout: newWorkout._id,
      name: newWorkout.name,
      exercises:
        newWorkout.exercises?.map((exercise) => ({
          exercise_id: exercise.exercise_id?._id || exercise._id,
          name: exercise.exercise_id?.name || exercise.name,
          sets: exercise.sets || "",
          reps: exercise.reps || "",
          manipulation: exercise.manipulation || "",
        })) || [],
    };

    setSelectedTrainingExercises((prev) => [...prev, newEntry]);
    setShowWorkoutSelect(false); // hide after select
  };

  // ✅ Add more workout button
  const handleAddMoreWorkout = () => {
    setShowWorkoutSelect(true);
  };

  // ✅ Exercise manipulation logic same as before
  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const updated = [...selectedTrainingExercises];
    const workout = updated[workoutIndex];
    const exercise = workout.exercises[exerciseIndex];

    exercise[field] = value;
    setSelectedTrainingExercises(updated);
  };

  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
    setSelectedTrainingExercises((prev) => {
      const updated = [...prev];
      updated[workoutIndex].exercises.splice(exerciseIndex, 1);
      return updated;
    });
  };

  const handleAddMoreExercise = (workoutIndex) => {
    setAddMoreExercise(workoutIndex);
  };

  // ✅ New Exercise Filter logic
  useEffect(() => {
    const fetchFilteredExercises = async () => {
      if (selectedBodyPart || selectedEquipment) {
        let url = `${base_url}/exercise?`;
        if (selectedBodyPart) url += `body_part=${selectedBodyPart}&`;
        if (selectedEquipment) url += `equipment=${selectedEquipment}&`;
        url = url.slice(0, -1);

        try {
          const response = await axios.get(url);
          setSelectedExercise(response.data.data || []);
        } catch (error) {
          console.error("Error fetching filtered exercises:", error);
          setSelectedExercise([]);
        }
      } else {
        setSelectedExercise(allExercises);
      }
    };
    fetchFilteredExercises();
  }, [selectedBodyPart, selectedEquipment, allExercises]);

  const handleNewExerciseSelection = (selectedExercises) => {
    if (addMoreExercise === null) return;

    setSelectedTrainingExercises((prev) => {
      const updated = [...prev];
      const workout = updated[addMoreExercise];
      selectedExercises.forEach((exercise) => {
        workout.exercises.push({
          exercise_id: exercise._id,
          name: exercise.name,
          sets: "",
          reps: "",
          manipulation: "",
        });
      });
      return updated;
    });

    setAddMoreExercise(null);
  };

  // ✅ Fetch workouts & exercises
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await axios.get(`${base_url}/workout`);
        setTrainingExercises(res.data.data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    };
    fetchWorkout();

    const fetchExercises = async () => {
      try {
        const res = await axios.get(`${base_url}/exercise`);
        setAllExercises(res.data.data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };
    fetchExercises();
  }, []);

  // ✅ Submit
  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        workouts: selectedTrainingExercises.map((workout) => ({
          workout: workout.workout,
          exercises: workout.exercises.map((exercise) => ({
            exercise_id: exercise.exercise_id,
            sets: exercise.sets,
            reps: exercise.reps,
            manipulation: exercise.manipulation,
          })),
        })),
      };

      console.log('training payload:', payload)
      await axios.post(`${base_url}/training`, payload);
      toast.success("Training session saved successfully!");
      reset();
      setSelectedTrainingExercises([]);
      navigate("/dashboard/training-list");

    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Failed to save training session.");
    }
  };
 
// const onSubmit = async (data) => {
//   try {
//    const payload = {
//     name: data.name,
//     description: data.description,
//     workouts: selectedTrainingExercises.map((workout) => {
//         // console.log() এখন map কলব্যাক ব্লকের মধ্যে আছে
//         console.log('selected workout:', workout); 
        
//         // অবশ্যই একটি অবজেক্ট রিটার্ন করতে হবে
//         return {
//             workout: {
//                 _id: workout.workout,
//                 name: workout.name,
//                 description: workout.description || "",
//                 exercises: workout.exercises.map((exercise) => ({
//                     exercise_id: exercise.exercise_id,
//                     sets: Number(exercise.sets) || 0,
//                     reps: Number(exercise.reps) || 0,
//                     manipulation: exercise.manipulation || "",
//                 })),
//             },
//         };
//     }),
// };

//     console.log("✅ Training Payload:", payload);

//     await axios.post(`${base_url}/training`, payload);
//     toast.success("Training session saved successfully!");
//     reset();
//     setSelectedTrainingExercises([]);
//     navigate("/dashboard/training-list");
//   } catch (err) {
//     console.error("Error submitting:", err);
//     toast.error("Failed to save training session.");
//   }
// };

  return (
    <div className="sm:py-20 py-6" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="grid gap-4">
          <DynamicInputField
            className="sm:min-w-[350px]"
            id="name"
            type="text"
            label="שם תוכנית אימון"
            placeholder="הוסף שם תוכנית אימון..."
            register={register}
            validation={{ required: "Training Name is required" }}
            errors={errors}
          />

          <DynamicTextAreaField
            className="sm:min-w-[350px]"
            id="description"
            type="text"
            label="תיאור תוכנית אימון"
            placeholder="הוסף תיאור תוכנית אימון..."
            register={register}
            validation={{ required: "Training Description is required" }}
            errors={errors}
          />
        </div>

        {/* Workout Selector */}
        {showWorkoutSelect && (
          <Select
            className="rounded-lg h-12 sm:w-[350px]"
            direction="rtl"
            options={trainingExercises}
            valueField="_id"
            labelField="name"
            placeholder="בחר אימון..."
            onChange={handleWorkoutSelect}
            searchBy="name"
          />
        )}

        {/* Added Workouts */}
        <div className="space-y-4 sm:w-[550px]">
          {selectedTrainingExercises.map((workout, workoutIndex) => (
            <div key={workout.workout} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">{workout.name}</h3>
              <div className="space-y-2 mt-2">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise.exercise_id} className="p-3 border rounded-md">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Trash
                        className="text-red-500 cursor-pointer size-9"
                        onClick={() =>
                          handleRemoveExercise(workoutIndex, exerciseIndex)
                        }
                      />
                      <div>
                        <label htmlFor="sets">סטים</label>
                        <input
                          type="number"
                          className="border rounded p-1 w-full"
                          value={exercise.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "sets",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="reps">חזרות</label>
                        <input
                          type="number"
                          className="border rounded p-1 w-full"
                          value={exercise.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "reps",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="manipulation">מניפולציה</label>
                        <input
                          type="text"
                          className="border rounded p-1 w-full text-center placeholder:text-sm"
                          value={exercise.manipulation}
                          onChange={(e) =>
                            handleExerciseChange(
                              workoutIndex,
                              exerciseIndex,
                              "manipulation",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Exercise Section */}
              {addMoreExercise === workoutIndex && (
                <div className="mt-4 space-y-3">
                  <Select
                    className="rounded-lg h-12 w-auto"
                    direction="rtl"
                    options={bodyPartOptions}
                    labelField="label"
                    valueField="id"
                    placeholder="סנן לפי חלק בגוף"
                    onChange={(selected) =>
                      setSelectedBodyPart(selected[0]?.value || null)
                    }
                  />
                  <Select
                    className="rounded-lg h-12 w-auto"
                    direction="rtl"
                    options={equipmentOptions}
                    labelField="label"
                    valueField="id"
                    placeholder="סנן לפי ציוד"
                    onChange={(selected) =>
                      setSelectedEquipment(selected[0]?.value || null)
                    }
                  />
                  <Select
                    className="rounded-lg h-12 w-auto"
                    direction="rtl"
                    options={selectedExercise}
                    labelField="name"
                    valueField="_id"
                    placeholder="בחר תרגיל"
                    onChange={handleNewExerciseSelection}
                    searchBy="name"
                  />
                </div>
              )}

              <Button
                type="button"
                className="mt-5 bg-customBg"
                onClick={() => handleAddMoreExercise(workoutIndex)}
              >
                הוסף עוד תרגיל לאימון
              </Button>
            </div>
          ))}
        </div>

        {/* Add More Workout Button */}
        {selectedTrainingExercises.length > 0 && !showWorkoutSelect && (
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddMoreWorkout}
              className="bg-customBg text-white"
            >
              ➕ הוסף עוד אימון
            </Button>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isButtonDisabled || isSupersetIncomplete}
            className={`px-8 py-2 rounded-full ${
              isButtonDisabled || isSupersetIncomplete
                ? "bg-gray-200 text-black"
                : "bg-customBg text-white"
            }`}
          >
            שמור תכנית אימון חדשה
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTrainingForm;
