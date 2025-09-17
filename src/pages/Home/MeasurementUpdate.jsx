// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import { base_url } from "@/api/baseUrl";
// import DynamicInputField from "@/components/measurements/DynamicInputField";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { upload } from "../../assets/index";

// const MeasurementUpdate = () => {
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const userDetails = JSON.parse(localStorage.getItem("userInfo"));
//   const Gender = userDetails?.gender;
//   const Id = userDetails._id;
//   const [getMesurement, setMesurement] = useState([]);

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchMeasurement = async () => {
//       try {
//         const response = await axios.get(`${base_url}/measurement/${Id}`);
//         if (response.status === 200) {
//           setMesurement(response.data.data);
//         }
//       } catch (error) {
//         console.error("Measurement data not found", error);
//       }
//     };

//     if (Id) {
//       fetchMeasurement();
//     }
//   }, [Id]);
//   const id = getMesurement._id;

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       mode: "update",
//       date: "",
//       thighl: "",
//       thighr: "",
//       armr: "",
//       arml: "",
//       butt: "",
//       chest: "",
//       waist: "",
//     },
//   });

//   useEffect(() => {
//     if (getMesurement) {
//       // const buttValue =
//       //   Gender === "male" ? getMesurement.chest : getMesurement.butt;
//       // reset({
//       //   mode: "update",
//       //   date: moment(getMesurement.date).format("YYYY-MM-DD") || "",
//       //   thighl: getMesurement.thighl || "",
//       //   thighr: getMesurement.thighr || "",
//       //   armr: getMesurement.armr || "",
//       //   arml: getMesurement.arml || "",
//       //   chest: getMesurement.chest || "",
//       //   butt:
//       //     Gender === "male" ? getMesurement.chest : getMesurement.butt || "",
//       //   waist: getMesurement.waist || "",
//       // });
//       // setValue("butt", buttValue || "");
//     }
//   }, [getMesurement, reset, Gender]);

//   useEffect(() => {
//     if (getMesurement?.photo1 || getMesurement?.photo2) {
//       setPreviews([getMesurement.photo1, getMesurement.photo2].filter(Boolean));
//     }
//   }, [getMesurement]);

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });
//     if (files && files.length > 0) {
//       files.forEach((file, index) => {
//         formData.append(`photo${index + 1}`, file);
//       });
//     }
//     formData.append("user_id", Id);
//     try {
//       const response = await axios.put(
//         `${base_url}/measurement/${id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       if (response.status === 200) {
//         toast.success("Measurement Update successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error("Error updating measurement. Please try again.");
//       console.error("Error updating measurement:", error);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     handleFiles(droppedFiles);
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     handleFiles(selectedFiles);
//   };

//   const handleFiles = (selectedFiles) => {
//     const validFiles = selectedFiles.filter(validateFile);
//     if (validFiles.length > 0) {
//       const totalFiles = files.length + validFiles.length;
//       if (totalFiles > 4) {
//         toast.warning("You can upload up to 4 images only.");
//         return;
//       }
//       setFiles((prevFiles) => [...prevFiles, ...validFiles]);
//     }
//   };
//   useEffect(() => {
//     const previewUrls = files
//       .filter((file) => file.type.startsWith("image/"))
//       .map((file) => URL.createObjectURL(file));

//     setPreviews(previewUrls);
//     return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
//   }, [files]);

//   const validateFile = (file) => {
//     const validTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/jpg",
//       "application/pdf",
//     ];
//     if (!validTypes.includes(file.type)) {
//       alert("Invalid file type. Please upload an image or PDF.");
//       return false;
//     }
//     return true;
//   };

//   const handleButtonClick = () => {
//     document.getElementById("fileInput").click();
//   };

//   const handleRemoveFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//     setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
//   };

