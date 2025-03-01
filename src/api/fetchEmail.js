import axios from "axios";
import { base_url } from "./baseUrl";

export const fetchEmail = async () => {
  try {
    const response = await axios.get(`${base_url}/approved-mail`);
    return response.data;
  } catch (error) {
    console.error("Error fetching email:", error);
    throw error;
  }
};
