import axios from "./customAxios";

export const getAllOrderByStatus = async (status) => {
  const response = await axios.get(`/checkout/getAllOrderForUser/${status}`);
  return response.message.orderRes.user;
};
