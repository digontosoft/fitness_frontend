import { base_url } from "@/api/baseUrl";
import FormTitle from "@/components/admin/components/ui/FormTitle";
import Loading from "@/components/common/Loading";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditNutrition = () => {
  const { id } = useParams();
  const [nutrition, setNutrition] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios.get(`${base_url}/nutritionGuide/${id}`).then((response) => {
      if (response.status === 200) {
        setNutrition(response.data.data);
        setExistingPdf(response?.data?.data?.pdf_link);
        reset({
          title: response.data.data.title,
          description: response.data.data.description,
        });
        setLoading(false);
      }
    });
  }, [id, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      setFileError("");
      return;
    }
    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setFileError("קובץ חייב להיות בפורמט PDF");
      return;
    }
    setSelectedFile(file);
    setFileError("");
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await axios.put(
        `${base_url}/nutritionGuide/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        toast.success("מדריך התזונה עודכן בהצלחה!");
        navigate(
          `/${userData?.userType === "admin" ? "admin-dashboard" : "dashboard"}/nutrition-lists/${id}`
        );
      }
    } catch (error) {
      console.error("Error updating nutrition:", error);
      toast.error("עדכון מדריך התזונה נכשל");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#7994CB] relative flex items-center justify-center min-h-screen px-4 py-4">
      <div className="bg-white shadow-lg rounded-[40px] sm:rounded-[60px] p-6 w-full sm:w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title={"ערוך מדריך תזונה"} />

          <div className="py-6 sm:py-20" dir="rtl">
            {loading ? (
              <Loading />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4">
                  <DynamicInputField
                    className="sm:min-w-[350px]"
                    id="title"
                    type="text"
                    label="שם מדריך תזונה"
                    placeholder="הזן שם מדריך תזונה..."
                    register={register}
                    validation={{ required: "נדרש שם מדריך תזונה" }}
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
                    validation={{ required: "נדרש תיאור מדריך תזונה" }}
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
                      onChange={handleFileChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                    {fileError && (
                      <p className="text-[#7994CB] text-xs mt-1">{fileError}</p>
                    )}
                  </div>

                  {/* Show Existing PDF */}
                  {existingPdf && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">קובץ קיים:</p>
                      <a
                        href={existingPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm break-all"
                      >
                        {existingPdf}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="text-white px-4 md:px-8 py-2 rounded-full bg-[#7994CB]"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        שומר...
                      </span>
                    ) : (
                      "עדכון תפריט תזונה"
                    )}
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
