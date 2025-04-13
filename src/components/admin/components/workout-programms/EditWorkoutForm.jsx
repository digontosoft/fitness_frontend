// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import { useNavigate } from "react-router-dom";
// import {
//   Select as ShadSelect,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const EditWorkoutForm = ({ workoutId }) => {
//   const [exercises, setExercises] = useState([]);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const exercisesForm = watch("exercises", []);

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

//   useEffect(() => {
//     const fetchSingleWorkout = async () => {
//       try {
//         const response = await axios.get(`${base_url}/workout/${workoutId}`);
//         const data = response.data.data;
//         setValue("exercises", data.exercises || []);
//         reset(data);
//       } catch (error) {
//         console.error("Error fetching workout:", error);
//       }
//     };
//     fetchSingleWorkout();
//   }, [workoutId, reset, setValue]);

//   const onSubmit = (data) => {
//     const workoutData = {
//       name: data.name,
//       description: data.description,
//       exercises: data.exercises.map((ex) => ({
//         exercise_id: ex.exercise_id._id,
//         sets: ex.sets,
//         reps: ex.reps,
//         manipulation: ex.manipulation,
//       })),
//     };
//     console.log("editWorkoutForm", workoutData);
//     axios
//       .put(`${base_url}/workout/${workoutId}`, workoutData)
//       .then((response) => {
//         if (response.status === 200) {
//           toast.success("Workout updated successfully");
//           navigate("/dashboard/workout-list");
//         }
//       })
//       .catch((error) => {
//         toast.error("Failed to update workout");
//         console.log(error);
//       });
//   };

//   return (
//     <div className="py-20" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="w-full"
//             id="name"
//             type="text"
//             label="שם האימון"
//             placeholder="Add שם האימון...."
//             register={register}
//             errors={errors}
//             required
//           />

//           <DynamicInputField
//             className="w-full"
//             id="description"
//             type="text"
//             label="דגשים מיוחדים (במידה ויש)"
//             placeholder="דגשים מיוחדים (במידה ויש)..."
//             register={register}
//             errors={errors}
//           />

//           <Select
//             direction="rtl"
//             options={exercises}
//             valueField="_id"
//             labelField="name"
//             multi
//             values={exercisesForm?.map((ex) => ({
//               _id: ex.exercise_id?._id,
//               name: ex.exercise_id?.name,
//             }))}
//             onChange={(selected) => {
//               const newExercises = selected.map((option) => {
//                 const existing = exercisesForm.find(
//                   (ex) => ex.exercise_id._id === option._id
//                 );
//                 return existing
//                   ? existing
//                   : {
//                       exercise_id: { _id: option._id, name: option.name },
//                       sets: 0,
//                       reps: 0,
//                       manipulation: "",
//                     };
//               });
//               setValue("exercises", newExercises);
//             }}
//           />

//           {exercisesForm?.map((exercise, index) => (
//             <div
//               key={exercise._id || index}
//               className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md"
//             >
//               <div className="flex items-center justify-center bg-customBg py-4 w-1/2 h-5 rounded-md text-white">
//                 <p className="text-center">{exercise.exercise_id?.name}</p>
//               </div>
//               <div className="grid grid-cols-3 gap-4 w-[327px]">
//                 <div className="flex flex-col space-y-2">
//                   <label htmlFor={`sets-${exercise._id}`}>Sets</label>
//                   <input
//                     id={`sets-${exercise._id}`}
//                     type="number"
//                     className="w-full border border-red-200 h-10 px-2"
//                     {...register(`exercises.${index}.sets`, {
//                       valueAsNumber: true,
//                     })}
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-2">
//                   <label htmlFor={`reps-${exercise._id}`}>Reps</label>
//                   <input
//                     id={`reps-${exercise._id}`}
//                     type="number"
//                     className="w-full border border-red-200 h-10 px-2"
//                     {...register(`exercises.${index}.reps`, {
//                       valueAsNumber: true,
//                     })}
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-2">
//                   <label htmlFor={`manipulation-${exercise._id}`}>
//                     Manipulation
//                   </label>
//                   <div className="flex flex-col space-y-2">
//                     <ShadSelect
//                       value={exercise.manipulation}
//                       onValueChange={(selectedValue) =>
//                         setValue(
//                           `exercises.${index}.manipulation`,
//                           selectedValue
//                         )
//                       }
//                     >
//                       <SelectTrigger className="w-full border border-red-200">
//                         <SelectValue placeholder="Select a manipulation">
//                           {exercise.manipulation || "Select a manipulation"}{" "}
//                         </SelectValue>
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="superset">Superset</SelectItem>
//                           <SelectItem value="dropset">Dropset</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </ShadSelect>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//           >
//             Update Workout
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditWorkoutForm;

// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import { useNavigate } from "react-router-dom";

// const EditWorkoutForm = ({ workoutId }) => {
//   const [exercises, setExercises] = useState([]);
//   const [disableUpdateButton, setDisableUpdateButton] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const exercisesForm = watch("exercises", []);

//   const handleDisableUpdateButton = (value) => {
//     setDisableUpdateButton(true);
//     console.log(value);
//   };

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

//   useEffect(() => {
//     const fetchSingleWorkout = async () => {
//       try {
//         const response = await axios.get(`${base_url}/workout/${workoutId}`);
//         const data = response.data.data;
//         setValue("exercises", data.exercises || []);
//         reset(data);
//       } catch (error) {
//         console.error("Error fetching workout:", error);
//       }
//     };
//     fetchSingleWorkout();
//   }, [workoutId, reset, setValue]);

//   // Check if any exercise has "Superset" selected
//   const isSupersetSelected = exercisesForm.some(
//     (exercise) => exercise.manipulation === "superset"
//   );

//   const handleManipulationChange = (e) => {
//     const value = e.target.value.toLowerCase();
//     if (value === "superset" && isSupersetSelected) {
//       toast.error("Superset is already selected and cannot be added again.");
//       setDisableUpdateButton(true);
//       return;
//     } else {
//       setDisableUpdateButton(false);
//     }
//   };

//   const onSubmit = (data) => {
//     const workoutData = {
//       name: data.name,
//       description: data.description,
//       exercises: data.exercises.map((ex) => ({
//         exercise_id: ex.exercise_id._id,
//         sets: ex.sets,
//         reps: ex.reps,
//         manipulation: ex.manipulation,
//       })),
//     };
//     // axios
//     //   .put(`${base_url}/workout/${workoutId}`, workoutData)
//     //   .then((response) => {
//     //     if (response.status === 200) {
//     //       toast.success("Workout updated successfully");
//     //       navigate("/dashboard/workout-list");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     toast.error("Failed to update workout");
//     //     console.log(error);
//     //   });
//   };

//   return (
//     <div className="py-20" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="w-full"
//             id="name"
//             type="text"
//             label="שם האימון"
//             placeholder="Add שם האימון...."
//             register={register}
//             errors={errors}
//             required
//           />

//           <DynamicInputField
//             className="w-full"
//             id="description"
//             type="text"
//             label="דגשים מיוחדים (במידה ויש)"
//             placeholder="דגשים מיוחדים (במידה ויש)..."
//             register={register}
//             errors={errors}
//           />

//           <Select
//             direction="rtl"
//             options={exercises}
//             valueField="_id"
//             labelField="name"
//             multi
//             values={exercisesForm?.map((ex) => ({
//               _id: ex.exercise_id?._id,
//               name: ex.exercise_id?.name,
//             }))}
//             onChange={(selected) => {
//               const newExercises = selected.map((option) => {
//                 const existing = exercisesForm.find(
//                   (ex) => ex.exercise_id._id === option._id
//                 );
//                 return existing
//                   ? existing
//                   : {
//                       exercise_id: { _id: option._id, name: option.name },
//                       sets: 0,
//                       reps: 0,
//                       manipulation: "",
//                     };
//               });
//               setValue("exercises", newExercises);
//             }}
//           />

//           {exercisesForm?.map((exercise, index) => (
//             <div
//               key={exercise._id || index}
//               className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md"
//             >
//               <div className="flex items-center justify-center bg-customBg py-4 w-1/2 h-5 rounded-md text-white">
//                 <p className="text-center">{exercise.exercise_id?.name}</p>
//               </div>
//               <div className="grid grid-cols-3 gap-4 w-[327px]">
//                 <div className="flex flex-col space-y-2">
//                   <label htmlFor={`sets-${exercise._id}`}>Sets</label>
//                   <input
//                     id={`sets-${exercise._id}`}
//                     type="number"
//                     className="w-full border border-red-200 h-10 px-2"
//                     {...register(`exercises.${index}.sets`, {
//                       valueAsNumber: true,
//                     })}
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-2">
//                   <label htmlFor={`reps-${exercise._id}`}>Reps</label>
//                   <input
//                     id={`reps-${exercise._id}`}
//                     type="number"
//                     className="w-full border border-red-200 h-10 px-2"
//                     {...register(`exercises.${index}.reps`, {
//                       valueAsNumber: true,
//                     })}
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-2">
//                   <label htmlFor={`manipulation-${exercise._id}`}>
//                     Manipulation
//                   </label>
//                   <input
//                     type="text"
//                     value={exercise.manipulation || ""}
//                     onChange={(e) => {
//                       const selectedValue = e.target.value;
//                       setValue(
//                         `exercises.${index}.manipulation`,
//                         selectedValue
//                       );
//                       handleDisableUpdateButton(selectedValue);
//                       handleManipulationChange(e);
//                     }}
//                     placeholder="Enter a manipulation"
//                     className="w-full border border-red-200 p-2 rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//             disabled={disableUpdateButton}
//           >
//             Update Workout
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditWorkoutForm;

