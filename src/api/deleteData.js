// Delete API helpers with Hebrew user-facing toast messages
import axios from "axios";
import { toast } from "sonner";
import { base_url } from "./baseUrl";
import { UI_TEXT } from "@/constants/hebrewText";

export const deleteEmail = async (data) => {
  try {
    const response = await axios.post(`${base_url}/delete-approved-mail`, data);
    // console.log("delete:", response);
    if (response.status === 200) {
      toast.success(UI_TEXT.emailDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.emailDeleteFailed);
    throw error;
  }
};

export const deleteExercise = async (exerciseId) => {
  try {
    const response = await axios.delete(`${base_url}/exercise/${exerciseId}`);
    // console.log("delete:", response);
    if (response.status === 200) {
      toast.success(UI_TEXT.exerciseDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.exerciseDeleteFailed);
    throw error;
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await axios.delete(
      `${base_url}/deleteUser/${data.user_id}`
    );
    // console.log("delete:", data.user_id);
    if (response.status === 200) {
      toast.success(UI_TEXT.userDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.userDeleteFailed);
    throw error;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const response = await axios.delete(`${base_url}/workout/${workoutId}`);
    // console.log("delete:", response);
    if (response.status === 200) {
      toast.success(UI_TEXT.workoutDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.workoutDeleteFailed);
    throw error;
  }
};

export const deleteUserTraining = async (trainingId) => {
  try {
    const response = await axios.delete(
      `${base_url}/user-training/${trainingId}`
    );
    if (response.status === 200) {
      toast.success(UI_TEXT.trainingDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.trainingDeleteFailed);
    throw error;
  }
};

export const deleteTraining = async (trainingId) => {
  try {
    const response = await axios.delete(
      `${base_url}/training/${trainingId}`
    );
    if (response.status === 200) {
      toast.success(UI_TEXT.trainingDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.trainingDeleteFailed);
    throw error;
  }
};

export const deleteNutritionGuide = async (nutritionId) => {
  try {
    const response = await axios.delete(
      `${base_url}/nutritionGuide/${nutritionId}`
    );
    if (response.status === 200) {
      toast.success(UI_TEXT.nutritionGuideDeleted);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error(UI_TEXT.nutritionGuideDeleteFailed);
    throw error;
  }
};
