import axios from "./customAxios";

export const getProfile = async () => {
  const response = await axios.get("/user/getProfile");
  return response.message.checkUser;
};
