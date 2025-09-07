import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddNutritionMenu = ({ userId }) => {
  const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let base64File = "";
      if (data.file && data.file[0]) {
        base64File = await convertFileToBase64(data.file[0]);
      }

      const payload = {
        title: data.title,
        user_id: userId,
        description: data.description,
        file: base64File,
      };

      const response = await axios.post(`${base_url}/nutritionGuide`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Nutrition menu saved successfully!");
        setIsLoading(false);
        reset();
        userDetails.userType === "admin" ? navigate(`/admin-dashboard/nutrition-lists/${userId}`) :navigate(`/dashboard/nutrition-lists/${userId}`);
      }
    } catch (error) {
      console.error("Error submitting nutrition menu:", error);
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
            label={" שם תפריט תזונה אישי "}
            placeholder={"הוסף שם תפריט תזונה אישי..."}
            register={register}
            validation={{
              required: "Nutrition menu name is required",
            }}
            errors={errors}
          />

          <DynamicInputField
            className="sm:min-w-[350px]"
            id="description"
            type="text"
            label={"תיאור תפריט תזונה אישי"}
            placeholder={"הוסף תיאור תפריט תזונה אישי..."}
            register={register}
            validation={{
              required: "Nutrition menu description is required",
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
            disabled={isLoading}
          >
            { isLoading ? <Loader className="animate-spin" /> : "הוסף תפריט תזונה אישי"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNutritionMenu;
