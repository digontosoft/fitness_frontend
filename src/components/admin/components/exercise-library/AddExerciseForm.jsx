import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import DynamicTextAreaField from "@/components/measurements/DynamicTextAreaField";
import SelectInputField from "@/components/measurements/measurementWatch/SelectInputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const bodyPartOptions = [
  {
    label: "יד קדמית",
    value: "יד קדמית",
  },
  {
    label: "יד אחורית ",
    value: "יד אחורית",
  },
  { label: "כתפיים", value: "כתפיים" },
  { label: "חזה", value: "חזה" },
  { label: "גב", value: "גב" },
  { label: "רגליים", value: "רגליים" },
  { label: "בטן", value: "בטן" },
  { label: "ישבן", value: "ישבן" },
  { label: "גב תחתון", value: "גב תחתון" },
];

const equipmentOptions = [
  { label: "ללא ציוד", value: "ללא ציוד" },
  { label: "TRX", value: "TRX" },
  { label: "גומיות", value: "גומיות" },
  { label: "משקולות", value: "משקולות" },
  { label: "מכונות", value: "מכונות" },
  { label: "מוטות", value: "מוטות" },
];

const AddExerciseForm = ({ exerciseId }) => {
  const [exerciseData, setExerciseData] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`${base_url}/exercise/${exerciseId}`).then((response) => {
      if (response.status === 200) {
        setExerciseData(response.data.data);
      }
    });
  }, [exerciseId]);

  useEffect(() => {
    reset(exerciseData);
  }, [reset, exerciseData]);

  const crateExercise = (data) => {
    try {
      axios.post(`${base_url}/exercise`, data).then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success(response.data.message);
          reset();
          navigate("/dashboard/exercise-list");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateExercise = (data) => {
    try {
      axios.put(`${base_url}/exercise/${exerciseId}`, data).then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/dashboard/exercise-list");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    if (exerciseId) {
      updateExercise(data);
    } else {
      crateExercise(data);
    }
  };

  return (
    <div className=" py-20" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-ful grid gap-4">
          <DynamicInputField
            className="sm:w-[327px]"
            id="name"
            type="text"
            label="שם התרגיל"
            placeholder="הוסף שם תרגיל...."
            register={register}
            validation={!exerciseId ? { required: "הוסף שם תרגיל" } : {}}
            errors={errors}
            watch={watch}
            defaultValue={exerciseId ? exerciseData?.name : ""}
          />
          <DynamicTextAreaField
            className="sm:w-[327px]"
            id="description"
            type="text"
            label="הוראות לתרגיל"
            placeholder="הוסף תיאור תרגיל...."
            register={register}
            validation={!exerciseId ? { required: "הוסף תיאור תרגיל" } : {}}
            errors={errors}
            watch={watch}
            defaultValue={exerciseId ? exerciseData?.description : ""}
          />
          <DynamicInputField
            className="sm:w-[327px]"
            id="video_url"
            type="text"
            label="לינק לסרטון התרגיל"
            placeholder="הוסף קישור YouTube לתרגיל...."
            register={register}
            validation={
              !exerciseId ? { required: "הוסף קישור YouTube לתרגיל" } : {}
            }
            errors={errors}
            watch={watch}
            defaultValue={exerciseId ? exerciseData?.video_url : ""}
          />

          <div className="relative w-full mb-6">
            <label className="absolute -top-3 right-4 px-2 text-gray-600 text-sm z-10 bg-white">
              אזור בגוף
            </label>
            <div className="relative">
              <select
                name=""
                id=""
                {...register("body_part", {
                  required: "נדרש חלק בגוף",
                })}
                defaultValue={exerciseId ? exerciseData?.body_part : ""}
                placeholder="בחר אזור בגוף"
                className={`w-full border ${
                  errors.body_part ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {!exerciseId && <option value=""> לבחור איבר בגוף</option>}
                {bodyPartOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.body_part && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.body_part.message}
                </p>
              )}
            </div>
          </div>
          <div className="relative w-full mb-6">
            <label className="absolute -top-3 right-4 px-2 text-gray-600 text-sm z-10 bg-white">
              ציוד
            </label>
            <div className="relative">
              <select
                name=""
                id=""
                {...register("equipment", {
                  required: "נדרש ציוד",
                })}
                defaultValue={exerciseId ? exerciseData?.equipment : ""}
                placeholder="לבחור ציוד"
                className={`w-full border ${
                  errors.equipment ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {!exerciseId && <option value="">לבחור ציוד</option>}
                {equipmentOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.body_part && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.equipment.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className=" text-white px-4 md:px-8 py-2 rounded-full bg-custom-radial"
          >
            {exerciseId ? " עדכון תרגיל" : " הוסף תרגיל למאגר"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExerciseForm;
