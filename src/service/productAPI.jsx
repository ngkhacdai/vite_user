import axios from "./customAxios";

export const getAllProduct = async () => {
  const response = await axios.get("/product/getAllProductByUser");
  return response.message.allProduct;
};
export const getProduct = async (id) => {
  const response = await axios.get(`/product/getProduct/${id}`);
  return response.message;
};
