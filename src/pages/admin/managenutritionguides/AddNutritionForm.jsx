// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import Select from "react-dropdown-select";
// import { useNavigate } from "react-router-dom";

// const AddNutritionForm = ({ userId }) => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const payload = {};

//       console.log("Payload:", payload);

//       await axios.post(`${base_url}/training`, payload).then((response) => {
//         if (response.status === 201) {
//           toast.success("Training session saved successfully!");

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
//     <div className="py-20" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="min-w-[350px]"
//             id="title"
//             type="text"
//             label="שם האימון"
//             placeholder="Add שם האימון...."
//             register={register}
//             validation={{ required: "שם האימון is required" }}
//             errors={errors}
//           />

//           <DynamicInputField
//             className="min-w-[350px]"
//             id="description"
//             type="text"
//             label="דגשים מיוחדים (במידה ויש)"
//             placeholder="דגשים מיוחדים (במידה ויש)..."
//             register={register}
//             validation={{ required: "דגשים מיוחדים is required" }}
//             errors={errors}
//           />
//         </div>
//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
//           >
//             Add Nutrition Menu
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const AddNutritionForm = ({ userId }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (id) {
        formData.append("user_id", id);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("file", data.file[0]);
      } else {
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("file", data.file[0]);
      }

      const response = await axios.post(
        `${base_url}/nutritionGuide`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Nutrition saved successfully!");
        reset();
        if (id) {
          navigate(`/dashboard/nutrition-lists/${id}`);
        } else {
          navigate("/dashboard/nutrition-lists");
        }
      }
    } catch (error) {
      console.error("Error submitting training session:", error);
      toast.error("Failed to save training session.");
    }
  };

  return (
    <div className="py-20" dir="rtl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid gap-4">
          <DynamicInputField
            className="sm:min-w-[350px]"
            id="title"
            type="text"
            label={userId ? "Nutrition Menu Name" : "Nutrition Guide Name"}
            placeholder={
              userId
                ? "Add nutrition menu name..."
                : "Add nutrition guide name..."
            }
            register={register}
            validation={{
              required: userId
                ? "Nutrition menu name is required"
                : "Nutrition guide name is required",
            }}
            errors={errors}
          />

          <DynamicInputField
            className="sm:min-w-[350px]"
            id="description"
            type="text"
            label={
              userId
                ? "Nutrition Menu Description"
                : "Nutrition Guide Description"
            }
            placeholder={
              userId
                ? "Add nutrition menu description..."
                : "Add nutrition guide description..."
            }
            register={register}
            validation={{
              required: userId
                ? "Nutrition menu description is required"
                : "Nutrition guide description is required",
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
            {userId ? "Add Nutrition Menu" : "Add Nutrition Guide"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNutritionForm;
