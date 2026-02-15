// import { base_url } from "@/api/baseUrl";
// import Loading from "@/components/common/Loading";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
// import axios from "axios";
// import { Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import Select from "react-dropdown-select";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const EditWorkoutForm = ({ workoutId }) => {
//   const [exercises, setExercises] = useState([]);
//   const [disableUpdateButton, setDisableUpdateButton] = useState(false);
//   const [hasSuperset, setHasSuperset] = useState(false);
//   const [addMoreExercise, setAddMoreExercise] = useState(false);
//   const [selectedBodyPart, setSelectedBodyPart] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [selectedExercise, setSelectedExercise] = useState([]);
//   const [newExerciseData, setNewExerciseData] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const exercisesForm = watch("exercises", []);

//   useEffect(() => {
//     const fetchExercise = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         if (response.status === 200) {
//           setLoading(false);
//           setExercises(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };
//     fetchExercise();
//   }, []);

//   useEffect(() => {
//     const fetchSingleWorkout = async () => {
//       try {
//         const response = await axios.get(`${base_url}/workout/${workoutId}`);
//         const data = response.data.data;
//         setValue("exercises", data.exercises || []);
//         reset(data);

//         // Check if "superset" is already used in the fetched workout
//         const hasExistingSuperset = data.exercises.some(
//           (exercise) => exercise.manipulation?.toLowerCase() === "superset"
//         );
//         setHasSuperset(hasExistingSuperset);
//       } catch (error) {
//         console.error("Error fetching workout:", error);
//       }
//     };
//     fetchSingleWorkout();
//   }, [workoutId, reset, setValue]);

//   const handleManipulationChange = (e, index) => {
//     const value = e.target.value.toLowerCase();
//     const exercises = getValues("exercises"); // Get all exercises
//     const lastIndex = exercises.length - 1;

//     // Count how many times "superset" is exactly used
//     // const supersetCount = exercises.filter(
//     //   (ex) => ex.manipulation === "superset"
//     // ).length;

//     // // If user types exactly "superset" more than once, prevent it
//     // if (value === "superset" && supersetCount >= 1) {
//     //   toast.error("You can only use 'superset' once in the workout.");
//     //   setDisableUpdateButton(true);
//     //   return;
//     // }

//     // Update the manipulation value for the specific exercise
//     setValue(`exercises.${index}.manipulation`, value);

//     // Recalculate if there's still a "superset"
//     const hasPureSuperset = exercises.some(
//       (ex) => ex.manipulation === "superset"
//     );
//     setHasSuperset(hasPureSuperset);

//     // Disable the update button only if the last exercise is exactly "superset"
//     setDisableUpdateButton(exercises[lastIndex]?.manipulation === "superset");
//   };

//   const handleAddMoreExercise = (selected) => {
//     if (selected && selected.length > 0) {
//       const exercise = selected[0];
//       setNewExerciseData({
//         exercise_id: exercise,
//         sets: "",
//         reps: "",
//         manipulation: "",
//       });
//     }
//     setAddMoreExercise(false);
//   };

//   // Filter exercises based on selected body part and equipment
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
//         setSelectedExercise(exercises);
//       }
//     };

//     fetchFilteredExercises();
//   }, [selectedBodyPart, selectedEquipment, exercises]);

//   // Remove an exercise from a workout
//   const handleRemoveExercise = (index) => {
//     const updatedExercises = [...exercisesForm];
//     updatedExercises.splice(index, 1);
//     setValue("exercises", updatedExercises);
//   };

//   // const onSubmit = (data) => {
//   //   const workoutData = {
//   //     name: data.name,
//   //     description: data.description,
//   //     exercises: data.exercises.map((ex) => ({
//   //       exercise_id: ex.exercise_id._id,
//   //       sets: ex.sets,
//   //       reps: ex.reps,
//   //       manipulation: ex.manipulation,
//   //     })),
//   //   };
//   //   axios
//   //     .put(`${base_url}/workout/${workoutId}`, workoutData)
//   //     .then((response) => {
//   //       if (response.status === 200) {
//   //         toast.success("Workout updated successfully");
//   //         navigate("/dashboard/workout-list");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       toast.error("Failed to update workout");
//   //       console.log(error);
//   //     });
//   // };

