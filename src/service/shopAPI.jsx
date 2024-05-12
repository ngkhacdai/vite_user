import axios from "./customAxios";

export const getShop = async (id) => {
  const response = await axios.get(`/shop/getShop/${id}`);
  return response.message;
};
