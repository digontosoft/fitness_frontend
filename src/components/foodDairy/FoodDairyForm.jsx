import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const FoodDairyForm = () => {
  const { register, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: {
      days: [
        { date: "", breakfast: [""], lunch: [""], dinner: [""] }, // Day 1
        { date: "", breakfast: [""], lunch: [""], dinner: [""] }, // Day 2
        { date: "", breakfast: [""], lunch: [""], dinner: [""] }, // Day 3
      ],
    },
  });

  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const onNext = (data) => {
    if (currentDayIndex < 2) {
      setCurrentDayIndex((prev) => prev + 1);
    } else {
      console.log("Final Submission Data:", data);
      // Send `data.days` to API here
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4  rounded-lg " dir="rtl">
      <h2 className="text-lg font-bold mb-4">
        Meal Plan - Day {currentDayIndex + 1}
      </h2>
      <form onSubmit={handleSubmit(onNext)}>
        {/* Date Input */}
        <label className="block font-semibold">Date</label>
        <input
          type="date"
          {...register(`days.${currentDayIndex}.date`, { required: true })}
          className="w-full p-2 border rounded mb-2"
        />

        {/* Dynamic Inputs */}
        <MealInputList
          register={register}
          control={control}
          name={`days.${currentDayIndex}.breakfast`}
          label="Breakfast"
        />
        <MealInputList
          register={register}
          control={control}
          name={`days.${currentDayIndex}.lunch`}
          label="Lunch"
        />
        <MealInputList
          register={register}
          control={control}
          name={`days.${currentDayIndex}.dinner`}
          label="Dinner"
        />

        {/* Navigation Buttons */}
        <div className="mt-4">
          {currentDayIndex < 2 ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// ✅ Fixed: Properly Uses useFieldArray
const MealInputList = ({ register, control, name, label }) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="mb-4">
      <label className="block font-semibold">{label}</label>
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-2 mb-2">
          <input
            {...register(`${name}.${index}`)}
            className="w-full p-2 border rounded"
            placeholder={`Enter ${label.toLowerCase()} item`}
          />
          {fields.length > 1 && (
            <button
              type="button"
              className="px-2 bg-red-500 text-white"
              onClick={() => remove(index)}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="px-2 py-1 bg-gray-300 rounded"
        onClick={() => append("")}
      >
        + Add {label} Item
      </button>
    </div>
  );
};

// Dynamic Input Component for Adding Multiple Items
const DynamicInputArray = ({ register, name }) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control: register().control,
  });

  return (
    <div>
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-2 mb-2">
          <input
            {...register(`${name}.${index}`)}
            className="w-full p-2 border rounded"
            placeholder="Enter food item"
          />
          <button
            type="button"
            className="px-2 bg-red-500 text-white"
            onClick={() => remove(index)}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-2 py-1 bg-gray-300 rounded"
        onClick={() => append("")}
      >
        + Add Item
      </button>
    </div>
  );
};

export default FoodDairyForm;
