import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { Button } from "@/components/ui/button";
import DynamicInputField from "@/components/measurements/DynamicInputField";
import { base_url } from "@/api/baseUrl";

const EditTrainingForm = ({ trainingId, userId }) => {
  const [trainingExercises, setTrainingExercises] = useState([]);
  const [selectedTrainingExercises, setSelectedTrainingExercises] = useState(
    []
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${base_url}/getUser/${userId}`)
      .then((res) => setUser(res?.data?.data));
  }, [userId]);

  useEffect(() => {
    axios
      .get(`${base_url}/training/${trainingId}`)
      .then((response) => {
        const trainingData = response.data.data;
        if (trainingData) {
          reset({
            name: trainingData.name,
            description: trainingData.description,
          });

          const selectedWorkouts = trainingData.workouts.map((w) => ({
            _id: w.workout._id,
            name: w.workout.name,
            exercises: w.exercises.map((ex, index) => ({
              exercise_id: ex.exercise_id._id,
              name: ex.exercise_id.name,
              sets: ex.sets || 3,
              reps: ex.reps || 10,
              manipulation: ex.manipulation || "Default manipulation",
            })),
          }));

          setSelectedTrainingExercises(selectedWorkouts);
        }
      })
      .catch((error) =>
        console.error("Error fetching training details:", error)
      );
  }, [trainingId, reset]);

  useEffect(() => {
    axios.get(`${base_url}/workout`).then((response) => {
      setTrainingExercises(response.data.data);
    });
  }, []);

  const assignTraining = (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        user_id: userId,
        training_id: trainingId,
        workouts: selectedTrainingExercises.map((workout) => ({
          workout: workout._id,
          exercises: workout.exercises.map((ex) => ({
            exercise_id: ex.exercise_id,
            sets: ex.sets,
            reps: ex.reps,
            manipulation: ex.manipulation,
          })),
        })),
      };
      axios.post(`${base_url}/assign-training`, payload).then((response) => {
        if (response.status === 201) {
          toast.success("Assigned Training to User successfully!");
          // navigate("/dashboard/training-list");
        }
      });
    } catch (error) {
      console.error("Error updating training:", error);
      toast.error("Failed Assigned Training.");
    }
  };

  const editTraining = (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        workouts: selectedTrainingExercises.map((workout) => ({
          workout: workout._id,
          exercises: workout.exercises.map((ex) => ({
            exercise_id: ex.exercise_id,
            sets: ex.sets,
            reps: ex.reps,
            manipulation: ex.manipulation,
          })),
        })),
      };
      axios
        .put(`${base_url}/training/${trainingId}`, payload)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Training updated successfully!");
            navigate("/dashboard/training-list");
          }
        });
    } catch (error) {
      console.error("Error updating training:", error);
      toast.error("Failed to update training.");
    }
  };

  const onSubmit = async (data) => {
    if (userId) {
      assignTraining(data);
    } else {
      editTraining(data);
    }
  };

  return (
    <div className="py-10 w-[450px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DynamicInputField
          id="name"
          type="text"
          label="Training Name"
          placeholder="Enter training name..."
          register={register}
          validation={{ required: "Name is required" }}
          errors={errors}
        />

        <DynamicInputField
          id="description"
          type="text"
          label="Description"
          placeholder="Enter description..."
          register={register}
          validation={{ required: "Description is required" }}
          errors={errors}
        />

        <Select
          options={trainingExercises}
          valueField="_id"
          labelField="name"
          multi
          values={selectedTrainingExercises}
          onChange={setSelectedTrainingExercises}
        />

        {selectedTrainingExercises.map((workout, wIndex) => (
          <div
            key={wIndex}
            className="border p-4 rounded-lg space-y-2"
            dir="rtl"
          >
            <h3 className="font-semibold">{workout.name}</h3>
            {workout.exercises.map((ex, exIndex) => (
              <div key={exIndex}>
                <p className="col-span-1 font-medium">{ex.name}</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="sets">Sets</label>
                    <input
                      type="number"
                      value={ex.sets}
                      onChange={(e) => {
                        const updatedExercises = [...workout.exercises];
                        updatedExercises[exIndex].sets = e.target.value;
                        setSelectedTrainingExercises((prev) => {
                          const updated = [...prev];
                          updated[wIndex].exercises = updatedExercises;
                          return updated;
                        });
                      }}
                      className="border rounded p-2 w-full"
                      placeholder="Sets"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="reps">Reps</label>
                    <input
                      type="number"
                      value={ex.reps}
                      onChange={(e) => {
                        const updatedExercises = [...workout.exercises];
                        updatedExercises[exIndex].reps = e.target.value;
                        setSelectedTrainingExercises((prev) => {
                          const updated = [...prev];
                          updated[wIndex].exercises = updatedExercises;
                          return updated;
                        });
                      }}
                      className="border rounded p-2 w-full"
                      placeholder="Reps"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="manipulation">Manipulation</label>
                    <input
                      type="text"
                      value={ex.manipulation}
                      onChange={(e) => {
                        const updatedExercises = [...workout.exercises];
                        updatedExercises[exIndex].manipulation = e.target.value;
                        setSelectedTrainingExercises((prev) => {
                          const updated = [...prev];
                          updated[wIndex].exercises = updatedExercises;
                          return updated;
                        });
                      }}
                      className="border rounded p-2 w-full"
                      placeholder="Manipulation"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-customBg text-white px-4 py-2 rounded-full"
          >
            {userId ? "Assign Training" : " Update Training"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainingForm;
