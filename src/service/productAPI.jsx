import axios from "./customAxios";

export const getAllProduct = async () => {
  const response = await axios.get("/product/getAllProductByUser");
  return response.message.allProduct;
};
export const getProduct = async (id) => {
  const response = await axios.get(`/product/getProduct/${id}`);
  return response.message;
};
export const findProduct = async (name) => {
  const response = await axios.get(`/product/findProduct/${name}`);
  return response.message;
};

export const getProductByCategory = async (id) => {
  const response = await axios.get(`/product/ofCategory/${id}`);
  return response.message.allProduct;
};
