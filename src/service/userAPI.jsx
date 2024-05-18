import axios from "./customAxios";

export const getProfile = async () => {
  const response = await axios.get("/user/getProfile");
  return response.message.checkUser;
};

export const getAddress = async () => {
  const response = await axios.get("/user/getAddress");
  return response.message.information.address;
};

export const addAddress = async (form) => {
  const response = await axios.post("/user/addAddress", form);
  return response.message;
};
export const deleteAddress = async (form) => {
  const response = await axios.put("/user/deleteAddress", form);
  return response;
};

export const updateProfile = async (form) => {
  const response = await axios.put("/user/updateUser", form);
  return response;
};
export const changePassword = async (form) => {
  const response = await axios.put("/user/changePassword", form);
  return response;
};
export const followShop = async (idShop) => {
  const response = await axios.get(`/user/followShop/${idShop}`);
  return response;
};
