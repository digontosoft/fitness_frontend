import { useEffect, useState } from "react";
import Cart from "./Cart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const WorkOutCart = () => {
  const [trainings, setTrainings] = useState({});

  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${user._id}`
        );
        setTrainings(response.data.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, [user?._id]);
  return (
    <div className="max-w-6xl mx-auto px-2 pb-10">
      {trainings.length > 0 ? (
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-6">
          {trainings.map((training) =>
            training.workouts.map((workout) => (
              <Cart key={workout._id} workout={workout} training={training} />
            ))
          )}
        </div>
      ) : (
        <p className="text-center my-5">Not training assigned yet!!!</p>
      )}
    </div>
  );
};

export default WorkOutCart;
