import axios from "axios";
import { base_url } from "./baseUrl";

export const updateApprovedMail = async (payload) => {
  const response = await axios.patch(
    `${base_url}/update-approved-mail`,
    payload
  );
  return response;
};
