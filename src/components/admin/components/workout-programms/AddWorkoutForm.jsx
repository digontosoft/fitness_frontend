import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
import { Button } from "@/components/ui/button";
import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AddExercise from "./AddExercise";

// const AddWorkoutForm = () => {
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [exercises, setExercises] = useState([]);
//   const [workoutExercises, setWorkoutExercises] = useState([]);
//   const [superset, setSuperset] = useState(false);
//   const [isSupersetSelected, setIsSupersetSelected] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [selectedBodyPart, setSelectedBodyPart] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [selectedExercise, setSelectedExercise] = useState([]);

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm();

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

//   const handleExerciseChange = (exerciseId, data) => {
//     setWorkoutExercises((prevExercises) => {
//       const updatedExercises = prevExercises.filter(
//         (ex) => ex.exercise_id !== exerciseId
//       );
//       return [...updatedExercises, { exercise_id: exerciseId, ...data }];
//     });
//   };

//   useEffect(() => {
//     const fetchSelectedExercises = async () => {
//       if (selectedBodyPart && selectedEquipment) {
//         try {
//           const response = await axios.get(
//             `${base_url}/exercise?body_part=${selectedBodyPart}&equipment=${selectedEquipment}`
//           );
//           setSelectedExercise(response.data.data);
//           console.log("selectedExercises:", response.data.data);
//         } catch (error) {
//           console.error("Error fetching selected exercises:", error);
//         }
//       }
//     };

//     fetchSelectedExercises();
//   }, [selectedBodyPart, selectedEquipment]);

//   // const validatedExercises = selectedExercises.map((ex) => ({
//   //   exercise_id: ex._id,
//   //   sets: ex.sets,
//   //   reps: ex.reps,
//   //   manipulation: ex.manipulation,
//   // }));

//   const onSubmit = async (data) => {
//     const workoutData = {
//       name: data.name,
//       description: data.description,
//       exercises: workoutExercises,
//     };

//     console.log("workoutData", workoutData);

//     try {
//       const response = await axios.post(`${base_url}/workout`, workoutData);
//       if (response.status === 201) {
//         toast.success("Workout created successfully");
//         reset();
//         setWorkoutExercises([]);
//         setSelectedExercises([]);
//         navigate("/dashboard/workout-list");
//       }
//     } catch (error) {
//       toast.error("Failed to create workout");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="sm:py-20 py-6" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="sm:min-w-[400px]"
//             id="name"
//             type="text"
//             label="שם תוכנית אימון"
//             placeholder="הוסף שם תוכנית אימון ...."
//             register={register}
//             validation={{ required: "Workout name is required" }}
//             errors={errors}
//           />

//           <DynamicTextAreaField
//             className="sm:min-w-[400px]"
//             id="description"
//             type="text"
//             label=" תיאור האימון "
//             placeholder="הוסף תיאור לאימון...."
//             register={register}
//             validation={{ required: "Workout Description is required" }}
//             errors={errors}
//           />

//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               אזור בגוף
//             </label>
//             <Select
//               className="rounded-lg h-12 w-auto"
//               direction="rtl"
//               valueField="id"
//               labelField="label"
//               options={bodyPartOptions}
//               placeholder="סנן לפי חלק בגוף"
//               onChange={(selectedOptions) => {
//                 const values = selectedOptions.map((option) => option.value);
//                 setSelectedBodyPart(values[0]);
//               }}
//               searchBy="label"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               ציוד
//             </label>
//             <Select
//               className="rounded-lg h-12 w-auto"
//               direction="rtl"
//               options={equipmentOptions}
//               valueField="id"
//               labelField="label"
//               placeholder="סנן לפי ציוד"
//               onChange={(selectedOptions) => {
//                 const values = selectedOptions.map((option) => option.value);
//                 setSelectedEquipment(values[0]);
//               }}
//               searchBy="label"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               סנן לפי שם תרגיל
//             </label>
//             <Select
//               className="rounded-lg h-12 w-auto"
//               direction="rtl"
//               options={selectedExercise}
//               valueField="_id"
//               labelField="name"
//               placeholder="סנן לפי שם תרגיל"
//               onChange={(values) => setSelectedExercises(values)}
//               searchBy="name"
//             />
//           </div>
//           {selectedExercises.map((exercise) => (
//             <AddExercise
//               key={exercise._id}
//               exercise={exercise}
//               onChange={(data) => handleExerciseChange(exercise._id, data)}
//               setSuperset={setSuperset}
//               superset={superset}
//               isSupersetSelected={isSupersetSelected}
//               setIsSupersetSelected={setIsSupersetSelected}
//               isButtonDisabled={isButtonDisabled}
//               setIsButtonDisabled={setIsButtonDisabled}
//             />
//           ))}
//         </div>

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//             disabled={superset || isButtonDisabled}
//           >
//             לשמור תוכנית אימון חדשה
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddWorkoutForm;