//   return (
//     <div
//       className="px-4 sm:px-0 max-w-6xl mx-auto justify-center sm:py-20"
//       dir="rtl"
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <DynamicInputField
//             id="date"
//             type="date"
//             label="תאריך"
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: "שדה זה חובה" }}
//             errors={errors}
//             watch={watch}
//           />
//           <DynamicInputField
//             id="waist"
//             type="text"
//             label="היקף מותניים"
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: "שדה זה חובה" }}
//             errors={errors}
//             watch={watch}
//           />
//           <DynamicInputField
//             id={Gender === "male" ? "chest" : "butt"}
//             type="number"
//             label={Gender === "male" ? "חָזֶה" : "ישבן"}
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: Gender === "male" ? "חָזֶה" : "ישבן" }}
//             errors={errors}
//             watch={watch}
//           />
//           <DynamicInputField
//             id="thighr"
//             type="number"
//             label="ירך ימין"
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: "שדה זה חובה" }}
//             errors={errors}
//             watch={watch}
//           />
//           <DynamicInputField
//             id="thighl"
//             type="number"
//             label="ירך שמאל"
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: "שדה זה חובה" }}
//             errors={errors}
//             watch={watch}
//           />
//           <DynamicInputField
//             id="armr"
//             type="number"
//             label="זרוע ימין"
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: "שדה זה חובה" }}
//             errors={errors}
//             watch={watch}
//           />
//           <DynamicInputField
//             id="arml"
//             type="number"
//             label="זרוע שמאל"
//             placeholder="הזן נתונים כאן..."
//             register={register}
//             validation={{ required: "שדה זה חובה" }}
//             errors={errors}
//             watch={watch}
//           />
//         </div>

//         <Link to="/mesurement-pdf">
//           <button
//             type="button"
//             className="underline text-black text-base font-bold hover:text-blue-600"
//           >
//             לצפייה במדריך צילום תמונות
//           </button>
//         </Link>

//         <div className="w-full flex justify-center items-center">
//           <div className="w-full md:w-[60%] mt-6">
//             <label className="block font-semibold text-sm text-[#333333] text-center">
//               העלאת תמונה (לא חובה אך מומלץ בחום)
//             </label>

//             {/* Drag-and-Drop Box */}
//             <div
//               className="w-full border-2 border-dashed border-gray-400 p-6 mt-2 text-center flex flex-col items-center"
//               onDragOver={handleDragOver}
//               onDragEnter={handleDragEnter}
//               onDrop={handleDrop}
//             >
//               <div>
//                 <img src={upload} alt="Upload Icon" />
//               </div>
//               <p className="mb-2">בחר או גרור קובץ תמונה</p>

//               {/* File Names Inside Box */}
//               {files.length > 0 && (
//                 <div className="text-center mt-2">
//                   {files.map((file, index) => (
//                     <p key={index} className="text-gray-600 text-sm">
//                       {file.name}
//                     </p>
//                   ))}
//                 </div>
//               )}

//               {/* Upload Button */}
//               <button
//                 type="button"
//                 onClick={handleButtonClick}
//                 className="bg-[#BF2033] hover:bg-red-500 text-white px-4 rounded-full mt-4"
//               >
//                 העלאה
//               </button>

//               {/* Hidden File Input */}
//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/jpeg, image/png"
//                 multiple
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//               />
//             </div>

//             {/* Previews and Remove Buttons (Below Box) */}
//             {files.length > 0 && (
//               <div className="mt-4 flex flex-col gap-2">
//                 {files.map((file, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center p-2 rounded-lg"
//                   >
//                     {/* Image Preview */}
//                     {file.type.startsWith("image/") && (
//                       <img
//                         src={previews[index]}
//                         alt="Preview"
//                         className="w-10 h-10 object-cover border rounded-full"
//                       />
//                     )}

//                     <p
//                       className="underline text-sm text-[#000000] cursor-pointer"
//                       onClick={() => handleRemoveFile(index)}
//                     >
//                       הסרת תמונה
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center">
//           <Button
//             type="submit"
//             className=" text-white px-4 md:px-8 py-2 rounded-full mb-5 sm:mb-0"
//           >
//             שמירת מדדים
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MeasurementUpdate;




import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { upload } from "../../assets/index";

