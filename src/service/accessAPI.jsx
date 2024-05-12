import axios from "./customAxios";

export const signup = async (form) => {
  const response = await axios.post("/access/signup", form);
  return response;
};
export const verifyOtp = async (form) => {
  const response = await axios.post("/access/verifyOtp", form);
  return response;
};