const AddWorkoutForm = () => {
  const [selectedExercisesFromDropdown, setSelectedExercisesFromDropdown] =
    useState([]); // This will hold the exercise objects selected from the dropdown
  const [exercises, setExercises] = useState([]); // Not directly used, but good for debugging or future features
  const [workoutExercises, setWorkoutExercises] = useState([]); // This will store the exercises with their sets/reps details for submission
  const [superset, setSuperset] = useState(false);
  const [isSupersetSelected, setIsSupersetSelected] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Consider if this state is truly independent or derived
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [filteredExercisesForSelection, setFilteredExercisesForSelection] =
    useState([]); // Renamed from selectedExercise for clarity

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    // watch, // Not used
    formState: { errors },
  } = useForm();

  // Initial fetch for all exercises - useful if you want a general list or for fallback
  // If your API for filtered exercises is robust, this might not be strictly necessary for this component's logic
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercises(response.data.data); // You might still want this for other purposes
      } catch (error) {
        console.error("Error fetching all exercises:", error);
      }
    };
    fetchAllExercises();
  }, []);

  // Handles changes from the AddExercise component (sets, reps, etc.)
  const handleExerciseDetailsChange = (
    exerciseId,
    dataFromAddExerciseComponent
  ) => {
    setWorkoutExercises((prevExercises) => {
      const existingExerciseIndex = prevExercises.findIndex(
        (ex) => ex.exercise_id === exerciseId
      );
      if (existingExerciseIndex > -1) {
        // Update existing exercise
        const updatedExercises = [...prevExercises];
        updatedExercises[existingExerciseIndex] = {
          ...updatedExercises[existingExerciseIndex],
          ...dataFromAddExerciseComponent,
        };
        return updatedExercises;
      } else {
        // Add new exercise details (should not happen if selectedExercisesFromDropdown is the source of truth for rendering)
        // This path might be redundant if AddExercise is only rendered for items in selectedExercisesFromDropdown
        return [
          ...prevExercises,
          { exercise_id: exerciseId, ...dataFromAddExerciseComponent },
        ];
      }
    });
  };

  // Effect to fetch exercises based on body part and equipment filters
  useEffect(() => {
    const fetchFilteredExercises = async () => {
      // Only fetch if at least one filter is selected, or adjust as needed
      if (selectedBodyPart || selectedEquipment) {
        let url = `${base_url}/exercise?`;
        if (selectedBodyPart) {
          url += `body_part=${selectedBodyPart}&`;
        }
        if (selectedEquipment) {
          url += `equipment=${selectedEquipment}&`;
        }
        // Remove trailing '&' or '?'
        url = url.slice(0, -1);

        try {
          const response = await axios.get(url);
          setFilteredExercisesForSelection(response.data.data || []); // Ensure it's an array
          console.log("Filtered exercises for selection:", response.data.data);
        } catch (error) {
          console.error("Error fetching filtered exercises:", error);
          setFilteredExercisesForSelection([]); // Reset on error
        }
      } else {
        // Optional: Clear selection or load all exercises if filters are cleared
        setFilteredExercisesForSelection([]); // Or fetch all exercises again if that's desired behavior
      }
    };

    fetchFilteredExercises();
  }, [selectedBodyPart, selectedEquipment]);

  // When items from the multi-select dropdown change
  const handleDropdownSelectionChange = (selectedItems) => {
    setSelectedExercisesFromDropdown(selectedItems); // selectedItems is an array of full exercise objects

    // Update workoutExercises: add new ones, remove deselected ones
    setWorkoutExercises((prevWorkoutExercises) => {
      const newWorkoutExercises = selectedItems.map((item) => {
        // Find if this exercise already has details in workoutExercises
        const existing = prevWorkoutExercises.find(
          (we) => we.exercise_id === item._id
        );
        if (existing) {
          return existing; // Keep existing details
        }
        // If new, add with its ID, other details will be filled by AddExercise component
        return {
          exercise_id:
            item._id /*, any default values like sets: '', reps: '' */,
        };
      });
      return newWorkoutExercises;
    });
  };

  const onSubmit = async (data) => {
    // Ensure all exercises in workoutExercises have the necessary details.
    // The AddExercise component should ensure it calls handleExerciseDetailsChange with complete data.
    const workoutData = {
      name: data.name,
      description: data.description,
      exercises: workoutExercises.filter((ex) => ex.exercise_id), // Ensure only valid exercises are sent
      // potentially add: is_superset: superset // if the whole workout can be a superset
    };

    console.log("Submitting workoutData", workoutData);

    // Basic validation: Check if exercises have been added and have details
    if (workoutExercises.length === 0) {
      toast.error("Please add at least one exercise to the workout.");
      return;
    }
    // Add more specific validation if needed (e.g., all exercises have sets and reps)

    try {
      const response = await axios.post(`${base_url}/workout`, workoutData);
      if (response.status === 201) {
        toast.success("Workout created successfully");
        reset(); // Resets react-hook-form fields (name, description)
        setSelectedExercisesFromDropdown([]); // Clear selected exercises from dropdown
        setWorkoutExercises([]); // Clear the detailed exercises
        setSelectedBodyPart(null); // Reset filters
        setSelectedEquipment(null); // Reset filters
        setFilteredExercisesForSelection([]); // Clear the dropdown options
        // Potentially reset Select component values if they don't clear automatically
        // For react-dropdown-select, clearing the 'values' prop by resetting selectedExercisesFromDropdown should work
        navigate("/dashboard/workout-list");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create workout");
      console.error(error);
    }
  };

  return (
    <div className="sm:py-20 py-6" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <DynamicInputField
            className="sm:min-w-[400px]"
            id="name"
            type="text"
            label="שם תוכנית אימון"
            placeholder="הוסף שם תוכנית אימון ...."
            register={register}
            validation={{ required: "Workout name is required" }}
            errors={errors}
          />

          <DynamicTextAreaField
            className="sm:min-w-[400px]"
            id="description"
            type="text" // type for textarea is usually not needed, it defaults
            label=" תיאור האימון "
            placeholder="הוסף תיאור לאימון...."
            register={register}
            validation={{ required: "Workout Description is required" }}
            errors={errors}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              אזור בגוף
            </label>
            <Select
              className="rounded-lg h-12 w-auto bg-white text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-customBg focus:border-customBg"
              style={{ lineHeight: "3rem" }} // Added style for better vertical alignment with h-12
              direction="rtl"
              options={bodyPartOptions}
              valueField="value" // Assuming bodyPartOptions has {label: "...", value: "..."}
              labelField="label"
              placeholder="סנן לפי חלק בגוף"
              onChange={(selectedOptions) => {
                // react-dropdown-select returns an array. If you want single select for filters:
                setSelectedBodyPart(
                  selectedOptions.length > 0 ? selectedOptions[0].value : null
                );
              }}
              searchBy="label"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ציוד
            </label>
            <Select
              className="rounded-lg h-12 w-auto bg-white text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-customBg focus:border-customBg"
              style={{ lineHeight: "3rem" }} // Added style for better vertical alignment
              direction="rtl"
              options={equipmentOptions}
              valueField="value" // Assuming equipmentOptions has {label: "...", value: "..."}
              labelField="label"
              placeholder="סנן לפי ציוד"
              onChange={(selectedOptions) => {
                setSelectedEquipment(
                  selectedOptions.length > 0 ? selectedOptions[0].value : null
                );
              }}
              searchBy="label"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              בחר תרגילים
            </label>
            <Select
              className="rounded-lg min-h-12 w-auto bg-white text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-customBg focus:border-customBg"
              style={{
                lineHeight: "normal",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }} // Adjust padding for multi-select height
              direction="rtl"
              options={filteredExercisesForSelection} // Use the filtered list
              valueField="_id" // The unique identifier for an exercise object
              labelField="name" // The field to display in the dropdown
              placeholder="בחר תרגילים מהרשימה"
              onChange={handleDropdownSelectionChange} // Use the new handler
              searchBy="name"
              multi // THIS IS THE KEY FOR MULTIPLE SELECTION
              values={selectedExercisesFromDropdown} // To make it a controlled component for selections
              keepSelectedInList // Optional: keeps selected items visible in the dropdown list
              dropdownHandle={true} // Shows dropdown handle
            />
          </div>

          {/* This part correctly renders AddExercise for each selected item */}
          {selectedExercisesFromDropdown.map((exercise) => (
            <AddExercise
              key={exercise._id} // Essential for React's rendering
              exercise={exercise} // Pass the full exercise object
              // Pass any initial data from workoutExercises if it exists for this exercise
              initialData={workoutExercises.find(
                (we) => we.exercise_id === exercise._id
              )}
              onChange={(dataFromAddExercise) =>
                handleExerciseDetailsChange(exercise._id, dataFromAddExercise)
              }
              // Superset props - ensure AddExercise handles these or remove if not used per-exercise
              setSuperset={setSuperset}
              superset={superset}
              isSupersetSelected={isSupersetSelected}
              setIsSupersetSelected={setIsSupersetSelected}
              isButtonDisabled={isButtonDisabled} // This seems like a global disable, check usage in AddExercise
              setIsButtonDisabled={setIsButtonDisabled} // This seems like a global disable
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {" "}
          {/* Added margin top for spacing */}
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-3 text-base rounded-full bg-customBg hover:bg-customBg/90 focus:ring-2 focus:ring-customBg focus:ring-opacity-50" // Enhanced styling
            disabled={isButtonDisabled || workoutExercises.length === 0}
          >
            לשמור תוכנית אימון חדשה
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkoutForm;

// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import AddExercise from "./AddExercise";
// import { useNavigate } from "react-router-dom";
// import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
// import { bodyPartOptions, equipmentOptions } from "@/constants/exerciseData";

// const AddWorkoutForm = () => {
//   const [selectedExercisesFromDropdown, setSelectedExercisesFromDropdown] =
//     useState([]);
//   const [allExercises, setAllExercises] = useState([]); // Renamed from 'exercises' for clarity, holds ALL exercises
//   const [workoutExercises, setWorkoutExercises] = useState([]);
//   const [superset, setSuperset] = useState(false);
//   const [isSupersetSelected, setIsSupersetSelected] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [selectedBodyPart, setSelectedBodyPart] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [filteredExercisesForSelection, setFilteredExercisesForSelection] =
//     useState([]); // Initialize as empty, will be populated with all exercises initially

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Initial fetch for all exercises and populate filteredExercisesForSelection
//   useEffect(() => {
//     const fetchAllExercises = async () => {
//       try {
//         const response = await axios.get(`${base_url}/exercise`);
//         setAllExercises(response.data.data); // Store all exercises
//         setFilteredExercisesForSelection(response.data.data); // Initially show all exercises in the dropdown
//       } catch (error) {
//         console.error("Error fetching all exercises:", error);
//       }
//     };
//     fetchAllExercises();
//   }, []);

//   // Handles changes from the AddExercise component (sets, reps, etc.)
//   const handleExerciseDetailsChange = (
//     exerciseId,
//     dataFromAddExerciseComponent
//   ) => {
//     setWorkoutExercises((prevExercises) => {
//       const existingExerciseIndex = prevExercises.findIndex(
//         (ex) => ex.exercise_id === exerciseId
//       );
//       if (existingExerciseIndex > -1) {
//         const updatedExercises = [...prevExercises];
//         updatedExercises[existingExerciseIndex] = {
//           ...updatedExercises[existingExerciseIndex],
//           ...dataFromAddExerciseComponent,
//         };
//         return updatedExercises;
//       } else {
//         return [
//           ...prevExercises,
//           { exercise_id: exerciseId, ...dataFromAddExerciseComponent },
//         ];
//       }
//     });
//   };

//   // Effect to fetch exercises based on body part and equipment filters
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
//           setFilteredExercisesForSelection(response.data.data || []);
//           console.log("Filtered exercises for selection:", response.data.data);
//         } catch (error) {
//           console.error("Error fetching filtered exercises:", error);
//           setFilteredExercisesForSelection([]);
//         }
//       } else {
//         // If no filters are selected, show all exercises again
//         setFilteredExercisesForSelection(allExercises);
//       }
//     };

//     fetchFilteredExercises();
//   }, [selectedBodyPart, selectedEquipment, allExercises]); // Add allExercises as a dependency

//   // Remove Exercise

//   const handleRemoveExercise = (exerciseIdToRemove) => {
//     // Remove from workoutExercises
//     setWorkoutExercises((prevExercises) =>
//       prevExercises.filter((ex) => ex.exercise_id !== exerciseIdToRemove)
//     );

//     // Remove from selectedExercisesFromDropdown
//     setSelectedExercisesFromDropdown((prevSelected) =>
//       prevSelected.filter((ex) => ex._id !== exerciseIdToRemove)
//     );
//   };

//   // When items from the multi-select dropdown change
//   const handleDropdownSelectionChange = (selectedItems) => {
//     setSelectedExercisesFromDropdown(selectedItems);

//     setWorkoutExercises((prevWorkoutExercises) => {
//       const newWorkoutExercises = selectedItems.map((item) => {
//         const existing = prevWorkoutExercises.find(
//           (we) => we.exercise_id === item._id
//         );
//         if (existing) {
//           return existing;
//         }
//         return {
//           exercise_id: item._id,
//         };
//       });
//       return newWorkoutExercises;
//     });
//   };

//   const onSubmit = async (data) => {
//     const workoutData = {
//       name: data.name,
//       description: data.description,
//       exercises: workoutExercises.filter((ex) => ex.exercise_id),
//     };

//     console.log("Submitting workoutData", workoutData);

//     if (workoutExercises.length === 0) {
//       toast.error("Please add at least one exercise to the workout.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${base_url}/workout`, workoutData);
//       if (response.status === 201) {
//         toast.success("Workout created successfully");
//         reset();
//         setSelectedExercisesFromDropdown([]);
//         setWorkoutExercises([]);
//         setSelectedBodyPart(null);
//         setSelectedEquipment(null);
//         // Reset filteredExercisesForSelection to all exercises after successful submission
//         setFilteredExercisesForSelection(allExercises);
//         navigate("/dashboard/workout-list");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create workout");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="sm:py-20 py-6" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="sm:min-w-[400px]"
//             id="name"
//             type="text"
//             label="שם תוכנית אימון"
//             placeholder="הוסף שם תוכנית אימון ...."
//             register={register}
//             validation={{ required: "Workout name is required" }}
//             errors={errors}
//           />

//           <DynamicTextAreaField
//             className="sm:min-w-[400px]"
//             id="description"
//             type="text"
//             label=" תיאור האימון "
//             placeholder="הוסף תיאור לאימון...."
//             register={register}
//             validation={{ required: "Workout Description is required" }}
//             errors={errors}
//           />

//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               אזור בגוף
//             </label>
//             <Select
//               className="rounded-lg h-12 w-auto bg-white text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-customBg focus:border-customBg"
//               style={{ lineHeight: "3rem" }}
//               direction="rtl"
//               options={bodyPartOptions}
//               valueField="value"
//               labelField="label"
//               placeholder="סנן לפי חלק בגוף"
//               onChange={(selectedOptions) => {
//                 setSelectedBodyPart(
//                   selectedOptions.length > 0 ? selectedOptions[0].value : null
//                 );
//               }}
//               searchBy="label"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               ציוד
//             </label>
//             <Select
//               className="rounded-lg h-12 w-auto bg-white text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-customBg focus:border-customBg"
//               style={{ lineHeight: "3rem" }}
//               direction="rtl"
//               options={equipmentOptions}
//               valueField="value"
//               labelField="label"
//               placeholder="סנן לפי ציוד"
//               onChange={(selectedOptions) => {
//                 setSelectedEquipment(
//                   selectedOptions.length > 0 ? selectedOptions[0].value : null
//                 );
//               }}
//               searchBy="label"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               בחר תרגילים
//             </label>
//             <Select
//               className="rounded-lg min-h-12 w-auto bg-white text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-customBg focus:border-customBg"
//               style={{
//                 lineHeight: "normal",
//                 paddingTop: "0.5rem",
//                 paddingBottom: "0.5rem",
//               }}
//               direction="rtl"
//               options={filteredExercisesForSelection}
//               valueField="_id"
//               labelField="name"
//               placeholder="בחר תרגילים מהרשימה"
//               onChange={handleDropdownSelectionChange}
//               searchBy="name"
//               values={selectedExercisesFromDropdown}
//               keepSelectedInList
//               dropdownHandle={true}
//             />
//           </div>

//           {selectedExercisesFromDropdown.map((exercise) => (
//             <AddExercise
//               key={exercise._id}
//               exercise={exercise}
//               initialData={workoutExercises.find(
//                 (we) => we.exercise_id === exercise._id
//               )}
//               onChange={(dataFromAddExercise) =>
//                 handleExerciseDetailsChange(exercise._id, dataFromAddExercise)
//               }
//               setSuperset={setSuperset}
//               superset={superset}
//               isSupersetSelected={isSupersetSelected}
//               setIsSupersetSelected={setIsSupersetSelected}
//               isButtonDisabled={isButtonDisabled}
//               setIsButtonDisabled={setIsButtonDisabled}
//               handleRemoveExercise={handleRemoveExercise}
//             />
//           ))}
//         </div>

//         <div className="flex justify-center mt-8">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-3 text-base rounded-full bg-customBg hover:bg-customBg/90 focus:ring-2 focus:ring-customBg focus:ring-opacity-50"
//             disabled={isButtonDisabled || workoutExercises.length === 0}
//           >
//             לשמור תוכנית אימון חדשה
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddWorkoutForm;