import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";

const EditWorkoutForm = ({ workoutId }) => {
  const [exercises, setExercises] = useState([]);
  const [disableUpdateButton, setDisableUpdateButton] = useState(false);
  const [hasSuperset, setHasSuperset] = useState(false); // Track if "superset" is already used
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
  console.log("exercisesForm", exercisesForm);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercises(response.data.data);
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

    // Count how many times "superset" is exactly used
    // const supersetCount = exercises.filter(
    //   (ex) => ex.manipulation === "superset"
    // ).length;

    // // If user types exactly "superset" more than once, prevent it
    // if (value === "superset" && supersetCount >= 1) {
    //   toast.error("You can only use 'superset' once in the workout.");
    //   setDisableUpdateButton(true);
    //   return;
    // }

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

  const onSubmit = (data) => {
    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: data.exercises.map((ex) => ({
        exercise_id: ex.exercise_id._id,
        sets: ex.sets,
        reps: ex.reps,
        manipulation: ex.manipulation,
      })),
    };
    axios
      .put(`${base_url}/workout/${workoutId}`, workoutData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Workout updated successfully");
          navigate("/dashboard/workout-list");
        }
      })
      .catch((error) => {
        toast.error("Failed to update workout");
        console.log(error);
      });
  };

  const isFormValid = exercisesForm?.every((exercise, index, array) => {
    const isLastExercise = index === array.length - 1;
    const isSuperset =
      exercise.manipulation?.trim().toLowerCase() === "superset";

    // Disable button if the last exercise is a superset
    if (isLastExercise && isSuperset) {
      return false;
    }

    // Otherwise, check the standard validation rules
    return (
      exercise.sets > 0 &&
      exercise.reps > 0 &&
      exercise.manipulation?.trim() !== ""
    );
  });
  return (
    <div className="py-20" dir="rtl">
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

          <Select
            direction="rtl"
            options={exercises}
            valueField="_id"
            labelField="name"
            searchBy="name"
            values={exercisesForm?.map((ex) => ({
              _id: ex.exercise_id?._id,
              name: ex.exercise_id?.name,
            }))}
            onChange={(selected) => {
              const newExercises = selected.map((option) => {
                const existing = exercisesForm.find(
                  (ex) => ex.exercise_id._id === option._id
                );
                return existing
                  ? existing
                  : {
                      exercise_id: { _id: option._id, name: option.name },
                      sets: 0,
                      reps: 0,
                      manipulation: "",
                    };
              });
              setValue("exercises", newExercises);
            }}
          />

          {exercisesForm?.map((exercise, index) => (
            <div
              key={exercise._id || index}
              className="border p-2 flex flex-col items-center justify-center space-y-4 rounded-md"
            >
              <div className="flex items-center justify-center bg-customBg py-4 min-w-1/2 w-auto h-5 px-2 rounded-md text-white">
                <p className="text-center">{exercise.exercise_id?.name}</p>
              </div>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 sm:w-[327px]">
                <div className="flex flex-col space-y-2">
                  <label htmlFor={`sets-${exercise._id}`}>סטים</label>
                  <input
                    id={`sets-${exercise._id}`}
                    type="number"
                    className="w-full border border-red-200 h-10 px-2"
                    {...register(`exercises.${index}.sets`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor={`reps-${exercise._id}`}>חזרות</label>
                  <input
                    id={`reps-${exercise._id}`}
                    type="number"
                    className="w-full border border-red-200 h-10 px-2"
                    {...register(`exercises.${index}.reps`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor={`manipulation-${exercise._id}`}>
                    מניפולציה
                  </label>
                  <input
                    type="text"
                    value={exercise.manipulation || ""}
                    onChange={(e) =>
                      handleManipulationChange(e, index, exercise)
                    }
                    placeholder="Enter a manipulation"
                    className="w-full border border-red-200 p-2 rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
            disabled={disableUpdateButton || !isFormValid}
          >
            עדכן תוכנית אימון
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkoutForm;