//   const onSubmit = (data) => {
//     // Start with the existing exercises from the form
//     const updatedExercises = data.exercises.map((ex) => ({
//       exercise_id: ex.exercise_id._id, // Assuming ex.exercise_id is an object with _id
//       sets: ex.sets,
//       reps: ex.reps,
//       manipulation: ex.manipulation,
//     }));

//     // Check if there's new exercise data and if it's complete
//     if (
//       newExerciseData &&
//       newExerciseData.exercise_id && // Ensure exercise_id exists
//       newExerciseData.sets &&
//       newExerciseData.reps
//     ) {
//       updatedExercises.push({
//         exercise_id: newExerciseData.exercise_id._id, // Make sure this matches the structure of your exercise_id
//         sets: parseInt(newExerciseData.sets, 10), // Ensure sets and reps are numbers
//         reps: parseInt(newExerciseData.reps, 10),
//         manipulation: newExerciseData.manipulation || "", // Handle if manipulation can be empty
//       });
//     }

//     const workoutData = {
//       name: data.name,
//       description: data.description,
//       exercises: updatedExercises, // Use the potentially augmented list of exercises
//     };

//     axios
//       .put(`${base_url}/workout/${workoutId}`, workoutData)
//       .then((response) => {
//         if (response.status === 200) {
//           toast.success("Workout updated successfully");
//           navigate("/dashboard/workout-list");
//           setNewExerciseData(null); // Clear the new exercise data after successful submission
//         }
//       })
//       .catch((error) => {
//         toast.error("Failed to update workout");
//         console.log(error);
//       });
//   };

//   const isFormValid =
//     exercisesForm?.every((exercise, index, array) => {
//       const isLastExercise = index === array.length - 1;
//       const isSuperset =
//         exercise.manipulation?.trim().toLowerCase() === "superset";

//       if (isLastExercise && isSuperset) return false;

//       return (
//         exercise.sets > 0 &&
//         exercise.reps > 0 &&
//         exercise.manipulation?.trim() !== ""
//       );
//     }) &&
//     (!newExerciseData || // Valid if new exercise is not being added
//       (newExerciseData.sets &&
//         newExerciseData.reps &&
//         newExerciseData.manipulation));

//   return (
//     <div className="sm:py-20 py-6 sm:w-[500px]" dir="rtl">
//       {loading ? (
//         <Loading />
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid gap-4">
//             <DynamicInputField
//               className="w-full"
//               id="name"
//               type="text"
//               label="שם האימון"
//               placeholder="Add שם האימון...."
//               register={register}
//               errors={errors}
//               required
//             />

//             <DynamicTextAreaField
//               className="w-full"
//               id="description"
//               type="text"
//               label="דגשים מיוחדים (במידה ויש)"
//               placeholder="דגשים מיוחדים (במידה ויש)..."
//               register={register}
//               errors={errors}
//             />

