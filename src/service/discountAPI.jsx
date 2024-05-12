import axios from "./customAxios";

export const getDiscountShop = async (id) => {
  const response = await axios.get(`/discount/ofShop/${id}`);
  return response.message;
};
