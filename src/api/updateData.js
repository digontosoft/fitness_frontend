// api/updateStatus.js
import axios from "axios";
import { base_url } from "./baseUrl";

export const updateEmailStatus = async (status) => {
  try {
    const response = await axios.put(
      `${base_url}/update-approved-mail`,
      status
    );
    return response.data; // Assuming the API returns a success message
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};
