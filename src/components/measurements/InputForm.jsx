import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DynamicInputField from "./DynamicInputField";
import { upload } from "../../assets/index";
import { Button } from "../ui/button";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const InputForm = ({ gender }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userDetails._id;
  const Gender = userDetails?.gender;
  const navigate = useNavigate();
  console.log("gender", Gender);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append(`photo1`, file);
      });
    }
    // if (files && files.length > 0) {
    //   files.forEach((file, index) => {

    //     formData.append(`photo1[${index}]`, file);

    //     formData.append(`uploadedFile[${index}]`, file);

    //   });
    // }

    formData.append("user_id", userId);

    console.log("This is my form data:", Object.fromEntries(formData));

    try {
      const response = await axios.post(`${base_url}/measurement`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Measurment assign successfully");
        navigate("/");
        console.log("Success:", response.data);
      }
    } catch (error) {
      console.error("Error uploading form data:", error);
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

  const handleFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter(validateFile);
    if (validFiles.length > 0) {
      const totalFiles = files.length + validFiles.length;
      if (totalFiles > 4) {
        toast.warning("You can upload up to 4 images only.");
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setPreviews((prevPreviews) => [
        ...prevPreviews,
        ...validFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload an image or PDF.");
      return false;
    }
    return true;
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto justify-center  py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="  w-full justify-center flex flex-col md:flex-row-reverse  gap-4">
          <div className="w-full">
            <DynamicInputField
              id="thighl"
              type="text"
              label="יירך שמאל"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id="armr"
              type="text"
              label="זרוע ימין"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id="arml"
              type="text"
              label="זרוע שמאל"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id={Gender === "male" ? "chest" : "butt"}
              type="number"
              label={Gender === "male" ? "חָזֶה" : "קַת"}
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: Gender === "male" ? "חָזֶה" : "קַת" }}
              errors={errors}
              watch={watch}
            />
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
          </div>
          <div className="w-full">
            <DynamicInputField
              id="renew_date"
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
              type="text"
              label="היקף מותניים"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            {/* <DynamicInputField
              id="chest"
              type="text"
              label="היקף חזה"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            /> */}
            <DynamicInputField
              id="thighr"
              type="text"
              label="ירך ימין "
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
          </div>
        </div>
        <button className="underline text-black text-xl font-bold hover:text-blue-600">
          לצפייה במדריך המדדים
        </button>
        <div className="w-full flex justify-center items-center">
          <div className="w-full md:w-[60%] mt-6">
            <label className="block font-semibold text-sm text-[#333333] text-center">
              העלאת תמונה (לא חובה אך מומלץ בחום)
            </label>

            {/* Drag-and-Drop Box */}
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

              {/* File Names Inside Box */}
              {files.length > 0 && (
                <div className="text-center mt-2">
                  {files.map((file, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {file.name}
                    </p>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleButtonClick}
                className="bg-[#BF2033] hover:bg-red-500 text-white px-4 rounded-full mt-4"
                type="button"
              >
                העלאה
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                id="fileInput"
                accept="image/jpeg, image/png"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Previews and Remove Buttons (Below Box) */}
            {files.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center  p-2 rounded-lg"
                  >
                    {/* Image Preview */}
                    {file.type.startsWith("image/") && (
                      <img
                        src={previews[index]}
                        alt="Preview"
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className=" text-white px-4 md:px-8 py-2 rounded-full"
          >
            שמירת מדדים
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
