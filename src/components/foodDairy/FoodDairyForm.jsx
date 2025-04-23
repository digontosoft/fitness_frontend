import { base_url } from "@/api/baseUrl";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FoodDairyForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const location = useLocation();
  const taskData = location.state;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${base_url}/food-dairy-single/${taskData.food_dairy_id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Food dairy task updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto sm:p-6 p-4 bg-white shadow-md rounded-lg sm:my-10"
      dir="rtl"
    >
      <h2 className="text-2xl font-semibold text-start mb-4" dir="rtl">
        יום מספר
      </h2>

      {/* Date Input */}
      <label className="block font-medium">תאריך</label>
      <div dir="rtl">
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full border p-2 rounded-md mb-4"
        />
      </div>

      {/* Breakfast Input */}
      <label className="block font-medium" dir="rtl">
        פירוט יומי
      </label>
      <textarea
        type="text"
        {...register("breakfast", { required: true })}
        placeholder="מה אכלת היום?"
        className="w-full border p-2 rounded-md"
        dir="rtl"
      />

      {/* <label className="block font-medium mt-4">ארוחת צהריים</label>
      <textarea
        type="text"
        {...register("lunch", { required: true })}
        placeholder="Enter items"
        className="w-full border p-2 rounded-md"
      />

      <label className="block font-medium mt-4">ארוחת ערב</label>
      <textarea
        type="text"
        {...register("dinner", { required: true })}
        placeholder="Enter items"
        className="w-full border p-2 rounded-md"
      /> */}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 text-white p-2 rounded-md bg-customBg hover:bg-red-800"
      >
        שמירת יומן אכילה
      </button>
    </form>
  );
};

export default FoodDairyForm;
