// import { base_url } from "@/api/baseUrl";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";

// const ManageRecipeBook = () => {
//   const { id: bookId } = useParams();
//   const navigate = useNavigate();
//   const [getRecipeBook, setRecipeBook] = useState({});
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

  

//   useEffect(() => {
//     const fetchRecipeBook = async () => {
//     try {
//       const response = await axios.get(`${base_url}/recipeBook/${bookId}`);
//       setRecipeBook(response.data.data);
//     } catch (error) {
//       console.error("Error fetching recipe book:", error);
//     }
//   };
//     fetchRecipeBook();
//   }, [bookId]);

//   console.log('recipeBook', getRecipeBook)

//   const convertFileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 string
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const onSubmit = async (data) => {
//     try {
//       let base64File = "";
//       if (data.file && data.file[0]) {
//         base64File = await convertFileToBase64(data.file[0]);
//       }

//       const payload = {
//         title: data.title,
//         description: data.description,
//         file: base64File,
//       };

//       const response = await axios.post(`${base_url}/nutritionGuide`, payload, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201) {
//         toast.success("Nutrition menu saved successfully!");
//         reset();
//         navigate(`/dashboard/nutrition-lists`);
//       }
//     } catch (error) {
//       console.error("Error submitting nutrition menu:", error);
//       toast.error("Failed to save nutrition.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-20" dir="rtl">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-4">
//           <DynamicInputField
//             className="sm:min-w-[350px]"
//             id="title"
//             type="text"
//             label={" שם תפריט תזונה אישי "}
//             placeholder={"הוסף שם תפריט תזונה אישי..."}
//             register={register}
//             validation={{
//               required: "Nutrition menu name is required",
//             }}
//             errors={errors}
//           />

//           <DynamicInputField
//             className="sm:min-w-[350px]"
//             id="description"
//             type="text"
//             label={"תיאור תפריט תזונה אישי"}
//             placeholder={"הוסף תיאור תפריט תזונה אישי..."}
//             register={register}
//             validation={{
//               required: "Nutrition menu description is required",
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
//             {"הוסף תפריט תזונה אישי"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ManageRecipeBook;


import { base_url } from "@/api/baseUrl";
import FormTitle from "@/components/admin/components/ui/FormTitle";
import Loading from "@/components/common/Loading";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ManageRecipeBook = () => {
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
    axios.get(`${base_url}/recipeBook/${id}`).then((response) => {
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
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }
      console.log("formData", formData.get("type"));
     for (let [key, value] of formData.entries()) {
  console.log(key, value);
}



      await axios
        .put(`${base_url}/recipeBook/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Nutrition updated successfully!");
            navigate("/dashboard/manage-recipe-book");
          }
        });
    } catch (error) {
      console.error("Error updating nutrition:", error);
      toast.error("Failed to update nutrition.");
    }
  };

  return (
    <div className="bg-customBg relative flex items-center justify-center min-h-screen mb-2">
      <div className="bg-white shadow-lg rounded-[60px] p-6 w-5/6 min-h-[80vh] h-auto flex flex-col items-center justify-center my-4">
        <div className="grid gap-4 items-center justify-items-center">
          <FormTitle title={"ערוך ספר מתכונים"} />

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
                    label="שם ספר המתכונים"
                    placeholder="Add שם האימון...."
                    register={register}
                    validation={{ required: "שם האימון is required" }}
                    errors={errors}
                    defaultValue={nutrition?.title}
                  />
                    <div className="flex flex-col">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                       תיאור לספר המתכונים
                      </label>
                      <textarea
                        id="description"
                        placeholder="דגשים מיוחדים (במידה ויש)..."
                        defaultValue={nutrition?.description}
                        {...register("description", { required: "דגשים מיוחדים is required" })}
                        className="sm:min-w-[350px] border border-gray-300 rounded-md p-2 min-h-[120px] resize-y"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                      )}
                    </div>

                    {/* Type Select Field */}
<div className="flex flex-col">
  <label
    htmlFor="type"
    className="text-sm font-medium text-gray-700 mb-1"
  >
    סוג ספר המתכונים
  </label>
  <Select
    onValueChange={(value) => setValue("type", value, { shouldValidate: true })}
    defaultValue={nutrition?.type || ""}
  >
    <SelectTrigger className="sm:min-w-[350px] border border-gray-300 rounded-md">
      <SelectValue placeholder="סוג ספר המתכונים" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="normalUser">מתכונים בלבד</SelectItem>
      <SelectItem value="trainer">למתאמנים</SelectItem>
    </SelectContent>
  </Select>
  {errors.type && (
    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
  )}
</div>


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
                          required: existingPdf ? false : "יש להעלות קובץ PDF",
                          validate: (value) => {
                            if (!value || value.length === 0) return true; // allow empty if existing PDF
                            return (
                              value[0]?.type === "application/pdf" || "קובץ חייב להיות בפורמט PDF"
                            );
                          },
                        })}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                      {errors.file && (
                        <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
                      )}
                    </div>

                    {/* Show Existing PDF */}
                    {existingPdf && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">קובץ קיים:</p>
                        <a
                          href={`${base_url}/${existingPdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {existingPdf.split("/").pop()}
                        </a>
                      </div>
                    )}

                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="text-white px-4 md:px-8 py-2 rounded-full bg-customBg"
                    disabled={loading}
                  >
                   עדכון ספר המתכונים
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

export default ManageRecipeBook;