//             {exercisesForm?.map((exercise, index) => (
//               <div
//                 key={exercise._id || index}
//                 className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md"
//               >
//                 <p className="text-center">{exercise.exercise_id?.name}</p>
//                 <div className="flex items-center gap-8 sm:w-[327px]">
//                   <Trash
//                     className="cursor-pointer text-red-600 size-20"
//                     onClick={() => handleRemoveExercise(index)}
//                   />
//                   <div className="flex flex-col space-y-2">
//                     <label htmlFor={`sets-${exercise._id}`}>סטים</label>
//                     <Input
//                       id={`sets-${exercise._id}`}
//                       type="number"
//                       className="w-full  h-10 px-2"
//                       {...register(`exercises.${index}.sets`, {
//                         valueAsNumber: true,
//                       })}
//                     />
//                   </div>
//                   <div className="flex flex-col space-y-2">
//                     <label htmlFor={`reps-${exercise._id}`}>חזרות</label>
//                     <Input
//                       id={`reps-${exercise._id}`}
//                       type="number"
//                       className="w-full  h-10 px-2"
//                       {...register(`exercises.${index}.reps`, {
//                         valueAsNumber: true,
//                       })}
//                     />
//                   </div>
//                   <div className="flex flex-col space-y-2">
//                     <label htmlFor={`manipulation-${exercise._id}`}>
//                       מניפולציה
//                     </label>
//                     <Input
//                       type="text"
//                       value={exercise.manipulation || ""}
//                       onChange={(e) =>
//                         handleManipulationChange(e, index, exercise)
//                       }
//                       placeholder="Enter a manipulation"
//                       className="w-full  p-2 rounded"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {addMoreExercise && (
//               <div dir="rtl">
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     אזור בגוף
//                   </label>
//                   <Select
//                     className="rounded-lg h-12 w-auto"
//                     direction="rtl"
//                     valueField="id"
//                     labelField="label"
//                     options={bodyPartOptions}
//                     placeholder="סנן לפי חלק בגוף"
//                     onChange={(selectedOptions) => {
//                       const values = selectedOptions.map(
//                         (option) => option.value
//                       );
//                       setSelectedBodyPart(values[0]);
//                     }}
//                     searchBy="label"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     ציוד
//                   </label>
//                   <Select
//                     className="rounded-lg h-12 w-auto"
//                     direction="rtl"
//                     options={equipmentOptions}
//                     valueField="id"
//                     labelField="label"
//                     placeholder="סנן לפי ציוד"
//                     onChange={(selectedOptions) => {
//                       const values = selectedOptions.map(
//                         (option) => option.value
//                       );
//                       setSelectedEquipment(values[0]);
//                     }}
//                     searchBy="label"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     סנן לפי שם תרגיל
//                   </label>
//                   <Select
//                     className="rounded-lg h-12 w-auto"
//                     direction="rtl"
//                     options={selectedExercise}
//                     valueField="_id"
//                     labelField="name"
//                     placeholder="בחר"
//                     onChange={(selected) => handleAddMoreExercise(selected)}
//                     searchBy="name"
//                   />
//                 </div>
//               </div>
//             )}
//             {newExerciseData &&
//               (console.log("newExerciseData", newExerciseData),
//               (
//                 <div className="border p-4 mt-4 rounded space-y-4">
//                   <p className="text-center font-semibold">
//                     {newExerciseData.exercise_id.name}
//                   </p>
//                   <div className="flex gap-4">
//                     <Trash
//                       className="cursor-pointer text-red-600 sm:size-10 size-20"
//                       onClick={() =>
//                         handleRemoveExercise(newExerciseData.index)
//                       }
//                     />
//                     <div className="flex flex-col space-y-2">
//                       <label htmlFor="sets">סטים</label>
//                       <Input
//                         type="number"
//                         id="sets"
//                         value={newExerciseData.sets}
//                         onChange={(e) =>
//                           setNewExerciseData({
//                             ...newExerciseData,
//                             sets: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="flex flex-col space-y-2">
//                       <label htmlFor="reps">חזרות</label>
//                       <Input
//                         type="number"
//                         id="reps"
//                         value={newExerciseData.reps}
//                         onChange={(e) =>
//                           setNewExerciseData({
//                             ...newExerciseData,
//                             reps: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="flex flex-col space-y-2">
//                       <label htmlFor="manipulation">מניפולציה</label>
//                       <Input
//                         type="text"
//                         id="manipulation"
//                         value={newExerciseData.manipulation}
//                         onChange={(e) =>
//                           setNewExerciseData({
//                             ...newExerciseData,
//                             manipulation: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}

//             <div>
//               {" "}
//               <Button
//                 type="button"
//                 className="mt-2 bg-[#7994CB] flex mx-auto"
//                 onClick={() => setAddMoreExercise(!addMoreExercise)}
//               >
//                 הוסף עוד פעילות גופנית
//               </Button>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <Button
//               type="submit"
//               className="text-white px-4 md:px-8 py-2 rounded-full bg-[#7994CB]"
//               disabled={
//                 disableUpdateButton ||
//                 !isFormValid ||
//                 exercisesForm.length === 0
//               }
//             >
//               עדכן תוכנית אימון
//             </Button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditWorkoutForm;

