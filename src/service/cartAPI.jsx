import axios from "./customAxios";

export const getCart = async () => {
  const response = await axios.get("/cartv2");
  return response.message.cart;
};

export const deleteProductInCart = async (form) => {
  const response = await axios.post("/cartv2/delete", form);
  return response.message;
};
