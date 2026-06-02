import axios from "axios";

const url =
  window.location.hostname === "localhost"
    ? "/api/v1"
    : "https://api.fitalal.com/api/v1";

export const updateApprovedMail = async (payload) => {
  const response = await axios.patch(`${url}/update-approved-mail`, payload);
  return response;
};
