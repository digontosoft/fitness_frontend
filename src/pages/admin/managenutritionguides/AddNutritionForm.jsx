// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const AddNutritionForm = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const createFormData = (data) => {
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     if (data.file && data.file[0]) {
//       formData.append("file", data.file[0]);
//     }

//     return formData;
//   };

//   const onSubmit = async (data) => {
//     try {
//       const formData = createFormData(data);

//       const response = await axios.post(
//         `${base_url}/nutritionGuide`,
//         formData,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 201) {
//         toast.success("Nutrition saved successfully!");
//         reset();

//         navigate("/dashboard/nutrition-lists");
//       }
//     } catch (error) {
//       console.error("Error submitting training session:", error);
//       toast.error("Failed to save nutrition.");
//     }
//   };

//   return (
//     <div className="py-20" dir="rtl">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-6"
//         encType="multipart/form-data"
//       >
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="sm:min-w-[350px]"
//             id="title"
//             type="text"
//             label={"Nutrition Guide Name"}
//             placeholder={"Add nutrition guide name..."}
//             register={register}
//             validation={{
//               required: "Nutrition guide name is required",
//             }}
//             errors={errors}
//           />

//           <DynamicInputField
//             className="sm:min-w-[350px]"
//             id="description"
//             type="text"
//             label={"Nutrition Guide Description"}
//             placeholder={"Add nutrition guide description..."}
//             register={register}
//             validation={{
//               required: "Nutrition guide description is required",
//             }}
//             errors={errors}
//           />

//           {/* File Upload Input */}
//           <div>
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="file"
//             >
//               העלאת קובץ PDF
//             </label>
//             <input
//               type="file"
//               id="file"
//               accept="application/pdf"
//               {...register("file", {
//                 required: "יש להעלות קובץ PDF",
//                 validate: (value) =>
//                   value[0]?.type === "application/pdf" ||
//                   "קובץ חייב להיות בפורמט PDF",
//               })}
//               className="border border-gray-300 p-2 rounded w-full"
//             />
//             {errors.file && (
//               <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//           >
//             {"Add Nutrition Guide"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddNutritionForm;

import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddNutritionForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    try {
      let base64File = "";
      if (data.file && data.file[0]) {
        base64File = await convertFileToBase64(data.file[0]);
      }

      const payload = {
        title: data.title,
        description: data.description,
        file: base64File,
      };

      console.log("nutritionGuide:", payload);

      const response = await axios.post(`${base_url}/nutritionGuide`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Nutrition Guide saved successfully!");
        reset();
        navigate("/dashboard/nutrition-lists");
      }
    } catch (error) {
      console.error("Error submitting nutrition guide:", error);
      toast.error("Failed to save nutrition.");
    }
  };

  return (
    <div className="py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <DynamicInputField
            className="sm:min-w-[350px]"
            id="title"
            type="text"
            label={"שם מדריך תזונה"}
            placeholder={"הוסף שם למדריך תזונה ..."}
            register={register}
            validation={{
              required: "Nutrition guide name is required",
            }}
            errors={errors}
          />

          <DynamicInputField
            className="sm:min-w-[350px]"
            id="description"
            type="text"
            label={"תיאור מדריך תזונה "}
            placeholder={"הוסף תיאור מדריך תזונה ..."}
            register={register}
            validation={{
              required: "Nutrition guide description is required",
            }}
            errors={errors}
          />

          {/* File Upload Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="file"
            >
              העלאת קובץ PDF
            </label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              {...register("file", {
                required: "יש להעלות קובץ PDF",
                validate: (value) =>
                  value[0]?.type === "application/pdf" ||
                  "קובץ חייב להיות בפורמט PDF",
              })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.file && (
              <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
          >
            {"הוסף מדריך תזונה"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNutritionForm;
