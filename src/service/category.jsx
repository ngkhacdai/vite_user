import axios from "./customAxios";

export const getAllCategory = async () => {
  const response = await axios.get("/category/getAllCategory");
  return response.message.category;
};
