import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import FormTitle from "@/components/admin/components/ui/FormTitle";
import Loading from "@/components/common/Loading";

const EditNutrition = () => {
  const { id } = useParams();
  const [nutrition, setNutrition] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios.get(`${base_url}/nutritionGuide/${id}`).then((response) => {
      if (response.status === 200) {
        setNutrition(response.data.data);
        setExistingPdf(response?.data?.data?.pdf_link);
        reset(response.data.data);
        setLoading(false);
      }
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      //   formData.append("user_id", id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }
      console.log("formData", formData.get("title"));

      await axios
        .put(`${base_url}/nutritionGuide/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Nutrition updated successfully!");
            navigate("/dashboard/nutrition-lists");
          }
        });
    } catch (error) {
      console.error("Error updating nutrition:", error);
      toast.error("Failed to update nutrition.");
    }
  };

  return (
    <div className="bg-[#7994CB] relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title={"ערוך מדריך תזונה"} />

          <div className="py-20" dir="rtl">
            {loading ? (
              <Loading />
            ) : (
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
                    label="שם מדריך תזונה"
                    placeholder="Add שם האימון...."
                    register={register}
                    validation={{ required: "שם האימון is required" }}
                    errors={errors}
                    defaultValue={nutrition?.title}
                  />

                  <DynamicInputField
                    className="sm:min-w-[350px]"
                    id="description"
                    type="text"
                    label="תיאור מדריך תזונה"
                    placeholder="דגשים מיוחדים (במידה ויש)..."
                    register={register}
                    validation={{ required: "דגשים מיוחדים is required" }}
                    errors={errors}
                    defaultValue={nutrition?.description}
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
                      <p className="text-[#7994CB] text-xs mt-1">
                        {errors.file.message}
                      </p>
                    )}
                  </div>
                  {/* Show Existing PDF */}
                  {existingPdf && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">קובץ קיים:</p>
                      <a
                        href={`${base_url}/${existingPdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {existingPdf}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="text-white px-4 md:px-8 py-2 rounded-full bg-[#7994CB]"
                  >
                    {id ? "עדכון תפריט תזונה" : "הוסף מדריך תזונה"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNutrition;