import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditWorkoutForm = ({ workoutId }) => {
  const [exercises, setExercises] = useState([]);
  const [disableUpdateButton, setDisableUpdateButton] = useState(false);
  const [hasSuperset, setHasSuperset] = useState(false);
  const [addMoreExercise, setAddMoreExercise] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [newExerciseData, setNewExerciseData] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const exercisesForm = watch("exercises", []);

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${base_url}/exercise`);
        if (response.status === 200) {
          setLoading(false);
          setExercises(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, []);

  useEffect(() => {
    const fetchSingleWorkout = async () => {
      try {
        const response = await axios.get(`${base_url}/workout/${workoutId}`);
        const data = response.data.data;
        setValue("exercises", data.exercises || []);
        reset(data);

        // Check if "superset" is already used in the fetched workout
        const hasExistingSuperset = data.exercises.some(
          (exercise) => exercise.manipulation?.toLowerCase() === "superset"
        );
        setHasSuperset(hasExistingSuperset);
      } catch (error) {
        console.error("Error fetching workout:", error);
      }
    };
    fetchSingleWorkout();
  }, [workoutId, reset, setValue]);

  const handleManipulationChange = (e, index) => {
    const value = e.target.value.toLowerCase();
    const exercises = getValues("exercises"); // Get all exercises
    const lastIndex = exercises.length - 1;

    // Update the manipulation value for the specific exercise
    setValue(`exercises.${index}.manipulation`, value);

    // Recalculate if there's still a "superset"
    const hasPureSuperset = exercises.some(
      (ex) => ex.manipulation === "superset"
    );
    setHasSuperset(hasPureSuperset);

    // Disable the update button only if the last exercise is exactly "superset"
    setDisableUpdateButton(exercises[lastIndex]?.manipulation === "superset");
  };

  // const handleAddMoreExercise = (selected) => {
  //   if (selected && selected.length > 0) {
  //     const exercise = selected[0];
  //     setNewExerciseData({
  //       exercise_id: exercise,
  //       sets: "",
  //       reps: "",
  //       manipulation: "",
  //     });
  //   }
  //   setAddMoreExercise(false);
  //   setSelectedBodyPart(null); // Clear body part filter
  //   setSelectedEquipment(null); // Clear equipment filter
  //   setSelectedExercise([]); // Clear selected exercise dropdown
  // };

  // Filter exercises based on selected body part and equipment
 
 
  // ✅ Handle Add More Exercise
const handleAddMoreExercise = (selected) => {
  if (selected && selected.length > 0) {
    const exercise = selected[0];
    const currentExercises = getValues("exercises") || [];

    // ❌ Prevent adding the same exercise multiple times
    // const alreadyExists = currentExercises.some(
    //   (ex) => ex.exercise_id?._id === exercise._id
    // );

    // if (alreadyExists) {
    //   toast.error("Cannot add the same exercise more than once to a workout.");
    //   return;
    // }

    const newExercise = {
      exercise_id: exercise,
      sets: "",
      reps: "",
      manipulation: "",
    };

    // Add new exercise to the existing list
    setValue("exercises", [...currentExercises, newExercise]);
  }

  setAddMoreExercise(false);
  setSelectedBodyPart(null);
  setSelectedEquipment(null);
  setSelectedExercise([]);
};

// ✅ Handle Remove Exercise
const handleRemoveExercise = (indexToRemove) => {
  const currentExercises = getValues("exercises") || [];
  const updatedExercises = currentExercises.filter(
    (_, index) => index !== indexToRemove
  );
  setValue("exercises", updatedExercises);
};

 
 
  useEffect(() => {
    const fetchFilteredExercises = async () => {
      if (selectedBodyPart || selectedEquipment) {
        let url = `${base_url}/exercise?`;
        if (selectedBodyPart) {
          url += `body_part=${selectedBodyPart}&`;
        }
        if (selectedEquipment) {
          url += `equipment=${selectedEquipment}&`;
        }
        url = url.slice(0, -1); // Remove trailing '&' or '?'

        try {
          const response = await axios.get(url);
          setSelectedExercise(response.data.data || []);
        } catch (error) {
          console.error("Error fetching filtered exercises:", error);
          setSelectedExercise([]);
        }
      } else {
        // If no filters are selected, show all exercises again
        setSelectedExercise(exercises);
      }
    };

    fetchFilteredExercises();
  }, [selectedBodyPart, selectedEquipment, exercises]);

  // Remove an exercise from a workout
  // const handleRemoveExercise = (indexToRemove, isNewExercise = false) => {
  //   if (isNewExercise) {
  //     setNewExerciseData(null); // Clear the new exercise data
  //   } else {
  //     const updatedExercises = [...exercisesForm];
  //     updatedExercises.splice(indexToRemove, 1);
  //     setValue("exercises", updatedExercises);
  //   }
  // };

  const onSubmit = (data) => {
    // Start with the existing exercises from the form
    const updatedExercises = data.exercises.map((ex) => ({
      exercise_id: ex.exercise_id._id, // Assuming ex.exercise_id is an object with _id
      sets: ex.sets,
      reps: ex.reps,
      manipulation: ex.manipulation,
    }));

    // Check if there's new exercise data and if it's complete
    if (
      newExerciseData &&
      newExerciseData.exercise_id && // Ensure exercise_id exists
      newExerciseData.sets &&
      newExerciseData.reps
    ) {
      updatedExercises.push({
        exercise_id: newExerciseData.exercise_id._id, // Make sure this matches the structure of your exercise_id
        sets: parseInt(newExerciseData.sets, 10), // Ensure sets and reps are numbers
        reps: parseInt(newExerciseData.reps, 10),
        manipulation: newExerciseData.manipulation || "", // Handle if manipulation can be empty
      });
    }

    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: updatedExercises, // Use the potentially augmented list of exercises
    };

    axios
      .put(`${base_url}/workout/${workoutId}`, workoutData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Workout updated successfully");
          navigate("/dashboard/workout-list");
          setNewExerciseData(null); // Clear the new exercise data after successful submission
        }
      })
      .catch((error) => {
        toast.error("Failed to update workout");
        console.log(error);
      });
  };

  // const isFormValid =
  //   exercisesForm?.every((exercise, index, array) => {
  //     const isLastExercise = index === array.length - 1;
  //     const isSuperset =
  //       exercise.manipulation?.trim().toLowerCase() === "superset";

  //     if (isLastExercise && isSuperset) return false;

  //     return (
  //       exercise.sets > 0 &&
  //       exercise.reps > 0 &&
  //       exercise.manipulation?.trim() !== ""
  //     );
  //   }) &&
  //   (!newExerciseData || // Valid if new exercise is not being added
  //     (newExerciseData.sets > 0 &&
  //       newExerciseData.reps > 0 &&
  //       newExerciseData.manipulation?.trim() !== ""));

const isFormValid = exercisesForm?.every(
  (exercise, index, array) =>
    exercise.sets > 0 &&
    exercise.reps > 0 &&
    (index === array.length - 1
      ? exercise.manipulation?.trim().toLowerCase() !== "superset"
      : true)
);


  return (
    <div className="sm:py-20 py-6 sm:w-[500px]" dir="rtl">
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <DynamicInputField
              className="w-full"
              id="name"
              type="text"
              label="שם האימון"
              placeholder="Add שם האימון...."
              register={register}
              errors={errors}
              required
            />

            <DynamicTextAreaField
              className="w-full"
              id="description"
              type="text"
              label="דגשים מיוחדים (במידה ויש)"
              placeholder="דגשים מיוחדים (במידה ויש)..."
              register={register}
              errors={errors}
            />

            {exercisesForm?.map((exercise, index) => (
              <div
                key={exercise._id || index}
                className="border p-4 flex items-center justify-center gap-4 rounded-md"
              >
                <Trash
                  className="cursor-pointer text-red-600 size-10"
                  onClick={() => handleRemoveExercise(index, false)} // Pass false for existing exercise
                />
                <div className="space-y-4">
                  <p className="text-center">{exercise.exercise_id?.name}</p>
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:gap-x-2 gap-y-2">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor={`sets-${exercise._id}`}>סטים</label>
                      <Input
                        id={`sets-${exercise._id}`}
                        type="number"
                        // className="w-full  h-10 px-2"
                        {...register(`exercises.${index}.sets`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor={`reps-${exercise._id}`}>חזרות</label>
                      <Input
                        id={`reps-${exercise._id}`}
                        type="number"
                        // className="w-full  h-10 px-2"
                        {...register(`exercises.${index}.reps`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor={`manipulation-${exercise._id}`}>
                        מניפולציה
                      </label>
                      <Input
                        type="text"
                        value={exercise.manipulation || ""}
                        onChange={(e) =>
                          handleManipulationChange(e, index, exercise)
                        }
                        placeholder="Enter a manipulation"
                        // className="w-full  p-2 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {addMoreExercise && (
              <div dir="rtl">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    אזור בגוף
                  </label>
                  <Select
                    className="rounded-lg h-12 w-auto"
                    direction="rtl"
                    valueField="id"
                    labelField="label"
                    options={bodyPartOptions}
                    placeholder="סנן לפי חלק בגוף"
                    onChange={(selectedOptions) => {
                      const values = selectedOptions.map(
                        (option) => option.value
                      );
                      setSelectedBodyPart(values[0]);
                    }}
                    searchBy="label"
                    values={
                      selectedBodyPart
                        ? [
                            {
                              id: selectedBodyPart,
                              label: bodyPartOptions.find(
                                (opt) => opt.value === selectedBodyPart
                              )?.label,
                            },
                          ]
                        : []
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    ציוד
                  </label>
                  <Select
                    className="rounded-lg h-12 w-auto"
                    direction="rtl"
                    options={equipmentOptions}
                    valueField="id"
                    labelField="label"
                    placeholder="סנן לפי ציוד"
                    onChange={(selectedOptions) => {
                      const values = selectedOptions.map(
                        (option) => option.value
                      );
                      setSelectedEquipment(values[0]);
                    }}
                    searchBy="label"
                    values={
                      selectedEquipment
                        ? [
                            {
                              id: selectedEquipment,
                              label: equipmentOptions.find(
                                (opt) => opt.value === selectedEquipment
                              )?.label,
                            },
                          ]
                        : []
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    סנן לפי שם תרגיל
                  </label>
                  <Select
                    className="rounded-lg h-12 w-auto"
                    direction="rtl"
                    options={selectedExercise}
                    valueField="_id"
                    labelField="name"
                    placeholder="בחר"
                    onChange={(selected) => handleAddMoreExercise(selected)}
                    searchBy="name"
                  />
                </div>
              </div>
            )}
            {newExerciseData && (
              <div className="border p-4 mt-4 rounded space-y-4">
                <p className="text-center font-semibold">
                  {newExerciseData.exercise_id?.name}
                </p>
                <div className="flex gap-4">
                  <Trash
                    className="cursor-pointer text-red-600 sm:size-10 size-20"
                    onClick={() => handleRemoveExercise(null, true)} // Pass true for new exercise
                  />
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="sets">סטים</label>
                    <Input
                      type="number"
                      id="sets"
                      value={newExerciseData.sets}
                      onChange={(e) =>
                        setNewExerciseData({
                          ...newExerciseData,
                          sets: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="reps">חזרות</label>
                    <Input
                      type="number"
                      id="reps"
                      value={newExerciseData.reps}
                      onChange={(e) =>
                        setNewExerciseData({
                          ...newExerciseData,
                          reps: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="manipulation">מניפולציה</label>
                    <Input
                      type="text"
                      id="manipulation"
                      value={newExerciseData.manipulation}
                      onChange={(e) =>
                        setNewExerciseData({
                          ...newExerciseData,
                          manipulation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="button"
                className="mt-2 bg-[#7994CB] flex mx-auto"
                onClick={() => setAddMoreExercise(!addMoreExercise)}
              >
                הוסף עוד פעילות גופנית
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="text-white px-4 md:px-8 py-2 rounded-full bg-[#7994CB]"
              disabled={
                disableUpdateButton ||
                !isFormValid 
                ||
                (exercisesForm.length === 0 && !newExerciseData) // Disable if no exercises at all
              }
            >
              עדכן תוכנית אימון                               
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditWorkoutForm;
