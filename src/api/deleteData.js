// api/updateStatus.js
import axios from "axios";
import { toast } from "sonner";
import { base_url } from "./baseUrl";

export const deleteEmail = async (data) => {
  try {
    const response = await axios.patch(
      "http://localhost:5000/update-approved-mail",
      data
    );
    console.log("delete:", response);
    if (response.status === 200) {
      toast.success("Email deleted successfully.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to delete email.");
    throw error;
  }
};
export const deleteExercise = async (exerciseId) => {
  try {
    const response = await axios.delete(`${base_url}/exercise/${exerciseId}`);
    console.log("delete:", response);
    if (response.status === 200) {
      toast.success("Exercise deleted successfully.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to delete exercise.");
    throw error;
  }
};
export const deleteUser = async (data) => {
  try {
    const response = await axios.post(`${base_url}/updateUserInfo`, data);
    console.log("delete:", response);
    if (response.status === 200) {
      toast.success("User deleted successfully.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to delete exercise.");
    throw error;
  }
};
export const deleteWorkout = async (workoutId) => {
  try {
    const response = await axios.delete(`${base_url}/workout/${workoutId}`);
    console.log("delete:", response);
    if (response.status === 200) {
      toast.success("Wourkout deleted successfully.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to delete workout.");
    throw error;
  }
};

export const deleteTraining = async (trainingId) => {
  try {
    const response = await axios.delete(
      `${base_url}/user-training/${trainingId}`
    );
    if (response.status === 200) {
      toast.success("Training deleted successfully.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to delete training.");
    throw error;
  }
};
export const deleteNutritionGuide = async (nutritionId) => {
  try {
    const response = await axios.delete(
      `${base_url}/nutritionGuide/${nutritionId}`
    );
    if (response.status === 200) {
      toast.success("Nutrition Guide deleted successfully.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to delete training.");
    throw error;
  }
};
