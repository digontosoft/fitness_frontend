import { base_url } from "@/api/baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EditExercise = () => {
  const location = useLocation();
  const workData = location.state?.data;
  const [exerciseList, setExerciseList] = useState(
    workData?.userTrainingExercise || []
  );
  const [exercise, setExercise] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${base_url}/exercise`);
        setExercise(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const handleAddExercise = () => {
    const selected = exercise.find((ex) => ex._id === selectedExerciseId);
    if (selected) {
      setExerciseList([
        ...exerciseList,
        {
          _id: Date.now().toString(),
          exercise_id: selected,
          sets: 0,
          reps: 0,
          manipulation: "",
        },
      ]);
      setSelectedExerciseId("");
      setShowDropdown(false);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedExercises = [...exerciseList];
    updatedExercises[index][field] = value;
    setExerciseList(updatedExercises);
  };

  const handleSubmit = () => {
    console.log("Updated Data:", exerciseList);
  };

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white py-12"
    >
      <div className="flex flex-col justify-center items-center max-w-6xl mx-auto bg-white rounded-3xl p-2 md:p-10">
        <h1 className="text-2xl font-semibold">{workData?.task_name}</h1>

        {exerciseList.map((item, index) => (
          <div
            key={item._id}
            className="w-full bg-gray-100 p-4 rounded-xl mb-4 shadow mt-4"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {item.exercise_id?.name || "Exercise"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="flex items-center justify-between md:justify-center gap-3">
                <label>סטים:</label>
                <input
                  type="number"
                  value={item.sets}
                  onChange={(e) => handleChange(index, "sets", e.target.value)}
                  placeholder="Sets"
                  className="p-2 rounded-lg border"
                />
              </div>
              <div className="flex items-center justify-between md:justify-center gap-3">
                <label>חזרות:</label>
                <input
                  type="number"
                  value={item.reps}
                  onChange={(e) => handleChange(index, "reps", e.target.value)}
                  placeholder="Reps"
                  className="p-2 rounded-lg border"
                />
              </div>
              <div className="flex items-center justify-between md:justify-center gap-3">
                <label>מָנִיפּוּלָצִיָה:</label>
                <input
                  type="text"
                  value={item.manipulation || ""}
                  onChange={(e) =>
                    handleChange(index, "manipulation", e.target.value)
                  }
                  placeholder="Manipulation"
                  className="p-2 rounded border"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Dropdown section */}
        {showDropdown && (
          <div className="w-full flex flex-col md:flex-row items-center gap-3 mb-6">
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">בחר תרגיל</option>
              {exercise.map((ex) => (
                <option key={ex._id} value={ex._id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddExercise}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-400"
            >
              הוסף
            </button>
          </div>
        )}

        {/* Add More Exercise Button - aligned right */}
        {!showDropdown && (
          <div className="w-full flex justify-start">
            <button
              onClick={() => setShowDropdown(true)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-400 mb-6"
            >
              הוסף תרגיל נוסף
            </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="bg-red-600 rounded-lg text-white px-6 py-2 hover:bg-red-400 mt-4"
        >
          שמור שינויים
        </button>
      </div>
    </div>
  );
};

export default EditExercise;