// Helper function to convert a file to a Base64 string
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const MeasurementUpdate = () => {
  const [files, setFiles] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const Gender = userDetails?.gender;
  const Id = userDetails._id;
  const [getMesurement, setMesurement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasurement = async () => {
      try {
        const response = await axios.get(`${base_url}/measurement/${Id}`);
        if (response.status === 200) {
          setMesurement(response.data.data);
        }
      } catch (error) {
        console.error("Measurement data not found", error);
        setMesurement({}); // Set to an empty object to render the form with empty fields
      }
    };

    if (Id) {
      fetchMeasurement();
    }
  }, [Id]);

  const id = getMesurement?._id;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: Id,
      date: "",
      thighl: "",
      thighr: "",
      armr: "",
      arml: "",
      butt: "",
      chest: "",
      waist: "",
      photo1: "",
      photo2: "",
      photo3: "",
      photo4: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${base_url}/measurement`,
        data,
        {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
      );

      if (response.status === 201) {
        toast.success("Measurement updated successfully!");
        reset();
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error updating measurement. Please try again.");
      console.error("Error updating measurement:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (selectedFiles) => {
    const newFiles = selectedFiles.filter(validateFile);
    if (newFiles.length === 0) return;

    const totalFiles = files.length + newFiles.length;
    if (totalFiles > 4) {
      toast.warning("You can upload up to 4 images only.");
      return;
    }

    const base64Files = await Promise.all(
      newFiles.map(async (file) => {
        const base64 = await convertToBase64(file);
        return { file, base64 };
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...base64Files.map(f => f.file)]);

    let photoIndex = files.length;
    base64Files.forEach((item) => {
      if (photoIndex < 4) {
        setValue(`photo${photoIndex + 1}`, item.base64);
        photoIndex++;
      }
    });
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.warning("Invalid file type. Please upload an image.");
      return false;
    }
    return true;
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);

    for (let i = indexToRemove; i < 3; i++) {
        setValue(`photo${i + 1}`, watch(`photo${i + 2}`) || "");
    }
    setValue(`photo4`, "");
  };
  
  // Conditional rendering
  if (getMesurement === null) {
    return <div>Loading measurement data...</div>;
  }

  return (
    <div
      className="px-4 sm:px-0 max-w-6xl mx-auto justify-center sm:py-20"
      dir="rtl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DynamicInputField
            id="date"
            type="date"
            label="תאריך"
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
          <DynamicInputField
            id="waist"
            type="number"
            label="היקף מותניים"
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
          <DynamicInputField
            id={Gender === "male" ? "chest" : "butt"}
            type="number"
            label={Gender === "male" ? "חָזֶה" : "ישבן"}
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
          <DynamicInputField
            id="thighr"
            type="number"
            label="ירך ימין"
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
          <DynamicInputField
            id="thighl"
            type="number"
            label="ירך שמאל"
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
          <DynamicInputField
            id="armr"
            type="number"
            label="זרוע ימין"
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
          <DynamicInputField
            id="arml"
            type="number"
            label="זרוע שמאל"
            placeholder="הזן נתונים כאן..."
            register={register}
            validation={{ required: "שדה זה חובה" }}
            errors={errors}
            watch={watch}
          />
        </div>

        <Link to="/mesurement-pdf">
          <button
            type="button"
            className="underline text-black text-base font-bold hover:text-blue-600"
          >
            לצפייה במדריך צילום תמונות
          </button>
        </Link>

        <div className="w-full flex justify-center items-center">
          <div className="w-full md:w-[60%] mt-6">
            <label className="block font-semibold text-sm text-[#333333] text-center">
              העלאת תמונה (לא חובה אך מומלץ בחום)
            </label>

            <div
              className="w-full border-2 border-dashed border-gray-400 p-6 mt-2 text-center flex flex-col items-center"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
            >
              <div>
                <img src={upload} alt="Upload Icon" />
              </div>
              <p className="mb-2">בחר או גרור קובץ תמונה</p>

              <button
                type="button"
                onClick={handleButtonClick}
                className="bg-[#BF2033] hover:bg-red-500 text-white px-4 rounded-full mt-4"
              >
                העלאה
              </button>

              <input
                type="file"
                id="fileInput"
                accept="image/jpeg, image/png"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded-lg"
              >
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-10 h-10 object-cover border rounded-full"
                  />
                )}
                <p
                  className="underline text-sm text-[#000000] cursor-pointer"
                  onClick={() => handleRemoveFile(index)}
                >
                  הסרת תמונה
                </p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center">
          <Button
            type="submit"
            className=" text-white px-4 md:px-8 py-2 rounded-full mb-5 sm:mb-0"
            disabled={isLoading}
          >
           {isLoading ? <span className="flex gap-2"><Loader className="w-6 h-6 animate-spin text-white" />  שמירת מדדים</span> : " שמירת מדדים"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MeasurementUpdate;