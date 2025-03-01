import React, { useState } from "react";
import { upload } from "../../assets/index";

const DragAndDrop = ({ register, setValue, errors }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  console.log("file name and previw", file);

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      updateFileAndPreview(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      updateFileAndPreview(selectedFile);
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

  const updateFileAndPreview = (file) => {
    const previewURL = URL.createObjectURL(file);
    console.log("Generated Preview URL:", previewURL); // Debug log
    setFile(file);
    setPreview(previewURL);
    setValue("uploadedFile", file); // Optional
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
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
            <img src={upload} alt="upload" />
          </div>
          <p className="mb-2">בחר או גרור קובץ תמונה</p>

          {/* Image Preview */}
          {preview && file?.type.startsWith("image/") && (
            <div className="my-4">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded-md"
              />
            </div>
          )}

          {/* PDF Placeholder */}
          {preview && file?.type === "application/pdf" && (
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
          {errors.uploadedFile && (
            <p className="text-red-500 text-sm">
              {errors.uploadedFile.message}
            </p>
          )}
        </div>

        {/* Selected File Name */}
        <div className="flex items-center mt-2">
          {file && file.type.startsWith("image/") && (
            <img
              src={preview}
              alt="Preview"
              className="w-8 h-8 object-cover border rounded-full"
            />
          )}
          {file && <p>{file.name}</p>}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
