import axios from "axios";

export const API = "https://dai.tongdaihoidap.com";

const instance = axios.create({
  baseURL: `${API}/v1/api`,
});

instance.interceptors.request.use(
  function (config) {
    config.headers["x-xclient-id"] = localStorage.getItem("userID");
    config.headers["authorization"] = localStorage.getItem("token");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
