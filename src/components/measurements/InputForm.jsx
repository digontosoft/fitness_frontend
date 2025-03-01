import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DynamicInputField from "./DynamicInputField";
import { upload } from "../../assets/index";
import { Button } from "../ui/button";

const InputForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  console.log("file name is", preview);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, uploadedFile: file };
    console.log("this my form data ", formData);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
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
  return (
    <div className="p-6 max-w-6xl mx-auto justify-center  py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="  w-full justify-center flex flex-col md:flex-row-reverse  gap-4">
          <div className="w-full">
            <DynamicInputField
              id="leftThigh"
              type="text"
              label="יירך שמאל"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id="rightArm"
              type="text"
              label="זרוע ימין"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id="leftArm"
              type="text"
              label="זרוע שמאל"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id="Butt"
              type="number"
              label="קַת"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "קַת" }}
              errors={errors}
              watch={watch}
            />
          </div>
          <div className="w-full">
            <DynamicInputField
              id="selectedDate"
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
            <DynamicInputField
              id="chest"
              type="text"
              label="היקף חזה"
              placeholder="הזן נתונים כאן..."
              register={register}
              validation={{ required: "שדה זה חובה" }}
              errors={errors}
              watch={watch}
            />
            <DynamicInputField
              id="thigh right"
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
          <div className=" w-full md:w-[60%] mt-6">
            <label className="block font-semibold text-sm text-[#333333] text-center">
              העלאת תמונה (לא חובה אך מומלץ בחום)
            </label>

            {/* Drag-and-Drop Box */}
            <div
              className="w-full   border-2 border-dashed border-gray-400 p-6 mt-2 text-center flex flex-col items-center "
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
            >
              <div>
                <img src={upload} alt="" />
              </div>
              <p className="mb-2">בחר או גרור קובץ תמונה</p>
              {/* Image Preview */}

              {file && (
                <div className="text-right my-4">
                  <p className="text-gray-600 text-sm">{file.name}</p>
                </div>
              )}

              {/* PDF Placeholder */}
              {preview && file.type === "application/pdf" && (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-600 border rounded-lg mb-4">
                  PDF File
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleButtonClick}
                className="bg-[#BF2033] hover:bg-red-500 text-white px-4 rounded-full"
              >
                העלאה
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                id="fileInput"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Selected File Name */}
            <div className="flex items-center justify-between mt-2  ">
              {" "}
              <div className="flex gap-1 items-center">
                {preview && file.type.startsWith("image/") && (
                  <div className=" flex justify-center items-center w-8 h-8 rounded-lg bg-red-600">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-6 h-6 object-cover border rounded-full "
                    />
                  </div>
                )}
                {file && <p>{file.name}</p>}
              </div>
              <p className="underline text-sm text-[#000000]">הסרת תמונה</p>
            </div>
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
