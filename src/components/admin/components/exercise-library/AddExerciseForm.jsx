import { base_url } from "@/api/baseUrl";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
            className="w-[327px]"
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
          <DynamicInputField
            className="w-[327px]"
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
            className="w-[327px]"
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
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className=" text-white px-4 md:px-8 py-2 rounded-full bg-custom-radial"
          >
            הוסף תרגיל למאגר
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExerciseForm;
